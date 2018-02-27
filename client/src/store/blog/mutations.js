export const ADD_BLOG = (state, payload) => {
  state.blogs.push(payload)
}

export const SET_BLOGS = (state, payload) => {
  state.blogs = payload
}
