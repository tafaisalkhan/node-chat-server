
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");
const {Users} = require('./../utils/users');

const publicPath = path.join(__dirname, '../public');
const port  = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var gameId = 1;
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log("New User connected");

  socket.on('join', (params, callback) => {
    var playerName = params.playerName;
    console.log(params.playerName);

    //rempveid if already exist 
    users.removeUser(socket.id)
    //add user of array
    users.addUser(socket.id, playerName,gameId);
    //call join to gameid
    socket.join(gameId);

    //two member team
    if(users.getUserListCount(gameId) == 2)
    {
        
        io.to(gameId).emit('teamCompleted', {users: users.getUserList(gameId), gameId: gameId})
       
        gameId = gameId + 1;
        
    }
    
    console.log(users.getUserListCount(gameId));
    console.log(users);
   
    //team not completed
    if(users.getUserListCount(gameId) == 1){
        io.to(gameId).emit('waitingForOpponent', {gameId: gameId})
       
    }
    callback();

  });

socket.on('userTurn', (message, callback) => {
  var user = users.getUser(socket.id);
  console.log(message);
  socket.broadcast.to(user.gameId).emit('broadcastUserTurn', {position: message.position, hello:"testing"} );
 

  callback();
});
 
socket.on('playermove', (message, callback) => {
  var user = users.getUser(socket.id);
  console.log(message);
  socket.broadcast.to(user.gameId).emit('opponentMove', {position: message.itemId} );
 

  callback();
});
socket.on('restartGameByUser', (message, callback) => {
  var user = users.getUser(socket.id);
  console.log(message);
  socket.broadcast.to(user.gameId).emit('opponentRestartGame', {message: message.playerName} );
 

  callback();
});

  socket.on('disconnect', () => {
   var user = users.removeUser(socket.id);
    
    if (user) { 
      io.to(user.gameId).emit('oppDisconnect', {message : user.playerName + " is disconnected"});
    }
  });

})

server.listen(port, () =>{
    console.log(`server is up on ${port}`);
})
