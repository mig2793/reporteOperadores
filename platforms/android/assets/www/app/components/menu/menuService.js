report.factory('MenuService',['$http', function($http){
    var menu = {};

    menu.service = function(dataaction,URL){
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

    return menu;
}]);