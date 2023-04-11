function add(add_item, data_list, json_url) {
    max_id = data_list.data[data_list.data.length - 1].id;
    add_item.id = max_id + 1;
    data_list.data.push(add_item);
    
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