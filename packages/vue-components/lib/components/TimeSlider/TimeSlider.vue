<template>
  <v-sheet
    class="time-slider px-2 py-4"
    elevation="1"
    rounded
  >
    <!-- <pre>{{ years }}</pre> -->
    <div
      v-if="mode === 'simple-select'"
      class="d-flex align-center"
    >
      <v-btn
        icon
        :disabled="!timings.length || internalValue[INTERFACE.VALUE] === timings[0][INTERFACE.VALUE]"
        @click="onInput(timings[currentIndex - 1])"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="flex-grow-1 px-2">
        <v-select
          outlined
          dense
          hide-details
          :items="timings"
          :item-text="INTERFACE.TEXT"
          :item-value="INTERFACE.VALUE"
          return-object
          @input="onInput"
          v-model="internalValue"
        />
      </div>
      <v-btn
        icon
        :disabled="!timings.length || internalValue[INTERFACE.VALUE] === timings[ timings.length - 1 ][INTERFACE.VALUE]"
        @click="onInput(timings[currentIndex + 1])"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-slider
      v-if="mode === 'simple-slider' && timings.length"
      class="px-2"
      v-model="simpleSliderValue"
      :tick-labels="sliderTicks"
      :max="sliderTicks.length ? sliderTicks.length - 1 : 0"
      :step="1"
      ticks="always"
      tick-size="5"
    />

  </v-sheet>
</template>

<script>
// @TODO :: Come up with a good interface for a Timing Object
const INTERFACE = {
  TEXT: 'startLabel',
  VALUE: 'startValue',
};

export default {
  props: {
    timings: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'simple-select',
    },
    value: {
      type: Object,
    },
  },

  data: () => ({
    internalValue: null,
    INTERFACE,
  }),

  computed: {
    currentIndex() {
      return this.timings.findIndex(timing =>
        timing[INTERFACE.VALUE] === this.internalValue[INTERFACE.VALUE]);
    },

    simpleSliderValue: {
      get() {
        return this.currentIndex;
      },
      set(index) {
        this.onInput(this.timings[index]);
      }
    },

    sliderTicks() {
      return this.timings.map(timing => timing[INTERFACE.TEXT]);
    },
  },

  methods: {
    onInput(timing) {
      const timingClone = { ...timing }
      this.internalValue = timingClone;
      this.$emit('input', timingClone);
    },

    resetInternalValue() {
      if(this.value !== undefined) {
        this.internalValue = { ...this.value };
      }
      else {
        this.internalValue = { ...this.timings[0] };
      }
    },
  },

  watch: {
    timings: {
      handler() {
        this.resetInternalValue();
      },
      immediate: true,
    }
  },
};
</script>
