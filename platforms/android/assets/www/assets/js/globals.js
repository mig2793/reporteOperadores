var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if(!userAgent.match( /Android/i ))
{
	//window.urlService = 'http://localhost:65085/';
	window.urlService = 'http://app.mincivil.net:989/';
}else{
	//window.urlService = 'http://localhost:65085/';
	window.urlService = 'http://app.mincivil.net:989/';
}

var width=$("#menu").width();
var width_display = $(window).width();
var height_display = $(window).height();

function confirmDOMChanges (callback){
	callback();
	var count = 0;
	var limit = 20;
	var interval = setInterval(function(){
		count++;
		if(count > limit){
			return clearInterval(interval);
		}
		callback();
	}, 100)
}

function time (time){
	var h = parseInt(time.split(":")[0]);
	var m = time.split(":")[1];
	var mer = ' AM';
	if(h >= 12){
		mer = ' PM';
		if(h >= 13){
			h = h - 12;
		}
	}
	return h +':'+ m + mer;
}

function hideLoad(){
	$(".load").hide();
}

function showLoad(){
	$(".load").show();
}

function hideWall(){
	$(".Wall").hide();
}

function showWall(){
	$(".Wall").show();
}

function timeWait(){
	showWall();
	setTimeout(function(){ 
		hideWall();
	}, 1500);
}

function timeDiff(h1, h2){
	var d1= new Date("1970-01-01 "+ h1)
	var d2= new Date("1970-01-01 "+ h2)
	Math.abs(d1.getTime()-d2.getTime()) / 3600000;
}

function whenIsDate(date){
	var today = new Date();
	date = date.split('-');
	if(today.getUTCFullYear() == date[0]){
		if((today.getUTCMonth() + 1) == date[1]){
			var day = parseInt(date[2])
			if(today.getUTCDate() === day){
				return 'hoy';
			}
			if((today.getUTCDate() + 1)=== day){
				return 'mañana';
			}
			if((today.getUTCDate() + 2)=== day){
				return 'pasado mañana';
			}
		}
	}
	return [date[0], date[1], date[2]].join('/');
}

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

jQuery.fn.removeAttributes = function() {
	return this.each(function() {
		var attributes = $.map(this.attributes, function(item) {
			return item.name;
		});
		var img = $(this);
		$.each(attributes, function(i, item) {
			img.removeAttr(item);
		});
	});
}

document.addEventListener("backbutton", function (e) {
    e.preventDefault();
}, false );