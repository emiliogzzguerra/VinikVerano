angular.module('app', [])

.controller("AforeCtrl", function ($scope) {
  var mesesRestantes = [0,0,0,0];

  var etapas = [[25,36],[37,45],[46,59],[60,65]];
  var afores  =
          [[9.19,8.33,7.13,3.22],//Sura
  				 [9.13,8.01,6.88,2.87],//Profuturo
  				 [8.92,8.80,7.46,3.66],//PensionISSSTE
  				 [8.88,7.88,6.82,2.83],//Banamex
  				 [8.10,7.36,6.13,2.46],//Metlife
  				 [8.06,7.43,6.24,2.41],//Principal
  				 [7.82,7.22,5.70,2.25],//Invercap
  				 [7.77,7.21,6.07,2.85],//XXI
  				 [7.38,6.96,6.05,2.93],//Azteca
  				 [7.13,6.83,6.17,2.73],//Coppel
  				 [4.96,4.71,4.15,3.44]];//Inbursa

  var maxSB4 = Math.max.apply(Math, afores.map(function(v) { return v[0]; }));
  var maxSB3 = Math.max.apply(Math, afores.map(function(v) { return v[1]; }));
  var maxSB2 = Math.max.apply(Math, afores.map(function(v) { return v[2]; }));
  var maxSB1 = Math.max.apply(Math, afores.map(function(v) { return v[3]; }));

  var supuestosFijos = [65, //Edad de retiro
                    .065,//Aportaciones fijas % salario
                    .045,//CrecimientoAnualDelSalario
                    25]; //edadLaboralPromedio
  var capital = [0,0,0,0];
  var salarioInicio = [0,0,0,0];
  var crecimientoMensualDelSalario = 0.0038;

  var edad = 25;

  var rendimientoMejorAfore = [maxSB4,maxSB3,maxSB2,maxSB1];

  $scope.perdida = 1500*100;
  $scope.tiempo = 65 - 25;

	$scope.pushData = function($params) {
    capital = [0,0,0,0];
    capitalOptimo = [0,0,0,0];
    salarioInicio = [0,0,0,0];
    var saldo = $params.saldo;
		var aforeActual = $params.afore;
		var tiempo = $params.tiempo;
		var salario = $params.salario;
    var rendimientoAforeActual = afores[aforeActual];
    var iTemp = 0;
    var iTemp2 = 0;
    var salarioVariableActual = [0,0,0,0];
    var salarioVariableOptimo = [0,0,0,0];

    console.log("Tiempo = " +tiempo);
    console.log("Edad = " +edad);

    mesesRestantes = [0,0,0,0];

    if (tiempo <= 36) {
      mesesRestantes[0] = (36-tiempo)*12;
      mesesRestantes[1] = 8*12;
      mesesRestantes[2] = 13*12;
      mesesRestantes[3] = 5*12;
    } else if (tiempo >36 && tiempo <=45){
      mesesRestantes[0] = 0;
      mesesRestantes[1] = (45-tiempo)*12;
      mesesRestantes[2] = 13*12;
      mesesRestantes[3] = 5*12;
    } else if (tiempo > 45 && tiempo <=59){
      mesesRestantes[0] = 0;
      mesesRestantes[1] = 0;
      mesesRestantes[2] = (59-tiempo)*12;
      mesesRestantes[3] = 5*12;
    } else if (tiempo > 59 && tiempo <=65){
      mesesRestantes[0] = 0;
      mesesRestantes[1] = 0;
      mesesRestantes[2] = 0;
      mesesRestantes[3] = (65-tiempo)*12;
    }



    for (var i = 0; i < 4; i++) {
      if (i == 0) {
        salarioInicio[i] = salario;
        iTemp = Math.pow((1+((rendimientoAforeActual[i]/100)/12)),mesesRestantes[i]);
        iTemp2 = Math.pow((1+((rendimientoMejorAfore[i]/100)/12)),mesesRestantes[i])
        capital[i] = saldo*iTemp;
        capitalOptimo[i] = saldo*iTemp2;
      } else {

        iTemp = Math.pow((1+crecimientoMensualDelSalario),(mesesRestantes[i-1]));

        salarioInicio[i] = salarioInicio[i-1]*(iTemp);

        iTemp = Math.pow((1+((rendimientoAforeActual[i]/100)/12)),(mesesRestantes[i]));
        iTemp2 = Math.pow((1+((rendimientoMejorAfore[i]/100)/12)),(mesesRestantes[i]));

        capital[i] = (capital[i-1]+salarioVariableActual[i-1])*iTemp;
        capitalOptimo[i] = (capitalOptimo[i-1]+salarioVariableOptimo[i-1])*iTemp2;

      }

      // console.log("Meses restantes en " + (i+1) + " = " + mesesRestantes[i]);
      // console.log("Salario en " + (i+1) + " = " + salarioInicio[i]);

      iTemp = Math.pow((1+((rendimientoAforeActual[i]/100)/12)),(mesesRestantes[i]+1));
      iTemp2 = Math.pow((1+crecimientoMensualDelSalario),(mesesRestantes[i]));

      salarioVariableActual[i] = (salarioInicio[i]*supuestosFijos[1]*(iTemp-(1+((rendimientoAforeActual[i]/100)/12))*iTemp2))/(((rendimientoAforeActual[i]/100)/12)-crecimientoMensualDelSalario);

      iTemp = Math.pow((1+((rendimientoMejorAfore[i]/100)/12)),(mesesRestantes[i]+1));
      salarioVariableOptimo[i] = (salarioInicio[i]*supuestosFijos[1]*(iTemp-(1+((rendimientoMejorAfore[i]/100)/12))*iTemp2))/(((rendimientoMejorAfore[i]/100)/12)-crecimientoMensualDelSalario);

      // console.log("SalarioVariableActual en " + (i+1) + " = " + salarioVariableActual[i]);
      // console.log("salarioVariableOptimo en " + (i+1) + " = " + salarioVariableOptimo[i]);
      //
      // console.log("Capital en " + (i+1) + " = " + capital[i]);
      // console.log("CapitalOptimo en " + (i+1) + " = " + capitalOptimo[i]);
      //console.log("Capital en " + i + " = " + capital[i]);
    }

    $scope.tiempo = 65 - $params.tiempo;
    $scope.perdida = Math.round((capitalOptimo[3]-capital[3])/10000)*10000;

	}
});
