export const user = state => state.user

export const authToken = state => state.authToken

export const isLoggedIn = state => !!state.user && !!state.authToken
