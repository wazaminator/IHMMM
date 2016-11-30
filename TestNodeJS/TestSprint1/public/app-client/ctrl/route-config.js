ihmApp
		.config([
				'$routeProvider',
				'$locationProvider',
				function($routeProvider, $locationProvider) {
					$routeProvider
							.when(
									'/',
									{
										templateUrl : 'app-client/partials/attente-choix-modalite.html'
									})
							.when(
									'/pad-scroll',
									{
										templateUrl : 'app-client/modalites/pad-scroll/pad-scroll-view.html',
										controller : 'PadScrollCtrl'
									})
							.when(
									'/pad-scale-exact',
									{
										templateUrl : 'app-client/modalites/pad-scale-exact/pad-scale-exact-view.html',
										controller : 'PadScaleExactCtrl'
									})
							.when(
									'/move-clavier',
									{
										templateUrl : 'app-client/modalites/move-clavier/move-clavier-view.html',
										controller : 'MoveClavierCtrl'
									})
							.when(
									'/phone-touch-pinch',
									{
										templateUrl : 'app-client/modalites/phone-touch-pinch/phone-touch-pinch-view.html',
										controller : 'PhoneTouchPinchCtrl'
									})
							.when(
									'/phone-touch-rotate',
									{
										templateUrl : 'app-client/modalites/phone-touch-rotate/phone-touch-rotate-view.html',
										controller : 'PhoneTouchRotateCtrl'
									})
							.otherwise({
								redirectTo : '/'
							});

					$locationProvider.html5Mode(false);
				} ]);
				