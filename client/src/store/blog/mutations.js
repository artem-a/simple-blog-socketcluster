import merge from 'lodash.merge'

export const SET_BLOGS = (state, payload) => {
  state.blogs = payload
}

export const ADD_BLOG = (state, payload) => {
  state.blogs.push(payload)
}

export const UPDATE_BLOG = (state, payload) => {
  state.blogs.forEach(blog => {
    if (blog.id === payload.id) {
      merge(blog, payload)
    }
  })
}
