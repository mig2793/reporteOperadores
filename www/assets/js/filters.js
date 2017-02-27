var module = angular.module('report')

module.filter('formatMoney', function() {
	return function(value) {
		if(value === undefined) return '';
		return parseFloat(value).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0];
	};
});

module.filter('longDate', function() {
	return function(value) {
		if(!value) return '';
		var d = new Date(value +' 00:00');
		var text = [];
		switch(d.getUTCDay()){
			case 0: text.push('Domingo'); break;
			case 1: text.push('Lunes'); break;
			case 2: text.push('Martes'); break;
			case 3: text.push('Miercoles'); break;
			case 4: text.push('Jueves'); break;
			case 5: text.push('Viernes'); break;
			case 6: text.push('Sábado'); break;
		}
		d = value.split('-');
		text.push(d[2], 'de');
		switch(parseInt(d[1])){
			case 1: text.push('enero'); break;
			case 2: text.push('febrero'); break;
			case 3: text.push('marzo'); break;
			case 4: text.push('abril'); break;
			case 5: text.push('mayo'); break;
			case 6: text.push('junio'); break;
			case 7: text.push('julio'); break;
			case 8: text.push('agosto'); break;
			case 9: text.push('septiembre'); break;
			case 10: text.push('octubre'); break;
			case 11: text.push('noviembre'); break;
			case 12: text.push('diciembre'); break;
		}
		text.push('de', d[0]);
		return text.join(' ');
	};
});

menu.filter('time', function(){
	return function(value){
		if(!value)return '';
		return time(value);
	}
})