
angular.module('controller',[])


.controller('VarCtrl', ['$scope', '$http', '$log','$window', function($scope, $http, $log,$window) {

	var tope;

	Chart.numberWithCommas = function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var resizeChart = function(a,b){
		if (a > b) {
			if (a%100000 == 0) {
				tope = Math.ceil(a/100000) + 1;
			} else {
				tope = Math.ceil(a/100000);
			}
		} else {
			if (b%100000 == 0) {
				tope = Math.ceil(b/100000) + 1;
			} else {
				tope = Math.ceil(b/100000);
			}
		}
	}

	$scope.changeChecked = function($params){
		$scope.frm.bCoa = $params;
	}
	$scope.changeOpc = function($params){
		$scope.frm.bCoa = $params;
	}

	$scope.pago1 = 4000000;
	$scope.pago2 = Math.floor(3724344);
	$scope.ahorroMensual = 1378;

	resizeChart($scope.pago1,$scope.pago2);

	$scope.tazaInteres = .106;

	$scope.frm = {
		sNombre:"Emilio Gzz",
		iEdad:32 ,
		iSdoIns:2000000,
		iPago:20000 ,
		iPlazo: 200
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

		var a = Math.pow((1+($scope.tazaInteres/12)),$scope.frm.iPlazo);

		$scope.frm.iPagoVinik = -(  ($scope.frm.iSdoIns) / ((a)-(1/($scope.tazaInteres/12)))  );

		console.log($scope.frm.iPagoVinik);

		$scope.pago1 = Math.floor($scope.frm.iPago*$scope.frm.iPlazo); //SIN VINIK

		console.log($scope.pago1);

		$scope.pago2 =  Math.floor($scope.frm.iPagoVinik*$scope.frm.iPlazo); //CON VINIK

		console.log($scope.pago2);

		resizeChart($scope.pago1,$scope.pago2);

		//console.log(tope);

		$scope.ahorroMensual = Math.floor($scope.frm.iPago-$scope.frm.iPagoVinik);

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
		$scope.frmSimula.iPagoSimula =  Math.abs(Math.floor(($scope.frm.iSdoIns)/((a-1)/(.106/12))));

	}


	var barChartData = {
		labels : ["Crédito Actual | Crédito Nuevo"],
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
			labels : ["Crédito Actual | Crédito Nuevo"],
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
			scaleLabel: "$<%=Chart.numberWithCommas(value)%>",
			responsive : true,
			showTooltips: false,
			showInlineValues : true,
			centeredInllineValues : true,
			tooltipCaretSize : 0,
			tooltipTemplate : "<%= value %>",
			onAnimationComplete: function(){
            if (this.options.showInlineValues) {
                if (this.name == "Bar") {
                    this.eachBars(function(bar){
                        var tooltipPosition = bar.tooltipPosition();
                        new Chart.Tooltip({
                            x: Math.round(tooltipPosition.x),
                            y: this.options.centeredInllineValues
                                ? Math.round( bar.y + (bar.height() / 2) + ((this.options.tooltipFontSize + this.options.tooltipYPadding) / 2) )
                                : Math.round(tooltipPosition.y),
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            caretHeight: this.options.tooltipCaretSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            text: "$" + Chart.numberWithCommas(bar.value),
                            chart: this.chart
                        }).draw();
                    });
                }
            }
        }
	  });

}

	var chartUpdate = function() {
			createGraph();

			// Replace the chart canvas element
			$('#canvas').replaceWith('<canvas id="canvas" height="90%" width="100%"></canvas>');

			var ctx = document.getElementById("canvas").getContext("2d");
		  window.myBar = new Chart(ctx).Bar(barChartData, {
				scaleLabel: "$<%=Chart.numberWithCommas(value)%>",
				responsive : true,
				showTooltips: false,
				showInlineValues : true,
				centeredInllineValues : true,
				tooltipCaretSize : 0,
				tooltipTemplate : "<%= value %>",
				onAnimationComplete: function(){
	            if (this.options.showInlineValues) {
	                if (this.name == "Bar") {
	                    this.eachBars(function(bar){
	                        var tooltipPosition = bar.tooltipPosition();
	                        new Chart.Tooltip({
	                            x: Math.round(tooltipPosition.x),
	                            y: this.options.centeredInllineValues
	                                ? Math.round( bar.y + (bar.height() / 2) + ((this.options.tooltipFontSize + this.options.tooltipYPadding) / 2) )
	                                : Math.round(tooltipPosition.y),
	                            xPadding: this.options.tooltipXPadding,
	                            yPadding: this.options.tooltipYPadding,
	                            fillColor: this.options.tooltipFillColor,
	                            textColor: this.options.tooltipFontColor,
	                            fontFamily: this.options.tooltipFontFamily,
	                            fontStyle: this.options.tooltipFontStyle,
	                            fontSize: this.options.tooltipFontSize,
	                            caretHeight: this.options.tooltipCaretSize,
	                            cornerRadius: this.options.tooltipCornerRadius,
	                            text: "$" + Chart.numberWithCommas(bar.value),
	                            chart: this.chart
	                        }).draw();
	                    });
	                }
	            }
	        }
		  });
	}


}])
