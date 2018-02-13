import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default {
  state: {
    user: null,
    authToken: null
  },

  mutations,
  actions,
  getters
}
