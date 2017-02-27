report.controller('OptionalLoginController', ['$scope','$state','ModalService',
	function($scope, $state, $Modal) {

		$scope.InLogin = function(){
			$state.go("login");
		}
}]);