var app = angular.module("fondoDeAhorro");

app.factory('VinikService', VinikService);

VinikService.$inject = ['$http'];
function VinikService($http){
	var url = 'http://www.vinik.com.mx';

	return {
		getComission: getComission
	};

	function getComission(monthly_cash, years, risk){
		console.log(url)
		return $http.get(url + '/controllers/getComission.php?monthly_cash=1500&years=5&risk=medium')
	            .then(function(res){
	            	console.log('res', res);
            		return res
	            })
	            .catch(function(res){
            		return res
	            });	
	}
}
