
var app = angular.module("planPersonal", []);

app.controller('ExampleController', ['$scope', function($scope) {

  numberWithCommas = function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

  $scope.deducible = numberWithCommas(108000);

  $scope.save = function(user) {

    console.log(user.a);
    console.log(user.t);
    $scope.deducible = numberWithCommas((user.a*12*user.t)*0.1);

  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);
