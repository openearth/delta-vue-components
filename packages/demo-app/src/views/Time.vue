<template>
  <div
    class="time-page">
    <time-slider
      :timings="timings"
      @input="onTimingSelection"
    />
  </div>
</template>

<script>
import { TimeSlider } from '@deltares/vue-components';

export default {
  name: 'Time',

  components: {
    TimeSlider,
  },

  data: () => ({
    layers: [
      {
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
          dateBegin: '2000-01-01',
          dateEnd: '2020-01-01',
          maxzoom: 14,
          minzoom: 9,
          scheme: 'xyz',
          geometry: []
        }
      }
    ],
    timings: [],
  }),

  methods: {
    onTimingSelection(selection) {
      const beginTotal = new Date(this.layers[0].source.dateBegin);
      const endTotal = new Date(this.layers[0].source.dateEnd);
      const totalDuration = endTotal - beginTotal;
      const beginSelection = new Date(selection.startValue);
      const millisecondsToMiddle = (new Date(selection.endValue) - beginSelection) / 2;
      const passedDuration = beginSelection - beginTotal + millisecondsToMiddle;
      const playheadFraction = passedDuration / totalDuration;
      const playheadTime = this.layers[0].source.durationSec * playheadFraction;

      const { player } = this.$root.mbMap.getSource(this.layers[0].id);
      player.setCurrentTime(playheadTime);
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
          console.log(this.timings);
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
  }
</style>
