ihmApp.factory('ballsGenerator', [ '$rootScope', 
		function($rootScope) {
			var numeroBall=4;
			var list_balls = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 60;
			list_balls["ball1"] = {
				name : 'ball1',
				x : 300,
				y : 27,
				vx : 300,
				vy : 200,
				r : 26,
				t : 1 //1=rebondissante,2=cylindre,3=comette
			};
			list_balls["ball2"]={name:'ball2',x:500,y:27,vx:150,vy:-150,r:26,t:2};
			list_balls["ball3"]={name:'ball3',x:200,y:50,vx:80,vy:120,r:26,t:3};
			
			var genBall = function(){
			list_balls["ball"+numeroBall]={name:"ball"+numeroBall,x:500,y:27,vx:150,vy:50,r:26,t:3};
			numeroBall++;
				
			}
			
			var moveBalls = function() {
				angular.forEach(list_balls, function(ball, key) {
					if(ball.t==1){
						moveBallrebond(ball);
					}
					else if(ball.t==2){
						moveBallcylindre(ball)
					}
					else if(ball.t==3){
						moveBallcomette(ball);	
					}
					
				});
				$rootScope.$broadcast('ballsModified');
			}

			var moveBallrebond = function(ball) {
				ball.y += ball.vy / fps;
				if ((ball.y + 2 * ball.r) >= field.height || ball.y <= 0) {
					ball.vy = -ball.vy;
					if(ball.y<=0){
						ball.y=-ball.y
					}else{
						ball.y=2*field.height - (ball.y + 4* ball.r);
					}	
				}
				;
				ball.x += ball.vx / fps;
				if ((ball.x + 2 * ball.r) >= field.width || ball.x <= 0) {
					ball.vx = -ball.vx;
					if(ball.x<=0){
						ball.x=-ball.x
					}else{
						ball.x=2*field.width - (ball.x + 4* ball.r);
					}
				}
				;
			}
			;
			var moveBallcylindre = function(ball) {
				ball.y += ball.vy / fps;
				if ((ball.y + 2 * ball.r) >= field.height){
				ball.y= ball.y+ 2*ball.r - field.height;	
				} 
				
				else if(ball.y <= 0) {
					ball.y= field.height- (2*ball.r + ball.y);
				}
				
				ball.x += ball.vx / fps;
				if ((ball.x + 2 * ball.r) >= field.width){
				ball.x= ball.x+ 2*ball.r - field.width;	
				} 
				
				else if(ball.x <= 0) {
					ball.x= field.width- (2*ball.r + ball.x);
				
				}
			};
			
			var moveBallcomette = function(ball) {
				if(ball.x>0 && ball.x<field.width && ball.y >0 && ball.y < field.height){
					ball.y += ball.vy / fps;
					ball.x += ball.vx / fps;
				}
				else{
					delete list_balls[ball.name];
				}
			};
			
			var getListBalls = function() {
				// $rootScope.$broadcast('debugGame',list_balls);
				return list_balls;
			}

			var isColliding = function(vais) {
				return false;
			}

			return {
				getListBalls : getListBalls,
				moveBalls : moveBalls,
				genBall : genBall,
				isColliding : isColliding
			};
		} ]);
