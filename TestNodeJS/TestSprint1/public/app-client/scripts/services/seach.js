    //var myApp = angular.module('myApp',[]);


   
    
    ngservices.service('searchAll', function() {
        this.url = function(){//title,type) {
//             return "http://localhost:8080/e-movies/rest/videos/all/"+type+"/" +title;
            return "json/jsonListDeFilm.php";
            
        };
    });
    
       /* myApp.service('seachExact', function() {
        this.url = function(title,type) {
            return "http://localhost:8080/seach/Exact/"+type+"/" +title;
        };
        
    
    });*/
       
       
       
       
       
       
   /* 
    myApp.controller("seachAllCtrl", function($scope,$http,seachAll){
    $scope.title="";
    $scope.type="";
        $scope.donnees={};
        $scope.url = function(){
            return seachAll.url($scope.title,$scope.type);   
        };
        
        $scope.get=function(){
//             $http.get("http://localhost:8080/e-movies").success(function(data, status) {
            $http.get($scope.url).success(function(data, status) {
            $scope.donnees = data;
            }).
            error(function(data, status) {
            });
            return $scope.donnees;
    }*/
    
    });
