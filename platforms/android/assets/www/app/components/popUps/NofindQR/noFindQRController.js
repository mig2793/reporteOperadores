report.controller('noFindQRController', ['$scope','$state','ModalService',
	function($scope, $state, $Modal) {

		$scope.ok = function(){
			$state.go("login");
		}
}]);