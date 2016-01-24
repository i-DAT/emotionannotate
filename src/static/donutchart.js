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

function updateChartData(response){
  /*if(response.anger){
    chart_data[0].push(1);
  }else{
    chart_data[0].push(0);
  }

  if(response.disgust){
    chart_data[1].push(1);
  }else{
    chart_data[1].push(0);
  }

  if(response.happy){
    chart_data[2].push(1);
  }else{
    chart_data[2].push(0);
  }

  if(response.sad){
    chart_data[3].push(1);
  }else{
    chart_data[3].push(0);
  }

  if(response.surprise){
    chart_data[4].push(1);
  }else{
    chart_data[4].push(0);
  }*/

  updateCol(0,response.anger);
  updateCol(1,response.disgust);
  updateCol(2,response.happy);
  updateCol(3,response.sad);
  updateCol(4,response.surprise);



  chart.load({
    columns: chart_data
  })
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
