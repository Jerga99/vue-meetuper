import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchMeetups ({state, commit}) {
      commit('setItems', {resource: 'meetups', items: []}, {root: true})
      return axios.get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data
          commit('setItems', {resource: 'meetups', items: meetups}, {root: true})
          return state.items
        })
    },
    fetchMeetupById ({state, commit}, meetupId) {
      commit('setItem', {resource: 'meetups', item: {}}, {root: true})
      return axios.get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data
          commit('setItem', {resource: 'meetups', item: meetup}, {root: true})
          return state.item
        })
    },
    createMeetup ({rootState}, meetupToCreate) {
      meetupToCreate.meetupCreator = rootState.auth.user
      meetupToCreate.processedLocation = meetupToCreate.location.toLowerCase().replace(/[\s,]+/g,'').trim()

      return axiosInstance.post('/api/v1/meetups', meetupToCreate)
        .then(res => res.data)
    }
  }
}
