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

    <v-row>
      <v-col>
        <v-divider class="my-4" />
      </v-col>
    </v-row>

    <template v-if="downloadLayer">
      <v-row>
        <v-col>
          <h3>Formats</h3>
          <p class="body-2 mb-0">Choose download format for the layer</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <download-format-chooser
            v-model="downloadLayerFormat"
            :layer="selectedLayerData"
            choose-format-label="Choose format"
          />
        </v-col>
      </v-row>
    </template>
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          block
          :ripple="false"
          :disabled="
            !downloadLayer ||
            !downloadLayerFormat ||
            isGeneratingDownload ||
            !validUrl
          "
          :loading="isGeneratingDownload"
          @click="onDownloadClick"
        >
          Download layer
          <template #loader>
            <span>Preparing download...</span>
          </template>
        </v-btn>
        <transition name="fade">
          <v-alert
            v-if="downloadLayer && validUrl"
            class="mt-2 mb-0"
            dense
            outlined
            type="info"
          >
            Generating the file may take a while
          </v-alert>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { describeFeatureType, wfsFilterHelpers, buildDownloadUrl } from '@deltares/utilities'
import { DownloadFormatChooser } from '@deltares/vue-components'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'

export default {
  components: {
    DownloadFormatChooser,
  },
  data: () => ({
    downloadLayer: null,
    downloadLayerFormat: null,
    availableFiltersForSelectedLayer: [],
    isGeneratingDownload: false,
    selectedFilters: [],
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

    drawnFeatureCoordinates() {
      return []
    },

    selectionCoordinates() {
      return this.drawnFeatureCoordinates.toString().replace(/,/g, ' ')
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

      if (serviceType === 'wfs') {
        const response = await describeFeatureType({
          url,
          layer: layerName,
        })
        this.availableFiltersForSelectedLayer =
          wfsFilterHelpers.readFeatureProperties(response)
      }
    },
    async generateZipFile(urls) {
        let zip = new JSZip()
        return Promise.all(urls.map(async ({ url, fileType }) => {
          
          //TODO: find a better solution for layers that don't have workspace
          // the below if statement checks for workspace in layer name
          let layerName
          if (this.selectedLayerData.layer.includes(':')) {
            layerName = this.selectedLayerData.layer.split(':')[1]
          } else {
            layerName = this.selectedLayerData.layer
          }
          
          const filename = `${ layerName }.${ fileType }`
          
          return JSZipUtils.getBinaryContent(url)
            .then(data => zip.file(filename, data, { binary: true }))
            .catch(err => console.log(err))
        }))
          .then(() => zip.generateAsync({ type: 'blob' }))
      },  
    onDownloadClick() {
      //this was urls before
      const downloadProps = buildDownloadUrl({
        layer: this.selectedLayerData,
        filters: this.selectedFilters,
        format: this.downloadLayerFormat,
        coordinates: this.selectionCoordinates,
      })

      this.isGeneratingDownload = true

      this.generateZipFile(downloadProps)
        .then((content) => {
          saveAs(content, 'layer.zip')
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isGeneratingDownload = false
        })
    },
  },
}
</script>
