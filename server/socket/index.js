
module.exports = function (io) {
  io.on('connection', function(socket) {
    console.log('connection has been established')

    // This is comming from our client
    socket.on('meetup/postSave', function(post) {
      // This is going to our clients
      io.emit('meetup/postPublished', post)
    })

  })
}
