import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { DeltaVuetifyThemes as themes } from '@deltares/vue-components';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes
  },
});
