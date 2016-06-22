
var app = angular.module("planPersonal", []);

app.controller('ExampleController', ['$scope', function($scope) {

  $scope.deducible = 9000;

  $scope.save = function(user) {
    console.log(user.a);
    console.log(user.t);
    $scope.deducible = ((user.a*user.t)*0.1);

  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);
