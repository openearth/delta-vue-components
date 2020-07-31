import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { DeltaVuetifyThemes as themes } from 'component-library';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes
  },
});
