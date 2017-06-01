var app = angular.module("Vinik", ['ui.bootstrap-slider'])

IndexController.$inject = [];
function IndexController() {
    console.log('IndexController');
}

app.controller('IndexController', IndexController);

app.controller("FooterController", function ($scope) {
    console.log('App.js');
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
 
