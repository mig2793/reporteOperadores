report.controller('horometrosController', ['$scope','$state','ModalService',
	function($scope, $state) {

 		if(localStorage.getItem("data") !== null){
			$scope.data = global.localStorageGet("data");
			$scope.dataMaquina = global.validateStorageObject($scope.data.dataMaquina) != undefined ? global.validateStorageObject($scope.data.dataMaquina) : 'No registra';
		}else{
			console.log("No hay nada!");
		}

		$scope.ultimoHorometro = $scope.dataMaquina._UltimoHorometro;
}]);