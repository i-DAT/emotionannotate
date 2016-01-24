var tweetnum = 0;

var tweet_data = null;
var interval = null;

function displayRandomTweet(){
  var tweet = tweet_data[Math.floor(Math.random()*tweet_data.length)];
  addTweet(tweet.tweet, tweet.response);
}

function getTweets(){
  $.get( "../static/result.json", function( data ) {
    tweet_data = data;
  });
}

function generateEmotionVisual(value){
  if (value){
    return "<td class='col-md-1'><div class='green'><p class='emotion'></p></div></td>";
  }else{
    return "<td class='col-md-1'><div class='red'><p class='emotion'></p></div></td>";
  }
}

function addTweet(text, response){
  tweetnum++;
  table_html = "<th class='col-md-1' scope='row'>"+tweetnum+"</th>";
  table_html += "<td>"+text+"</td>";

  table_html += generateEmotionVisual(response.anger);
  table_html += generateEmotionVisual(response.disgust);
  table_html += generateEmotionVisual(response.happy);
  table_html += generateEmotionVisual(response.sad);
  table_html += generateEmotionVisual(response.surprise);


  $('#results-table > tbody ').prepend('<tr>'+table_html+'</tr>');

  updateChartData(response);
}

$(document).ready(function(){

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

                      addTweet(uInput,response);
                  },
            });
        }
    });
});
