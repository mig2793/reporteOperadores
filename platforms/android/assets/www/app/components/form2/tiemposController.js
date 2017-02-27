report.controller('tiemposController', ['$scope','$state','globals','tiemposService','ModalService',
 function($scope,$state,globals,tiemposService,Modal) {
	
 	var data = {};
 	var url = "";
 	var idJob = "";
 	var idNoJob = "";
	$scope.showBoxNT = false;
	$scope.showBoxT = false;
	$scope.alertIcon = false;
	$scope.DataGetWork;
	$scope.DataGetNotWork;
	$scope.DataGetListWork;
	$scope.DataGetLisNottWork;
	$scope.hours = {};

	function dataLocalStorage(){
		if(localStorage.getItem("data") !== null){
			$scope.data = global.localStorageGet("data");
	    	$scope.datareporte = global.validateStorageObject($scope.data.datareport) != undefined ? global.validateStorageObject($scope.data.datareport) : 'No registra';
	    	$scope.totalHoras = global.validateStorageObjectRepeat($scope.data.TotalHoras) != undefined ?  global.validateStorageObjectRepeat($scope.data.TotalHoras) : 'No registra';;
		}else{
			console.log("No hay nada!");
		}	
	}


	$("#sub-form1").removeClass("focus-form");
	$("#sub-form2").addClass("focus-form");
	$("#sub-form3").removeClass("focus-form");
	$("#menu-formularios").show();

	/*if(localStorage.getItem("dataOperador") !== null)
	{
		$scope.dataOperator = global.localStorageGet("dataOperador")
	}*/
	$("#box-t ul").click(jobItem)
	$("#box-nt ul").click(jobItemNW)

	function jobItem(event){
		var liItem = event.target; 
		idJob = event.target.id;
		console.log(idJob);
		$("#activity").val($(liItem).text());
	}

	function jobItemNW(event){
		var liItem = event.target; 
		idNoJob = event.target.id;
		console.log(idNoJob);
		$("#activity-nw").val($(liItem).text());
	}

	function UpdateHoursExtras(){
		if($scope.totalHoras.totalHoras == parseFloat($scope.datareporte._horas_programadas))
			$scope.alertIcon = false;
		else
			$scope.alertIcon = true;
			
	}

	$scope.hoursDifference = function(){
		if($scope.totalHoras.totalHoras > parseFloat($scope.datareporte._horas_programadas)){
			Modal.showModal({
				templateUrl : 'app/components/popUps/hourExtras/hourExtras.html',
				controller : 'differenceHoursController'
			});
		} else if($scope.totalHoras.totalHoras < parseFloat($scope.datareporte._horas_programadas)){
			Modal.showModal({
				templateUrl : 'app/components/popUps/hourExtras/hoursminor.html',
				controller : 'differenceHoursController'
			});
		}

	}

	$scope.GetWork = function(){
		var idFrente = $scope.datareporte._id_frente;
		idFrente = Number(idFrente);
		data = {action: 5, frenteId: idFrente}
		url = 'selectActividades';
		tiemposService.actividadesNJ(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.DataGetWork = result.d;
	        $scope.GetNotWork();
	    });
	}

    $scope.GetNotWork = function(){
    	data = {action: 6, frenteId : 0}
    	url = 'selectActividades';
		tiemposService.actividadesNJ(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.DataGetNotWork = result.d;
	        $scope.GetListWork();
	    });
    }

    $scope.GetListWork = function(){
    	url = 'selectActividadesTyNT';
    	data = {action: 7, id : $scope.datareporte._id}
		tiemposService.actividadesNJ(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.DataGetListWork = result.d;
	        $scope.hours["horas_trabajadas"] = getHours($scope.DataGetListWork);
	        $scope.GetLisNottWork();	

	    });
    }

    $scope.GetLisNottWork = function(){
    	url = 'selectActividadesTyNT';
    	data = {action: 8, id : $scope.datareporte._id}
		tiemposService.actividadesNJ(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.DataGetLisNottWork = result.d;
	        $scope.hours["horas_Notrabajadas"] = getHours($scope.DataGetLisNottWork);
	        $scope.hours["total_horas"] = $scope.hours.horas_Notrabajadas + $scope.hours.horas_trabajadas;
	        saveLocalStorage();
	        dataLocalStorage();
	        UpdateHoursExtras();
	    });
    }

    function saveLocalStorage(){
    	var hours = {
    		"horasTrabajadas" : $scope.hours.horas_trabajadas,
    		"horasNoTrabajadas":$scope.hours.horas_Notrabajadas,
    		"totalHoras":$scope.hours.total_horas
    	}
	    var dataStorage =  global.localStorageGet("data");
	    dataStorage["listT"] = $scope.DataGetListWork;
	    dataStorage["listNT"] = $scope.DataGetLisNottWork;
	    dataStorage["TotalHoras"] = hours;
	    dataStorage = JSON.stringify(dataStorage);
    	localStorage.setItem("data", dataStorage);	
    }

    function getHours(data){
    	var horasTotales = 0;
    	for(i=0;i<data.length;i++){
    		horasTotales = horasTotales + data[i]._horas_actividades
    	}
    	return horasTotales;
    }

    $scope.deleteActivity = function($event,id,action){
    	//var $elemento = angular.element($event.target).parent()
    	url = 'DeleteActividades';
		data = {action:action,id:id};
    	tiemposService.actividadesNJ(data,url).then(function(promise){
	        var result = promise.data;
		    $scope.GetListWork();
			$scope.GetNotWork();
	    });
    	//var $elemento = angular.element($event.target).parent()
    	
    }

    $scope.saveWorks = function(job){
    	if(job && $("#activity").val().trim().length>0){
    		if(parseFloat($scope.datareporte._horas_programadas)>0){
				job["action"] = 1;
				job["id_Actividades"] = idJob;
				job["id_ReporteD"] = $scope.datareporte._id;
				url = 'InsertarActividades';
				console.log(job);
		    	tiemposService.actividadesNJ(job,url).then(function(promise){
			        var result = promise.data;
			        $scope.GetListWork();
			        $("#activity").val("");
			        $("#hour-activity").val("");
			    });	    			
    		}else{
				Modal.showModal({
					templateUrl : 'app/components/popUps/HourProgrammed/hourProgrammed.html',
					controller : 'hourProgrammedController'
				});    			
    		}
    	}else{
			Modal.showModal({
				templateUrl : 'app/components/popUps/dataIncomplete/dataIncomplete.html',
				controller : 'dataIncompleteController'
			});
    	}
    }

    $scope.saveNoWorks = function(nojob){
    	if(nojob && $("#activity-nw").val().trim().length>0){
    		if(parseFloat($scope.datareporte._horas_programadas)>0){
				nojob["action"] = 2;
				nojob["id_Actividades"] = idNoJob;
				nojob["id_ReporteD"] = $scope.datareporte._id;
				url = 'InsertarActividades';
		    	tiemposService.actividadesNJ(nojob,url).then(function(promise){
			        var result = promise.data;
			        $scope.GetNotWork();
			        $("#activity-nw").val("");
			        $("#hour-notWork").val("");
			    });	
	    	}else{
				Modal.showModal({
					templateUrl : 'app/components/popUps/HourProgrammed/hourProgrammed.html',
					controller : 'hourProgrammedController'
				});   	    		
	    	}
    	}else{
			Modal.showModal({
				templateUrl : 'app/components/popUps/dataIncomplete/dataIncomplete.html',
				controller : 'dataIncompleteController'
			});
    	}
    }
    $scope.saveHourProgra = function(){
    	if(parseFloat($("#hour-programmed").val())>0){
    		var hour = {
    			action : 9,
    			id : $scope.datareporte._id,
    			horas_programdas : $("#hour-programmed").val()
    		};
    		url = 'UpdatehorasProgramadas';
	    	tiemposService.actividadesNJ(hour,url).then(function(promise){
		        var result = promise.data;
				var dataStorage = global.localStorageGet("data")
	        	dataStorage.datareport[0]._horas_programadas = $("#hour-programmed").val();
	        	var dataR = JSON.stringify(dataStorage);
	        	localStorage.setItem("data",dataR);	
	        	dataLocalStorage();
	        	UpdateHoursExtras();		     	   
		    });	
    	}else{
			Modal.showModal({
				templateUrl : 'app/components/popUps/dataIncomplete/dataIncomplete.html',
				controller : 'dataIncompleteController'
			});    		
    	}
    }

	$scope.visibleBoxT = function(){
		$scope.showBoxT = !$scope.showBoxT;
	}

	$scope.visibleBoxNT = function(){
		$scope.showBoxNT = !$scope.showBoxNT;
	}
	timeWait();
	dataLocalStorage();
	$scope.GetWork();
	UpdateHoursExtras();
}]);