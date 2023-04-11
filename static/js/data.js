var userArray;

$.ajax({
    url: "../static/json/user.json",
    dataType: "json",
    data: "get",
    async: true,
    success: function (data) {
        userArray = data;
    }
})

var roomArray;

$.ajax({
    url: "../static/json/conferenceRoom.json",
    dataType: "json",
    data: "get",
    async: true,
    success: function (data) {
        roomArray = data;
    }
})

var employeeArray;

$.ajax({
    url: "../static/json/employees.json",
    dataType: "json",
    data: "get",
    async: true,
    success: function (data) {
        employeeArray = data;
    }
})