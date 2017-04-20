var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var ip = require('ip')

//YouTube stuff for data lookups
/*
var YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyAI1avDkXCAVOlv0JqEi_0PjVZUFz7ef1I') // ojam project key for YouTube searches. NOT FOR LARGE SCALE DEPLOYMENT
*/

var fetchVideoInfo = require('youtube-info') //No need for API Key?!!


var localIp = ip.address()

//for managing the array of videos :: array will be user propagated
var trackList = [] //['Aw3fN3OPk3A','SNE2oCZH_4k', '9imCm6CrNZ8', '52Gg9CqhbP8', 'PZbkF-15ObM'] //stored as youtube video id strings
var playhead = 0
var trackListEnd = true

var veto = 0
var connectedUsers = 0



app.use(express.static('output'))

io.on('connection', (socket) => {

  console.log('a user has connected')
  userCount()
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
    sendTrackList()
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

  socket.on('click play', function(){
    io.emit('play')
  })

  socket.on('click pause', function(){
    io.emit('pause')
  })

  socket.on('click skip', function(){
    nextTrack() 
  })

  socket.on('request list', function(){
    sendTrackList()
  })

  socket.on('remove track', function(id){
    var target = trackList.indexOf(id)
    if (target > -1){
      trackList.splice(target, 1)
      sendTrackList()
    }
  })


   socket.on('disconnect', function() {
    userCount()
    console.log('a user has disconnected')
    console.log('Connected USERS: ' + connectedUsers)
  })


})



http.listen(3000, function () {
  console.log('Operating on http://'+localIp+':3000!!')
})

//triggered when a veto is passed
function vetoPassed() {
  nextTrack()
  sendTrackList()
  //veto = 0
  console.log('VETO count reset to 0')
}

//advances plays the next video in playlist
function nextTrack() {
  veto = 0
  playhead = playhead + 1
  sendTrackList()
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
  sendTrackList()
}

function sendTitle(id){
  fetchVideoInfo(id, function(error, result){
    if (error) {
      console.log(error)
    } else {
        console.log(result.title)
        io.emit('title change', result.title)

      }      
    })
}

function userCount(){
  connectedUsers = Math.ceil(Object.keys(io.sockets.sockets).length / 8) //divide by number of connections per user
}

function sendTrackList(){
  //create list to send
  var sendList = []
  for(i=playhead; i < trackList.length; i++){
    
    fetchVideoInfo(trackList[i], function(error, result){
      if(error){
        console.logError
      } else {
        var deets = {'id': result.videoId, 'thumb': result.thumbnailUrl, 'title': result.title}
        console.log(deets)
        sendList.push(deets)
        console.log(sendList)
        io.emit('send list', sendList)
      }
    })
  }
  
}

