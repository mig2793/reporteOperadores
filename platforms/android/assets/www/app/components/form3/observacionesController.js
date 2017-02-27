report.controller('observacionesController', ['$scope','$state','globals','observacionesService','ModalService',
 function($scope,$state,globals,observacionesService,Modal) {

	$scope.BoxFM = false;
	$scope.BoxC = false;
	$scope.FailInicident;
	$scope.ReportFail;
	$scope.component;
 	var idfail;
 	var idComponent;

	if(localStorage.getItem("data") !== null){
		$scope.data = global.localStorageGet("data");
    	$scope.datareporte = global.validateStorageObject($scope.data.datareport);
	}else{
		console.log("No hay nada!");
	}

	$("#sub-form1").removeClass("focus-form");
	$("#sub-form2").removeClass("focus-form");
	$("#sub-form3").addClass("focus-form");
	$("#menu-formularios").show();

	$("#box-component ul").click(selectComponent);
	$("#box-fail ul").click(selectFail);
	//$("#component-machine").change(selectComponent);
	//$("#fail-machine").change(selectComponent);

	function selectComponent(event){
		var liItem = event.target; 
		idComponent = event.target.id;
		console.log(idComponent);
		$("#search-component").val("");
		$("#component-machine").val($(liItem).text());
	}

	function selectFail(event){
		var liItem = event.target; 
		idfail = event.target.id;
		console.log(idfail);
		$("#search-fail").val("");
		$("#fail-machine").val($(liItem).text());
	}

	$scope.incidentFail = function(){
		data = {action: 4}
		url = 'selectItems';
		observacionesService.observations(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.FailInicident = result.d;
	        $scope.incidentComponent();
	    });
	}

	$scope.incidentComponent = function(){
		data = {action: 3}
		url = 'selectItems';
		observacionesService.observations(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.component = result.d;
	        $scope.selectReportFail();
	    });
	}

	$scope.selectReportFail = function(){
		data = {action:5,id:$scope.datareporte._id};
		url = 'selectItemsSave';
		observacionesService.observations(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.ReportFail = result.d;
	        var dataStorage =  global.localStorageGet("data");
	        dataStorage["listaFallos"] = $scope.ReportFail
	        dataStorage = JSON.stringify(dataStorage);
	        localStorage.setItem("data",dataStorage);
	    });		
	}

	$scope.deleteActivity = function($event,_id,action){
    	//var $elemento = angular.element($event.target).parent()
    	url = 'DeleteActividades';
    	data = {action:action,id:_id};
    	observacionesService.observations(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.selectReportFail();
	    });
    	//var $elemento = angular.element($event.target).parent()
	}

	$scope.InsertFailComponent = function(){
		var failTxt = $("#fail-machine").val().trim();
		var componentTxt = $("#component-machine").val().trim();
		data = {
			action:1,
			id_reporteD:$scope.datareporte._id,
			id_ccomponente:idComponent,
			id_falloC:idfail
		};
		if($("#component-machine").val().trim().length>0 && $("#fail-machine").val().trim().length>0){
			
			if((failTxt == "DESAJUSTE" && 
			  (componentTxt == "ABRAZADERA SILENCIADOR" ||
			  componentTxt == "ABRAZADERAS TURBO" || componentTxt == "ALTERNADOR" ||
			  componentTxt == "CARDAN" || componentTxt == "DIRECCION" ||
			  componentTxt == "RADIADOR" || componentTxt == "TURBO")) ||
			  (failTxt == "DESGASTE" && (componentTxt == "FRENO DE EMERGENCIA" ||
			  componentTxt == "FRENOS" || componentTxt == "LLANTAS")) || 
			  (failTxt == "DESTENCIONADA" && (componentTxt == "CORREA VENTILADOR MOTOR"
			  || componentTxt == "FRENO DE EMERGENCIA" || componentTxt == "FRENOS")) ||
			  (failTxt == "BAJA PRESION" && (componentTxt != "AIRE COMPRIMIDO" || 
			  componentTxt != "EXTINTOR")) ||
			  (failTxt == "FALLO" && (componentTxt == "ALARMA REVERSA" || 
			  componentTxt == "MOTOR DE ARRANQUE" || componentTxt == "BATERIAS" ||
			  componentTxt == "CARDAN" || componentTxt == "CORREA VENTILADOR MOTOR" ||
			  componentTxt == "DIRECCION" || componentTxt == "ELECTRICO" ||
			  componentTxt == "FRENO DE EMERGENCIA" || componentTxt == "FRENOS" ||
			  componentTxt == "GATO HIDRAULICO" || componentTxt == "HOROMETRO" ||
			  componentTxt == "LLANTAS" || componentTxt == "MOTO VENTILADOR" ||
			  componentTxt == "RADIADOR" || componentTxt == "SERVO" ||
			  componentTxt == "SWITCHE PRINCIPAL" || componentTxt == "TURBO")) ||
			  (failTxt == "FISURA" && (componentTxt != "BALDE" || componentTxt != "ESPEJOS" )) ||
			  (failTxt == "FUGA" && (componentTxt != "AIRE COMPRIMIDO" || 
			  componentTxt != "AMORTIGUADOR" || componentTxt != "CARRILES")) ||
			  (failTxt == "CAMBIO" && (componentTxt == "BATERIAS" || 
			  componentTxt == "GRASERAS" || componentTxt == "ESPEJOS" || 
			  componentTxt == "EXTINTOR" || componentTxt == "ESQUINEROS" || 
			  componentTxt == "CUCHILLA")) ||
			  (failTxt == "RUIDO" && (componentTxt != "AIRE ACONDICIONADO" || 
			  componentTxt != "SUSPENSIÓN")) ||
			  (failTxt == "TEMPERATURA") ||
			  (failTxt == "VIBRACION" && (componentTxt == "CARDAN" || 
			  componentTxt == "FRENOS" || componentTxt == "MOTO VENTILADOR" 
			  || componentTxt == "MOTOR PRINCIPAL" || componentTxt == "TURBO")))
			{
				Modal.showModal({
					templateUrl : 'app/components/popUps/alertStopMachine/stopMachine.html',
					controller : 'stopMachineController'
				})

				data["severidad"] = "Paro inmediato";
				insertActivity(data);

			}else if((failTxt == "DESAJUSTE" && 
			  (componentTxt == "AMORTIGUADOR" ||
			  componentTxt == "BALDE" || componentTxt == "BATERIAS" ||
			  componentTxt == "BUJES EQUIPO" || componentTxt == "CABINA" ||
			  componentTxt == "CARRILES" || componentTxt == "DIENTES" ||
			  componentTxt == "SILENCIADOR" || componentTxt == "MOFLE" ||
			  componentTxt == "SUSPENSIÓN")) ||
			  (failTxt == "DESAJUSTE" && 
			  (componentTxt == "AMORTIGUADOR" ||
			  componentTxt == "BALDE" || componentTxt == "BATERIAS" ||
			  componentTxt == "BUJES EQUIPO" || componentTxt == "CABINA" ||
			  componentTxt == "CARRILES" || componentTxt == "DIENTES" ||
			  componentTxt == "SILENCIADOR" || componentTxt == "MOFLE" ||
			  componentTxt == "SUSPENSIÓN" || componentTxt == "TENSORAS" ||
			  componentTxt == "TORRETA")) ||
			  (failTxt == "DESFORZADO") ||
			  (failTxt == "DESGASTE" && 
			  (componentTxt == "TORRETA" || componentTxt == "VOLCO")) ||
			  (failTxt == "DESTENCIONADA") ||
			  (failTxt == "BAJA PRESION" && componentTxt == "AIRE COMPRIMIDO") ||
			  (failTxt == "FALLO" && (componentTxt == "ALTERNADOR" || 
			  componentTxt == "DIENTES" || componentTxt == "EMBRAGUE" ||
			  componentTxt == "INDICADOR" || componentTxt == "LUCES" ||
			  componentTxt == "SUSPENSIÓN")) ||
			  (failTxt == "FUGA" && (componentTxt == "AIRE COMPRIMIDO" || 
			  componentTxt == "AMORTIGUADOR" || componentTxt == "CARRILES")) ||
			  (failTxt == "CAMBIO" && (componentTxt == "AMORTIGUADOR" || 
			  componentTxt == "BORNES" || componentTxt == "DIENTES" || 
			  componentTxt == "FRENO DE EMERGENCIA" || componentTxt == "TENSORAS" || 
			  componentTxt == "GUARDAPOLVOS LLANTAS")) ||
			  (failTxt == "RUIDO" && componentTxt == "SUSPENSIÓN") ||
			  (failTxt == "VIBRACION" && componentTxt == "LLANTAS")
			  )
			{
				Modal.showModal({
					templateUrl : 'app/components/popUps/cautionAlert/alertCaution.html',
					controller : 'alertCautionController'
				})

				data["severidad"] = "Opere con precuación";
				insertActivity(data);

			}else if((failTxt == "BAJA PRESION" && 
			  componentTxt == "AIRE ACONDICIONADO") ||
			  (failTxt == "CAMBIO" && 
			  (componentTxt == "ACEITE HIDRAULICO" ||
			  componentTxt == "ACEITE MOTOR" || componentTxt == "ACEITE TRANSMISION" ||
			  componentTxt == "BALDE" || componentTxt == "BOOM" ||
			  componentTxt == "BUJES EQUIPO" || componentTxt == "CARRILES" ||
			  componentTxt == "CARRILES" || componentTxt == "CUCHILLA" ||
			  componentTxt == "ESQUINEROS" || componentTxt == "GUARDABARRO" ||
			  componentTxt == "MOFLE" || componentTxt == "REFRIGERANTE" ||
			  componentTxt == "SILENCIADOR" || componentTxt == "SILLA" ||
			  componentTxt == "SOPORTE" || componentTxt == "TAPICERIA" ||
			  componentTxt == "TORRETA" || componentTxt == "VIGA DE CHASIS" ||
			  componentTxt == "VOLCO")) ||
			  (failTxt == "DESAJUSTE" &&
			  (componentTxt == "AMORTIGUADOR" ||
			  componentTxt == "BALDE" || componentTxt == "BOOM" ||
			  componentTxt == "CUCHILLA" || componentTxt == "EXTINTOR" ||
			  componentTxt == "GUARDABARRO" || componentTxt == "SILLA" ||
			  componentTxt == "SUSPENSIÓN" || componentTxt == "TENSORAS")) ||
			  (failTxt == "DESGASTE" && 
			  (componentTxt == "CADENA" || componentTxt == "CARRILES" ||
			  componentTxt == "CUCHILLA" || componentTxt == "DIENTES" ||
			  componentTxt == "SWICHE PRINCIPAL" || componentTxt == "TENSORAS")) ||
			  (failTxt == "FALLO" && (componentTxt == "AIRE ACONDICIONADO" || 
			  componentTxt == "HOROMETRO" || componentTxt == "INDICADOR" ||
			  componentTxt == "STOPS")) ||
			  (failTxt == "FUGA" && componentTxt == "AIRE ACONDICIONADO") ||
			  (failTxt == "FISURA" && (componentTxt == "BALDE" || 
			  componentTxt == "ESPEJOS")) ||
			  (failTxt == "RUIDO" && componentTxt == "CABINA") ||
			  (failTxt == "VIBRACION" && (componentTxt == "CABINA" || 
			  componentTxt == "MOFLE"))
			  )
			{
				Modal.showModal({
					templateUrl : 'app/components/popUps/messageCaution/cautionMessagge.html',
					controller : 'messageCautionController'
				});

				data["severidad"] = "Revisión";
				insertActivity(data);
			}else{
				Modal.showModal({
					templateUrl : 'app/components/popUps/cautionAlert/alertCaution.html',
					controller : 'alertCautionController'
				})

				data["severidad"] = "Opere con precuación";
				insertActivity(data);
			}

		}else{
			Modal.showModal({
				templateUrl : 'app/components/popUps/dataIncomplete/dataIncomplete.html',
				controller : 'dataIncompleteController'
			});
		}
	}
	function insertActivity(data){
		url = 'InsertarActividades';
		observacionesService.observations(data,url).then(function(promise){
	        var result = promise.data;
	        $scope.ReportFail = result.d;
	        $scope.selectReportFail();
	    });		
	    $("#fail-machine").val("");
	    $("#component-machine").val("");
	}

	$scope.finishTurn = function(){
    	if($scope.datareporte._horometro_inicial>0 && $scope.datareporte._horometro_final>0){
			url = 'TerminarTurno';
			var fechaFin = global.timeCurrent();
			data = {
				action : 6,
				id : $scope.datareporte._id,
				fecha_fin : fechaFin.split(" ")[0],
				hora_fin : fechaFin.split(" ")[1]
			}
			observacionesService.observations(data,url).then(function(promise){
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

	$scope.visibleFailM = function(){
		$scope.BoxFM = !$scope.BoxFM;
	    if ($scope.fail._nombre !== undefined) {
	        /* No need for the "hack", since the 
	         * associated model wasn't undefined */
	        $scope.fail._nombre = undefined;
	    } else {
	        /* The associated model was undefined:
	         * We need to change it to something else first */
	        $scope.fail._nombre = null;
	        $timeout(function () {
	            $scope.fail._nombre = undefined;
	        });
	    }
	}

	$scope.visibleComponent = function(){
		$scope.BoxC = !$scope.BoxC;
	    if ($scope.component._nombre !== undefined) {
	        /* No need for the "hack", since the 
	         * associated model wasn't undefined */
	        $scope.component._nombre = undefined;
	    } else {
	        /* The associated model was undefined:
	         * We need to change it to something else first */
	        $scope.component._nombre = null;
	        $timeout(function () {
	            $scope.component._nombre = undefined;
	        });
	    }
	}
	timeWait();
	$scope.incidentFail();
}]);