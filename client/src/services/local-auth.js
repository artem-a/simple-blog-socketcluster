const AUTH_KEY = 'socketCluster.authToken'
const USER = 'sb.user'

export const getAuthKey = () => localStorage.getItem(AUTH_KEY)

export const getUser = () => JSON.parse(localStorage.getItem(USER))

export const isAuthenticated = () => {
  return !!getAuthKey() && !!getUser()
}

export const setUser = user => {
  localStorage.setItem(USER, JSON.stringify(user))
}

export const removeUser = () => {
  localStorage.removeItem(USER)
}
