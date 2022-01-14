<template>
  <button
    class="playhead"
    v-dragged="onDragged"
  >
  </button>
</template>

<script>
import VDragged from 'v-dragged';

export default {
  directives: {
    dragged: VDragged.directive,
  },

  props: {

  },

  methods: {
    onDragged(evt) {
      if(evt.first) {
        const bounds = this.$el.parentElement.getBoundingClientRect();
        this.boundLeft = bounds.left;
        this.boundRight = bounds.right;
      }

      const x = evt.clientX;
      if(x < this.boundLeft) {
        this.$el.style.left = 0;
      }
      else if(x > this.boundRight) {
        this.$el.style.left = (this.boundRight - this.boundLeft - 2) + 'px';
      }
      else {
        this.$el.style.left = (x - this.boundLeft) + 'px';
      }

      if(evt.last) {
        console.log('END!');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.playhead {
  position: absolute;
  height: 140%;
  bottom: -20%;
  width: 2px;
  background-color: red;

  cursor: grab;
  z-index: 10;
}
</style>
