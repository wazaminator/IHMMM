ihmApp.factory('gameCoord', [ '$rootScope', '$interval','ballsGenerator',
		function($rootScope, $interval) {
			var list_players = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 60;
			
			var nouvelEtat = function(){
				angular.forEach(list_players, function(player) {
					newPlayer['points']+=1;
				});
				ballsGenerator.moveBalls();
				if(false){
				ballsGenerator.genBall();	
				}
				//TODO colide				
			}
			
			$interval(nouvelEtat, 1000 / fps);
			

			var isColliding = function(vais) {
				return false;
			}
			
			var addPlayer = function(newPlayer) {
				newPlayer['points']=0;
				newPlayer['varlength']=100;
				list_players[newPlayer.name] = newPlayer;
				return list_players;
			}
			
			var movePlayer = function(playerInfo) {
				list_players[playerInfo.name][x] = playerInfo.x;
				list_players[playerInfo.name][y] = playerInfo.y;
				return list_players;
			}
			
			var getListPlayers = function() {
				// $rootScope.$broadcast('debugGame',list_players);
				return list_players;
			}

			return {
				getListPlayers : getListPlayers,
				addPlayer : addPlayer,
				movePlayer : movePlayer
			};
		} ]);
