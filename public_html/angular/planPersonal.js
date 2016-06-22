
var app = angular.module("planPersonal", []);

app.controller('ExampleController', ['$scope', function($scope) {

  //$scope.user = {a:2000};

  $scope.master = {};

  $scope.save = function(user) {
    console.log(user.a);
    console.log(user.t);

  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);
