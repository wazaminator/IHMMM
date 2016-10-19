ihmApp.controller('mainClientCtrl', [ '$scope', function($scope) {	
	var socket = io.connect();
	$scope.vais = {
		name : '',
		x : 30,
		y : 30
	};
	$scope.debug = "None";
	
	$scope.inscription = function() {
		var message = angular.toJson($scope.vais, false);
		socket.emit('inscriptionPartieClient', message);
	}

	$scope.changeSceneClientPosition = function() {
		message = angular.toJson($scope.vais, false);
		socket.emit('clientMoveIn', message);
	}

	socket.on('clientMoveOut', function(message) {
		$scope.debug = "Mouvement joueur reçu" + message;
		$scope.$apply();
	});

	socket.on('message', function(message) {
		$scope.debug = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
} ]);