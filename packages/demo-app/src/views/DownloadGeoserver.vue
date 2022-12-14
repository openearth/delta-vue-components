<template>
  <v-container class="download pt-4">
    <v-row v-if="!downloadIsAvailable && activeLayersList.length">
      <v-col>
        <v-alert dense outlined type="error">Download is unavailable</v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Download</h3>
        <p class="body-2 mb-0">
          Choose one layer to download. Please take care of your browser
          settings. Enable asking where to download in order to be able to find
          your download.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="downloadLayer"
          label="Select from visible layers"
          :items="activeLayersList"
          dense
          outlined
          hide-details
          @change="getAttributesToFilter"
        />
        <transition name="fade" mode="out-in">
          <v-alert
            v-if="!validUrl && downloadLayer"
            class="mt-2 mb-0"
            dense
            outlined
            type="error"
          >
            One or more layers cannot be downloaded
          </v-alert>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { describeFeatureType, wfsFilterHelpers } from '@deltares/utilities'

export default {
  data: () => ({
    downloadLayer: null,
    availableFiltersForSelectedLayer: [],
  }),

  computed: {
    ...mapState('map', ['wmsLayers']),

    validUrl() {
      if (!this.selectedLayerData) {
        return
      }
      return (
        Boolean(this.selectedLayerData.downloadUrl) ||
        Boolean(this.selectedLayerData.url)
      )
    },

    downloadIsAvailable() {
      return this.wmsLayers.some(
        (layer) => Boolean(layer.downloadUrl) || Boolean(layer.url)
      )
    },

    activeLayersList() {
      return this.wmsLayers.map(({ id, name }) => ({
        text: name,
        value: id,
      }))
    },

    selectedLayerData() {
      return this.wmsLayers.find((layer) => layer.id === this.downloadLayer)
    },
  },

  watch: {
    wmsLayers(val, oldVal) {
      if (val !== oldVal) {
        this.downloadLayer = null
      }
    },
  },

  methods: {
    async getAttributesToFilter() {
      const { serviceType, url, layer, downloadLayer } = this.selectedLayerData
      const layerName = downloadLayer ? downloadLayer : layer

      console.log({
        serviceType,
        url,
        layer,
        downloadLayer,
      })
      if (serviceType === 'wfs') {
        const response = await describeFeatureType({
          url,
          layer: layerName,
        })
        this.availableFiltersForSelectedLayer =
          wfsFilterHelpers.readFeatureProperties(response)
      }
    },
  },
}
</script>
