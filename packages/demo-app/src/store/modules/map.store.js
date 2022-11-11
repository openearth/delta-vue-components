export default {
  namespaced: true,

  state: () => ({
    wmsLayers: [],
    rasterLayers: [],
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
