$(document).ready(function(){
    $("#submit_btn").click(function(){
        jQuery.ajax({
            type: 'POST',
            url: "/api/fetch",
            data: {q:$("#query").val()},
            dataType: 'json',
            success: function(data) {
                console.log("SUCCESS!!!")
            }
          });
    })
})


