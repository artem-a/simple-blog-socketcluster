import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import VueSocketCluster from '@/plugins/vue-socketcluster'

import router from '@/router'
import store from '@/store'

import '@/components/Common'

import App from '@/App'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.use(VueSocketCluster, { port: 8888, store })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
