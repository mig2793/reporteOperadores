angular.module("report")
    .factory("Popup", ['ModalService', function (Modal) {
		var session = null;

		return {
			show : function(message){
				Modal.showModal({
					templateUrl : 'app/extra/popups/message.html',
					controller : 'messageController',
					inputs: {
						message : message
					}
				});
			}
		};
    }]);