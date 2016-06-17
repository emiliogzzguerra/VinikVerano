
//AngularApp
var app = angular.module("creditoHipotecario", []);

app.controller('CotizaCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {

  $http.get('./assets/base/js/mySql/popData.php')
    .success(function(data) {
      $scope.prueba = data;
    })
    .error(function(err) {
      $log.error(err);
    })

  $scope.pushData = function($params) {
    $http.post('./assets/base/js/mySql/pushData.php',{'name':$params.name, 'email':$params.email,'phone':$params.phone,'message':$params.message})
      .success(function(data) {
        $scope.prueba = data;
      })
      .error(function(err) {
        $log.error(err);
      })
  }

  $scope.removeData = function($params) {
    var cnfrm = confirm("Are you sure to delete?");
    if(cnfrm) {
      $http.post('./assets/base/js/mySql/removeData.php', {'id':$params})
      .success(function(data) {
        $scope.blogs = data;
      })
      .error(function(err) {
        $log.error(err);
      })
    } else {
      //
    }

  }

}]);

app.controller('productsCtrl', function($scope, $http) {
    $scope.showCreateForm = function(){
    // clear form
    $scope.clearForm();

    // change modal title
    $('#modal-product-title').text("Create New Product");

    // hide update product button
    $('#btn-update-product').hide();

    // show create product button
    // create new product
    $scope.createProduct = function(){

        // fields in key-value pairs
        $http.post('create_product.php', {
                'name' : $scope.name,
                'description' : $scope.description, 
                'price' : $scope.price
            }
        ).success(function (data, status, headers, config) {
            console.log(data);
            // tell the user new product was created
            Materialize.toast(data, 4000);

            // close modal
            $('#modal-product-form').closeModal();

            // clear modal content
            $scope.clearForm();

              // refresh the list
              $scope.getAll();
          });
      }
    // clear variable / form values
    $scope.clearForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
    }
    $('#btn-create-product').show();

  }
    // more angular JS codes will be here
});
