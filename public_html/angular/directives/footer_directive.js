angular.module("Vinik").directive("footer", function() {
  return {
    restrict: 'A',
    templateUrl: 'angular/templates/footer.html',
    scope: true,
    transclude : false,
    controller: 'FooterController'
  };
});
 
