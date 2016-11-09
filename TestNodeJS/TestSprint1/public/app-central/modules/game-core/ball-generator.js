ihmApp.factory('ballsGenerator', [ '$rootScope', 
		function($rootScope) {
			var numeroBall=4;
			var list_balls = {};
			var field = {
				width : 900,
				height : 600
			};
			var fps = 60;
            //t: 1=rebondissante,2=cylindre,3=comette
			list_balls["ball1"]={name:'ball1',x:300,y:300,vx:100,vy:0,r:50,t:3,c:'#FFFFFF',ct:'#000000'};
            list_balls["ball2"]={name:'ball2',x:-26,y:-26,vx:100,vy:100,r:26,t:3,c:'#FF00FF',ct:'#000000'};
            list_balls["ball3"]={name:'ball3',x:100,y:-26,vx:0,vy:200,r:26,t:3,c:'#FF00FF',ct:'#000000'};

 //           list_balls["ball2"]={name:'ball2',x:300,y:300,vx:0,vy:-50,r:26,t:1,c:'#000000',ct:'#FFFFFF'};
//			list_balls["ball2"]={name:'ball2',x:500,y:27,vx:150,vy:-150,r:26,t:2,c:'#FF0000',ct:'#00FFFF'};
//			list_balls["ball3"]={name:'ball3',x:200,y:50,vx:80,vy:120,r:26,t:3,c:'#FFFF00',ct:'#0000FF'};
//			list_balls["ball2"]={name:'ball2',x:500,y:27,vx:150,vy:-150,r:26,t:2,c:'#FF0000',ct:'#00FFFF'};
            
			var genBall = function(){
                //random r
                var tailleMin =15;
                var tailleMax =50;
                var rBall = Math.floor((Math.random() * (tailleMax-tailleMin)) + tailleMin);
                
                //random x
                var xMin = rBall;
                var xMax = field.width-rBall;
                var xBall = Math.floor((Math.random() * (xMax-xMin)) + xMin);
                
                //random y  
                var yBall=-rBall;
                
                //random vx
                var vxMin = -300;
                var vxMax = 300;
                var vxBall = Math.floor((Math.random() * (vxMax-vxMin)) + vxMin);

                //random vy
                var vyMin = 50;
                var vyMax = 300;
                var vyBall = Math.floor((Math.random() * (vyMax-vyMin)) + vyMin);
                
                
                var couleurMin=0;
                var couleurMax=255;
                
                
				list_balls["ball"+numeroBall]={name:"ball"+numeroBall,x:xBall,y:yBall,vx:vxBall,vy:vyBall,r:rBall,t:3,c:'#FF0000',ct:'#000000'};
                numeroBall++;
				
			}
			
			var colliding = function(player) {
				//todo
				angular.forEach(list_balls, function(ball, key) {
					
					//Ca touche mauvais
					if (false) {
						$rootScope.$broadcast('playerDamaged',player.name);
					}
					//Ca touche pouvoir 1 ou n
					if (false) {
						//Syntaxe donnation pouvoir
						var powerAwarded = new Object();
						powerAwarded['name']=player.name;
						powerAwarded['type']=1;
						var message = angular.toJson(powerAwarded);
						$rootScope.$broadcast('givePowerToPlayer',message);
					}
				});
			}
			
			var moveBalls = function() {
                var uneChanceSur = 20;
                var random = Math.floor((Math.random() * uneChanceSur) + 1);
				if(random ==1){
					genBall();	
				}
				angular.forEach(list_balls, function(ball, key) {
					if(ball.t==1){
						moveBallrebond(ball);
					}
					else if(ball.t==2){
						moveBallcylindre(ball);
					}
					else if(ball.t==3){
						moveBallcomette(ball);	
					}
					
				});
				$rootScope.$broadcast('ballsModified');
			}

			var moveBallrebond = function(ball) {
				ball.y += ball.vy / fps;
				if ((ball.y + ball.r) >= field.height || (ball.y - ball.r) <= 0) {
					ball.vy = -ball.vy;
					if((ball.y - ball.r) <= 0){
						ball.y=-ball.y+ 2*ball.r;
					}else{
						ball.y=2*field.height - (ball.y + 2* ball.r);
					}	
				}
				ball.x += ball.vx / fps;
				if ((ball.x + ball.r) >= field.width || (ball.x - ball.r) <= 0) {
					ball.vx = -ball.vx;
					if((ball.x - ball.r) <= 0){
						ball.x=-ball.x+ 2*ball.r;
					}else{
						ball.x=2*field.width - (ball.x + 2* ball.r);
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
                if( (ball.y+ball.r) >=0 && (ball.y-ball.r)<=field.height && (ball.x+ball.r) >=0 && (ball.x-ball.r)<=field.width){
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

			return {
				getListBalls : getListBalls,
				moveBalls : moveBalls,
				colliding : colliding
			};
		} ]);
