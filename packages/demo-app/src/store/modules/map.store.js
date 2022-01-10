export default {
  namespaced: true,

  state: () => ({
    wmsLayers: [],
    rasterLayers: [
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
  }),

  mutations: {
    setWmsLayers(state, payload) {
      state.wmsLayers = payload;
    },
    setRasterLayers(state, payload) {
      state.rasterLayers = payload;
    },
  },
}
