<template>
  <app-shell header-title="DeltaVue Components Library">
    <router-link slot="header-right" to="/"><v-btn text>Home</v-btn></router-link>
    <router-link slot="header-right" to="/about"><v-btn text>About</v-btn></router-link>

    <mapbox-map
      slot="map"
      :access-token="accessToken"
    />
  </app-shell>
</template>

<script>
import { AppShell, MapboxMap } from '@deltares/vue-components'

export default {
  components: {
    AppShell,
    MapboxMap,
  },
  data: () => ({
    accessToken: process.env.VUE_APP_MAPBOX_TOKEN
  })
}
</script>