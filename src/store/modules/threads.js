import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
  namespaced: true,

  state: {
    items: []
  },
  actions: {
    fetchThreads ({state, commit}, meetupId) {
      return axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(res => {
          const threads = res.data
          commit('setItems', {resource: 'threads', items: threads}, {root: true})
          return state.items
        })
    },
    postThread ({commit, state}, {title, meetupId}) {
      console.log(title, meetupId)
      return axiosInstance.post('/api/v1/threads')
    }
  }
}
