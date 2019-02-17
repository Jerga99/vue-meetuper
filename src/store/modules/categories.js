

export default {
  namespaced: true,

  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchCategories ({state, commit}) {
      axios.get('/api/v1/categories')
        .then(res => {
          const categories = res.data
          commit('setItems', {resource: 'categories', items: categories})
          return state.categories
        })
    }
  },
  mutations: {

  }
}
