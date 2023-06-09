var userArray;

$.ajax({
    url: "../static/json/user.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function (data) {
        userArray = data;
    }
})

var roomArray;

$.ajax({
    url: "../static/json/conferenceRoom.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function (data) {
        roomArray = data;
    }
})

var employeeArray;

$.ajax({
    url: "../static/json/employees.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function (data) {
        employeeArray = data;
    }
})

var meetArray;

$.ajax({
    url: "../static/json/meeting.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function(data){
        meetArray = data; 
    }
})

var departmentArray;

$.ajax({
    url: "../static/json/department.json",
    dataType: "json",
    data: "get",
    async: false,
    success: function(data){
        departmentArray = data;
    }
})