report.controller('closeSessionController', ['$scope','$state','ModalService',
	function($scope, $state, $Modal) {

		$scope.ok = function(){
			localStorage.clear();
			$state.go("login");
		}
}]);