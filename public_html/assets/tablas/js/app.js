//AngularApp
var app = angular.module("fondoDeAhorro", ['ui.bootstrap', 'ui.bootstrap-slider']);

FondoAhorroController.$inject - [];
function FondoAhorroController(){
    console.log('FondoAhorroController');
    var vm = this;

    vm.aportacionMensual = 0; 
    vm.aniosAhorro = 0;

    vm.aportacionOptions = {};
    vm.ahorroOptions = {};

    vm.aportacionOptions = {
        min : 0,
        step : 1,
        max : 20,
        value : 0
    };
    vm.ahorroOptions = {
        min : 0,
        step : 1,
        max : 20,
        value : 0
    };

}
app.controller('FondoAhorroController', FondoAhorroController);

