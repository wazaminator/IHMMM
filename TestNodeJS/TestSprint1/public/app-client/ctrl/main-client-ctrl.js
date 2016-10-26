		
ihmApp.controller('mainClientCtrl', [ '$scope','$window', function($scope,$window) {	
	var socket = io.connect();
	$scope.vais = {
		name : '',
		x : 400,
		y : 500
	};
	$scope.visuMode = 'joueur-id';
	$scope.maitreJeu = {'name':'kk'};
	$scope.debug = "None";
	
	$scope.creaJoueurClient = function() {
		var message = $scope.vais.name;
		socket.emit('creaJoueurClient', message);
	}
	
	$scope.creaPartie = function() {
		$scope.maitreJeu.name = $scope.vais.name;
		var message = $scope.maitreJeu.name;
		socket.emit('creationPartieClient', message);
		$scope.visuMode = 'declenche-partie';
	}
	
	$scope.inscription = function() {
		var message = angular.toJson($scope.vais, false);
		socket.emit('inscriptionPartieClient', message);
		$scope.visuMode = 'salon-attente';
	}
	
	$scope.declenchePartie = function() {
		socket.emit('debutPartieClient');
		$scope.visuMode = 'partie-en-cours';
	}
	
	 $scope.$watch('vais', function() {
        var message = angular.toJson($scope.vais, false);
		socket.emit('clientMoveIn', message);
    },true);

	$scope.changeSceneClientPosition = function() {
		var message = angular.toJson($scope.vais, false);
		socket.emit('clientMoveIn', message);
	}
	
	socket.on('creaJoueurClientKo', function() {
		$window.alert("Le nom de joueur existe déjà.");
		$scope.vais.name = '';
		$scope.$apply();
	});
	
	socket.on('creaJoueurClientOkSansMaitre', function() {
		$scope.debug = "Mouvement joueur reçu ok";
		$scope.visuMode = 'crea-partie';
		$scope.$apply();
	});
	
	socket.on('creaJoueurClientOkAvecMaitre', function(nomMaitre) {
		$scope.maitreJeu.name = nomMaitre;
		$scope.visuMode = 'inscription-partie';
		$scope.$apply();
	});
	
	socket.on('debutPartieClient', function() {
		if ($scope.visuMode == 'salon-attente') {
			$scope.visuMode = 'partie-en-cours';
			$scope.$apply();
		}
	});
	
	socket.on('creationPartieClient', function(nomMaitre) {
		$scope.maitreJeu.name = nomMaitre;
		$scope.visuMode = 'inscription-partie';
		$scope.$apply();
	});

	socket.on('message', function(message) {
		$scope.debug = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
} ]);