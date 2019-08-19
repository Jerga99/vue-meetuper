import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'
import { applyFilters } from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
    pagination: {
      count: 0,
      pageCount: 0,
      pageSize: 3,
      pageNum: 1
    }
  },
  actions: {
    fetchMeetups ({state, commit}, options = {reset: true}) {
      if (options.reset) {
        commit('setItems', {resource: 'meetups', items: []}, {root: true})
      }
      const url = applyFilters('/api/v1/meetups', options.filter)

      return axios.get(url)
        .then(res => {
          const { meetups, count, pageCount } = res.data
          commit('setItems', {resource: 'meetups', items: meetups}, {root: true})
          commit('setPagination', {count, pageCount})
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
    },
    joinMeetup ({state, rootState, commit, dispatch}, meetupId) {
      // We were just debugging in this lecture (:
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
        .then(() => {
          dispatch('auth/addMeetupToAuthUser', meetupId, {root: true})

          const joinedPeople = state.item.joinedPeople
          commit('addUsersToMeetup', [...joinedPeople, user])
          return true
        })
    },
    leaveMeetup ({state, rootState, commit, dispatch}, meetupId) {
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
        .then(() => {
          dispatch('auth/removeMeetupFromAuthUser', meetupId, {root: true})

          const joinedPeople = state.item.joinedPeople
          const index = joinedPeople.findIndex(jUser => jUser._id === user._id)
          joinedPeople.splice(index, 1)
          commit('addUsersToMeetup', joinedPeople)
        })
    },
    updateMeetup ({commit, state}, meetupData) {
      meetupData.processedLocation = meetupData.location.toLowerCase().replace(/[\s,]+/g,'').trim()
      return axiosInstance.patch(`/api/v1/meetups/${meetupData._id}`, meetupData)
        .then(res => {
          const updatedMeetup = res.data
          commit('mergeMeetup', updatedMeetup)
          return state.item
        })
    },
    deleteMeetup (_, meetupId) {
      return axiosInstance.delete(`/api/v1/meetups/${meetupId}`)
        .then((res) => {
          const meetupId = res.data
          return meetupId
        })
    },
    initializePagesFromQuery({commit}, {pageSize, pageNum}) {
      commit('setPage', pageNum)
      commit('setPageSize', pageSize)
    }
  },
  mutations: {
    addUsersToMeetup (state, joinedPeople) {
      Vue.set(state.item, 'joinedPeople', joinedPeople)
    },
    mergeMeetup (state, updatedMeetup) {
      state.item = {...state.item, ...updatedMeetup}
    },
    setPagination (state, {count, pageCount}) {
      Vue.set(state.pagination, 'count', count)
      Vue.set(state.pagination, 'pageCount', pageCount)
    },
    setPage (state, page) {
      Vue.set(state.pagination, 'pageNum', page)
    },
    setPageSize (state, pageSize) {
      Vue.set(state.pagination, 'pageSize', pageSize)
    }
  }
}





