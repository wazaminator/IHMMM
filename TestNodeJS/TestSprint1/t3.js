var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.get('/client', function(req,res) {
  res.sendfile('public/indexClient.html');
});
app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});

var io = require('socket.io').listen(http);


// Quand un client se connecte, on le note dans la console

io.sockets.on('connection', function (socket) {

    socket.emit('message', 'Vous êtes bien connecté !');  

    socket.on('message', function (message) {

        console.log('Un client me parle ! Il me dit : ' + message);

    }); 

	socket.on('refresh', function (message) {
		socket.broadcast.emit('refresh', message);  
        console.log('Un client refresh : ' + message);

    }); 
});

http.listen(8082);