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
