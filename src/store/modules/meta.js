import axios from 'axios'

export default {
  namespaced: true,

  state: {
    isLocationResolved: false,
    item: {
      city: '',
      country: ''
    }
  },
  getters: {
    location (state) {
      const {city, country} = state.item
      return (city && country) ? (city + ', ' + country) : ''
    }
  },
  actions: {
    fetchMetaData ({commit}) {
      return axios.get('/api/v1')
        .then(res => {
          const meta = res.data
          commit('setItem', {item: meta, resource: 'meta'}, {root: true})
          commit('resolveLocation', true)
          return meta
        })
        .catch(err => {
          commit('resolveLocation', true)
          return err
        })
    }
  },
  mutations: {
    resolveLocation (state, isLocationResolved) {
      state.isLocationResolved = isLocationResolved
    }
  }
}
