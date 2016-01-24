var chart = null;
var chart_data = [
    ['Anger'],
    ['Disgust'],
    ['Happy'],
    ['Sad'],
    ['Surprise'],
]

function updateCol(col,val){
  if(val){
    chart_data[col].push(1);
  }else{
    chart_data[col].push(0);
  }
}

function pushData(response){
  updateCol(0,response.anger);
  updateCol(1,response.disgust);
  updateCol(2,response.happy);
  updateCol(3,response.sad);
  updateCol(4,response.surprise);
}

function reloadChart(){
  chart.load({
    columns: chart_data
  })
}

function updateChartData(response){

  pushData(response);


  reloadChart();

}

$(document).ready(function(){

    chart = c3.generate({
        bindto: '#donutgauge',
        data: {
            columns: chart_data,
            type : 'donut',
            /*onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }*/
        },
        donut: {
            title: "Total Emotions"
        },
        color: {
        pattern: ['#ff6347', '#47ffac', '#fff200', '#0091ff', '#b700ff']
        }
    });

})
