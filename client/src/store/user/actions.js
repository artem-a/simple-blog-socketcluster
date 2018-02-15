export const signUp = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_user', body: payload }

  return new Promise(resolve => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        const { name, message } = err
        commit('SET_ERROR', { name, message })
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
        const { name, message } = err
        commit('SET_ERROR', { name, message })
      } else {
        commit('SET_USER', res)
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

  ws.authenticate(payload, (err, res) => {
    if (err) {
      const { name, message } = err
      commit('SET_ERROR', { name, message })
    } else {
      commit('SET_USER', ws.getAuthToken())
    }

    commit('SET_LOADING', false)
  })
}

export const signOut = ({ commit, getters }) => {
  const ws = getters['ws/client']

  ws.deauthenticate()
  commit('SET_USER', null)
}
