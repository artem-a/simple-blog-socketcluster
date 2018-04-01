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
      name: 'sign-up',
      component: () => lazyLoad('SignUp'),
      beforeEnter: notAuth
    },
    {
      path: '/sign-in',
      name: 'sign-in',
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
          name: 'blogs',
          component: () => lazyLoad('Blogs/List')
        },
        {
          path: 'blogs/new',
          name: 'blog-new',
          component: () => lazyLoad('Blogs/New')
        },
        {
          path: 'blogs/:id/edit',
          name: 'blog-edit',
          component: () => lazyLoad('Blogs/Edit')
        },
        {
          path: 'blogs/:id/posts',
          name: 'posts',
          component: () => lazyLoad('Posts/List')
        },
        {
          path: 'blogs/:id/posts/new',
          name: 'post-new',
          component: () => lazyLoad('Posts/New')
        }
      ]
    }
  ]
})
