<template>
  <v-mapbox-layer ref="layer" :options="options" v-bind="$attrs" />
</template>

<script>
import {
  getWmsCapabilities,
  getLayerProperties,
} from '@deltares/utilities/lib/ogc-services/get-capabilities'
import { buildWmsLayer } from '@deltares/utilities'

export default {
  name: 'mapbox-wms-layer',
  props: {
    layer: {
      type: Object,
      required: true,
    },
    capabilities: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      options: {},
    }
  },

  mounted() {
    if (this.capabilities) {
      getWmsCapabilities(this.layer.url)
        .then((capabilities) =>
          getLayerProperties(capabilities, this.layer.layer)
        )
        .then(({ serviceType, timeExtent, wmsVersion, bbox }) => {
          this.options = buildWmsLayer({
            ...this.layer,
            ...{ serviceType: serviceType },
            ...{ timeExtent: timeExtent },
            ...{ version: wmsVersion },
            ...{ bbox: bbox },
          })
        })
    } else {
      this.options = buildWmsLayer(this.layer)
    }
  },

  methods: {
    deferredMountedTo(map) {
      this.$refs.layer.deferredMountedTo(map)
    },
  },
}
</script>
