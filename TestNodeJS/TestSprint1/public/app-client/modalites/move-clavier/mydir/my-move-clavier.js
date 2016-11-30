angular
		.module('myMoveClavierModule', [])
		.directive(
				'myMoveClavier',
				function($document) {
					return {
						restrict : 'EA',
						replace : true,
						scope : {
							image : '=drSrc',
							inversion : '=invSrc',
							lengthmax : '=lengthMaxSrc'
						},
						link : function(scope, element, attr) {
							var startX = 0, startY = 0, tracking = 0;
						$document.on('keydown', function (e){
							e.preventDefault();
								if(e.keyCode==81){
									if (scope.lengthmax != true) {
										scope.$apply(function() {
										scope.image.l -= 10;
									});
									}
								}

								if(e.keyCode==68){
									if (scope.lengthmax != true) {
										scope.$apply(function() {
										scope.image.l += 10;
									});
									}
								}

							if(e.keyCode==38){
								scope.$apply(function() {
									scope.image.y -= 10*scope.inversion;

								});
							}
							if(e.keyCode==40){
								scope.$apply(function() {
									scope.image.y += 10*scope.inversion;

								});
							}
							if(e.keyCode==37){
								scope.$apply(function() {
									scope.image.x -= 10*scope.inversion;

								});
							}
							if(e.keyCode==39){
								scope.$apply(function() {
									scope.image.x+= 10*scope.inversion;

								});
							}
									return false;
								}
							);
						}
					}
				});
