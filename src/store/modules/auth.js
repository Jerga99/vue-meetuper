import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    loginWithEmailAndPassword ({commit}, userData) {
      return axios.post('/api/v1/users/login', userData)
        .then(res => {
          const user = res.data
          commit('setAuthUser', user)
        })
    },
    registerUser (context, userData) {
      return axios.post('/api/v1/users/register', userData)
    }
  },
  mutations: {
    setAuthUser (state, user) {
      return state.user = user
    }
  }
}
