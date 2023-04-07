$(function(){
    $(document).keydown(function(event){
        if(event.keyCode == 13){
            $("#login-submit-btn").trigger("mousedown");
        }
    })

    $("#login_submit_btn").on("mousedown",function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var message = "";
        if(username != "123"){
            message = "用户名错误！";
        }
        else if(password != "123"){
            message = "密码错误！";
        }
        if(message != ""){
            alert(message);
        }
        else{
            location.href = "main.html";
        }
    })
})