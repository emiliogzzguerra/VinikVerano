
angular.module('app', [])

.controller("AforeCtrl", function ($scope) {
  $scope.perdida = 1500;
  $scope.tiempo = 10;

	$scope.pushData = function($params) {
		var aforeActual = $params.afore;
		var tiempo = $params.tiempo;
		var rangoSalario = $params.salario;
    $scope.tiempo = $params.tiempo;
    $scope.perdida = $params.salario;

	}
});
