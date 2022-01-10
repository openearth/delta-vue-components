<template>
  <app-shell header-title="DeltaVue Components Library">
    <router-link slot="header-right" to="/"><v-btn text>Home</v-btn></router-link>
    <router-link slot="header-right" to="/about"><v-btn text>About</v-btn></router-link>

    <!-- <legal-dialog
      title="Legal"
      buttonText="Accept"
      storage="none"
      :body="legalText"
      :checkboxes="['I accept the above statement', 'I agree to the use of cookies']"
    /> -->

    <mapbox-map
      slot="map"
      :access-token="accessToken"
    >
      <mapbox-wms-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :layer="layer"
      />
      <v-mapbox-layer
        v-for="layer in rasterLayers"
        :key="layer.id"
        :options="layer"
      />
    </mapbox-map>

  </app-shell>
</template>

<script>
import { mapState } from 'vuex'
import { AppShell, MapboxMap, MapboxWmsLayer, LegalDialog } from '@deltares/vue-components'

export default {
  components: {
    AppShell,
    MapboxMap,
    MapboxWmsLayer,
    LegalDialog,
  },

  data: () => ({
    accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
    legalText: 'lorem <b>ipsum</b> dolor sit amet, consectetur adipisicing elit. Quibusdam iure earum, quidem, dolorem, ex eveniet labore illo quis porro accusamus ad nisi ab nam. Tempora nisi corrupti a cumque alias.'
  }),

  computed: {
    ...mapState({
      wmsLayers: ({ map }) => map.wmsLayers,
      rasterLayers: ({ map }) => map.rasterLayers,
    }),
  },
}
</script>
