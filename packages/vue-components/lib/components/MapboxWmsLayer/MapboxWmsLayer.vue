<template>
  <v-mapbox-layer ref="layer" :options="options" v-bind="$attrs" />
</template>

<script>
import { buildWmsLayer } from '@deltares/utilities'

export default {
  name: 'mapbox-wms-layer',
  props: {
    layer: {
      type: Object,
      required: true,
    }
  },
  methods: {
    deferredMountedTo(map) {
      this.$refs.layer.deferredMountedTo(map)
    },
  },
  computed: {
    options() {
      return buildWmsLayer(this.layer)
    }
  },
}
</script>
