<template>
  <app-shell header-title="DeltaVue Components Library">
    <app-sidebar>
      <v-tabs
        v-model="tabs.name"
        fixed-tabs
        icons-and-text
        background-color="blue-grey lighten-5"
      >
        <template v-for="tab in tabs">
          <v-tab
            :key="tab.name"
            :to="`${tab.page}`"
            :ripple="false"
            :exact-path="tab.page === '/'"
            :disabled="tab.disabled"
          >
            {{ tab.name }}
            <v-icon>{{ tab.icon }}</v-icon>
          </v-tab>
        </template>
      </v-tabs>

      <v-divider />

      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </app-sidebar>

    <legal-dialog
      title="Legal"
      buttonText="Accept"
      storage="none"
      :body="legalText"
      :checkboxes="[
        'I accept the above statement',
        'I agree to the use of cookies',
      ]"
    />

    <mapbox-map slot="map" :access-token="accessToken">
      <mapbox-wms-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :layer="layer"
      />
      <map-layer-info v-if="wmsLayers[0]" :layer="wmsLayers[0]" />
    </mapbox-map>
  </app-shell>
</template>

<script>
import { mapState } from 'vuex'
import {
  AppShell,
  AppSidebar,
  MapboxMap,
  MapboxWmsLayer,
  LegalDialog,
  MapLayerInfo,
} from '@deltares/vue-components'

export default {
  components: {
    AppShell,
    AppSidebar,
    MapboxMap,
    MapboxWmsLayer,
    LegalDialog,
    MapLayerInfo,
  },
  data: () => ({
    accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
    legalText:
      'lorem <b>ipsum</b> dolor sit amet, consectetur adipisicing elit. Quibusdam iure earum, quidem, dolorem, ex eveniet labore illo quis porro accusamus ad nisi ab nam. Tempora nisi corrupti a cumque alias.',
    tabs: [
      { name: 'layers', page: '/', icon: 'mdi-layers', disabled: false },
      {
        name: 'download',
        page: '/download',
        icon: 'mdi-download',
        disabled: false,
      },
    ],
  }),
  computed: {
    ...mapState({
      wmsLayers: ({ map }) => map.wmsLayers,
    }),
  },
}
</script>
