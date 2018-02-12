export const signUp = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_user', body: payload }

  ws.emit('api', data, err => {
    if (err) {
      const { name, message } = err
      commit('SET_ERROR', { name, message })
    }

    commit('SET_LOADING', false)
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
