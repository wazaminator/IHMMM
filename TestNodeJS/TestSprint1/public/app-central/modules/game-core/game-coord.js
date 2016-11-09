ihmApp.factory('gameCoord', [ '$rootScope', '$interval','ballsGenerator',
		function($rootScope,$interval,ballsGenerator) {
			var list_players = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 60;
			
			var nouvelEtat = function(){
				ballsGenerator.moveBalls();
				angular.forEach(list_players, function(player, key) {
					ballsGenerator.colliding(player);
				});
				//TODO colide				
				angular.forEach(list_players, function(player) {
					player['points']+=1;
				});
			}
			
			$interval(nouvelEtat, 1000 / fps);
			
			
			var addPlayer = function(newPlayer) {
				list_players[newPlayer.name] = newPlayer;
				return list_players;
			}
			
			var movePlayer = function(playerInfo) {
				list_players[playerInfo.name].x = playerInfo.x;
				list_players[playerInfo.name].y = playerInfo.y;
				return list_players;
			}
			
			var getListPlayers = function() {
				return list_players;
			}

			return {
				getListPlayers : getListPlayers,
				addPlayer : addPlayer,
				movePlayer : movePlayer
			};
		} ]);
