<template>
  <app-sidebar>
    <layer-list-controls :layers="layers" />
  </app-sidebar>
</template>

<script>
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
  })
};
</script>
