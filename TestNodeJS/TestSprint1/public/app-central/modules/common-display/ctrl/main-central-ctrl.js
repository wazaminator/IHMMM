ihmApp.controller('mainCentralCtrl', [ '$scope','$window','gameCoord','ballsGenerator', function($scope,$window,gameCoord,ballsGenerator) {	
	var socket = io.connect();
	$scope.listPlayers = gameCoord.getListPlayers();
	$scope.listBalls = ballsGenerator.getListBalls();
	$scope.isPartieGoingOn = false;
	
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
		$scope.debugGame = "inscription joueur reçu !!";
		$scope.debugGame = "inscription joueur reçu !! :"+playerJson;
		var playerObj = angular.fromJson(playerJson);
		$scope.debugGame = "inscription joueur reçu" + playerObj.name;
		$scope.listPlayers = gameCoord.addPlayer(playerObj);
		$scope.$apply();
	});
	
	socket.on('debutPartieClientOk', function () {
        gameCoord.startGame();  
		$scope.isPartieGoingOn = true;
		$scope.$apply();
    });
	
	$scope.$on('endOfTheGame', function(event,winner) {
		$scope.isPartieGoingOn = false;
		$window.alert("Partie finie !   Remportée par "+winner);
		socket.emit('endOfTheGame');
	});

	socket.on('clientMoveOut', function(message) {
		var infoClient = angular.fromJson(message);
		$scope.debug = "Mouvement joueur reçu " + message;
		$scope.listPlayers = gameCoord.movePlayer(infoClient);
		$scope.$apply();
	});

	socket.on('message', function(message) {
		$scope.debugGame = 'Le serveur a un message pour vous : ' + message;
		$scope.$apply();
	});
	
	socket.on('usePowerByClient', function(playerName) {
		$scope.debugGame = "usePowerByClient " + playerName;
		$scope.$apply();
	});
	
	$scope.$on('givePowerToPlayer', function(event,message) {
		socket.emit('powerWonByClient',message);
	});
	
	$scope.$on('playerDamaged', function(event,playerName) {
		$scope.listPlayers[playerName].pt -= 10000;//A discuter
		socket.emit('playerDamaged',playerName);
	});
	
	
} ]);