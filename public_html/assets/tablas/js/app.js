//AngularApp
var app = angular.module("fondoDeAhorro", ['ui.bootstrap', 'ui.bootstrap-slider']);

FondoAhorroController.$inject = ['VinikService'];
function FondoAhorroController(VinikService){
    console.log('FondoAhorroController');
    var vm = this;

    VinikService.getComission();

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



// HighCharts
var myChart = Highcharts.chart('container', {
    chart: {
        type: 'waterfall',
        inverted: true
    },

    title: {
        text: 'Highcharts Waterfall'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'USD'
        }
    },

    legend: {
        enabled: false
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.2f}</b> USD'
    },

    series: [{
        upColor: Highcharts.getOptions().colors[2],
        color: Highcharts.getOptions().colors[3],
        data: [{
            name: 'Start',
            y: 120000
        }, {
            name: 'Product Revenue',
            y: 569000
        }, {
            name: 'Service Revenue',
            y: 231000
        }, {
            name: 'Positive Balance',
            isIntermediateSum: true,
            color: Highcharts.getOptions().colors[1]
        }, {
            name: 'Fixed Costs',
            y: -342000
        }, {
            name: 'Variable Costs',
            y: -233000
        }, {
            name: 'Balance',
            isSum: true,
            color: Highcharts.getOptions().colors[1]
        }],
        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
            },
            style: {
                fontWeight: 'bold'
            }
        },
        pointPadding: 0
    }]
});
