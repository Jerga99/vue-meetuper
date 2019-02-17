

export default {
  namespaced: true,

  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchThreads ({state, commit}, meetupId) {
      axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(res => {
          const threads = res.data
          commit('setItems', {resource: 'threads', items: threads})
          return state.threads
        })
    }
  },
  mutations: {

  }
}
