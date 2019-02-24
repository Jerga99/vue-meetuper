import io from 'socket.io-client'

const AppSocket = {
  install (Vue, options) {

    Vue.prototype.$socket = io(options.connection)
  }
}

export default AppSocket
