import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default {
  state: {
    loading: false,
    error: null
  },

  mutations,
  actions,
  getters
}
