var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var ip = require('ip')

//YouTube stuff for data lookups
var YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU') // ojam project key for YouTube searches. NOT FOR LARGE SCALE DEPLOYMENT

var localIp = ip.address()

//for managing the array of videos :: array will be user propagated
var trackList = [] //['Aw3fN3OPk3A','SNE2oCZH_4k', '9imCm6CrNZ8', '52Gg9CqhbP8', 'PZbkF-15ObM'] //stored as youtube video id strings
var playhead = 0
var trackListEnd = true

var veto = 0
var connectedUsers = 0



app.use(express.static('output'))

io.on('connection', (socket) => {

  connectedUsers = connectedUsers + 0.2
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
  /*
    socket.on('title change', function (msg) {
    console.log('emitting title:', msg)
    io.emit('title change', msg)
  })
  */
  
  socket.on('video ready', function(){
    console.log('PLAYER READY!!')
    //sendTrack(trackList[playhead])
  })

  //triggers the next video when one ends
  socket.on('video ended', function() {
    console.log('VIDEO END!')
    nextTrack()
  })

  socket.on('add track', function(id){
    console.log('ID recieved: ' + id)
    addTrack(id)
  })

  socket.on('progress', function (duration, progress){
    //console.log(progress)
    //console.log('Current track progress: ' + progress*duration + '/' + duration)
    var progressPercent = (progress*100)
    console.log('sending '+progressPercent)
    io.emit('progress update', progressPercent)
    if(trackList[playhead] && trackListEnd){
      sendTitle(trackList[playhead])
    }
  })

   socket.on('disconnect', function() {
    connectedUsers = connectedUsers - 0.2
    console.log('a user has disconnected')
    console.log('Connected USERS: ' + connectedUsers)
  })


})



http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  console.log('Operating on http://'+localIp+':3000!!')
})

//triggered when a veto is passed
function vetoPassed() {
  nextTrack()
  veto = 0
  console.log('VETO count reset to 0')
}

//advances plays the next video in playlist
function nextTrack() {
  playhead = playhead + 1
  if (trackList[playhead]){
    sendTrack(trackList[playhead])
  } else {
    trackListEnd = true
    console.log('End of playlist')
    io.emit('title change', 'Add to Playlist PLS!!')
    //playhead = playhead - 1
    console.log('Playhead: '+playhead)
  } 
  
 }

function sendTrack(id) {
  io.emit('vidId change', id)
  sendTitle(id)
}

function addTrack(id) {
  trackList.push(id)
  console.log('Play Head: ' + playhead + '||TrackList: ' + trackList)
  
  if (trackListEnd){
    trackListEnd = false
    sendTrack(trackList[playhead])
  }
}

function sendTitle(id){
  youTube.getById(id, function(error, result){
    if (error) {
      console.log(error)
    } else {
        console.log(JSON.stringify((result.items[0].snippet.title)))
        io.emit('title change', JSON.stringify((result.items[0].snippet.title)))

      }      
    })
}

