<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapConfig.token"
      :map-style="mapConfig.style"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
    >

    </v-mapbox>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2MapboxGL from 'vue2mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT } from '@/lib/constants';

Vue.use(Vue2MapboxGL);

export default {
  computed: {
    mapConfig: () => ({
      token: process.env.VUE_APP_MAPBOX_TOKEN,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      style: MAP_BASELAYER_DEFAULT.style,
    }),
  },
};
</script>

<style>
.mapbox-map {
  height: 100%;
  width: 100%;
}

.mapbox-map__map {
  height: 100%;
  width: 100%;
}
</style>
