//AngularApp
var app = angular.module("fondoDeAhorro", ['ui.bootstrap', 'ui.bootstrap-slider']);

FondoAhorroController.$inject = ['VinikService', '$timeout','$interval'];
function FondoAhorroController(VinikService, $timeout, $interval){
    console.log('FondoAhorroController');
    var vm = this;

    delta = 200000;
    vm.ahorroAcumuladoTotal = Date.now()*delta;
    // Variables
    vm.aportacionMensual = 3000;
    vm.aniosAhorro = 10;
    vm.risk = "Media";
    vm.ahorro = "Si";
    vm.results = {};

    vm.admin_cost = 0;
    vm.interesAnual = 0.09; //default
    vm.interesMensual = (Math.pow(vm.interesAnual+1,(1/12))-1);
    vm.aportacionOptions = {};
    vm.ahorroOptions = {};

    // Options
    vm.aportacionOptions = {
        min : 1500,
        step : 500,
        max : 20000,
        value : vm.aportacionMensual
    };
    vm.ahorroOptions = {
        min : 3,
        step : 1,
        max : 25,
        value : vm.aniosAhorro
    };
    vm.riskOptions = ['Alta', 'Media', 'Baja'];
    vm.ahorroBoolean = ["Si", "No"];

    // params
    var params = {};
    params = {
        comisionVariable: 0.00001667,       //Contrato Old Mutual 14/05/17
        comisionFija: 0.075,                //Contrato Old Mutual 14/05/17
        salarioMinimo: 63.92,             //Supuesto Oscar (solver)
        inflacion: 0.029,                 //Supuesto Oscar (solver)
        isr: 0.30,                        //Supuesto Oscar
        deduccionAnualMaxima: 137769.25   //Ley ISR 2017 (Gustavo)
    };

    // Results
    vm.results = {
        aportacionesTotales: 360000,
        interesGanado: 244400,
        costoAdministracion: -72800,
        ahorroEsperado: 0,
        devolucionesFiscales: 108000,
        ahorroAcumulado: 0,
        ahorroAcumuladoFixed: 639600.012324
    };

    console.log('Default');
    console.log('vm.admin_cost', vm.admin_cost);

    // Functions
    vm.changes = changes;

    $interval(function() {
        delta = delta + 10;
        vm.ahorroAcumuladoTotal = Date.now()*delta;
        vm.ahorroAcumuladoTotal = Math.round(vm.ahorroAcumuladoTotal/1000000)*1000000;
        vm.ahorroAcumuladoTotal = vm.ahorroAcumuladoTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        vm.ahorroAcumuladoTotal = '$' + vm.ahorroAcumuladoTotal;
    }, 1500);

    function changes(){
      $timeout(function(){
        console.log('Test with change');
        calculateData();
      }, 300);
    }

    function calculateData(){
        console.log('calculateData');
        console.log('vm.admin_cost', vm.admin_cost);

        var jsonResponse = VinikService.getComission(vm.aportacionMensual,vm.aniosAhorro,vm.risk);

        jsonResponse.then(function(value){
            vm.admin_cost = value.data.admin_cost;

            // InteresGanadoLogic
            if(vm.risk == 'Baja'){
                vm.interesAnual = 0.07; //Baja
            } else if (vm.risk == 'Media'){
                vm.interesAnual = 0.09; //Media
            } else {
                vm.interesAnual = 0.12; //Alta
            }

            vm.interesMensual = (Math.pow(vm.interesAnual+1,(1/12))-1);
            var f1 = Math.pow(1+vm.interesMensual, vm.aniosAhorro*12+1);
            var f2 = f1 - (1+vm.interesMensual);
            var f3 = vm.aportacionMensual * f2 / vm.interesMensual;
            vm.results.aportacionesTotales = vm.aportacionMensual * vm.aniosAhorro * 12;
            vm.results.interesGanado = f3 - vm.results.aportacionesTotales;
            vm.results.costoAdministracion = vm.admin_cost;
            vm.results.ahorroEsperado = vm.results.aportacionesTotales + vm.results.interesGanado - vm.results.costoAdministracion;
            vm.results.devolucionesFiscales = Math.min(params.isr * vm.aportacionMensual * vm.aniosAhorro * 12, params.deduccionAnualMaxima * vm.aniosAhorro);
            vm.results.ahorroAcumulado = vm.results.ahorroEsperado + vm.results.devolucionesFiscales;

            vm.results.ahorroAcumuladoFixed = angular.copy(vm.results.ahorroAcumulado.toFixed(2));

            if(vm.ahorro == "No"){
                myChart.update({
                    series: [{
                        upColor: colors.positive,
                        color: colors.negative,
                        borderColor: colors.bg,
                        data: [{
                            name: 'Aportaciones Mensuales',
                            y: vm.results.aportacionesTotales
                        }, {
                            name: 'Interés Ganado',
                            y: vm.results.interesGanado -vm.results.costoAdministracion
                        },{
                            name: 'Ahorro Acumulado',
                            isSum: true,
                            color: colors.sum,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return '$' + Math.round(this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                },
                                style: {

                                    fontSize: '14px'
                                }
                            }
                        }],
                        pointPadding: 0
                    }]
                });
            } else {
                myChart.update({
                    series: [{
                        upColor: colors.positive,
                        color: colors.negative,
                        borderColor: colors.bg,
                        data: [{
                            name: 'Aportaciones Mensuales',
                            y: vm.results.aportacionesTotales
                        }, {
                            name: 'Interés Ganado',
                            y: vm.results.interesGanado -vm.results.costoAdministracion
                        }, {
                            name: 'Devoluciones Fiscales',
                            y: vm.results.devolucionesFiscales
                        }, {
                            name: 'Ahorro Acumulado',
                            isSum: true,
                            color: colors.sum,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return '$' + Math.round(this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                },
                                style: {

                                    fontSize: '14px'
                                }
                            }
                        }],
                        pointPadding: 0
                    }]
                });
            }
        });
    }

    function init(){
      calculateData();
    }
}
app.controller('FondoAhorroController', FondoAhorroController);

