import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import user from './user'
import blog from './blog'
import post from './post'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    blog,
    post
  }
})
