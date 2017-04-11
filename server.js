var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var ip = require("ip")


app.use(express.static('output'))

io.on('connection', (socket) => {
  console.log('a user has connected')

  socket.on('chat message', function (msg) {
    console.log('emitting', msg)
    io.emit('chat message', msg)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


console.dir( ip.address())