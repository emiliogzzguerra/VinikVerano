
angular.module('controller',[])


.controller("AforeCtrl", function ($scope) {
	$scope.pushData = function($params) {
		var aforeActual = $params.afore;
		var tiempo = $params.tiempo;
		var rangoSalario = $params.salario;
		var perdida = 1500;
	}
});
