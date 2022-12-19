<template>
  <v-row>
    <v-col>
      <p class="body-1 mb-3">
        <v-icon>mdi-layers-outline</v-icon>
        {{ layer.name }}
      </p>
      <v-select
        v-model="chosenFormat"
        :label="chooseFormatLabel"
        :items="supportedFormats"
        :disabled="loading"
        dense
        outlined
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script>
  import { getCapabilities, getSupportedOutputFormats } from '@deltares/utilities/lib/ogc-services/get-capabilities'
  import { moveInArrayByValue } from '@deltares/utilities'

  export default {
    props: {
      layer: {
        type: Object,
        required: true,
      },
      value: {
        type: String,
        default: '',
      },
      chooseFormatLabel: {
        type: String,
        required: true,
      }
    },

    data: () => ({
      loading: true,
      supportedFormats: [],
      chosenFormat: '',
    }),

    watch: {
      chosenFormat(newValue) {
        this.$emit('input', newValue)
      },
      value(newValue) {
        this.chosenFormat = newValue
      },
    },
    
    async mounted() {
      const serviceUrl = this.layer.downloadUrl || this.layer.url
      const serviceType = this.layer.serviceType 
      //wfs or wcs capabilities to read the supported formats to download the layer
      const capabilities = await getCapabilities(serviceUrl, serviceType)

      let supportedOutputFormats = getSupportedOutputFormats(serviceType, capabilities)
      supportedOutputFormats = moveInArrayByValue(supportedOutputFormats, 'csv', 0)
      supportedOutputFormats = moveInArrayByValue(supportedOutputFormats, 'SHAPE-ZIP', 1)

      this.supportedFormats = supportedOutputFormats
      this.loading = false
    },

  }
</script>
