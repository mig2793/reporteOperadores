report.directive('scrollVertical', function(){
	function scroll(scope, element, attrs){
		repeatNtimes(20, 100, function(){
			var width_display = $(window).width();
			var height_display = $(window).height();

			if(($(".scroll-heigth").height() + $("#navegacion").height())>height_display){
				var height_Scroll=($(".scroll-heigth").height() + $("#navegacion").height())-$(element).height()-height_display;
				if(height_Scroll<0){
					height_Scroll = height_Scroll*-1;
				}
				$(element).css("height", height_Scroll+ "px");
			}
		});
	}
	return{
		restrict: 'A',
		link: scroll
	};
});
report.directive('scrollBoxvertical', function(){
	function register(scope, element, attrs){
		repeatNtimes(20, 10, function(){
				var scrollBox = $(element).parent().parent().parent().height() - 10;
				$(element).css("height", scrollBox + "px");
		});
	}
	return{
		restrict: 'A',
		link: register
	};
});

report.directive('backButton', function($state){
	function back(scope, element, attrs){
		$(element).on('click', function(){
			if(scope.back){
				$state.go(scope.back);
			}
			else {
				window.history.back();
			}
		})
		
	}
	return{
		restrict: 'A',
		link: back
	};
});

report.directive('popUp', function(){
	function pop_up(scope, element, attrs){
		repeatNtimes(10, 100, function(){
			element.css("max-height", height_display-50 + "px" );
			element.find(".pop-up").css("max-height", element.height() + "px");

			var position_popUp = height_display/2 - element.height()/2;
			element.css("top", position_popUp + "px");
		});

		var $button = element.find(".button-close, .button-close2");

		$button.click(function(){	
			console.log("click");
			element.parent().remove();
			if(scope.onCloseModal){
				scope.onCloseModal();
			}
		});

		scope.closeModal = function(){
			$button.click();
		}
	}
	return{
		restrict: 'C',
		link: pop_up
	};
});

report.directive('popUp2', function(){
	function pop_up(scope, element, attrs){
		repeatNtimes(10, 100, function(){
			element.css("max-height", height_display-50 + "px" );
			element.find(".pop-up").css("max-height", element.height() + "px");

			var position_popUp = height_display/3;
			element.css("top", position_popUp + "px");
		});

		var $button = element.find(".button-close, .button-close2");

		$button.click(function(){	
			console.log("click");
			element.parent().remove();
			if(scope.onCloseModal){
				scope.onCloseModal();
			}
		});

		scope.closeModal = function(){
			$button.click();
		}
	}
	return{
		restrict: 'C',
		link: pop_up
	};
});

report.directive('date', function(){
	return{
		restrict	: 'E',
		templateUrl : 'assets/js/templates/date.html',
		link : function(scope, element, attrs){
			scope.up2uDate = attrs;
			element.removeAttributes();
			element.find('[type=date]').change(function(){
				var d = new Date(this.value);

				var month = d.getUTCMonth() + 1;
				if(month < 10) month = '0'+ month;
				var day = d.getUTCDate();
				if(day < 10) day = '0'+ day;
				var date = [d.getUTCFullYear(), month, day].join('-');

				element.find('[type=text]').val(date);
				try{
					scope[attrs.onchange](date);	
				}catch(e){
					console.log(e);
				}
			})
		}
	};
});

function repeatNtimes(n, duration, callback){
	var count = 0;
	var interval = setInterval(function(){
		if(count === n){
			clearInterval(interval);
			return;
		}
		count++;
		callback();
	}, duration);
}
