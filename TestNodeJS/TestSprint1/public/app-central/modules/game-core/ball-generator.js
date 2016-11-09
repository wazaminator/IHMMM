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
				t : 1, //1=rebondissante,2=cylindre,3=comette
				bonus : 1, //0=ennemis,1= reverse,2=big padle 3 = bonus points
				c : '#FFFFFF',//main color
				ct : '#000000'//outside color 
			};
			list_balls["ball2"]={name:'ball2',x:500,y:27,vx:150,vy:-150,r:26,t:2,bonus : 1,c:'#FF0000',ct:'#00FFFF'};
			list_balls["ball3"]={name:'ball3',x:200,y:50,vx:80,vy:120,r:26,t:3,bonus : 1,c:'#FFFF00',ct:'#0000FF'};
			
			var genBall = function(){
				list_balls["ball"+numeroBall]={name:"ball"+numeroBall,x:500,y:27,vx:150,vy:50,r:26,t:3,c:'#FF0000',ct:'#00FFFF'};
			numeroBall++;
				
			}
			
			var colliding = function(player) {
				//todo
				
				////////
				/*angular.forEach(list_balls, function(ball, key) {
					if(pDistance(ball.x,ball.y,player.x,player.y,player.x+player.l,player.y) < ball.r ||
					pDistance(ball.x,ball.y,player.x,player.y,player.x,player.y+10) < ball.r ||
					pDistance(ball.x,ball.y,player.x,player.y+10,player.x+player.l,player.y+10) < ball.r ||
					pDistance(ball.x,ball.y,player.x+player.l,player.y,player.x+player.l,player.y+10) < ball.r){
						//colision detectée!!!!!!!
						
					}
					
				}*/
				////////
				angular.forEach(list_balls, function(ball, key) {
					if(pDistance(ball.x,ball.y,player.x,player.y,player.x+player.l,player.y) < ball.r || 
					pDistance(ball.x,ball.y,player.x,player.y,player.x,player.y+10) < ball.r ||
					pDistance(ball.x,ball.y,player.x,player.y+10,player.x+player.l,player.y+10) < ball.r ||
					pDistance(ball.x,ball.y,player.x+player.l,player.y,player.x+player.l,player.y+10) < ball.r){
					
						//Ca touche mauvais
						if (ball.bonus==0) {
							$rootScope.$broadcast('playerDamaged',player.name);
						}
						//Ca touche pouvoir 1 ou n
						else {
							//Syntaxe donnation pouvoir
							var powerAwarded = new Object();
							powerAwarded['name']=player.name;
							powerAwarded['type']=ball.bonus;
							var message = angular.toJson(powerAwarded);
							$rootScope.$broadcast('givePowerToPlayer',message);
						}
					}	
				});
			}
			
			var moveBalls = function() {
				if(false){
					ballsGenerator.genBall();	
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
			
			return {
				getListBalls : getListBalls,
				moveBalls : moveBalls,
				colliding : colliding
			};
			//////////////////////////
			
			function pDistance(x, y, x1, y1, x2, y2) {
			  var A = x - x1;
			  var B = y - y1;
			  var C = x2 - x1;
			  var D = y2 - y1;
			  var dot = A * C + B * D;
			  var len_sq = C * C + D * D;
			  var param = -1;
			  if (len_sq != 0) //in case of 0 length line
				  param = dot / len_sq;
			  var xx, yy;
			  if (param < 0) {
				xx = x1;
				yy = y1;
			  }
			  else if (param > 1) {
				xx = x2;
				yy = y2;
			  }
			  else {
				xx = x1 + param * C;
				yy = y1 + param * D;
			  }
			  var dx = x - xx;
			  var dy = y - yy;
			  return Math.sqrt(dx * dx + dy * dy);
			}
			
			//////////////////////////
			
		} ]);
