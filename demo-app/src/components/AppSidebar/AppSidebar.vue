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
</v-navigation-drawer>
</template>

<script>
import { MapLayerControls } from 'component-library';
export default {
  components: {
    MapLayerControls,
  },
};
</script>
