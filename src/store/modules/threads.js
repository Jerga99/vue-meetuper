import Vue from 'vue'
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
    sendPost ({dispatch}, {text, threadId}) {
      const post = {text, thread: threadId}

      return axiosInstance.post('/api/v1/posts', post)
        .then(res => {
          const createdPost = res.data
          dispatch('addPostToThread', {post: createdPost, threadId})
          return createdPost
        })
    },
    addPostToThread ({commit, state}, {post, threadId}) {
      const threadIndex = state.items.findIndex(thread => thread._id === threadId)

      if (threadIndex > -1) {
        const posts = state.items[threadIndex].posts
        posts.unshift(post)
        commit('savePostToThread', {posts, index: threadIndex})
      }
    }
  },
  mutations: {
    savePostToThread (state, {posts, index}) {
      Vue.set(state.items[index], 'posts', posts)
    }
  }
}