ModalController.$inject = ['VinikService', '$timeout'];
function ModalController(VinikService, $timeout){
    console.log('ModalController');
    var vm = this;

    vm.send = send;

    function send(form){
        if(form.$invalid){
            console.error('FORM INVALID');
            form.$setSubmitted();
        }else {
            console.log('FORM VALID');
        }
    }
}

app.controller('ModalController', ModalController);


// HighCharts
var colors = {
    text: '#333',
    bg: '#F6F4F4',
    lines: '#d6dadc',
    positive: '#69bd28',
    sum: '#3477CE',
    negative: '#B8504D'
};
var myChart = Highcharts.chart('container', {
    chart: {
        type: 'waterfall',
        inverted: true,
        backgroundColor: colors.bg,
        marginLeft: 90
    },

    title: {
        text: '',
         style: {
            color: colors.text
         }
    },

    xAxis: {
        type: 'category',
        labels: {
         style: {
            color: colors.text,
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: '13px',
         },
         useHTML : true
      }
    },

    yAxis: {
        title: {
            text: 'MXN',
            style: {
                color: colors.text,
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: '13px'
            }
        },
        gridLineColor: colors.lines,
        labels: {
         style: {
            color: colors.text,
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: '13px'
         }
      }
    },

    legend: {
        enabled: false
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.4f}</b> MXN',
    },
    exporting: {
        enabled: false
    },
    credits: {
      enabled: false
    },


    series: [{
        upColor: colors.positive,
        color: colors.negative,
        borderColor: colors.bg,
        data: [{
            name: 'Aportaciones Mensuales',
            y: 360000
        }, {
            name: 'Interés Ganado',
            y: 244400 -72800
        }, {
            name: 'Devoluciones Fiscales',
            y: 108000
        }, {
            name: 'Ahorro Acumulado',
            isSum: true,
            color: colors.sum,
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return '$' + Math.round(this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                style: {

                    fontSize: '14px'
                }
            }
        }],
        pointPadding: 0
    }]
});


$(window).resize(function() 
{    
    myChart.setSize(
       $('#container').width(), 
       $('#container').height(),
       false
    );   
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


$(window).paroller({ 
    factor: '0.5', 
    type: 'foreground', 
    // direction: 'horizontal' 
});