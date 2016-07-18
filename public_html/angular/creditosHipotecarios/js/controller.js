
angular.module('controller',[])


.controller('VarCtrl', ['$scope', '$http', '$log','$window', function($scope, $http, $log,$window) {

	var tope = 30000/5000;

	$scope.changeChecked = function($params){
		$scope.frm.bCoa = $params;
	}
	$scope.changeOpc = function($params){
		$scope.frm.bCoa = $params;
	}

	$scope.pago1 = 10000;
	$scope.pago2 = 15000;
	$scope.ahorroMensual = 150;


	$scope.frm = {
		sNombre:"Emilio Gzz",
		iEdad:32 ,
		iSdoIns:2000,
		iPago:200 ,
		iPlazo: 12
	};

	$scope.save = function($params) {
		$scope.frm.sNombre = $params.sNombre;
		$scope.frm.iEdad = $params.iEdad;
		$scope.frm.iSdoIns = $params.iSdoIns;
		$scope.frm.iPago = $params.iPago;
		$scope.frm.iPlazo = $params.iPlazo;
		$scope.pago1 = $scope.frm.iSdoIns;
		var formula = Math.abs(($scope.frm.iSdoIns)/(((1+(0.106^-$scope.frm.iPlazo))-1)/(0.106)));
		$scope.pago2 = Math.floor($scope.pago1-formula);
		if ($scope.pago1 > $scope.pago2) {
			if ($scope.pago1%5000 == 0) {
				tope = Math.ceil($scope.pago1/5000) + 1;
			} else {
				tope = Math.ceil($scope.pago1/5000);
			}
		} else {
			if ($scope.pago2%5000 == 0) {
				tope = Math.ceil($scope.pago2/5000) + 1;
			} else {
				tope = Math.ceil($scope.pago2/5000);
			}
		}

		$scope.ahorroMensual = Math.floor(($scope.frm.iPago)-($scope.pago2/$scope.frm.iPlazo));

		console.log("pago1 = " + $scope.pago1);
		console.log("formula = "+ formula);
		console.log("pago2 = " + $scope.pago2);
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
				data : [$scope.pago1]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : [$scope.pago2]
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
					data : [$scope.pago1]
				},
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,0.8)",
					highlightFill : "rgba(151,187,205,0.75)",
					highlightStroke : "rgba(151,187,205,1)",
					data : [$scope.pago2]
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
	    scaleSteps : tope,
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
	                ctx.fillText("$" + bar.value, bar.x, bar.y - 5);
	            });
	        })
	    }
	  });

}

	var chartUpdate = function() {
			createGraph();

			// Replace the chart canvas element
			$('#canvas').replaceWith('<canvas id="canvas" height="90%" width="100%"></canvas>');

			var ctx = document.getElementById("canvas").getContext("2d");
		  window.myBar = new Chart(ctx).Bar(barChartData, {
		    responsive : true,
		    showTooltips: false,
		    scaleOverride : true,
		    scaleSteps : tope,
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
