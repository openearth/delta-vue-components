<template>
  <v-sheet
    class="time-slider px-2 py-4"
    elevation="1"
    rounded
  >
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
