
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
		iSdoIns:1354212.08,
		iPago:20000 ,
		iPlazo: 180
	};

	$scope.frmSimula = {
		sNombre:"Emilio Gzz",
		iEdad:32 ,
		iAntLab:7, //7 años
		iValIn:3000000,
		iEnganche:40000,
		iPlazo:4,
		iPagoSimula:4416
		 //6 años
	};

	$scope.saveTraspasa = function($params) {
		$scope.frm.sNombre = $params.sNombre;
		$scope.frm.iEdad = $params.iEdad;
		$scope.frm.iSdoIns = $params.iSdoIns;
		$scope.frm.iPago = $params.iPago;
		$scope.frm.iPlazo = $params.iPlazo;
		$scope.pago1 = $scope.frm.iSdoIns;

		var a = Math.pow((1+(.106/12)), -$scope.frm.iPlazo);

		var formula = ($scope.frm.iSdoIns)/((a-1)/(.106/12));

		$scope.pago2 = Math.floor(formula);

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

		chartUpdate();
	}
/*
Nombre √
Edad √
Ingreso mensual
Antigüedad laboral
Valor del inmueble
Enganche
Plazo del crédito
Arroja: pago mensual
*/
	$scope.saveSimula = function($params) {
		$scope.frmSimula.sNombre = $params.sNombre;
		$scope.frmSimula.iEdad = $params.iEdad;
		$scope.frmSimula.iAntLab = $params.iAntLab;
		$scope.frmSimula.iValIn = $params.iValIn;
		$scope.frmSimula.iEnganche = $params.iEnganche;
		$scope.frmSimula.iPlazo = $params.iPlazo;
		$scope.frmSimula.iPlazoMeses = $scope.frmSimula.iPlazo*12;
		var a = Math.pow((1+(.106/12)), -$scope.frm.iPlazo);
		$scope.frmSimula.iPagoSimula =  Math.floor(($scope.frm.iSdoIns)/((a-1)/(.106/12)));

		console.log("pago = " + $scope.pago);
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
