var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var ip = require("ip")

var localIp = ip.address()

//for managing the array of videos
var trackList = ['Aw3fN3OPk3A','SNE2oCZH_4k', '9imCm6CrNZ8', '52Gg9CqhbP8', 'PZbkF-15ObM'] //stored as youtube video id strings
var playhead = 0

var veto = 0
var connectedUsers = 0


app.use(express.static('output'))

io.on('connection', (socket) => {
  connectedUsers ++
  console.log('a user has connected')
  console.log('Connected Users: ' + connectedUsers)

  socket.on('chat message', function (msg) {
    console.log('emitting CHAT:', msg)
    io.emit('chat message', msg)
  })

//when a user votes TODO: limit each user to 1 vote per track
  socket.on('veto vote', function (msg) {
    veto ++    
    console.log('VETO +1')
    if (veto >= (connectedUsers/2)){
      console.log('VETO passed with ' + veto + 'votes!')
      vetoPassed()
    }

  })

//TODO: title info change command
  socket.on('title change', function (msg) {
    console.log('emitting title:', msg)
    io.emit('title change', msg)
  })

   socket.on('disconnect', function() {
    connectedUsers --
    console.log('a user has disconnected')
    console.log('Connected USERS: ' + connectedUsers)
  })
})



http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  console.log('Operating on http://'+localIp+':3000!!')
})

//TODO triggered when a veto is passed
function vetoPassed() {
  console.log('stop current video') //TODO
  console.log('load and play next video')//TODO
  playhead = playhead + 1

  if (!(playhead<trackList.length)){
    playhead = 0
  }
  console.log('Playhead: ' + playhead)
  console.log('TrackList Length: ' + trackList.length)
  
  io.emit('vidId change', trackList[playhead])

  console.log('EMIT new VIDID: '+trackList[playhead])
  console.log('update title')//TODO
  io.emit('title change', 'newTitle') //TODO - get title of video from array.
  veto = 0
  console.log('VETO count reset to 0')
}