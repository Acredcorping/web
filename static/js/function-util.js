function json_attr(data_list, json_url) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/' + json_url,
        async: true,
        data: JSON.stringify(data_list),
        contentType: "application/json",
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        }
    })
}