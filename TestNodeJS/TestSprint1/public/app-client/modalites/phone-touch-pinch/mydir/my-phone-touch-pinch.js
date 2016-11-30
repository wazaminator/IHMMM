angular
		.module('myPhoneTouchPinchModule', [])
		.directive(
				'myPhoneTouchPinch',
				function($document,$window) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc',
							inversion : '=invSrc',
							lengthmax : '=lengthMaxSrc'
						},
						template : '<img src="app-client/modalites/phone-touch-pinch/img/fond.jpg" />',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, startL2 = 0, lastTap = 0; 

							element.on('touchstart', function(event) {
								event.preventDefault();
								if (event.targetTouches.length == 1) {
									$document.on('touchend', mouseup);
									// Prevent default dragging of selected content
									var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
									startX = parseInt(touchobj.clientX);
									startY = parseInt(touchobj.clientY);
									var currentTime = new Date().getTime();
									var tapLength = currentTime - lastTap;        
									if(tapLength < 1000 && tapLength > 0){
										scope.$apply(function() {
											scope.usePower();
										});
									}
									lastTap = currentTime;
								} else {
									//Beginning of second touch to resize
									var touchobj = event.changedTouches[1] // reference first touch point (ie: first finger)
									startL2 = Math.abs(parseInt(touchobj.clientX) - startX);
								}
							});

							
							element.on('touchmove', function(event) {
								// Prevent default dragging of selected content
								event.preventDefault();
								var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
								var newPosX = parseInt(touchobj.clientX);
								var newPosY = parseInt(touchobj.clientY);
								scope.$apply(function() {
									scope.image.x = scope.image.x + (newPosX - startX)*2*scope.inversion;
									scope.image.y = scope.image.y + (newPosY - startY)*2*scope.inversion;
								});
								startX = newPosX;
								startY = newPosY;
								if (event.targetTouches.length > 1 && scope.lengthmax != true) {
									var touchobj2 = event.changedTouches[1] // reference first touch point (ie: first finger)
									var newPosX2 = Math.abs(parseInt(touchobj2.clientX) - startX);
									scope.$apply(function() {
										scope.image.l = scope.image.l + (newPosX2 - startX2);
									});
									startX2 = newPosX2;
								}
							});
						}

					}
				});
