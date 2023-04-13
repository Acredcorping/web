$(function () {
    var userArray;

    $.ajax({
        url: "./static/json/user.json",
        dataType: "json",
        data: "get",
        async: false,
        success: function (data) {
            userArray = data;
        }
    })

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $("#login-submit-btn").trigger("mousedown");
        }
    })

    $("#login_submit_btn").on("mousedown", function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var message = "";
        for (var i = 0; i < userArray.length; i++) {
            if (username == userArray[i].u_name) {
                if (password == userArray[i].u_pwd) {
                    location.href = "main.html";
                    message = "success";
                    break;
                }
                else {
                    message = "密码错误";
                    break;
                }
            }
        }
        if (message == "") {
            message = "用户名不存在";
        }
        if (message != "success") {
            alert(message);
        }
    })
})
