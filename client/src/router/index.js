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
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => lazyLoad('SignUp')
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => lazyLoad('SignIn')
    }
  ]
})
