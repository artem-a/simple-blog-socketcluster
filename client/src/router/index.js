import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const lazyLoad = (component) => import(`@/components/${component}`)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazyLoad('Home')
    }
  ]
})
