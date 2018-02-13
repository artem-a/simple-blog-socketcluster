export const signUp = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_user', body: payload }

  return new Promise((resolve) => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        const { name, message } = err
        commit('SET_ERROR', { name, message })
      }

      commit('SET_LOADING', false)
      resolve()
    })
  })
}

export const signIn = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'auth_local', body: payload }

  ws.emit('api', data, (err, res) => {
    if (err) {
      const { name, message } = err
      commit('SET_ERROR', { name, message })
    } else {
      commit('SET_USER', res)
    }

    commit('SET_LOADING', false)
  })
}

export const setAuthToken = ({ commit }, payload) => {
  commit('SET_AUTH_TOKEN', payload)
}

export const signOut = ({ commit, getters }) => {
  const ws = getters['ws/client']

  ws.deauthenticate()
  commit('SET_USER', null)
  commit('SET_AUTH_TOKEN', null)
}
