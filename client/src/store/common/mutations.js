export const SET_LOADING = (state, payload) => {
  state.loading = payload
}

export const SET_ERROR = (state, payload) => {
  state.error = payload
}

export const CLEAR_ERROR = state => {
  state.error = null
}
