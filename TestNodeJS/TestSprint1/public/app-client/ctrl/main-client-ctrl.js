		
ihmApp.controller('mainClientCtrl', [ '$scope','$window', function($scope,$window) {	
	var socket = io.connect();
	$scope.vais = {
		name : '',
		x : 400,
		y : 500,
		intcolor : '#FF0000',
		extcolor : '#000000'
	};
	$scope.startedGame = false;
	$scope.visuMode = 'joueur-id';
	$scope.maitreJeu = {'name':'kk'};
	$scope.debug = "None";
	
	$scope.creaJoueurClient = function() {
		var message = angular.toJson($scope.vais);
		socket.emit('creaJoueurClient', message);
	}
	
	$scope.creaPartie = function() {
		$scope.maitreJeu.name = $scope.vais.name;
		var message = $scope.maitreJeu.name;
		socket.emit('creationPartieClient', message);
	}
	
	$scope.inscription = function() {
		//var message = angular.toJson($scope.vais, false);
		socket.emit('inscriptionPartieClient', $scope.vais.name);
		$scope.visuMode = 'salon-attente';
	}
	
	$scope.declenchePartie = function() {
		socket.emit('debutPartieClient');
		$scope.visuMode = 'partie-en-cours';
	}
	
	$scope.$watch('vais', function() {
		//Client move transmitted only if the player attends the current game
		if ($scope.startedGame) {
			var message = angular.toJson($scope.vais, false);
			socket.emit('clientMoveIn', message);
		}
    },true);

	$scope.changeSceneClientPosition = function() {
		//Client move transmitted only if the player attends the current game
		if ($scope.startedGame) {
			var message = angular.toJson($scope.vais, false);
			socket.emit('clientMoveIn', message);
		}
	}
	
	socket.on('creaJoueurClientKo', function() {
		$window.alert("Le nom de joueur existe déjà.");
		$scope.vais.name = '';
		$scope.$apply();
	});
	
	socket.on('creaJoueurClientOkSansMaitre', function() {
		$scope.debug = "creaJoueurClient Ok Sans Maitre";
		$scope.visuMode = 'crea-partie';
		$scope.$apply();
	});
	
	socket.on('creaJoueurClientOkAvecMaitre', function(masterName) {
		$scope.debug = "creaJoueurClient Ok Avec Maitre";
		$scope.maitreJeu.name = masterName;
		$scope.visuMode = 'inscription-partie';
		$scope.$apply();
	});
	
	socket.on('creationPartieClientDenied', function() {
		$window.alert("Un maître du jeu existe déjà.");
	});
	
	socket.on('creationPartieClientOk', function(masterName) {
		$scope.debug = "creation Partie Client reçue";
		$scope.debug = "creation Partie Client reçue : "+masterName;
		if (masterName == $scope.vais.name) {
			$scope.debug = "Inscription maitre jeu confirmée " + masterName;
			$scope.visuMode = 'declenche-partie';
			$scope.startedGame = true;
		} else {
			$scope.visuMode = 'inscription-partie';
			$scope.maitreJeu.name = masterName;
		}
		$scope.$apply();
	});
	
	socket.on('inscriptionPartieClientOk', function(playerName) {
		$scope.debug = "Inscription Partie Client reçue :"+playerName;
		if (playerName == $scope.vais.name) {
			$scope.debug = "inscription joueur confirmé " + playerName;
			$scope.visuMode = 'salon-attente'
			$scope.startedGame = true;
		}
		$scope.$apply();
	});
	
	socket.on('debutPartieClientOk', function() {
		if ($scope.visuMode == 'salon-attente') {
			$scope.visuMode = 'partie-en-cours';
			$scope.$apply();
		}
	});

	socket.on('message', function(message) {
		$scope.debug = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
} ]);