
angular.module('app', [])

.controller("AforeCtrl", function ($scope) {
  $scope.perdida = 1500*100;
  $scope.tiempo = 65 - 25;

	$scope.pushData = function($params) {
		var aforeActual = $params.afore;
		var tiempo = $params.tiempo;
		var rangoSalario = $params.salario;
    $scope.tiempo = 65 - $params.tiempo;
    $scope.perdida = $params.salario*$scope.tiempo;

	}
});
