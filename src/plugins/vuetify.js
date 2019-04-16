import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: colors.red.accent3,
    secondary: colors.cyan.accent2,
    accent: colors.grey.lighten5
  }
})
