

// Contrôleur de la page d'accueil
routeAppControllers.controller('homeCtrl', ['$scope', '$location',
    function($scope, $location){
        $scope.message = "Bienvenue sur la page d'accueil";
		$scope.searchAction = function(){
            $location.path("/search/"+ $scope.query);
        }
    }
]);



//Controlleur d'une nouvelle partie
routeAppControllers.controller('nouvellePartieCtrl',['$scope','$location','$routeParams',function($scope,$location,$routeParams){

	$scope.nouvellePartieaction= function(){
            $location.path("/nouvellePartie");
				alert("dans la fonction ");

			
			}
		}
	]);
	// Controller démarrerUne partie
	routeAppControllers.controller('DemarrerUnePartieCtrl',['$location','$routeParams',function($scope,$location,$routeParams){
	$scope.DemarrerUnePartie= function(){
            $location.path("/DemarrerUnePartie/");
			}
		}
	]);
