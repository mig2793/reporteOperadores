report.factory('dataBasicService',['$http', function($http){
    var codMaquina = {};

    codMaquina.CodigoMaquina = function(codigoMaq){
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

    codMaquina.form1SaveorUpdate = function(data,url){
        showLoad();
        var promise = $http.post(window.urlService +'dataBasics.asmx/'+ url,data)
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
    }

    codMaquina.SharepointLogin = function(data){
        showLoad();
        var promise = $http.get('https://sp.mincivil.net/_vti_bin/authentication.asmx?op=Login',data)
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
    }

    return codMaquina;
}]);