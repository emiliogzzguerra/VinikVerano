var app = angular.module("fondoDeAhorro");

app.factory('VinikService', VinikService);

VinikService.$inject = ['$http'];
function VinikService($http){
	var url = 'http://www.vinik.com.mx';

	return {
		getComission: getComission
	};

	function getComission(monthly_cash, years, risk){
		return $http.get(url + '/controllers/getComission.php?monthly_cash='+monthly_cash+'&years='+years+'&risk='+risk)
	    .then(function(res){
	    	console.log('res', res);
	  		return res;
	    })
	    .catch(function(res){
	  		return res;
	    });
	}
}
