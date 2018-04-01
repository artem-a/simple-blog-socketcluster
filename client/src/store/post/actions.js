export const getPosts = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'get_posts', body: payload }

  ws.emit('api', data, (err, res) => {
    if (err) {
      commit('SET_ERROR', err)
    } else {
      commit('SET_POSTS', res)
    }

    commit('SET_LOADING', false)
  })
}

export const createPost = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_post', body: payload }

  return new Promise((resolve, reject) => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
        commit('SET_LOADING', false)
        reject(err)
      } else {
        commit('ADD_POST', res)
        commit('SET_LOADING', false)
        resolve(res)
      }
    })
  })
}
