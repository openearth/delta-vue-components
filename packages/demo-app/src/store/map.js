export default {
  namespaced: true,
  state: () => ({
    layers: []
  }),
  mutations: {
    setLayers(state, payload) {
      state.layers = payload
    }
  }
}
