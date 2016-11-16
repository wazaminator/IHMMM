angular
		.module('myPadScrollModule', [])
		.directive(
				'myPadScroll',
				function($document) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc'
						},
						template : '<img src="app-client/modalites/pad-scroll/img/PadDesktop.jpg" />',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, tracking = 0;

							element.on('mousedown', function(event) {
								$document.on('mouseup', mouseup);
								// Prevent default dragging of selected content
								event.preventDefault();
								tracking = 1;
								startX = event.pageX;
								startY = event.pageY;
							});
							
							element.on('mousemove', function(event) {
								// Prevent default dragging of selected content
								event.preventDefault();
								if (tracking == 1) {
									scope.$apply(function() {
										scope.image.x = scope.image.x + (event.pageX - startX);
										scope.image.y = scope.image.y + event.pageY - startY;
									});
									startX = event.pageX;
									startY = event.pageY;
								}
							});
							
							function mouseup() {
								tracking = 0;
							}
							
							$document.on('mouseup', function(event) {
								
							});
							
							$document.on('keydown', function (e){
								if(e.keyCode==81){
									scope.$apply(function() {
										scope.image.l -= 10;

									});
								}

								if(e.keyCode==68){
									scope.$apply(function() {
										scope.image.l += 10;

									});
								}

								if(e.keyCode==38){
									scope.$apply(function() {
										scope.image.y -= 10;

									});
								}
								if(e.keyCode==40){
									scope.$apply(function() {
										scope.image.y += 10;

									});
								}
								if(e.keyCode==37){
									scope.$apply(function() {
										scope.image.x -= 10;

									});
								}
								if(e.keyCode==39){
									scope.$apply(function() {
										scope.image.x+= 10;

									});
								}
								return false;
							}
						);
						}

					}
				});