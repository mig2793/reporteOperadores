report.factory('globals',function(){

	global = {};

	global.localStorageGet = function(dataStorage){
		var data = localStorage.getItem(dataStorage);
		data = JSON.parse(data);
		return data;
	}

	global.convertQR = function(QR){
		var QRConvert = QR.split(",");
		var sendQR = new Array();
		for(i=0; i<QRConvert.length;i++){
			sendQR.push(QRConvert[i])
		}
		return sendQR
	}

	global.timeCurrent = function(){
		var time;
		var h,m,s;
		var d,y,mo;
		var date = new Date();
		d = date.getDate();
		mo = date.getMonth()+1;
		y = date.getFullYear();
		h = date.getHours();
		m = date.getMinutes();
		s = date.getSeconds();

		mo = (mo.toString().length > 1) ? mo : "0" + mo;
		d = (d.toString().length > 1) ? d : "0" + d ;

		time = y + "-" + mo + "-" + d + " " + h + ":" + m + ":" + s

		return time;
	}

	global.validateStorageObject = function(data){
		if(data){
    		return data[0];
    	}else{
    		console.log("No hay nada!");
    	}
	}
	global.validateStorageObjectRepeat = function(data){
		if(data){
    		return data;
    	}else{
    		console.log("No hay nada!");
    	}
	}

	return global;
})