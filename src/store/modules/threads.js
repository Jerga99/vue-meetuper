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
      const thread = {}
      thread.title = title
      thread.meetup = meetupId

      return axiosInstance.post('/api/v1/threads', thread)
        .then(res => {
          debugger
          const createdThread = res.data
          const index = state.items.length

          commit('addItemToArray', {item: createdThread, index, resource: 'threads'}, {root: true})
          return createdThread
        })
    },
    sendPost ({commit, state, dispatch}, {text, threadId}) {
      const post = {text, thread: threadId}
      console.log(post)

      return axiosInstance.post('/api/v1/posts', post)
    }
  }
}
