var dinero = 15000;

//Dropdown
$("#dinero").change(function() {
  dinero = $(this).val();

  //use rfiSchooldropdown
}).change();

$("#tiempo").change(function() {
  tPasado = t;
  t = $(this).val();
  //use rfiSchooldropdown
}).change();
//AngularApp
var app = angular.module("planPersonal", []);

app.controller('ExampleController', ['$scope', function($scope) {
  $scope.master = {};

  $scope.save = function() {

    lineChartData.labels = [];
    lineChartData.datasets[0].data = [];
    lineChartData.datasets[1].data = [];
    lineChartData.datasets[2].data = [];
    lineChartData.datasets[3].data = [];

    iPeriodos = t*12;
    chartUpdate();

  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);
