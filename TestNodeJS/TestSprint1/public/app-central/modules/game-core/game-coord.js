ihmApp.factory('gameCoord', [ '$rootScope', '$interval','ballsGenerator',
		function($rootScope,$interval,ballsGenerator) {
			var list_players = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 40;
			var difficulty = 1; // de 1 a 3
			var isPartieGoingOn = false;
			//Total game duration
			var dureephase = 7;
			var gamecountdown = dureephase*fps;
			
			var nouvelEtat = function(){
				if (isPartieGoingOn) {
					//Game countdown decreases every frame
					gamecountdown -= 1;
					ballsGenerator.moveBalls(difficulty);
					angular.forEach(list_players, function(player, key) {
						ballsGenerator.colliding(player);
					});
					
					angular.forEach(list_players, function(player) {
						player.pt += player.l;
					});
					//End game after 2 minutes
					if(gamecountdown < 1) {
					gamecountdown = dureephase*fps;
					difficulty++;
					}
					
					if (difficulty > 8) {
						isPartieGoingOn = false;
						var maxpoints = 0;
						var winner = '';
						angular.forEach(list_players, function(player, key) {
							if (player.pt > maxpoints) {
								maxpoints = player.pt;
								winner = player.name;
							}
						});
						$rootScope.$broadcast('endOfTheGame',winner);
					} 
				}
			}
			
			$interval(nouvelEtat, 1000 / fps);
			
			var startGame = function() {
				gamecountdown = dureephase*fps;
				difficulty=1;
				angular.forEach(list_players, function(player, key) {
					player.pt = 0;
				});
				isPartieGoingOn = true;
			}
			
			var addPlayer = function(newPlayer) {
				list_players[newPlayer.name] = newPlayer;
				return list_players;
			}
			
			var movePlayer = function(playerInfo) {
				list_players[playerInfo.name].x = playerInfo.x;
				list_players[playerInfo.name].y = playerInfo.y;
				list_players[playerInfo.name].l = playerInfo.l;
				return list_players;
			}
			
			var getListPlayers = function() {
				return list_players;
			}

			return {
				getListPlayers : getListPlayers,
				addPlayer : addPlayer,
				movePlayer : movePlayer,
				startGame : startGame
			};
		} ]);
