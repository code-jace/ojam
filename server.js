var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var ip = require('ip')



var YTsearch =require('youtube-search')
var opts = { //these control the search function.
  maxResults: 10,
  key: 'AIzaSyAI1avDkXCAVOlv0JqEi_0PjVZUFz7ef1I', //api key to query youtube data
  type: 'video', //only search videos

}

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

setInterval(function(){ 
    userCount()
    sendInfo()
  }, 1000)

app.use(express.static('output'))

io.on('connection', (socket) => {

  //console.log('a user has connected')
  userCount()
  sendInfo()
  //console.log('Connected Users: ' + connectedUsers)

  socket.on('chat message', function (msg) {
    console.log('emitting CHAT:', msg)
    io.emit('chat message', msg)
  })



//when a user votes 
  socket.on('veto vote', function (msg) {
    veto ++  
    sendInfo()  
    console.log('VETO +1')
    if (veto >= (connectedUsers/2)){
      console.log('VETO passed with ' + veto + 'votes!')
      vetoPassed()
    }

  })
  
  socket.on('video ready', function(){
    console.log('PLAYER READY!!')
    //sendTrack(trackList[playhead])
  })

  //triggers the next video when one ends
  socket.on('video ended', function() {
    console.log('VIDEO END!')
    nextTrack()
  })

  socket.on('add track', function(id, tit, url){
    //console.log('ID recieved: ' + id)
    addTrack(id, tit, url)
    sendTrackList()
  })

  socket.on('progress', function (duration, progress){
    //console.log(progress)
    //console.log('Current track progress: ' + progress*duration + '/' + duration)
    var progressPercent = (progress*100)
    //console.log('sending '+progressPercent)
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

  socket.on('request address', function(){
    sendAddress()
  })

  socket.on('info request', function(){
    sendInfo()
  })

  socket.on('remove track', function(targetId){
    //console.log('remove: '+targetId)
    var index = -1;
    for(var i = playhead; i < trackList.length; i++) {
      if (trackList[i].id === targetId) {
          index = i
          //console.log('found at '+index)
          break
      }
    }

    if (index > -1){

        if(index===playhead){

        console.log('removing '+trackList[index].title)
        trackList.splice(index, 1)
        if(trackList[playhead]){
          sendTrack(trackList[playhead].id, trackList[playhead].title)
        } else {
          trackListEnd = true
        }

        sendTrackList()

        } else {

        console.log('removing '+trackList[index].title)
        trackList.splice(index, 1)
        sendTrackList()
        }        
    }
  })

  socket.on('video lookup', function(target){
    //console.log(target)
    YTsearch(target, opts, function(err, results) {
      if(err) return console.log(err)
      //console.log(target)
      //console.log(results)
      socket.emit('search result', results)
    });

  })

  socket.on('title request', function(){
    if(!trackListEnd){
      sendTitle(trackList[playhead].title)
    }
  })



   socket.on('disconnect', function() {
    userCount()
    sendInfo()
    if (veto >= (connectedUsers/2)){
      console.log('VETO passed with ' + veto + 'votes!')
      vetoPassed()
    }
    //console.log('a user has disconnected')
    //console.log('Connected USERS: ' + connectedUsers)
  })


})



http.listen(3000, function () {
  console.log('Operating on http://'+localIp+':3000!!')
  console.log()
  console.log('ALL USERS GO TO: http://'+localIp+':3000')
  console.log('HOST APPLICATION: http://'+localIp+':3000/#/host')
})

//triggered when a veto is passed
function vetoPassed() {
  sendInfo()
  nextTrack()
  sendTrackList()
  //veto = 0
  //console.log('VETO count reset to 0')
}

//advances plays the next video in playlist
function nextTrack() {
  if(!trackListEnd){
    veto = 0
  sendInfo()
  playhead = playhead + 1
  sendTrackList()
  if (trackList[playhead]){
    sendTrack(trackList[playhead].id, trackList[playhead].title)
  } else {
    trackListEnd = true
    console.log('End of playlist')
    io.emit('title change', 'Playlist empty!! D:')
    //playhead = playhead - 1
    //console.log('Playhead: '+playhead)
  } 
  }
  
 }

function sendTrack(id, tit) {
  io.emit('vidId change', id)
  console.log('Now Playing: ' + tit)
  sendTitle(tit)
}

function addTrack(id, tit, url) {
    trackList.push({'id': id, 'thumb': url, 'title': tit})
    console.log(tit+' added to playlist!')  
    
    if (trackListEnd){
      //console.log('playlist was stopped, sending: '+trackList[playhead].title)
      trackListEnd = false
      sendTrack(trackList[playhead].id, trackList[playhead].title)
    }
  sendTrackList() 

}

function sendTitle(title){
  //console.log('sending title: '+title)
  io.emit('title change', title)
}

function userCount(){
  connectedUsers = Math.ceil(Object.keys(io.sockets.sockets).length / 9) //divide by number of connections per user
}

function sendTrackList(){
  //create list to send
  var sendList = []
  for(i=playhead; i < trackList.length; i++){
    sendList.push(trackList[i])
  }
  io.emit('send list', sendList)
}

function sendInfo(){
  userCount()
  io.emit('info change', connectedUsers, veto)
}

function sendAddress(){
  io.emit('send address', 'http://'+localIp+':3000')
}
