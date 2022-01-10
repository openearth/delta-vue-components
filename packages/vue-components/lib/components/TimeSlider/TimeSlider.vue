<template>
  <div>
    <button
      v-for="(timing, index) in timings"
      :key="index"
      class="lala"
      @click="$emit('input', timing)"
    >
      {{ timing.startLabel }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    timings: {
      type: Array,
      default: () => [],
    },
  }
};
</script>

<style lang="scss" scoped>
  .lala {
    background-color: hotpink;
    color: #69FFB4;
    margin: 2px;
    padding: 0 4px;
  }
</style>
