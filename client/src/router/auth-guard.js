import store from '@/store'
import { isAuthenticated } from '@/services/local-auth'

export const notAuth = (to, from, next) => {
  const isLoggedIn = store.getters['isLoggedIn']
  if (isLoggedIn || isAuthenticated()) {
    return next({ name: 'home' })
  }

  next()
}

export const authRequired = (to, from, next) => {
  const isLoggedIn = store.getters['isLoggedIn']

  if (isLoggedIn || isAuthenticated()) {
    return next()
  }

  next({ name: 'signin', query: { redirect: to.fullPath } })
}
