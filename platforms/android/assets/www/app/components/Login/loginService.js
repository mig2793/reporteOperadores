report.factory('loginService',['$http', function($http){
    var loginService = {};

    loginService.login = function(operator){
        showLoad();
        var promise = $http.post(window.urlService +'Registro.asmx/Login',operator)
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
    
    loginService.CodigoMaquina = function(codigoMaq){
        showLoad();
        var promise = $http.post(window.urlService +'dataBasics.asmx/selectMaquina',codigoMaq)
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

    return loginService;
}]);
