var app = angular.module("Vinik", [])

app.controller("FooterController", function ($scope) {
 
    $scope.submitFeedback = function(action) {
        //good or bad...
        if (action) {
            //good
 
            //submit using $http or service
 
        }
        else {
            //bad
 
            //submit using $http or service
        }
    }
 
});

app.directive("footer", function() {
  return {
    restrict: 'A',
    templateUrl: 'angular/templates/footer.html',
    scope: true,
    transclude : false,
    controller: 'FooterController'
  };
});
 
