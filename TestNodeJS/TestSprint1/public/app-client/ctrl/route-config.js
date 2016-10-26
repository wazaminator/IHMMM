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
										templateUrl : 'app-client/modalites/pad-scale-exact/pad-scale-exact-view.html',
										controller : 'PadScaleExactCtrl'

									})
							.when(
									'/pad-scale-exact',
									{
										templateUrl : 'app-client/modalites/pad-scale-exact/pad-scale-exact-view.html',
										controller : 'PadScaleExactCtrl'
									}).otherwise({
								redirectTo : '/'
							});

					$locationProvider.html5Mode(false);
				} ]);