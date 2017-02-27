report.controller('dataBasicController', ['$scope','$state','$cordovaBarcodeScanner','globals','dataBasicService','ModalService',
 function($scope,$state,$cordovaBarcodeScanner,globals,dataBasicService,Modal) {

	var url;
	$scope.showBoxTr = false;
	$scope.TrailerShow = false;
	$scope.projectBox = false;
	$scope.FrenteBox = false;
	var idFrente = 0;
	var frenteDB = "";
	var dataReport = {};
    
	function dataLocalStorage(){
		if(localStorage.getItem("data") !== null){
			$scope.data = global.localStorageGet("data");
			$scope.dataOperator = global.validateStorageObject($scope.data.dataOperador) != undefined ? global.validateStorageObject($scope.data.dataOperador) : 'No registra';
			$scope.dataMaquina = global.validateStorageObject($scope.data.dataMaquina) != undefined ? global.validateStorageObject($scope.data.dataMaquina) : 'No registra';
			$scope.datareporte = global.validateStorageObject($scope.data.datareport) != undefined ? global.validateStorageObject($scope.data.datareport) : 'No registra';
			$scope.dataTrailer = global.validateStorageObjectRepeat($scope.data.CodTrailer) != undefined ? global.validateStorageObjectRepeat($scope.data.CodTrailer) : 'No registra';
		}else
			console.log("No hay nada!");
	}

	$("#sub-form1").addClass("focus-form");
	$("#sub-form2").removeClass("focus-form");
	$("#sub-form3").removeClass("focus-form");
	$("#menu-formularios").show();

	$("#box-Frente ul").click(changeInputFrente);
	$("#box-ct ul").click(ItemCodTrailer);

	function changeInputProject(event){
		var liItem = event.target; 
		idProject = event.target.id;
		console.log(idProject);
		$("#project").val($(liItem).text());
	}

	function changeInputFrente(event){
		var liItem = event.target; 
		idFrente = event.target.id; 
		var datam = global.localStorageGet("data")
        datam.datareport[0]["_id_frente"] = idFrente;
        var datasave = JSON.stringify(datam)
        localStorage.setItem("data",datasave);
        dataLocalStorage();
		$("#frente").val($(liItem).text());
	}

	$scope.CapturQRMaquina = function(){
		console.log($cordovaBarcodeScanner);
	    $cordovaBarcodeScanner.scan().then(function(barcodeData) {
			var QrValidate = global.convertQR(barcodeData.text);
	   		var data = {};
	   		var codMaquina = QrValidate[0];
	   		codMaquina = codMaquina.split(":");
	   		codMaquina = codMaquina[1];
	   		codMaquina = codMaquina.replace(/(['"])/g,"");
	      	data["codMaq"] = codMaquina;
	    	data["action"] = 4;
	    	console.log(data);
	    	$scope.validateMaquina(data);
	    }, function(error) {
	    	alert(error);
	    });
	} 

	$scope.validateMaquina = function(data){
		dataBasicService.CodigoMaquina(data).then(function(promise){
            var result = promise.data;
            console.log(result);
            if(result.d.length > 0){
				var datam = global.localStorageGet("data")
            	datam["dataMaquina"] = result.d;
            	var dataMaquina = JSON.stringify(datam);
            	localStorage.setItem("data",dataMaquina);
            	$state.reload();
            }else{
           		Modal.showModal({
					templateUrl : 'app/components/popUps/NofindQR/noFindQR.html',
					controller : 'noFindQRController'
				})	
            }
        });
	}

	$scope.saveOrUpdate = function(){
		url = "selectReport";
		selectReportF(dataReport);
		dataBasicService.form1SaveorUpdate(dataReport,url).then(function(promise){
			var result = promise.data;
			var horometroI = $("#horometro-initial").val() != 0 ? $("#horometro-initial").val() : 0;
			var horometroF = $("#horometro-final").val() != 0 ? $("#horometro-final").val() : 0;
			var kilometroI = $("#kilometro-initial").val() != 0 ? $("#kilometro-initial").val() : 0;
			var kilometroF = $("#kilometro-final").val() != 0 ? $("#kilometro-final").val() : 0;
			var kilometroITrailer = $("#km-initialT").val() != 0 ? $("#km-initialT").val() : 0;
			var kilometroFTrailer = $("#km-finalT").val() != 0 ? $("#km-finalT").val() : 0;
			var idProject = $scope.dataMaquina._id_proyecto;
			var frenteId = 0;
			if(Number(idFrente) != 0) 
				frenteId = Number(idFrente);
			else
				frenteId =  $scope.datareporte._id_frente

			frenteId = frenteId == undefined ? 0 : frenteId;
			
			//selectHorometros();
			if(result.d.length==0){
				var dataInsert = {
					action : 1,
					id_codMaq : $scope.data.dataMaquina[0]._codMaq,
					id_operario : $scope.data.dataOperador[0]._nit,
					fecha_inicio : $scope.data.dataOperador[0].time.split(" ")[0],
					hora_inicio : $scope.data.dataOperador[0].time.split(" ")[1],
					horometro_inicial: horometroI,
					horometro_final: horometroF,
					kilometro_inicial: kilometroI,
					kilometro_final: kilometroF,
					id_codTrailer: $("#trailers").val(),
					kilometro_i_trailer: kilometroITrailer,
					kilometro_f_trailer: kilometroFTrailer,
					id_centroCostos: idProject,
					id_frente: frenteId		
				}
				InsertReportF(dataInsert);
			}else{

				if((Number(horometroF) >= Number(horometroI) || ((Number(horometroF) == 0) && (Number(horometroI) > 0))) && (Number(kilometroF) >= Number(kilometroI) || ((Number(kilometroF) == 0) && (Number(kilometroI) > 0))))
				{
					var date = global.timeCurrent();
					date = date.split(" ")[0]
					/*dataHorometro = {
						action : 7,
						id_codMaq : $scope.dataMaquina._codMaq,
						horometro_final : Number($("#horometro-initial").val())
					}
					dataBasicService.form1SaveorUpdate(dataHorometro,url).then(function(promise){
						var result = promise.data;
						var resultHorometros = result.d;		        	
						if(resultHorometros.length <= 0 || ($scope.datareporte._horometro_final <= $scope.dataMaquina._UltimoHorometro && $scope.datareporte._fecha_inicio == date && $scope.datareporte._horometro_inicial == horometroI ))
						{
							var dataStorage = global.localStorageGet("data")
	        				dataStorage.dataMaquina[0]._UltimoHorometro = horometroF;
				        	var dataR = JSON.stringify(dataStorage);
				        	localStorage.setItem("data",dataR);		
				        	dataLocalStorage();*/
							selectReportF(dataReport);
							var dataUpdate = {
								action : 3,
								id : $scope.datareporte._id,
								horometro_inicial : horometroI,
								horometro_final : horometroF,
								kilometro_inicial : kilometroI,
								kilometro_final : kilometroF,
								id_codTrailer : $("#trailers").val(),
								kilometro_i_trailer : kilometroITrailer,
								kilometro_f_trailer : kilometroFTrailer,
								id_frente : frenteId
							}
							UpdateReportF(dataUpdate);
						/*}else{
							var dataStorage = global.localStorageGet("data")
	        				dataStorage.dataMaquina[0]._UltimoHorometro = resultHorometros[resultHorometros.length-1]._horometro_final;
				        	var dataR = JSON.stringify(dataStorage);
				        	localStorage.setItem("data",dataR);		
				        	dataLocalStorage();

			           		Modal.showModal({
								templateUrl : 'app/components/popUps/horometros/horometrolessDB.html',
								controller : 'horometrosController'
							})	
						}
					});*/
				}else{
	           		Modal.showModal({
						templateUrl : 'app/components/popUps/horometros/horometroHigherInitial.html',
						controller : 'horometrosController'
					})	
				}
			}
		});
	}

	$scope.visibleBoxTrailers = function(){
		$scope.showBoxTr = !$scope.showBoxTr;
	}

	function selectReportF(){
		url = "selectReport";
		dataBasicService.form1SaveorUpdate(dataReport,url).then(function(promise){
			var result = promise.data;
			var dataStorage = global.localStorageGet("data")
        	dataStorage["datareport"] = result.d;
        	var dataR = JSON.stringify(dataStorage);
        	localStorage.setItem("data",dataR);	
        	dataLocalStorage();		
		});
	}

	function getNameFrente(){
		url = "getFrentesName";
		var data = {
			id_frente : $scope.datareport._id_frente
		}
		dataBasicService.form1SaveorUpdate(data,url).then(function(promise){
			var result = promise.data;		
		});			
	}

	function selectHorometros(){
		var resultHorometros = [];
		url = "ValidarHorometro";
		var id_maquina = $scope.dataMaquina._codMaq;
		dataHorometro = {
			action : 9,
			id_codMaq : id_maquina
		}
		dataBasicService.form1SaveorUpdate(dataHorometro,url).then(function(promise){
			var result = promise.data;
			resultHorometros = result.d;
        	var id= $scope.datareporte._id_frente;
        	var frente = $("#" + id).text();
			var dataStorage = global.localStorageGet("data")
        	dataStorage.dataMaquina[0]._UltimoHorometro = resultHorometros[0]._horometro_final;
        	dataStorage.datareport[0]._Frente = frente;
        	var dataR = JSON.stringify(dataStorage);
        	localStorage.setItem("data",dataR);		
        	dataLocalStorage();
        	$("#frente").val(frente);
		});

		return resultHorometros;
	}

	function InsertReportF(dataInsert){
		url = "InsertDataBasic";
		dataBasicService.form1SaveorUpdate(dataInsert,url).then(function(promise){
			selectReportF(dataReport);
		});
	}

	function UpdateReportF(dataUpdate){
		url = "UpdateDataBasic";
		dataBasicService.form1SaveorUpdate(dataUpdate,url).then(function(promise){
			var result = promise.data;
			selectReportF(dataReport);
		});
	}

	function selectTrailer(){
		url = "selectTrailer";
		var data = {
			action : 5
		}
		dataBasicService.form1SaveorUpdate(data,url).then(function(promise){
			var result = promise.data;
			var dataStorage = global.localStorageGet("data")
        	dataStorage["CodTrailer"] = result.d;
        	var dataR = JSON.stringify(dataStorage);
        	localStorage.setItem("data",dataR);				
		});		
	}

	function ItemCodTrailer(event){
		var liItem = event.target; 
		idCodT = event.target.id;
		$("#trailers").val($(liItem).text());
	}

	function getProjects(){
		url = "getProjects";
		data = {valuedata : 0};
		dataBasicService.form1SaveorUpdate(data,url).then(function(promise){
			$scope.projects = promise.data.d;
		});		
	}
	function getFrentes(){
		url = "getFrentes";
		var idProyecto = $scope.dataMaquina._id_proyecto;
		data = {project : idProyecto};
		dataBasicService.form1SaveorUpdate(data,url).then(function(promise){
			$scope.frente = promise.data.d;
		});		
	}
	
	function initForm(){
		selectTrailer();
		dataLocalStorage();
		if($scope.dataMaquina != 'No registra'){
			initDataReport();
			selectReportF(dataReport);
			getFrentes();
			selectHorometros();
			$scope.saveOrUpdate();			
		}
	}

	function initDataReport(){
		dataReport = {
			action : 2,
			id_codMaq : $scope.data.dataMaquina[0]._codMaq,
			id_operario : $scope.data.dataOperador[0]._nit,
			fecha_inicio : $scope.data.dataOperador[0].time.split(" ")[0] 
		}
		$scope.dataMaquina._sistema == "TRACTOCAMION" ? $scope.TrailerShow = true : $scope.TrailerShow;		
	}

	$scope.visibleProjects = function(){
		$scope.projectBox = !$scope.projectBox;
	}
	
	$scope.visibleFrentes = function(){
		$scope.FrenteBox = !$scope.FrenteBox;
	} 
	initForm();
}]);


