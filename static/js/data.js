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

var roomArray;

$.ajax({
    url: "static/json/conferenceRoom.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function(data){
        roomArray = data; 
    }
})