report.controller('reportIncidentController', ['$scope','$state','ModalService','$cordovaCamera',
	function($scope, $state,Modal, $cordovaCamera) {

	$("#menu-formularios").hide();
	$scope.photo = 'assets/img/photo.jpg';

	var options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };
    
    $scope.takePhoto = function(){
	    $cordovaCamera.getPicture(options).then(function(imageData) {
	     	$scope.photo = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	      	console.log(error);
	    });    	
    }
}]);