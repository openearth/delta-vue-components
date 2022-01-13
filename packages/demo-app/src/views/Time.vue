<template>
  <div
    class="time-page"
    :class="{ 'time-page--stretch': mode === 'simple-slider' }"
  >
    <time-slider
      :timings="timings"
      @input="onTimingSelection"
      :mode="mode"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TimeSlider } from '@deltares/vue-components';

const TILED_VIDEO_EXAMPLE_LAYER = {
  id: 'satellite-natural-video',
  type: 'raster',
  layout: {
    visibility: 'visible'
  },
  source: {
    type: 'video-tiled',
    tiles: [
      'https://storage.googleapis.com/vegetatiemonitor/satellite-natural-video/{z}/{x}/{y}.webm'
    ],
    tileSize: 512,
    durationSec: 2.2,
    dateBegin: null,
    dateEnd: null,
    maxzoom: 14,
    minzoom: 9,
    scheme: 'xyz',
    geometry: []
  }
};

export default {
  name: 'Time',

  components: {
    TimeSlider,
  },

  data: () => ({
    timings: [],
    mode: 'simple-slider',
  }),

  computed: {
    ...mapState({
      rasterLayers: ({ map }) => map.rasterLayers,
    }),
  },

  methods: {
    ...mapMutations(['map/setRasterLayers']),

    onTimingSelection(selection) {
      const beginTotal = new Date(this.rasterLayers[0].source.dateBegin);
      const endTotal = new Date(this.rasterLayers[0].source.dateEnd);
      const totalDuration = endTotal - beginTotal;
      const beginSelection = new Date(selection.startValue);
      const millisecondsToMiddle = (new Date(selection.endValue) - beginSelection) / 2;
      const passedDuration = beginSelection - beginTotal + millisecondsToMiddle;
      const playheadFraction = passedDuration / totalDuration;
      const playheadTime = this.rasterLayers[0].source.durationSec * playheadFraction;

      const { player } = this.$root.mbMap.getSource(this.rasterLayers[0].id);
      player.setCurrentTime(playheadTime);
    },

    buildLayer() {
      const numTimings = this.timings.length;
      if(!numTimings) return;
      const dateBegin = this.timings[0].startValue;
      const dateEnd = this.timings[numTimings - 1].endValue;
      const source = { ...TILED_VIDEO_EXAMPLE_LAYER.source, dateBegin, dateEnd };

      this['map/setRasterLayers']([ { ...TILED_VIDEO_EXAMPLE_LAYER, source } ]);

      setTimeout(() => {
        this.$root.mbMap.flyTo({
          center: [ 5.2, 51.8 ],
          zoom: 9,
        });
      }, 1000);
    },

    fetchDates() {
      const url = 'https://vegetatie-monitor.appspot.com/map/satellite/times/yearly';
      const body = {
        region: {
          "type": "Polygon",
          "geodesic": true,
          "coordinates": [
            [
              [
                4.176898193359904,
                52.26719520833592
              ],
              [
                4.176898193359904,
                51.327913051276056
              ],
              [
                6.223101806640926,
                51.327913051276056
              ],
              [
                6.223101806640926,
                52.26719520833592
              ],
              [
                4.176898193359904,
                52.26719520833592
              ]
            ]
          ]
        },
      };

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(dates => {
          this.timings = dates.map(({ dateStart, dateEnd }) => ({
            startValue: dateStart,
            startLabel: dateStart.split('-')[0],
            endValue: dateEnd,
            endLabel: dateEnd.split('-')[0],
          }));
          this.buildLayer();
        })
        .catch(err => {
          console.error('ERROR FETCHING DATES', err);
        })
      ;
    },
  },

  mounted() {
    this.fetchDates();
  },
}
</script>

<style lang="scss">
  .time-page {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    &--stretch {
      width: 98vw;
    }
  }
</style>
