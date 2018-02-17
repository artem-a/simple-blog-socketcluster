import { setUser, removeUser } from '@/services/local-auth'

export const signUp = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_user', body: payload }

  return new Promise(resolve => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
      }

      commit('SET_LOADING', false)
      resolve(err)
    })
  })
}

export const signIn = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'auth_local', body: payload }

  return new Promise(resolve => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
      } else {
        commit('SET_USER', res)
        setUser(res)
      }

      commit('SET_LOADING', false)
      resolve(err)
    })
  })
}

export const autoSignIn = async ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']

  return new Promise(resolve => {
    ws.authenticate(payload, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
      } else {
        const user = ws.getAuthToken()
        commit('SET_USER', user)
        setUser(user)
      }

      commit('SET_LOADING', false)
      resolve(err)
    })
  })
}

export const signOut = ({ commit, getters }) => {
  const ws = getters['ws/client']

  ws.deauthenticate()
  removeUser()
  commit('SET_USER', null)
}
