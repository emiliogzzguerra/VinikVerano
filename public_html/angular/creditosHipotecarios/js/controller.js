
angular.module('controller',[])

.controller('CotizaCtrl', ['$scope', '$http', '$log','$window', function($scope, $http, $log,$window) {

	$http.get('../angular/creditosHipotecarios/js/popData.php')
		.success(function(data) {
			$scope.leads = data;

			console.log("Success");
		})
		.error(function(err) {
			$log.error(err);
		})

	$scope.pushData = function($params) {
		$http.post('../angular/creditosHipotecarios//js/pushData.php',{'nombre':$params.nombre, 'telefono':$params.telefono, 'email':$params.email})
			.success(function(data) {
				$scope.leads = data;
			})
			.error(function(err) {
				$log.error(err);
			})
	}

	$scope.removeData = function($params) {
		var cnfrm = confirm("Are you sure to delete?");
		if(cnfrm) {
			$http.post('../angular/creditosHipotecarios//js/removeData.php', {'id':$params})
			.success(function(data) {
				$scope.leads = data;
			})
			.error(function(err) {
				$log.error(err);
			})
		} else {
			//
		}

	}

}])
.controller('VarCtrl', ['$scope', '$http', '$log','$window', function($scope, $http, $log,$window) {


	$http.get('../angular/creditosHipotecarios/js/popData.php')
		.success(function(data) {
			$scope.leads = data;
		})
		.error(function(err) {
			$log.error(err);
		})

	$scope.pushData = function($params) {
		$scope.total = $params.telefono;
		$http.post('../angular/creditosHipotecarios//js/pushVar.php',{'nombre':$params.nombre, 'telefono':$params.telefono, 'email':$params.email})
			.success(function(data) {
				$scope.leads = data;
				//$scope.total = data.telefono;
				//$window.location.href = 'fondo-de-ahorro.html';
			})
			.error(function(err) {
				$log.error(err);
			})
	}

	$scope.removeData = function($params) {
		var cnfrm = confirm("Are you sure to delete?");
		if(cnfrm) {
			$http.post('../angular/creditosHipotecarios//js/removeData.php', {'id':$params})
			.success(function(data) {
				$scope.leads = data;
			})
			.error(function(err) {
				$log.error(err);
			})
		} else {
			//
		}

	}

}])
