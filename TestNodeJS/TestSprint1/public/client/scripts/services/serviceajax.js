

services.factory('searchAll', function ($http, $q) {
    return{
        search: function(){
            //return $http.get("http://localhost:3000/search?q=" + query + "&page=" + page);
            return $http.get("json/jsonListDeFilm.php");
        },
        info: function(id){
            return $http.get("http://localhost:3000/info/" + id);
        },
        popular: function(page){
            return $http.get("http://localhost:3000/popular?page=" + page);
        }
    }
  });
