var userArray;

$.ajax({
    url: "static/json/user.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function(data) {
        userArray = data;
    }
})