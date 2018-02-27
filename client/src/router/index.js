import Vue from 'vue'
import Router from 'vue-router'

import { notAuth, authRequired } from './auth-guard'

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
      component: () => lazyLoad('SignUp'),
      beforeEnter: notAuth
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => lazyLoad('SignIn'),
      beforeEnter: notAuth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => lazyLoad('Dashboard'),
      beforeEnter: authRequired,
      children: [
        {
          path: 'blogs',
          name: 'blogs_list',
          component: () => lazyLoad('Blogs/List')
        },
        {
          path: 'blogs/new',
          name: 'blogs_new',
          component: () => lazyLoad('Blogs/New')
        },
        {
          path: 'blogs/:id/edit',
          name: 'blogs_edit',
          component: () => lazyLoad('Blogs/Edit')
        }
      ]
    }
  ]
})
