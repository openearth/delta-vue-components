<template>
  <v-container class="download-container-scrollable pa-0">
    <v-row v-if="!downloadIsAvailable && !wmsLayers.length">
      <v-col class="pa-8">
        <v-alert
          dense
          outlined
          type="info"
        >
          No layers selected
        </v-alert>
      </v-col>
    </v-row>
    <template v-else>
      <v-tabs
        v-if="showApiTab"
        fixed-tabs
        @change="handleTabChange"
      >
        <v-tab
          :to="{
            name: 'download.geoserver'
          }"
        >
          Geoserver
        </v-tab>
        <v-tab
          :to="{
            name: 'download.api'
          }"
        >
          API
        </v-tab>
      </v-tabs>
      <router-view />
    </template>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('map', [ 'wmsLayers' ]),

      downloadIsAvailable() {
        return this.wmsLayers.some(layer => Boolean(layer?.url))
      },

      showApiTab() {
        return this.wmsLayers.some(layer => layer?.externalApi?.length)
      },
    },
  }
</script>
<style>
.download-container-scrollable {
  overflow-y:auto;
  height: calc(100vh - 130px);
}
</style>
