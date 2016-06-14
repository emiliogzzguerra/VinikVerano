


//Dropdown
$("#aportaciones").change(function() {
  a = $(this).val();

  //use rfiSchooldropdown
}).change();

$("#tiempo").change(function() {
  tPasado = t;
  t = $(this).val();
  //use rfiSchooldropdown
}).change();

//Tabla
var verde = 0;
var azul = 1;
var AzulOVerde = false; //False = Verde, True = Azul
var selections;
var all;
var $table = $('#table');
var nAzul = "HolaAzul";
var nVerde = "HolaVerde";

//AngularApp
var app = angular.module("fondoDeAhorro", []);

app.controller('ExampleController', ['$scope', function($scope) {
      $scope.master = {};

      $scope.save = function() {

        lineChartData.labels = [];
        lineChartData.datasets[0].data = [];
        lineChartData.datasets[1].data = [];
        lineChartData.datasets[2].data = [];
        lineChartData.datasets[3].data = [];

        iPeriodos = t*12;
        chartUpdate();

      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    }]);


$(document).ready(function() {
  //WindowResize
  $(window).resize(function() {
      // This will fire each time the window is resized:
      if($(window).width() >= 1024) {
          // if larger or equal
          iPeriodos = t*12;
      } else {
          // if smaller
          iPeriodos = t*20;
      }
  }).resize();

});


        $(function () {
            var sum=2;
            all = $table.bootstrapTable('getData');

            var $result = $('#eventsResult');

            $('#table')
            .on('all.bs.table', function (e, name, args) {

                $("tr[data-uniqueid='"+verde+"']").addClass('table-green');
                $("tr[data-uniqueid='"+azul+"']").addClass('table-blue');

                if(sum == 2){
                    for (var i = 0; i < all.length; i++) {
                        if (all[i].id != azul && all[i].id != verde) {
                            $("input[data-index='" + i + "']").prop("disabled",true);
                        }
                    }

                }
            })
            .on('load-success.bs.table', function (e, data) {

                all = $table.bootstrapTable('getData');




                for (var i = 0; i < all.length; i++) {
                    $("input[data-index='" + i + "']").attr('id', i);
                }

                for (var i = 0; i < all.length; i++) {
                    if (all[i].id != azul && all[i].id != verde) {
                        $("input[data-index='" + i + "']").prop("disabled",true);
                    }
                }
            })
            .on('check.bs.table', function (e, row) {
                //$result.text('Event: check.bs.table');





                if (azul == -1) {
                    azul = row.id;
                    $("tr[data-uniqueid='"+row.id+"']").addClass('table-blue');

                    Bazul = row.b;
                    nAzul = row.nombre;
                } else if (verde == -1) {
                    verde = row.id;
                    $("tr[data-uniqueid='"+row.id+"']").addClass('table-green');

                    Bverde = row.b;
                    nVerde = row.nombre;
                }

                if(sum < 2){
                    sum += 1;
                    if(sum == 2){
                        for (var i = 0; i < all.length; i++) {
                            if (all[i].id != azul && all[i].id != verde) {
                                $("input[data-index='" + i + "']").prop("disabled",true);
                            }
                        }

                    }
                }

                lineChartData.labels = [];
                lineChartData.datasets[0].data = [];
                lineChartData.datasets[1].data = [];
                lineChartData.datasets[2].data = [];
                lineChartData.datasets[3].data = [];

                iPeriodos = t*12;
                chartUpdate();

            })
            .on('uncheck.bs.table', function (e, row) {

                if(row.id == azul){
                    azul = -1;
                } else if(row.id == verde) {
                    verde = -1;
                }

                selections = $table.bootstrapTable('getSelections');

                $("tr[data-uniqueid='" + row.id + "']").removeAttr('class');

                for (var i = 0; i < all.length; i++) {
                    if (all[i].id != azul && all[i].id != verde) {
                        $("input[data-index='" + i + "']").prop("disabled",false);
                    }
                }




                sum -= 1;
            });
        });





        //Grafica

        Chart.numberWithCommas = function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        var a = 3000; //Aportaciones (Mensuales)
        var t = 30; //Tiempo en años
        var tPasado = 30;
        var d = new Date();
        var A = d.getFullYear();
        var iPeriodos = t*12; //Multiplicar años*12
        var t1 = 0;
        var t2 = 0;
        var intervalo = 10;
        var iAzul = 0; //Determinante de la fila de betas
        var iRojo = 1; //Determinante de la fila de betas
        var Bverde = [1.10,1.06];
        var Bazul = [1.12,1.08];

        var B2 = [[1.10,1.07],[1.12,1.05],[1.07,1.04]];
        var color = ["rgba(14,14,141,0.2)","rgba(25, 187, 0,0.2)","rgba(255,255,255,1)","rgba(14,14,141,0.8)","rgba(25, 187, 0,0.8)"];
        var arrayNombres = ["Axa  Max","Axa Min","Old Mutual  Max","Old Mutual Min","Banorte  Max","Banorte Min"];

        //Color[0] = Azul
        //Color[1] = Rojo
        //Color[2] = Blanco
        //Color[3] = Azul Mas Fuerte
        //Color[4] = Rojo Mas Fuerte
            var lAzul_0 = function(i){ //Azul Alta
                var res = a*(Math.pow(Bazul[0],(i+1))-1)/(Bazul[0]-1);

                var n = res.toFixed(0);
                t1 += 12;
                return n;
            };

            var lAzul_1 = function(i){ //Azul Baja
                var res = a*(Math.pow(Bazul[1],(i+1))-1)/(Bazul[1]-1);
                var n = res.toFixed(0);
                t2 += 12;
                return n;
            };

            var lRojo_0 = function(i){ //Rojo Alta
                var res = a*(Math.pow(Bverde[0],(i+1))-1)/(Bverde[0]-1);

                var n = res.toFixed(0);
                t1 += 12;
                return n;
            };

            var lRojo_1 = function(i){ //Rojo Baja
                var res = a*(Math.pow(Bverde[1],(i+1))-1)/(Bverde[1]-1);
                var n = res.toFixed(0);
                t2 += 12;
                return n;
            };




        var lineChartData = {
            labels : [],
            datasets : [
                {
                    label: "Linea1",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea2",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea3",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea4",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea5",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                }
            ]
        }

        var lineChartData2 = {
            labels : [],
            datasets : [
                {
                    label: "Linea1",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea2",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea3",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea4",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                },
                {
                    label: "Linea5",
                    pointHighlightFill : "rgba(255,255,255,1)",
                    data : []
                }
            ]
        }

        var createGraph = function(){
            for (var i = 0; i <= t; i++) {
                if (i%intervalo) {}
                lineChartData.labels[i] = (A+i);
                if(Bazul[0]>=Bverde[0]){
                    if(Bazul[1]>=Bverde[0]){


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointStrokeColor = color[3]
                        lineChartData.datasets[0].pointHighlightStroke = color[3];;
                        lineChartData.datasets[0].pointColor = color[3];
                        lineChartData.datasets[0].strokeColor = color[3];
                        lineChartData.datasets[0].fillColor = color[0];
                        lineChartData.datasets[0].data[i] = lAzul_0(i);

                        lineChartData.datasets[1].pointStrokeColor = color[3];
                        lineChartData.datasets[1].pointHighlightStroke = color[3];
                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[3];
                        lineChartData.datasets[1].strokeColor = color[3];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lAzul_1(i);

                        lineChartData.datasets[2].pointStrokeColor = color[4];
                        lineChartData.datasets[2].pointHighlightStroke = color[4];
                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[4];
                        lineChartData.datasets[2].strokeColor = color[4];
                        lineChartData.datasets[2].fillColor = color[1];
                        lineChartData.datasets[2].data[i] = lRojo_0(i);

                        lineChartData.datasets[3].pointStrokeColor = color[4];
                        lineChartData.datasets[3].pointHighlightStroke = color[4];
                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[4];
                        lineChartData.datasets[3].strokeColor = color[4];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lRojo_1(i);

                    } else if (Bazul[1]>=Bverde[1]) {


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointColor = color[3];
                        lineChartData.datasets[0].pointStrokeColor = color[3];
                        lineChartData.datasets[0].pointHighlightStroke = color[3];
                        lineChartData.datasets[0].strokeColor = color[3];
                        lineChartData.datasets[0].fillColor = color[0];
                        lineChartData.datasets[0].data[i] = lAzul_0(i);

                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[3];
                        lineChartData.datasets[1].pointStrokeColor = color[3];
                        lineChartData.datasets[1].pointHighlightStroke = color[3];
                        lineChartData.datasets[1].strokeColor = color[3];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lAzul_1(i);

                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[4];
                        lineChartData.datasets[2].pointStrokeColor = color[4];
                        lineChartData.datasets[2].pointHighlightStroke = color[4];
                        lineChartData.datasets[2].strokeColor = color[4];
                        lineChartData.datasets[2].fillColor = color[1];
                        lineChartData.datasets[2].data[i] = lRojo_0(i);

                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[4];
                        lineChartData.datasets[3].pointStrokeColor = color[4];
                        lineChartData.datasets[3].pointHighlightStroke = color[4];
                        lineChartData.datasets[3].strokeColor = color[4];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lRojo_1(i);
                    } else {


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointColor = color[4];
                        lineChartData.datasets[0].pointStrokeColor = color[4];
                        lineChartData.datasets[0].pointHighlightStroke = color[4];
                        lineChartData.datasets[0].strokeColor = color[4];
                        lineChartData.datasets[0].fillColor = color[1];
                        lineChartData.datasets[0].data[i] = lRojo_0(i);

                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[4];
                        lineChartData.datasets[1].pointStrokeColor = color[4];
                        lineChartData.datasets[1].pointHighlightStroke = color[4];
                        lineChartData.datasets[1].strokeColor = color[4];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lRojo_1(i);

                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[3];
                        lineChartData.datasets[2].pointStrokeColor = color[3];
                        lineChartData.datasets[2].pointHighlightStroke = color[3];
                        lineChartData.datasets[2].strokeColor = color[3];
                        lineChartData.datasets[2].fillColor = color[0];
                        lineChartData.datasets[2].data[i] = lAzul_0(i);

                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[3];
                        lineChartData.datasets[3].pointStrokeColor = color[3];
                        lineChartData.datasets[3].pointHighlightStroke = color[3];
                        lineChartData.datasets[3].strokeColor = color[3];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lAzul_1(i);
                    }
                } else {
                    if(Bverde[1]>=Bazul[0]){


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointColor = color[4];
                        lineChartData.datasets[0].pointStrokeColor = color[4];
                        lineChartData.datasets[0].pointHighlightStroke = color[4];
                        lineChartData.datasets[0].strokeColor = color[4];
                        lineChartData.datasets[0].fillColor = color[1];
                        lineChartData.datasets[0].data[i] = lRojo_0(i);

                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[4];
                        lineChartData.datasets[1].pointStrokeColor = color[4];
                        lineChartData.datasets[1].pointHighlightStroke = color[4];
                        lineChartData.datasets[1].strokeColor = color[4];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lRojo_1(i);

                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[3];
                        lineChartData.datasets[2].pointStrokeColor = color[3];
                        lineChartData.datasets[2].pointHighlightStroke = color[3];
                        lineChartData.datasets[2].strokeColor = color[3];
                        lineChartData.datasets[2].fillColor = color[0];
                        lineChartData.datasets[2].data[i] = lAzul_0(i);

                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[3];
                        lineChartData.datasets[3].pointStrokeColor = color[3];
                        lineChartData.datasets[3].pointHighlightStroke = color[3];
                        lineChartData.datasets[3].strokeColor = color[3];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lAzul_1(i);

                    } else if (Bverde[1]>=Bazul[1]) {


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointColor = color[4];
                        lineChartData.datasets[0].pointStrokeColor = color[4];
                        lineChartData.datasets[0].pointHighlightStroke = color[4];
                        lineChartData.datasets[0].strokeColor = color[4];
                        lineChartData.datasets[0].fillColor = color[1];
                        lineChartData.datasets[0].data[i] = lRojo_0(i);

                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[4];
                        lineChartData.datasets[1].pointStrokeColor = color[4];
                        lineChartData.datasets[1].pointHighlightStroke = color[4];
                        lineChartData.datasets[1].strokeColor = color[4];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lRojo_1(i);

                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[3];
                        lineChartData.datasets[2].pointStrokeColor = color[3];
                        lineChartData.datasets[2].pointHighlightStroke = color[3];
                        lineChartData.datasets[2].strokeColor = color[3];
                        lineChartData.datasets[2].fillColor = color[0];
                        lineChartData.datasets[2].data[i] = lAzul_0(i);

                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[3];
                        lineChartData.datasets[3].pointStrokeColor = color[3];
                        lineChartData.datasets[3].pointHighlightStroke = color[3];
                        lineChartData.datasets[3].strokeColor = color[3];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lAzul_1(i);

                    } else {


                        lineChartData.datasets[0].label = nAzul + " Max";
                        lineChartData.datasets[0].pointColor = color[3];
                        lineChartData.datasets[0].pointStrokeColor = color[3];
                        lineChartData.datasets[0].pointHighlightStroke = color[3];
                        lineChartData.datasets[0].strokeColor = color[3];
                        lineChartData.datasets[0].fillColor = color[3];
                        lineChartData.datasets[0].data[i] = lAzul_0(i);

                        lineChartData.datasets[1].label = nAzul + " Min";
                        lineChartData.datasets[1].pointColor = color[3];
                        lineChartData.datasets[1].pointStrokeColor = color[3];
                        lineChartData.datasets[1].pointHighlightStroke = color[3];
                        lineChartData.datasets[1].strokeColor = color[3];
                        lineChartData.datasets[1].fillColor = color[2];
                        lineChartData.datasets[1].data[i] = lAzul_1(i);

                        lineChartData.datasets[2].label = nVerde + " Max";
                        lineChartData.datasets[2].pointColor = color[4];
                        lineChartData.datasets[2].pointStrokeColor = color[4];
                        lineChartData.datasets[2].pointHighlightStroke = color[4];
                        lineChartData.datasets[2].strokeColor = color[4];
                        lineChartData.datasets[2].fillColor = color[1];
                        lineChartData.datasets[2].data[i] = lRojo_0(i);

                        lineChartData.datasets[3].label = nVerde + " Min";
                        lineChartData.datasets[3].pointColor = color[4];
                        lineChartData.datasets[3].pointStrokeColor = color[4];
                        lineChartData.datasets[3].pointHighlightStroke = color[4];
                        lineChartData.datasets[3].strokeColor = color[4];
                        lineChartData.datasets[3].fillColor = color[2];
                        lineChartData.datasets[3].data[i] = lRojo_1(i);

                    }
                }

                /*

                lineChartData.datasets[0].data[i] = lAzul_0(i);
                lineChartData.datasets[1].data[i] = lAzul_1(i);
                lineChartData.datasets[2].data[i] = lRojo_0(i);
                lineChartData.datasets[3].data[i] = lRojo_1(i);
                */
            };
            for (var i = 0; i <= t; i++) {
                lineChartData2.labels[i] = (A+i);
                if(B2[iAzul][0]>=B2[iRojo][0]){
                    if(B2[iAzul][1]>=B2[iRojo][0]){


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointStrokeColor = color[3]
                        lineChartData2.datasets[0].pointHighlightStroke = color[3];;
                        lineChartData2.datasets[0].pointColor = color[3];
                        lineChartData2.datasets[0].strokeColor = color[3];
                        lineChartData2.datasets[0].fillColor = color[0];
                        lineChartData2.datasets[0].data[i] = lAzul_0(i);

                        lineChartData2.datasets[1].pointStrokeColor = color[3];
                        lineChartData2.datasets[1].pointHighlightStroke = color[3];
                        lineChartData2.datasets[1].label = nAzul + " Min";
                        lineChartData2.datasets[1].pointColor = color[3];
                        lineChartData2.datasets[1].strokeColor = color[3];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lAzul_1(i);

                        lineChartData2.datasets[2].pointStrokeColor = color[4];
                        lineChartData2.datasets[2].pointHighlightStroke = color[4];
                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[4];
                        lineChartData2.datasets[2].strokeColor = color[4];
                        lineChartData2.datasets[2].fillColor = color[1];
                        lineChartData2.datasets[2].data[i] = lRojo_0(i);

                        lineChartData2.datasets[3].pointStrokeColor = color[4];
                        lineChartData2.datasets[3].pointHighlightStroke = color[4];
                        lineChartData2.datasets[3].label = nVerde + " Min";
                        lineChartData2.datasets[3].pointColor = color[4];
                        lineChartData2.datasets[3].strokeColor = color[4];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lRojo_1(i);

                    } else if (B2[iAzul][1]>=B2[iRojo][1]) {


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointColor = color[3];
                        lineChartData2.datasets[0].pointStrokeColor = color[3];
                        lineChartData2.datasets[0].pointHighlightStroke = color[3];
                        lineChartData2.datasets[0].strokeColor = color[3];
                        lineChartData2.datasets[0].fillColor = color[0];
                        lineChartData2.datasets[0].data[i] = lAzul_0(i);

                        lineChartData2.datasets[1].label = nAzul + " Min";
                        lineChartData2.datasets[1].pointColor = color[3];
                        lineChartData2.datasets[1].pointStrokeColor = color[3];
                        lineChartData2.datasets[1].pointHighlightStroke = color[3];
                        lineChartData2.datasets[1].strokeColor = color[3];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lAzul_1(i);

                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[4];
                        lineChartData2.datasets[2].pointStrokeColor = color[4];
                        lineChartData2.datasets[2].pointHighlightStroke = color[4];
                        lineChartData2.datasets[2].strokeColor = color[4];
                        lineChartData2.datasets[2].fillColor = color[1];
                        lineChartData2.datasets[2].data[i] = lRojo_0(i);

                        lineChartData2.datasets[3].label = nVerde + " Min";
                        lineChartData2.datasets[3].pointColor = color[4];
                        lineChartData2.datasets[3].pointStrokeColor = color[4];
                        lineChartData2.datasets[3].pointHighlightStroke = color[4];
                        lineChartData2.datasets[3].strokeColor = color[4];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lRojo_1(i);
                    } else {


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointColor = color[4];
                        lineChartData2.datasets[0].pointStrokeColor = color[4];
                        lineChartData2.datasets[0].pointHighlightStroke = color[4];
                        lineChartData2.datasets[0].strokeColor = color[4];
                        lineChartData2.datasets[0].fillColor = color[1];
                        lineChartData2.datasets[0].data[i] = lRojo_0(i);

                        lineChartData2.datasets[1].label = nAzul + " Min";
                        lineChartData2.datasets[1].pointColor = color[4];
                        lineChartData2.datasets[1].pointStrokeColor = color[4];
                        lineChartData2.datasets[1].pointHighlightStroke = color[4];
                        lineChartData2.datasets[1].strokeColor = color[4];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lRojo_1(i);

                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[3];
                        lineChartData2.datasets[2].pointStrokeColor = color[3];
                        lineChartData2.datasets[2].pointHighlightStroke = color[3];
                        lineChartData2.datasets[2].strokeColor = color[3];
                        lineChartData2.datasets[2].fillColor = color[0];
                        lineChartData2.datasets[2].data[i] = lAzul_0(i);

                        lineChartData2.datasets[3].label = nVerde + " Min";
                        lineChartData2.datasets[3].pointColor = color[3];
                        lineChartData2.datasets[3].pointStrokeColor = color[3];
                        lineChartData2.datasets[3].pointHighlightStroke = color[3];
                        lineChartData2.datasets[3].strokeColor = color[3];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lAzul_1(i);
                    }
                } else {
                    if(B2[iRojo][1]>=B2[iAzul][0]){


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointColor = color[4];
                        lineChartData2.datasets[0].pointStrokeColor = color[4];
                        lineChartData2.datasets[0].pointHighlightStroke = color[4];
                        lineChartData2.datasets[0].strokeColor = color[4];
                        lineChartData2.datasets[0].fillColor = color[1];
                        lineChartData2.datasets[0].data[i] = lRojo_0(i);

                        lineChartData2.datasets[1].label = nAzul + " Min";
                        lineChartData2.datasets[1].pointColor = color[4];
                        lineChartData2.datasets[1].pointStrokeColor = color[4];
                        lineChartData2.datasets[1].pointHighlightStroke = color[4];
                        lineChartData2.datasets[1].strokeColor = color[4];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lRojo_1(i);

                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[3];
                        lineChartData2.datasets[2].pointStrokeColor = color[3];
                        lineChartData2.datasets[2].pointHighlightStroke = color[3];
                        lineChartData2.datasets[2].strokeColor = color[3];
                        lineChartData2.datasets[2].fillColor = color[0];
                        lineChartData2.datasets[2].data[i] = lAzul_0(i);

                        lineChartData2.datasets[3].label = nVerde + " Min";
                        lineChartData2.datasets[3].pointColor = color[3];
                        lineChartData2.datasets[3].pointStrokeColor = color[3];
                        lineChartData2.datasets[3].pointHighlightStroke = color[3];
                        lineChartData2.datasets[3].strokeColor = color[3];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lAzul_1(i);

                    } else if (B2[iRojo][1]>=B2[iAzul][1]) {


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointColor = color[4];
                        lineChartData2.datasets[0].pointStrokeColor = color[4];
                        lineChartData2.datasets[0].pointHighlightStroke = color[4];
                        lineChartData2.datasets[0].strokeColor = color[4];
                        lineChartData2.datasets[0].fillColor = color[1];
                        lineChartData2.datasets[0].data[i] = lRojo_0(i);

                        lineChartData2.datasets[1].label = nAzul + " Min";
                        lineChartData2.datasets[1].pointColor = color[4];
                        lineChartData2.datasets[1].pointStrokeColor = color[4];
                        lineChartData2.datasets[1].pointHighlightStroke = color[4];
                        lineChartData2.datasets[1].strokeColor = color[4];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lRojo_1(i);

                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[3];
                        lineChartData2.datasets[2].pointStrokeColor = color[3];
                        lineChartData2.datasets[2].pointHighlightStroke = color[3];
                        lineChartData2.datasets[2].strokeColor = color[3];
                        lineChartData2.datasets[2].fillColor = color[0];
                        lineChartData2.datasets[2].data[i] = lAzul_0(i);

                        lineChartData2.datasets[3].label = nVerde + " Min";
                        lineChartData2.datasets[3].pointColor = color[3];
                        lineChartData2.datasets[3].pointStrokeColor = color[3];
                        lineChartData2.datasets[3].pointHighlightStroke = color[3];
                        lineChartData2.datasets[3].strokeColor = color[3];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lAzul_1(i);

                    } else {


                        lineChartData2.datasets[0].label = nAzul + " Max";
                        lineChartData2.datasets[0].pointColor = color[3];
                        lineChartData2.datasets[0].pointStrokeColor = color[3];
                        lineChartData2.datasets[0].pointHighlightStroke = color[3];
                        lineChartData2.datasets[0].strokeColor = color[3];
                        lineChartData2.datasets[0].fillColor = color[0];
                        lineChartData2.datasets[0].data[i] = lAzul_0(i);
                        lineChartData2.datasets[3].label = nAzul + " Min";
                        lineChartData2.datasets[3].pointColor = color[4];
                        lineChartData2.datasets[3].pointStrokeColor = color[4];
                        lineChartData2.datasets[3].pointHighlightStroke = color[4];
                        lineChartData2.datasets[3].strokeColor = color[4];
                        lineChartData2.datasets[3].fillColor = color[2];
                        lineChartData2.datasets[3].data[i] = lAzul_1(i);
                        lineChartData2.datasets[2].label = nVerde + " Max";
                        lineChartData2.datasets[2].pointColor = color[4];
                        lineChartData2.datasets[2].pointStrokeColor = color[4];
                        lineChartData2.datasets[2].pointHighlightStroke = color[4];
                        lineChartData2.datasets[2].strokeColor = color[4];
                        lineChartData2.datasets[2].fillColor = color[1];
                        lineChartData2.datasets[2].data[i] = lRojo_0(i);
                        lineChartData2.datasets[1].label = nVerde + " Min";
                        lineChartData2.datasets[1].pointColor = color[3];
                        lineChartData2.datasets[1].pointStrokeColor = color[3];
                        lineChartData2.datasets[1].pointHighlightStroke = color[3];
                        lineChartData2.datasets[1].strokeColor = color[3];
                        lineChartData2.datasets[1].fillColor = color[2];
                        lineChartData2.datasets[1].data[i] = lRojo_1(i);

                    }
                }

                /*

                lineChartData.datasets[0].data[i] = lAzul_0(i);
                lineChartData.datasets[1].data[i] = lAzul_1(i);
                lineChartData.datasets[2].data[i] = lRojo_0(i);
                lineChartData.datasets[3].data[i] = lRojo_1(i);
                */
            };
        };

        createGraph();





        /*




        */

    var chartUpdate = function() {

        createGraph();

        // Replace the chart canvas element
        $('#canvas').replaceWith('<canvas id="canvas" height="300" width="600"></canvas>');

        var ctx = document.getElementById("canvas").getContext("2d");
        new Chart(ctx).Line(lineChartData, {
            scaleLabel: "$<%=Chart.numberWithCommas(value)%>",
            responsive: true,
            scaleShowVerticalLines: false,
            scaleShowHorizontalLines: false,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 10,
            multiTooltipTemplate: "<%= datasetLabel %> - $<%= Chart.numberWithCommas(value) %>",
            /*,
            scaleOverride : true,
            scaleSteps : 10,
            scaleStepWidth : 100000,
            scaleStartValue : a
            */
        });
    }


    window.onload = function(){
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            scaleLabel: "$<%=Chart.numberWithCommas(value)%>",
            responsive: true,
            scaleShowVerticalLines: false,
            scaleShowHorizontalLines: false,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 10,
            multiTooltipTemplate: "<%= datasetLabel %> - $<%= Chart.numberWithCommas(value) %>",
            /*,
            scaleOverride : true,
            scaleSteps : 10,
            scaleStepWidth : 100000,
            scaleStartValue : a
            */
        });


        var ctx2 = document.getElementById("canvas1").getContext("2d");
        window.myLine = new Chart(ctx2).Line(lineChartData2, {
            scaleLabel: "$<%=Chart.numberWithCommas(value)%>",
            responsive: true,
            scaleShowVerticalLines: false,
            scaleShowHorizontalLines: false,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 10,
            multiTooltipTemplate: "<%= datasetLabel %> - $<%= Chart.numberWithCommas(value) %>",
            /*,
            scaleOverride : true,
            scaleSteps : 10,
            scaleStepWidth : 100000,
            scaleStartValue : a
            */
        });
    }
