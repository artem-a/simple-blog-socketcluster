import Vue from 'vue'
import Vuetify from 'vuetify'

import router from '@/router'

import '@/components/Common'

import App from '@/App'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
