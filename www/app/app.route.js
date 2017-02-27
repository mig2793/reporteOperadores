report.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('login',{
            url:            '/login',
            templateUrl:    'app/components/Login/login.html',
            controller:     'loginController'
        }).state('register',{
            url:            '/register',
            templateUrl:    'app/components/Register/Register.html',
            controller:     'RegisterController'
        }).state('home',{
            url:            '/home',
            templateUrl:    'app/components/menu/menu.html',
            controller:     'menuController'
        }).state('home.dateBasics',{
            url:            '/datosBasicos',
            templateUrl:    'app/components/form1/form1.html',
            controller:     'dataBasicController'
        }).state('home.tiempos',{
            url:            '/tiempos',
            templateUrl:    'app/components/form2/form2.html',
            controller:     'tiemposController'
        }).state('home.observaciones',{
            url:            '/observaciones',
            templateUrl:    'app/components/form3/form3.html',
            controller:     'observacionesController'
        }).state('home.reporteDia',{
            url:            '/reporteDia',
            templateUrl:    'app/components/reportDay/report.html',
            controller:     'reportDayController'
        }).state('home.reportIncident',{
            url:            '/reportarIncidente',
            templateUrl:    'app/components/reportIncident/reportIncident.html',
            controller:     'reportIncidentController'
        }).state('home.credits',{
            url:            '/credits',
            templateUrl:    'app/components/credits/credits.html',
            controller:     'creditsController'
        });

        $urlRouterProvider.otherwise("/");

});

report.controller('mainController',['$scope','$state', function($scope,$state) {

    $state.go('login');
	/*cordova.plugins.barcodeScanner.scan(
	  function (result) {
	    if(!result.cancelled)
	    {
	      alert("Barcode type is: " + result.format);
	      alert("Decoded text is: " + result.text);
	    }
	    else
	    {
	      alert("You have cancelled scan");
	    }
	  },
	  function (error) {
	      alert("Scanning failed: " + error);
	  }
	);*/

}]);