report.controller('loginController', ['$scope','$state','ModalService','loginService', 'globals','$cordovaBarcodeScanner','$cordovaGeolocation', '$cordovaNetwork',
	function($scope, $state,Modal,loginService, globals,$cordovaBarcodeScanner,$cordovaGeolocation,$cordovaNetwork) {

    //var type = $cordovaNetwork.getNetwork()

    //var isOnline = $cordovaNetwork.isOnline()

    //var isOffline = $cordovaNetwork.isOffline()

    dataOperadorG = {};

	if(localStorage.getItem("data") !== null){
		$state.go("home.dateBasics");
	}

	$scope.validateUser = function (data){
	  	data["action"] = 4;
	  	if(data.password != undefined && data.user != undefined)
	  		$scope.validateLogin(data);
	  	else{
       		Modal.showModal({
				templateUrl : 'app/components/popUps/errorsave/errorsave.html',
				controller : 'errorSave'
			})	
	  	}
	  	
	}

	$scope.CapturQR = function(){
	console.log($cordovaBarcodeScanner);
	   $cordovaBarcodeScanner.scan().then(function(barcodeData) {
	   		var QrValidate = global.convertQR(barcodeData.text);
	   		var data = {};
	    	data["action"] = 4;
	   		data["user"] = QrValidate[0].substring(0,3) + QrValidate[1];
	   		data["password"] = QrValidate[1];
	    	console.log(data);
	    	$scope.validateLoginQR(data);
	      }, function(error) {
           		Modal.showModal({
					templateUrl : 'app/components/popUps/NofindQR/noFindQR.html',
					controller : 'noFindQRController'
				})	
	      });
	}

	$scope.validateLogin = function(data){
		loginService.login(data).then(function(promise){
            var result = promise.data;
            if(result.d.length > 0){
				validateLoginStorage(result);
            }else{
           		Modal.showModal({
					templateUrl : 'app/components/popUps/NofindQR/noFindQR.html',
					controller : 'noFindQRController'
				})	
            }
        });
	}
	
	$scope.validateLoginQR = function(data){
		loginService.login(data).then(function(promise){
            var result = promise.data;
            if(result.d.length > 0){
				validateLoginStorage(result);
            }else{
            	$scope.validateLoginQR();
           		Modal.showModal({
					templateUrl : 'app/components/popUps/OptionalLogin/OptionalLogin.html',
					controller : 'OptionalLoginController'
				})	
            }
        });		
	}	

	function validateLoginStorage(result){
    	result.d[0]._user = result.d[0]._name.substring(0,3);
    	result.d[0]._user = result.d[0]._user + result.d[0]._password
    	result.d[0].time = $scope.fecha = global.timeCurrent();
    	dataOperadorG = {
    		"dataOperador": result.d
    	}
		if(userAgent.match( /Android/i ))
	  	{
    		$scope.CapturQRMaquina();

    	}else{
			var data = {
				codMaq:"TV02",
				action:4
			}
    		$scope.validateMaquina(data);
    	}
    	//$state.go("home.dateBasics");
	}

	$scope.CapturQRMaquina = function(){
		console.log($cordovaBarcodeScanner);
	    $cordovaBarcodeScanner.scan().then(function(barcodeData) {
			var QrValidate = global.convertQR(barcodeData.text);
	   		var data = {};
	   		var codMaquina = QrValidate[0];
	   		codMaquina = codMaquina.split(":");
	   		codMaquina = codMaquina[1];
	   		codMaquina = codMaquina.replace(/(['"])/g,"");
	      	data["codMaq"] = codMaquina;
	    	data["action"] = 4;
	    	console.log(data);
	    	$scope.validateMaquina(data);
	    }, function(error) {
	    	alert(error);
	    });
	}

	$scope.validateMaquina = function(data){
		loginService.CodigoMaquina(data).then(function(promise){
            var result = promise.data;
            console.log(result);
            if(result.d.length > 0){
            	var dataOperador = JSON.stringify(dataOperadorG);
    			localStorage.setItem("data",dataOperador);
            	var datam = global.localStorageGet("data")
            	datam["dataMaquina"] = result.d;
            	var dataMaquina = JSON.stringify(datam);
            	localStorage.setItem("data",dataMaquina);
            	$state.go("home.dateBasics");
            }else{
           		Modal.showModal({
					templateUrl : 'app/components/popUps/NofindQR/noFindQR.html',
					controller : 'noFindQRController'
				})	
            }
        });
	}
	/*if(isOnline){
		console.log("Estas online");
	}else{
		console.log("No estas conectado a una red");
	}*/

}]);		