
function generateEmotionVisual(value){
  if (value){
    return "<td class='col-md-1'><div class='green'><p class='emotion'></p></div></td>";
  }else{
    return "<td class='col-md-1'><div class='red'><p class='emotion'></p></div></td>";
  }
}

$(document).ready(function(){
    var tweetnum = 0;

    $("#submit").click(function(event){
        var uInput = $("#user-input").val();
        if (uInput != ""){
          $("#user-input").prop('disabled', true);
          $("#submit").prop('disabled', true);
          $.ajax({
                type: "POST",
                url: '/learning',
                data: JSON.stringify({text: uInput}),
                contentType: 'application/json',
                success: function(response){
                      $("#user-input").prop('disabled', false);
                      $("#submit").prop('disabled', false);
                      $("#user-input").val('');

                      tweetnum++;
                      table_html = "<th class='col-md-1' scope='row'>"+tweetnum+"</th>";
                      table_html += "<td>"+uInput+"</td>";

                      table_html += generateEmotionVisual(response.anger);
                      table_html += generateEmotionVisual(response.disgust);
                      table_html += generateEmotionVisual(response.happy);
                      table_html += generateEmotionVisual(response.sad);
                      table_html += generateEmotionVisual(response.surprise);


                      $('#results-table > tbody ').prepend('<tr>'+table_html+'</tr>');

                      updateChartData(response);
                  },
            });
        }
    });
});
