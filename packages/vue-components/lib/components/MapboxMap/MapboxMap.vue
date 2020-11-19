<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="accessToken"
      :map-style="mapboxStyle"
      :center="center"
      :zoom="zoom"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2MapboxGL from 'vue2mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.use(Vue2MapboxGL);

const MAP_ZOOM = 7;
const NETHERLANDS_CENTER_LATITUDE = 52.1326;
const NETHERLANDS_CENTER_LONGITUDE = 5.2913;
const MAP_CENTER = [ NETHERLANDS_CENTER_LONGITUDE, NETHERLANDS_CENTER_LATITUDE];
const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v9';

export default {
  props: {
    accessToken: { 
      type: String,
      required: true
    },
    center: {
      type: Array,
      default: () => MAP_CENTER
    },
    zoom: {
      type: Number,
      default: MAP_ZOOM
    },
    mapboxStyle: {
      type: String,
      default: MAPBOX_STYLE
    }
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
