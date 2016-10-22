var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.get('/client', function(req,res) {
  res.sendfile('public/app-client/index.html');
});
app.get('/clientfred', function(req,res) {
  res.sendfile('public/app-client-fred/index.html');
});
app.get('/', function(req,res) {
  res.sendfile('public/app-central/index.html');
});

var io = require('socket.io').listen(http);

var listeJoueurClient = [];
var maitreJeu = '';

io.sockets.on('connection', function (socket) {

    socket.emit('message', 'Vous êtes bien connecté !');  
	
	socket.on('creaJoueurClient', function (nomJoueur) {
        console.log('Création d\'un joueur : ' + nomJoueur);
		if (listeJoueurClient.indexOf(nomJoueur) >=0) {
			console.log(nomJoueur+' existe déjà');
			socket.emit('creaJoueurClientKo');  
		} else {
			listeJoueurClient.push(nomJoueur);
			console.log(listeJoueurClient);
			if (maitreJeu == '') {
				socket.emit('creaJoueurClientOkSansMaitre');  
			} else {
				socket.emit('creaJoueurClientOkAvecMaitre',maitreJeu);  
			}
		}
    });
	
	socket.on('creationPartieClient', function (maitreJeuParam) {
        console.log('Création d\'une partie par : ' + maitreJeuParam);
		maitreJeu = maitreJeuParam;
		socket.broadcast.emit('creationPartieClient', maitreJeu);  
    });
	
	socket.on('inscriptionPartieClient', function (message) {
        console.log('Inscription d\'un client : ' + message);
		socket.broadcast.emit('inscriptionPartieClient', message);  
    }); 
	
	socket.on('debutPartieClient', function () {
        console.log('Début de la partie !');
		socket.broadcast.emit('debutPartieClient');  
    }); 

    socket.on('clientMoveIn', function (message) {
        console.log('Un client bouge : ' + message);
		socket.broadcast.emit('clientMoveOut', message);  
    }); 
});

http.listen(8082);