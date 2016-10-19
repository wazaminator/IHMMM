ihmApp.controller('mainCentralCtrl', [ '$scope', function($scope) {	
	var socket = io.connect();
	$scope.listVais = {};
	
	$scope.debug = "None";

	socket.on('inscriptionPartieClient', function(message) {
		var infoClient = angular.fromJson(message);
		$scope.debug = "inscription joueur reçu" + message;
		$scope.listVais[infoClient.name] = infoClient;
		$scope.$apply();
	});

	socket.on('clientMoveOut', function(message) {
		var infoClient = angular.fromJson(message);
		$scope.debug = "Mouvement joueur reçu" + message;
		$scope.listVais[infoClient.name] = infoClient;
		$scope.$apply();
	});

	socket.on('message', function(message) {
		$scope.debug = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
} ]);