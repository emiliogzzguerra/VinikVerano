//AngularApp
var app = angular.module("fondoDeAhorro", ['ui.bootstrap', 'ui.bootstrap-slider']);

FondoAhorroController.$inject = ['VinikService'];
function FondoAhorroController(VinikService){
    console.log('FondoAhorroController');
    var vm = this;
    var jsonResponse = {"admin_cost":"8864.12"};
    // VinikService.getComission();

    vm.aportacionMensual = 2000; 
    vm.aniosAhorro = 15;
    vm.risk = "Baja";
    vm.ahorro = "No";

    vm.aportacionOptions = {};
    vm.ahorroOptions = {};

    vm.aportacionOptions = {
        min : 0,
        step : 1000,
        max : 30000,
        value : vm.aportacionMensual
    };
    vm.ahorroOptions = {
        min : 3,
        step : 1,
        max : 25,
        value : vm.aniosAhorro
    };
    vm.riskOptions = ['Alta', 'Media', 'Baja']
    vm.ahorroBoolean = ["Si", "No"]

    vm.country = {};
    vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
      {name: 'Afghanistan', code: 'AF'},
      {name: 'Zambia', code: 'ZM'},
      {name: 'Zimbabwe', code: 'ZW'}
    ];  

}
app.controller('FondoAhorroController', FondoAhorroController);

// HighCharts
var colors = {
    text: '#F0F0F0',
    bg: '#02AE4E',
    lines: '#0EC45E',
    positive: '#EFEBE0',
    sum: '#3477CE',
    negative: '#B8504D'
};
var myChart = Highcharts.chart('container', {
    chart: {
        type: 'waterfall',
        inverted: true,
        backgroundColor: colors.bg
    },

    title: {
        text: 'Highcharts Waterfall',
         style: {
            color: colors.text
         }
    },

    xAxis: {
        type: 'category',
        labels: {
         style: {
            color: colors.text
         }
      }
    },

    yAxis: {
        title: {
            text: 'USD',
            style: {
                color: colors.text
            }
        },
        gridLineColor: colors.lines,
        labels: {
         style: {
            color: colors.text
         }
      }
    },

    legend: {
        enabled: false
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.2f}</b> USD',
    },

    series: [{
        upColor: colors.positive,
        color: colors.negative,
        borderColor: colors.text,
        data: [{
            name: 'Aportaciones Mensuales',
            y: 120000
        }, {
            name: 'Interés Ganado',
            y: 569000
        }, {
            name: 'Costo de Administración',
            y: 231000
        }, {
            name: 'Ahorro esperado',
            isIntermediateSum: true,
            color: colors.sum
        }, {
            name: 'Devoluciones Fiscales',
            y: -342000
        }, {
            name: 'Variable Costs',
            y: -233000
        }, {
            name: 'Balance',
            isSum: true,
            color: colors.sum
        }],
        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
            },
            style: {
                fontWeight: 'bold',
                borderColor: '#F00'
            }
        },
        pointPadding: 0
    }]
});