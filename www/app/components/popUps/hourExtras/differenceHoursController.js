report.controller('differenceHoursController', ['$scope','$state','ModalService',
	function($scope, $state, Modal) {

	if(localStorage.getItem("data") !== null){
		$scope.data = global.localStorageGet("data");
    	$scope.TotalH = global.validateStorageObjectRepeat($scope.data.TotalHoras);
    	$scope.datareporte = global.validateStorageObject($scope.data.datareport);
	}else{
		console.log("No hay nada!");
	}

	$scope.hoursExtras = ($scope.TotalH.totalHoras - Number($scope.datareporte._horas_programadas)) < 0 ? -($scope.TotalH.totalHoras - Number($scope.datareporte._horas_programadas)) : $scope.TotalH.totalHoras - Number($scope.datareporte._horas_programadas)

}]);