export const SET_POSTS = (state, payload) => {
  state.posts = payload
}

export const ADD_POST = (state, payload) => {
  state.posts.push(payload)
}
