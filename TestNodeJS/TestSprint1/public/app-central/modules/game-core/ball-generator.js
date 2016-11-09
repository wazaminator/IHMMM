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
            
            list_balls["ball2"]={name:'ball2',x:-26,y:-26,vx:100,vy:100,r:26,t:3,bonus:0,c:'#FF00FF',ct:'#000000'};
            list_balls["ball3"]={name:'ball3',x:100,y:-26,vx:0,vy:200,r:26,t:3,bonus:0,c:'#FF00FF',ct:'#000000'};

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
                
                
                var bonusBall=0;
                
                var couleurMin=0;
                var couleurMax=255;
                
                
				list_balls["ball"+numeroBall]={name:"ball"+numeroBall,x:xBall,y:yBall,vx:vxBall,vy:vyBall,r:rBall,t:3,bonus:bonusBall,c:'#FF0000',ct:'#000000'};
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
