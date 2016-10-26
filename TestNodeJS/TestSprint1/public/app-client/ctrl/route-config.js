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
									'/phone-translate',
									{
										templateUrl : 'app-client/modalites/phone-translate/phone-translate-view.html',
										controller : 'PhoneTranslateCtrl'
									})
							.otherwise({
								redirectTo : '/'
							});

					$locationProvider.html5Mode(false);
				} ]);
				