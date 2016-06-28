angular.module('app', ['controller'])

var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
  labels : ["Pago"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : [28000]
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : [21000]
    }
  ]

}
window.onload = function(){
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myBar = new Chart(ctx).Bar(barChartData, {
    responsive : true,
    showTooltips: false,
    scaleOverride : true,
    scaleSteps : 6,
    scaleStepWidth : 5000,
    scaleStartValue : 0,
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bar) {
                ctx.fillText(bar.value, bar.x, bar.y - 5);
            });
        })
    }
  });
}
