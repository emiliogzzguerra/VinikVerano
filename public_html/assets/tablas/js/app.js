//AngularApp
var app = angular.module("fondoDeAhorro", ['ui.bootstrap', 'ui.bootstrap-slider']);

FondoAhorroController.$inject = ['VinikService'];
function FondoAhorroController(VinikService){
    console.log('FondoAhorroController');
    var vm = this;

    VinikService.getComission();

    vm.aportacionMensual = 2000;
     
    vm.aniosAhorro = 15;

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
            color: Highcharts.getOptions().colors[1]
        }, {
            name: 'Devoluciones Fiscales',
            y: -342000
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

app.directive("watch", function() {
  return function(scope, element, attrs) {
    element.on('mouseup', function(event) {
        console.log("Trying to update");
        myChart.update({
            series: [{
            upColor: Highcharts.getOptions().colors[2],
            color: Highcharts.getOptions().colors[3],
            data: [{
                name: 'Aportaciones Mensuales',
                y: 80000
            }, {
                name: 'Interés Ganado',
                y: 569000
            }, {
                name: 'Costo de Administración',
                y: 231000
            }, {
                name: 'Ahorro esperado',
                isIntermediateSum: true,
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Devoluciones Fiscales',
                y: -342000
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
    })
  }
})




