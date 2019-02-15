import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // In state we are keeping our data we are sharing with our components
  state: {

  },
  // Getters are like computed properties. Simple functions to get a state
  getters: {

  },
  // Actions are like methods in vue componenet. They should not mutate the state.
  // Very good spot to fetch a data. Action call usualy should resolve into data.
  actions: {

  },
  // Simple functions to mutate a state
  mutations: {

  }
})
