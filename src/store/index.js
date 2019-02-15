import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // In state we are keeping our data we are sharing with our components
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {}
  },
  // Getters are like computed properties. Simple functions to get a state
  getters: {
    meetups (state) {
      return state.meetups
    },
    categories (state) {
      return state.categories
    }
  },
  // Actions are like methods in vue componenet. They should not mutate the state.
  // Very good spot to fetch a data. Action call usualy should resolve into data.
  actions: {
    fetchMeetups (context) {
      axios.get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data
          context.commit('setMeetups', meetups)
        })
    },
    fetchCategories (context) {
      axios.get('/api/v1/categories')
        .then(res => {
          const categories = res.data
          context.commit('setCategories', categories)
        })
    }
  },
  // Simple functions to mutate a state
  mutations: {
    setMeetups (state, meetups) {
      state.meetups = meetups
    },
    setCategories (state, categories) {
      state.categories = categories
    }
  }
})
