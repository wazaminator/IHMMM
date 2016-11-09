var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.get('/clientfama', function(req,res) {
  res.sendfile('public/app-client-fama/index.html');
});
app.get('/client', function(req,res) {
  res.sendfile('public/app-client/index.html');
});
app.get('/', function(req,res) {
  res.sendfile('public/app-central/index.html');
});

var io = require('socket.io').listen(http);

var listePlayerClient = [];
var gameMasterName = '';

var getPlayerToCentral = function(name) {
	var playerObject = listePlayerClient[name];
	return JSON.stringify(playerObject);
}

io.sockets.on('connection', function (socket) {

    socket.emit('message', 'Vous êtes bien connecté !');  
	
	socket.on('creaJoueurClient', function (jsonPlayer) {
		var objectPlayer = JSON.parse(jsonPlayer);
		var namePlayer = objectPlayer.name;
        if (typeof listePlayerClient[namePlayer] != 'undefined') {
			console.log(namePlayer+' existe déjà');
			socket.emit('creaJoueurClientKo');  
		} else {
			console.log('Création d\'un joueur : ' + namePlayer);
			listePlayerClient[namePlayer]=objectPlayer;
			console.log(listePlayerClient);
			if (gameMasterName == '') {
				socket.emit('creaJoueurClientOkSansMaitre');  
			} else {
				socket.emit('creaJoueurClientOkAvecMaitre',gameMasterName);  
			}
		}
    });
	
	socket.on('creationPartieClient', function (gameMasterNameParam) {
        console.log('Création d\'une partie demandée par : ' + gameMasterNameParam);
		//socket.broadcast.emit('debug', 'u1');  
		//socket.emit('debug', 'u11');  
		if (gameMasterName == '') { 
			gameMasterName = gameMasterNameParam;
			socket.emit('creationPartieClientOk', gameMasterName); 			
			socket.broadcast.emit('creationPartieClientOk', gameMasterName); 
			socket.broadcast.emit('addActivePlayerToCentral', getPlayerToCentral(gameMasterName)); 
		} else { 
			socket.emit('creationPartieClientDenied', gameMasterName); 
		}
    });
	
	socket.on('inscriptionPartieClient', function (playerName) {
        console.log('Inscription d\'un client : ' + playerName);
		socket.emit('inscriptionPartieClientOk', playerName);  
		socket.broadcast.emit('inscriptionPartieClientOk', playerName);  
		socket.broadcast.emit('addActivePlayerToCentral', getPlayerToCentral(playerName));  
    }); 
	
	socket.on('debutPartieClient', function () {
        console.log('Début de la partie !');
		socket.broadcast.emit('debutPartieClientOk');  
		socket.emit('debutPartieClientOk');  
    }); 

    socket.on('clientMoveIn', function (message) {
        console.log('Un client bouge : ' + message);
		socket.broadcast.emit('clientMoveOut', message);  
    }); 
	
	socket.on('powerWonByClient', function (message) {
		var powerWon = JSON.parse(message);
        console.log('powerWonByClient '+powerWon.name+' of type '+powerWon.type);
		socket.broadcast.emit('powerWonByClient',message);  
    }); 
	
	socket.on('usePowerByClient', function (userName) {
        console.log('usePowerByClient par '+userName);
		socket.broadcast.emit('usePowerByClient',userName);  
    }); 
});

http.listen(8082);