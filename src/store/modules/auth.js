
export default {
  namespaced: true,
  state: {

  },
  actions: {
    loginWithEmailAndPassword (context, userData) {
      console.log(userData)
    },
    registerUser (context, userData) {
      console.log(userData)
    }
  }
}
