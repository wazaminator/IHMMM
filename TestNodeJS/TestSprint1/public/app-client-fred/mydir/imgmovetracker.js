angular
		.module('dragModule', [])
		.directive(
				'myDraggable',
				function($document) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc'
						},
						template : '<img id="fond1" src="app-client-desk/img/PadDesktop.jpg" />',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, tracking = 0;

							element.on('mousedown', function(event) {
								// Prevent default dragging of selected content
								event.preventDefault();
								if (tracking == 0) {
									$document.on('mousemove', mousemove);
									$document.on('mouseup', mouseup);
									startX = event.pageX;
									startY = event.pageY;
									tracking = 1;
								} else {
									tracking = 0;
									$document.unbind('mousemove', mousemove);
									$document.unbind('mouseup', mouseup);
								}
							});

							function mousemove(event) {
								scope.$apply(function() {
									scope.image.x = scope.image.x + (event.pageX - startX);
									scope.image.y = scope.image.y + event.pageY - startY;
								});
								startX = event.pageX;
								startY = event.pageY;
							}

							function mouseup() {
								
							}
							
							//https://www.sitepoint.com/html5-javascript-mouse-wheel/
							if (element.addEventListener) {
								// IE9, Chrome, Safari, Opera
								element.addEventListener("mousewheel", MouseWheelHandler, false);
								// Firefox
								element.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
							}
							// IE 6/7/8
							else 
								element.attachEvent("onmousewheel", MouseWheelHandler);
							
							function MouseWheelHandler(e) {
								// cross-browser wheel delta
								var e = window.event || e; // old IE support
								var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
								element.style.width = Math.max(50, Math.min(800, element.width + (30 * delta))) + "px";

								return false;
							}
						}

					}
				});