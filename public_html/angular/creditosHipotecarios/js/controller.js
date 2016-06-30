
angular.module('controller',[])


.controller('VarCtrl', ['$scope', '$http', '$log','$window', function($scope, $http, $log,$window) {

	$scope.perdida = 23000;
  $scope.tiempo = 19000;

	$scope.pushData = function($params) {
		var aforeActual = $params.var1;
		var tiempo = $params.var2;
		var rangoSalario = $params.var3;
    $scope.tiempo = $params.var1 - $params.var3;
    $scope.perdida = $params.var1;
		createGraph();

	}

	$scope.save = function($params) {
		var aforeActual = $params.var1;
		var tiempo = $params.var2;
		var rangoSalario = $params.var3;
    $scope.tiempo = $params.var1 - $params.var3;
    $scope.perdida = $params.var1;
		chartUpdate();

	}
	var barChartData = {
		labels : ["Pago"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [$scope.perdida]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : [$scope.tiempo]
			}
		]

	}

	var createGraph = function(){
		barChartData = {
			labels : ["Pago"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : [$scope.perdida]
				},
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,0.8)",
					highlightFill : "rgba(151,187,205,0.75)",
					highlightStroke : "rgba(151,187,205,1)",
					data : [$scope.tiempo]
				}
			]

		}
	};

	window.onload = function(){

	  var ctx = document.getElementById("canvas").getContext("2d");
	  window.myBar = new Chart(ctx).Bar(barChartData, {
	    responsive : true,
	    showTooltips: false,
	    scaleOverride : true,
	    scaleSteps : 6,
	    scaleStepWidth : 5000,
	    scaleStartValue : 0,
	    onAnimationComplete: function () {

	        var ctx = this.chart.ctx;
	        ctx.font = this.scale.font;
	        ctx.fillStyle = this.scale.textColor
	        ctx.textAlign = "center";
	        ctx.textBaseline = "bottom";

	        this.datasets.forEach(function (dataset) {
	            dataset.bars.forEach(function (bar) {
	                ctx.fillText(bar.value, bar.x, bar.y - 5);
	            });
	        })
	    }
	  });

}

	var chartUpdate = function() {
			createGraph();

			// Replace the chart canvas element
			$('#canvas').replaceWith('<canvas id="canvas" height="100%" width="100%"></canvas>');

			var ctx = document.getElementById("canvas").getContext("2d");
		  window.myBar = new Chart(ctx).Bar(barChartData, {
		    responsive : true,
		    showTooltips: false,
		    scaleOverride : true,
		    scaleSteps : 6,
		    scaleStepWidth : 5000,
		    scaleStartValue : 0,
		    onAnimationComplete: function () {

		        var ctx = this.chart.ctx;
		        ctx.font = this.scale.font;
		        ctx.fillStyle = this.scale.textColor
		        ctx.textAlign = "center";
		        ctx.textBaseline = "bottom";

		        this.datasets.forEach(function (dataset) {
		            dataset.bars.forEach(function (bar) {
		                ctx.fillText(bar.value, bar.x, bar.y - 5);
		            });
		        })
		    }
		  });
	}


}])
