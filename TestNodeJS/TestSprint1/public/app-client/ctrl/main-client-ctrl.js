ihmApp.controller('mainClientCtrl', [
		'$scope',
		'$window','$interval',
		function($scope,$window,$interval) {
			var socket = io.connect();
			$scope.vais = {
				name : '',
				x : 400,
				y : 500,
				l : 100,// size 10 <= l <= 100
				p : [],// power list
				pt : 1,// life points
				intcolor : '#FF0000',
				extcolor : '#000000'
			};
			$scope.limits = {
				widthMax : 900,
				heightMax : 590,
				lMin : 10,
				lMax : 200
				
			};
			$scope.startedGame = false;
			$scope.visuMode = 'joueur-id';
			$scope.maitreJeu = {
				'name' : 'kk'
			};
			$scope.debug = "None";
			$scope.clock = 0;
			$scope.powerType = 0;
			$scope.inversion = 1;
			$scope.lengthmax = false;
			
			var clockManager = function(){
				if ($scope.clock > 0) {
					$scope.clock -= 1;
				} else {
					$scope.powerType = 0;
					$scope.inversion = 1;
					$scope.lengthmax = false;
				}
			};
			
			$interval(clockManager, 1000);

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
				socket.emit('inscriptionPartieClient', $scope.vais.name);
				$scope.visuMode = 'salon-attente';
			}

			$scope.declenchePartie = function() {
				socket.emit('debutPartieClient');
				$scope.visuMode = 'partie-en-cours';
			}

			$scope.usePower = function() {
				var typePouvoir = $scope.vais.p.pop();
				socket.emit('usePowerByClient', typePouvoir);
			}

			$scope.hasPower = function() {
				return ($scope.vais.p.length > 0);
			}

			$scope.$watch('vais', function() {
				if ($scope.vais.x < 0) {
					$scope.vais.x = 0;
				}
				var maxwidth = $scope.limits.widthMax - $scope.vais.l;
				if ($scope.vais.x > maxwidth) {
					$scope.vais.x = maxwidth;
				}
				if ($scope.vais.y < 0) {
					$scope.vais.y = 0;
				}
				if ($scope.vais.y > $scope.limits.heightMax) {
					$scope.vais.y = $scope.limits.heightMax;
				}
				if ($scope.vais.l < $scope.limits.lMin) {
					$scope.vais.l = $scope.limits.lMin;
				}
				if ($scope.vais.l > $scope.limits.lMax) {
					$scope.vais.l = $scope.limits.lMax;
				}
				// Client move transmitted only if the player attends the
				// current game
				if ($scope.startedGame) {
					var message = angular.toJson($scope.vais, false);
					socket.emit('clientMoveIn', message);
				}
			}, true);

			$scope.changeSceneClientPosition = function() {
				// Client move transmitted only if the player attends the
				// current game
				if ($scope.startedGame) {
					var message = angular.toJson($scope.vais, false);
					socket.emit('clientMoveIn', message);
				}
			}

			socket.on('creaJoueurClientKo', function(message) {
				var vaisSvg = angular.fromJson(message);
				$window.alert("Le nom de joueur existe déjà, il est restauré.");
				$scope.vais = vaisSvg;
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
				if ($scope.maitreJeu.name != $scope.vais.name) {
					$scope.visuMode = 'inscription-partie';
				} else {
					$scope.visuMode = 'declenche-partie';
				}
				$scope.$apply();
			});

			socket.on('creationPartieClientDenied', function() {
				$window.alert("Un maître du jeu existe déjà.");
			});

			socket.on('creationPartieClientOk', function(masterName) {
				$scope.debug = "creation Partie Client reçue : " + masterName;
				if (masterName == $scope.vais.name) {
					$scope.debug = "Inscription maitre jeu confirmée "
							+ masterName;
					$scope.visuMode = 'declenche-partie';
					$scope.startedGame = true;
				} else {
					$scope.visuMode = 'inscription-partie';
					$scope.maitreJeu.name = masterName;
				}
				$scope.$apply();
			});

			socket.on('inscriptionPartieClientOk',
					function(playerName) {
						$scope.debug = "Inscription Partie Client reçue :"
								+ playerName;
						if (playerName == $scope.vais.name) {
							$scope.debug = "inscription joueur confirmé "
									+ playerName;
							$scope.visuMode == 'salon-attente';
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

			socket.on('powerWonByClient', function(message) {
				var powerWon = angular.fromJson(message);
				$scope.debug = 'powerWonByClient ' + powerWon.name
						+ ' of type ' + powerWon.type;
				if (powerWon.name == $scope.vais.name) {
					$scope.debug = "powerWonByClient reçu confirmé "
							+ powerWon.name + " of type " + powerWon.type;
					if (powerWon.type == 3) { // Point of life awarded
						$scope.vais.pt += 20000;
					} else {
						$scope.vais.p.push(powerWon.type);
					}
					$scope.$apply();
				}
			});

			socket.on('endOfTheGame', function(maitreJeu) {
				if ($scope.vais.name == maitreJeu) {
					$scope.debug = 'Reinit après end of game';
					$scope.visuMode = 'declenche-partie';
				} else {
					$scope.visuMode = 'salon-attente';
					$scope.debug = 'declenche-partie après fin';
				}
				$scope.startedGame = true;
				$scope.$apply();
			});

			socket.on('playerDamaged', function(playerName) {
				if (playerName == $scope.vais.name) {
					$scope.debug = "playerDamaged ! ";
					var audio = new Audio('app-client/sounds/explo.mp3');
					//audio.play();
					$scope.$apply();
				}
			});
			
			socket.on('powerUsedByClient', function(powerTypeUsed) {
				$scope.clock = 6;
				$scope.powerType = powerTypeUsed;
				if (powerTypeUsed == '1') {
					$scope.inversion = -1;
				}
				if (powerTypeUsed == '2') {
					$scope.lengthmax = true;
					$scope.vais.l = $scope.limits.lMax;
				}
				$scope.$apply();
			});

			socket.on('message',
					function(message) {
						$scope.debug = 'Le serveur a un message pour vous : '
								+ message;
						$scope.$apply();
					});
		} ]);