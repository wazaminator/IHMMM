ihmApp.factory('ballsGenerator', [ '$rootScope', '$interval',
		function($rootScope, $interval) {
			var list_balls = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 60;
			list_balls["ball1"] = {
				name : 'RRR',
				x : 300,
				y : 27,
				vx : 300,
				vy : 200,
				r : 26
			};
			//list_balls["ball2"]={name:'RRR',x:500,y:27,vx:150,vy:150,r:26};


			var moveBalls = function() {
				angular.forEach(list_balls, function(ball, key) {
					moveBall(ball);
				});
			}

			var moveBall = function(ball) {
				ball.y += ball.vy / fps;
				if ((ball.y + 2 * ball.r) >= field.height || ball.y <= 0) {
					ball.vy = -ball.vy;
				}
				;
				ball.x += ball.vx / fps;
				if ((ball.x + 2 * ball.r) >= field.width || ball.x <= 0) {
					ball.vx = -ball.vx;
				}
				;
				$rootScope.$broadcast('ballsModified');
			}
			
			$interval(moveBalls, 1000 / fps);

			var getListBalls = function() {
				// $rootScope.$broadcast('debugGame',list_balls);
				return list_balls;
			}

			var isColliding = function(vais) {
				return false;
			}

			return {
				getListBalls : getListBalls,
				isColliding : isColliding
			};
		} ]);