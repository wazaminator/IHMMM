ihmApp.controller('mainCentralCtrl', [ '$scope','ballsGenerator', function($scope,ballsGenerator) {	
	var socket = io.connect();
	$scope.listVais = {};
	$scope.listBalls = ballsGenerator.getListBalls();
	
	$scope.debug = "None";
	$scope.debugGame = "None";

	$scope.$on('ballsModified', function(event) {
		$scope.listBalls = ballsGenerator.getListBalls();
		$scope.debug = $scope.listBalls;
	});
	
	$scope.$on('debugGame', function(event,message) {
		$scope.debugGame = "Recu : "+message;
	});
	
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