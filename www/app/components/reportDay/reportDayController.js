report.controller('reportDayController', ['$scope','$state','ModalService','globals',

 function($scope,$state,$stateParams,globals,ModalService) {
	
	$scope.TrailerData = false;
	$("#menu-formularios").hide();

	if(localStorage.getItem("data") !== null){
		$scope.data = global.localStorageGet("data");
		$scope.dataOperator = global.validateStorageObject($scope.data.dataOperador);
		$scope.dataMaquina = global.validateStorageObject($scope.data.dataMaquina);
    	$scope.datareporte = global.validateStorageObject($scope.data.datareport);
    	$scope.dataLT = global.validateStorageObjectRepeat($scope.data.listT);
    	$scope.dataLNT = global.validateStorageObjectRepeat($scope.data.listNT);
    	$scope.dataLF = global.validateStorageObjectRepeat($scope.data.listaFallos);
    	$scope.TotalH = global.validateStorageObjectRepeat($scope.data.TotalHoras);
	}else{
		console.log("No hay nada!");
	}
	$scope.dataMaquina._sistema == "TRACTOCAMION" ? $scope.TrailerData = true : $scope.TrailerData = false;
}]);