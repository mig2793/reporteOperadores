report.factory('tiemposService',['$http', function($http){
    var actividades = {};

    actividades.actividadesNJ = function(dataaction,URL){
        showLoad();
        var promise = $http.post(window.urlService + 'actividadesControl.asmx/' + URL,dataaction)
            .success(function(data){
                hideLoad();
                console.log(data);
                return data;
            })
            .error(function(err){
                hideLoad();
                console.log(err);
            });
        return promise;
    };

    return actividades;
}]);