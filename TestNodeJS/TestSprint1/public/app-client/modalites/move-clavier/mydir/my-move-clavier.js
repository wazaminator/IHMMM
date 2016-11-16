angular
		.module('myMoveClavierModule', [])
		.directive(
				'myMoveClavier',
				function($document) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc'
						},
						template : '<img src="app-client/modalites/pad-scale-exact/img/PadDesktop.jpg" />',
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, tracking = 0;
						console.log("dans moveClavier");
					$document.on('keydown', function (e){
						e.preventDefault();
						if(e.keyCode==81){
							scope.$apply(function() {
								scope.image.l += 10;

							});
						}

						if(e.keyCode==68){
							scope.$apply(function() {
								scope.image.l -= 10;

							});
						}

						if(e.keyCode==68){
							scope.$apply(function() {
								scope.image.l -= 10;

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
