angular.module('controller',[])

.controller('CotizaCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {

	$http.get('../angular/creditosHipotecarios/js/popData.php')
		.success(function(data) {
			$scope.prospectos = data;
		})
		.error(function(err) {
			$log.error(err);
		})

	$scope.pushData = function($params) {
		$http.post('../angular/creditosHipotecarios//js/pushData.php',{'nombre':$params.nombre, 'telefono':$params.telefono, 'email':$params.email})
			.success(function(data) {
				$scope.prospectos = data;
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
				$scope.prospectos = data;
			})
			.error(function(err) {
				$log.error(err);
			})
		} else {
			//
		}

	}

}])
