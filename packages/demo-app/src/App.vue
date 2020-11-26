<template>
  <app-shell header-title="DeltaVue Components Library">
    <router-link slot="header-right" to="/"><v-btn text>Home</v-btn></router-link>
    <router-link slot="header-right" to="/about"><v-btn text>About</v-btn></router-link>

    <mapbox-map
      slot="map"
      :access-token="accessToken"
    >
      <mapbox-wms-layer v-for="layer in layers" :key="layer.id" :layer="layer" />
    </mapbox-map>

  </app-shell>
</template>

<script>
import { mapState } from 'vuex'
import { AppShell, MapboxMap, MapboxWmsLayer } from '@deltares/vue-components'
export default {
  components: {
    AppShell,
    MapboxMap,
    MapboxWmsLayer,
  },
  data: () => ({
    accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
  }),
  computed: {
    ...mapState({
      layers: ({ map }) => map.layers
    })
  }
}
</script>