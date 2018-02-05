import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'

import router from '@/router'

import '@/components/Common'

import App from '@/App'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
