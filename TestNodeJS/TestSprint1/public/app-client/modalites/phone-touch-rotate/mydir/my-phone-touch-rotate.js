angular
		.module('myPhoneTouchRotateModule', [])
		.directive(
				'myPhoneTouchRotate',
				function($document,$window) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc',
							inversion : '=invSrc',
							lengthmax : '=lengthMaxSrc'
						},
						template : '<img src="app-client/modalites/phone-touch-rotate/img/fond.jpg" />',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, startL2 = 0, trackingRotation2 = 0, lastTap = 0; 

							function processRotation2(event) {
								var tmpl2 = Math.round(event.beta);
								if (scope.lengthmax != true) {
									scope.$apply(function() {
										scope.image.l = scope.image.l + (tmpl2 - startL2)*2;
									});
								}
								startL2 = tmpl2;
							}
							
							if ($window.DeviceOrientationEvent) {
								$window.addEventListener("deviceorientation", processRotation2, false);
							}
							
							element.on('touchstart', function(event) {
								// Prevent default dragging of selected content
								event.preventDefault();
								tracking = 1;
								var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
								startX = parseInt(touchobj.clientX);
								startY = parseInt(touchobj.clientY);
								var currentTime = new Date().getTime();
								var tapLength = currentTime - lastTap;        
								if(tapLength < 1000 && tapLength > 0){
									scope.$apply(function() {
										scope.image.x = 22;
									});
								}
								lastTap = currentTime;
							});

							
							element.on('touchmove', function(event) {
								// Prevent default dragging of selected content
								event.preventDefault();
								if (tracking == 1) {
									var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
									var newPosX = parseInt(touchobj.clientX);
									var newPosY = parseInt(touchobj.clientY);
									scope.$apply(function() {
										scope.image.x = scope.image.x + (newPosX - startX)*2*scope.inversion;
										scope.image.y = scope.image.y + (newPosY - startY)*2*scope.inversion;
									});
									startX = newPosX;
									startY = newPosY;
								}
							});
						}

					}
				});
