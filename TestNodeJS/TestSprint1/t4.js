var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.get('/client', function(req,res) {
  res.sendfile('public/app-client/index.html');
});
app.get('/', function(req,res) {
  res.sendfile('public/app-central/index.html');
});

var io = require('socket.io').listen(http);


// Quand un client se connecte, on le note dans la console

io.sockets.on('connection', function (socket) {

    socket.emit('message', 'Vous êtes bien connecté !');  
	
	socket.on('inscriptionPartieClient', function (message) {
        console.log('Inscription d\'un client : ' + message);
		socket.broadcast.emit('inscriptionPartieClient', message);  
    }); 

    socket.on('clientMoveIn', function (message) {
        console.log('Un client bouge : ' + message);
		socket.broadcast.emit('clientMoveOut', message);  
    }); 

});

http.listen(8082);