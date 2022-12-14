<template>
  <v-app>
    <slot name="app-header" />
    <app-header v-if="appHeaderSlotIsFilled === false" :title="headerTitle" :theme="theme">

      <template slot="left">
        <slot name="header-left" />
      </template>

      <template slot="right">
        <slot name="header-right" />
      </template>

    </app-header>

    <v-main>
      <slot />
      <slot name="map" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '../AppHeader'

export default {
  components: {
    AppHeader,
  },
  props: {
    headerTitle: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'dark',
      validator: value => value === 'dark' || value === 'light'
    }
  },
  computed: {
    appHeaderSlotIsFilled() {
      return !!this.$slots['app-header']
    }
  },
}
</script>
