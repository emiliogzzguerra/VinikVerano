var dinero = 15000;
var tiempo = 20;
var tInteres = 0.11;

var valorFuturo = dinero*(1+tInteres)*tiempo;

//Dropdown
$("#dinero").change(function() {
  dinero = $(this).val();
  console.log(dinero);
}).change();

$("#tiempo").change(function() {
  tiempo = $(this).val();
  console.log(tiempo);
}).change();

//AngularApp
var app = angular.module("planPersonal", []);

app.controller('ExampleController', ['$scope', function($scope) {
  var users = [
      {
        name: 'Chris',
        email: ''
      },
      {
        name: 'Holly',
        email: ''
      }
  ];

  $scope.formDataTwo = {};
  $scope.formDataTwo.users = users;


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
