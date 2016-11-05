ihmApp.controller('mainCentralCtrl', [ '$scope','gameCoord','ballsGenerator', function($scope,gameCoord,ballsGenerator) {	
	var socket = io.connect();
	$scope.listPlayers = gameCoord.getListPlayers();
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
	
	socket.on('addActivePlayerToCentral', function(playerJson) {
		$scope.debug = "inscription joueur reçu !!";
		$scope.debug = "inscription joueur reçu !! :"+playerJson;
		var playerObj = angular.fromJson(playerJson);
		$scope.debug = "inscription joueur reçu" + playerObj.name;
		$scope.listPlayers = gameCoord.addPlayer(playerObj);
		$scope.$apply();
	});
	
	socket.on('debutPartieClient', function () {
        ballsGenerator.startGame();  
		$scope.$apply();
    }); 

	socket.on('clientMoveOut', function(message) {
		var infoClient = angular.fromJson(message);
		$scope.debug = "Mouvement joueur reçu" + message;
		$scope.debug = "Mouvement joueur reçu" + infoClient.x;
		$scope.listPlayers = gameCoord.movePlayer(infoClient);
		$scope.$apply();
	});

	socket.on('message', function(message) {
		$scope.debug = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
} ]);