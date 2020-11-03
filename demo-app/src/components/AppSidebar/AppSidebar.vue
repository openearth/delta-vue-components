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
    <layer-list-controls :layers="[]" />
  </v-navigation-drawer>
</template>

<script>
import { MapLayerControls, LayerListControls } from 'component-library';
export default {
  components: {
    LayerListControls,
    MapLayerControls,
  },
};
</script>
