export default {
  namespaced: true,
  state: () => ({
    layers: [
      {
        "id": "plasvorming_herstelkosten",
        "name": "Plasvorming Herstelkosten",
        "layer": "ra2ce:plasvorming_herstelkosten",
        "url": "https://ra2ce.openearth.eu/geoserver/ows"
      }
    ]
  }),
  mutations: {
    setLayers(state, payload) {
      state.layers = payload
    }
  }
}
