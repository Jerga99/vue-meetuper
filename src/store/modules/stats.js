import axiosInstance from '@/services/axios'

export default {
  namespaced: true,

  state: {
    meetups: {
      data: [],
      count: null,
    },
    threads: {
      data: [],
      count: null,
    },
    posts: {
      data: [],
      count: null,
    }
  },
  actions: {
    fetchUserStats ({commit}) {
      return axiosInstance.get('/api/v1/users/me/activity')
        .then(res => {
          const stats = res.data
          commit('setStats', stats)
          return stats
        })
    },
    updateStats ({state, commit}, meetupId) {
      commit('deleteResource', {resource: 'meetups', itemId: meetupId})

      state.threads.data.filter(thread => {
        return thread.meetup === meetupId
      }).flatMap(thread => {
        commit('deleteResource', {resource: 'threads', itemId: thread._id})
        return thread.posts
      }).map(postId => {
        commit('deleteResource', {resource: 'posts', itemId: postId})
      })

    }
  },
  mutations: {
    setStats (state, stats) {
      return Object.assign(state, {}, stats)
    },
    deleteResource (state, {resource, itemId}) {
      const index = state[resource].data.findIndex(item => item._id === itemId)
      state[resource].data.splice(index, 1)
      state[resource].count--
    }
  }
}





