report.controller('menuController', ['$scope','$state','globals', 'MenuService', 'ModalService',
	function($scope, $state, globals, MenuService, Modal) {

	var width=$("#menu").width();
	var openMenu = true; 

 	function dataGetLocalStorage(){
	 	if(localStorage.getItem("data") !== null){
			$scope.data = global.localStorageGet("data");
	    	$scope.datareporte = global.validateStorageObject($scope.data.datareport) != undefined ? global.validateStorageObject($scope.data.datareport) : 'No registra';
	    	$scope.dataOperador = global.validateStorageObject($scope.data.dataOperador) != undefined ? global.validateStorageObject($scope.data.dataOperador) : 'No registra';
		}else{
			console.log("No hay nada!");
		}		
 	}

	$("#menu-slide").css("left", "-100%");

	$(".icono-menu").click(open);
	$("#menu-content ul li").click(open);

    $("body").on("swiperight",function(){
    	openMenu = true;
        open();
    });
    $("body").on("swipeleft",function(){
    	openMenu = false;
        open();
    });

	function open(e){
		if(openMenu){
			$("#menu-slide").animate({
				"left":"0"
			},800);
			openMenu = !openMenu;
		}else{	
			$("#menu-slide").animate({
				"left" : "-100%"
			},800);
			openMenu = !openMenu;
		}
	}

	$scope.closeSession = function(){
		localStorage.clear();
		$state.go("login");
	}

	$scope.finishTurn = function(){
		dataGetLocalStorage();
    	if($scope.datareporte._horometro_inicial>0 && $scope.datareporte._horometro_final>0){
			url = 'TerminarTurno';
			var fechaFin = global.timeCurrent();
			data = {
				action : 6,
				id : $scope.datareporte._id,
				fecha_fin : fechaFin.split(" ")[0],
				hora_fin : fechaFin.split(" ")[1]
			}
			MenuService.service(data,url).then(function(promise){
		        var result = promise.data;
		    });	    
        	var datam = global.localStorageGet("data")
        	delete datam.dataMaquina;
        	delete datam.datareport;
        	delete datam.TotalHoras;
        	var dataMaquina = JSON.stringify(datam);
        	localStorage.setItem("data",dataMaquina);
			$state.go("home.dateBasics");
    	}else{
			Modal.showModal({
				templateUrl : 'app/components/popUps/NoRegisterHours/NoRegisterHours.html',
				controller : 'NoRController'
			});    		
    	}
	}
	dataGetLocalStorage();
}]);