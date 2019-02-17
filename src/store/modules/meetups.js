

export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  getters: {
  },
  actions: {
    fetchMeetups ({state, commit}) {
      commit('setItems', {resource: 'meetups', items: []})
      axios.get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data
          commit('setItems', {resource: 'meetups', items: meetups})
          return state.meetups
        })
    },
    fetchMeetupById ({state, commit}, meetupId) {
      commit('setItem', {resource: 'meetup', item: {}})
      axios.get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data
          commit('setItem', {resource: 'meetup', item: meetup})
          return state.meetup
        })
    }
  },
  mutations: {

  }
}
