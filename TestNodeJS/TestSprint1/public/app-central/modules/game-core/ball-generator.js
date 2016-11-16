ihmApp.factory('ballsGenerator', [ '$rootScope', 
		function($rootScope) {
			//var numeroBall=4;
			var numeroBall=1;

			var list_balls = {};
			var field = {
				width : 900,
				height : 600
			};

			var fps = 40;
           
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
                
                //random vy
                var vyMin = 50;
                var vyMax = 300;
                var vyBall = Math.floor((Math.random() * (vyMax-vyMin)) + vyMin);
                
                //random vx
/*                var vxMin = -300;
                var vxMax = 300;
                var vxBall = Math.floor((Math.random() * (vxMax-vxMin)) + vxMin);
 */               
                var vxMin = -300;
                var vxMax = 300;
                var vxBall = Math.floor((Math.random() * (vxMax-vxMin)) + vxMin);
 
 
                var enemyChance = 90;
                var bonusBall=Math.floor((Math.random() * 100) + 1);
                if(bonusBall>90){
                    bonusBall=Math.floor((Math.random() * 3) + 1);
                    
                }else{
                    bonusBall=0;
                }
                
                if(bonusBall==0){
                    color='#FF0000';                    
                }else if(bonusBall==1){
                    color='#00FF00';       
                }else if(bonusBall==2){
                    color='#FFFF00';       
                }else if(bonusBall==3){
                    color='#0000FF';       
                }
                else{
                    color='#FFFFFF';       
                }
                         
				list_balls["ball"+numeroBall]={name:"ball"+numeroBall,x:xBall,y:yBall,vx:vxBall,vy:vyBall,r:rBall,t:3,bonus:bonusBall,c:color,ct:'#000000'};
                numeroBall++;
				
			}
			
			var colliding = function(player) {
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
                        delete list_balls[ball.name];
					}	
				});
			}
			
			var moveBalls = function(difficulty) {
                var uneChanceSur = 20;
                var random = Math.floor((Math.random() * uneChanceSur) + 1);
				if(random  <= difficulty){
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
                /* Balles couleur arc en ciel 
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                ball.c=color;
                */
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
