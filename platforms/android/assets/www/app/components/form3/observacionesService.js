report.factory('observacionesService',['$http', function($http){
    var observaciones = {};

    observaciones.observations = function(dataaction,URL){
        showLoad();
        var promise = $http.post(window.urlService + 'fallo.asmx/' + URL,dataaction)
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

    return observaciones;
}]);