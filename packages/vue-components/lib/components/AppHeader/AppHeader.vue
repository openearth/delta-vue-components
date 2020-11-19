<template>
  <v-app-bar
    app
    class="app-header"
    :color="color"
    :dark="theme === 'dark'"
  >
    <slot name="left"/>
    <v-toolbar-title v-if="leftSlotIsFilled === false">
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <slot name="right" />

  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'dark',
      validator: value => value === 'dark' || value === 'light'
    },
    color: {
      type: String,
      default: 'primary',
    }
  },
  computed: {
    leftSlotIsFilled() {
      return !!this.$slots['left']
    }
  },
}
</script>

<style>
.app-header {
  left: 0 !important;
}
</style>