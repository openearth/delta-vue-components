<template>
<div class="mapbox-map">
  <v-mapbox
    ref="vmapbox"
    class="mapbox-map__map"
    :accessToken="accessToken"
    :mapStyle="mapboxStyle"
    :center="center"
    :zoom="zoom"
  >
    <slot></slot>
  </v-mapbox>
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
  mounted() {
    const map = this.$refs.vmapbox.map
    // Map events: https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events
    map.on('resize', event => this.$emit('resize', event))
    map.on('remove', event => this.$emit('remove', event))

    // Lifecycle events: https://docs.mapbox.com/mapbox-gl-js/api/map/#events-lifecycle
    map.on('load', event => this.$emit('load', event))
    map.on('render', event => this.$emit('render', event))
    map.on('idle', event => this.$emit('idle', event))
    map.on('error', event => this.$emit('error', event))
    map.on('webglcontextlost', event => this.$emit('webglcontextlost', event))
    map.on('webglcontextrestored', event => this.$emit('webglcontextrestored', event))


    // Data loading events: https://docs.mapbox.com/mapbox-gl-js/api/map/#events-data-loading
    map.on('data', event => this.$emit('data', event))
    map.on('styledata', event => this.$emit('styledata', event))
    map.on('sourcedata', event => this.$emit('sourcedata', event))
    map.on('dataloading', event => this.$emit('dataloading', event))
    map.on('styledataloading', event => this.$emit('styledataloading', event))
    map.on('sourcedataloading', event => this.$emit('sourcedataloading', event))
    map.on('styleimagemissing', event => this.$emit('styleimagemissing', event))
  }
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
