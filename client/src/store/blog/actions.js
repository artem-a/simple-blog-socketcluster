export const getBlogs = ({ commit, getters }) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'get_blogs' }

  ws.emit('api', data, (err, res) => {
    if (err) {
      commit('SET_ERROR', err)
    } else {
      commit('SET_BLOGS', res)
    }

    commit('SET_LOADING', false)
  })
}

export const createBlog = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'create_blog', body: payload }

  return new Promise(resolve => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
      } else {
        commit('ADD_BLOG', res)
      }

      commit('SET_LOADING', false)
      resolve(err)
    })
  })
}

export const updateBlog = ({ commit, getters }, payload) => {
  commit('CLEAR_ERROR')
  commit('SET_LOADING', true)

  const ws = getters['ws/client']
  const data = { type: 'update_blog', body: payload }

  return new Promise(resolve => {
    ws.emit('api', data, (err, res) => {
      if (err) {
        commit('SET_ERROR', err)
      } else {
        commit('UPDATE_BLOG', res)
      }

      commit('SET_LOADING', false)
      resolve(err)
    })
  })
}

export const deleteBlog = ({ commit, getters, dispatch }, payload) => {
  commit('CLEAR_ERROR')

  const ws = getters['ws/client']
  const data = { type: 'delete_blog', body: { id: payload } }

  ws.emit('api', data, (err, res) => {
    if (err) {
      commit('SET_ERROR', err)
    } else {
      dispatch('getBlogs')
    }
  })
}
