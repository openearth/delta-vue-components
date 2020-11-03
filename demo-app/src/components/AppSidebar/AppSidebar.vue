<template>
  <v-navigation-drawer
    clipped
    app
    permanent
    width="360"
  >
    <h2>
      Welcome
    </h2>
    <map-layer-controls />
    <layer-list-controls :layers="layers" />
  </v-navigation-drawer>
</template>

<script>
import { MapLayerControls, LayerListControls } from 'component-library';
export default {
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
  components: {
    LayerListControls,
    MapLayerControls,
  },
};
</script>
