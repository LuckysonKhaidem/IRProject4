$(document).ready(function(){
    const populateQueryResults = function(data) {
        results = data["result"]["response"]["docs"]
        $('#tweet_results').empty()
        $('#sentiment-plot').empty()
        $('#top-ten').empty()
        var html = ""
        for(var i = 0; i < results.length;i++) {
            var tweet_date = results[i]["tweet_date"].split("T")[0]
            var tweet_time = results[i]["tweet_date"].split("T")[1]
            var item = `<div class="col-xs-12 col-sm-12 col-md-2">
            <ul class="meta-search">
                <li><i class="glyphicon glyphicon-calendar"></i> <span>${tweet_date}</span></li>
                <li><i class="glyphicon glyphicon-time"></i> <span>${tweet_time}</span></li>
                <li><i class="glyphicon glyphicon-tags"></i> <span>People</span></li>
            </ul>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
            <h8>Person of Interest: ${results[i]["poi_name"]}</h8>
            <p>${results[i]["tweet_text"]}</p>
            <span class="plus"><a href="#" title="Lorem ipsum"><i class="glyphicon glyphicon-plus"></i></a></span>
        </div>
        <span class="clearfix borda"></span>`
        html += item
        }
        $('#tweet_results').append(html) 
        $('#sentiment-plot').append(data["sentiment_plot"])
        $('#top-ten').append(data["top10_plot"])
  
    }

    $("#submit_btn").click(function(){
        jQuery.ajax({
            type: 'POST',
            url: "/api/fetch",
            data: {q:$("#query").val()},
            dataType: 'json',
            success: function(data) {
                console.log(data)
                populateQueryResults(data)
            }
          });
    })
})


