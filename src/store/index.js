

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import setters from './setters.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  actions,
  setters,
  getters,
  mutations
})

//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
