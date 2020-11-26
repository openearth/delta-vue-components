<template>
  <v-mapbox-layer ref="layer" :options="options"/>
</template>

<script>
import buildWmsLayer from '../../utils/mapbox/build-wms-layer'

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