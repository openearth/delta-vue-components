<template>
  <app-sidebar>
    <layer-list-controls
      :layers="layers"
      @active-layers-change="onActiveLayerChange"
      @layer-sorting-change="onLayerSortingChange"
    />
  </app-sidebar>
</template>

<script>
import { mapMutations } from 'vuex'
import { AppSidebar, LayerListControls } from '@deltares/vue-components';

export default {
  name: 'Home',
  components: {
    AppSidebar,
    LayerListControls,
  },
  data: () => ({
    layers: [
      {
        "id": "geological-layout1",
        "name": "Geological Layout",
        "children": [
          {
            "id": "plasvorming_herstelkosten",
            "name": "Plasvorming Herstelkosten",
            "layer": "ra2ce:plasvorming_herstelkosten",
            "url": "https://ra2ce.openearth.eu/geoserver/ows"
          },
          {
            "id": "plasvorming_stremmingskosten",
            "name": "Plasvorming Stremmingskosten",
            "layer": "ra2ce:plasvorming_stremmingskosten",
            "url": "https://ra2ce.openearth.eu/geoserver/ows"
          },
        ]
      }
    ]
  }),
  methods: {
    ...mapMutations(['map/setLayers']),
    onActiveLayerChange(event) {
      this['map/setLayers'](event)
    },
    onLayerSortingChange(sortedLayers) {
      this.layers = sortedLayers;
    },
  }
};
</script>
