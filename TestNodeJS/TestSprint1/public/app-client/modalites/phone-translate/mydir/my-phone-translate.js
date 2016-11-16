angular
		.module('myPhoneTranslateModule', [])
		.directive(
				'myPhoneTranslate',
				function($document,$window) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc'
						},
						template : '<div>x:{{image.x}} // y:{{image.y}} // l:{{image.l}} </div>',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, startL = 0, trackingMotion = 0, trackingRotation = 0; 							
							function processMotion(event) {
								var tmpx = Math.round(event.accelerationIncludingGravity.x*100);
								var tmpy = Math.round(event.accelerationIncludingGravity.y*100);
								var bMaj = false;
								if (trackingMotion == 0) {
									//To initialise startX and startY at start 
									trackingMotion = 1;
								} else {
									var deltax = tmpx - startX;
									if ((deltax > 0.2) || (deltax < -0.2))
									{
										bMaj = true;
										if (deltax > 0) {
											scope.image.x = scope.image.x + 10;
										} else {
											scope.image.x = scope.image.x - 10;
										}
									};
									var deltay = tmpy - startY;
									if ((deltay > 0.3) || (deltay < -0.3))
									{
										bMaj = true;
										if (deltay > 0) {
											scope.image.y = scope.image.y + 10;
										} else {
											scope.image.y = scope.image.y - 10;
										}
									};
									if (bMaj) {
										scope.$apply();
									}
								}
								startX = tmpx;
								startY = tmpy;
							}
							function processRotation(event) {
								var tmpl = Math.round(event.beta);
								if (trackingRotation == 0) {
									//To initialise startX and startY at start 
									trackingRotation = 1;
								} else {
									scope.$apply(function() {
										scope.image.l = scope.image.l + (tmpl - startL);
									});
								}
								startL = tmpl;
							}
							if (($window.DeviceOrientationEvent)&&($window.DeviceMotionEvent)) {
								$window.addEventListener("deviceorientation", processRotation, false);
								$window.addEventListener("devicemotion", processMotion, false);
							} else {
								scope.$apply(function() {
									scope.image.x = 100;
									scope.image.y = 200;
									scope.image.l = 300;
								});
							}
						}

					}
				});