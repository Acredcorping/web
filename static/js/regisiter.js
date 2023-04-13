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

    $("#register_submit_button").on("click", function () {
        if($("#confirm_register_password").val() !== $("#register_password").val()){
            return false;
        }
        var users = userArray;
        var username = $("#register_username").val();
        var password = $("#register_password").val();
<<<<<<< HEAD
        var passwordInput = document.getElementById("register_password");
        var confirmPasswordInput = document.getElementById("confirm_register_password");
        confirmPasswordInput.addEventListener("input", function () {
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordInput.setCustomValidity("Passwords do not match");
                alert("Passwords do not match");
                
            }
        });
=======
>>>>>>> 19798bbcad4181fff24106a9f0d81ecc8ee18bd7
        if (users.length == 0) {
            last_id = 1;
        } else {
            last_id = users[users.length - 1].u_id + 1;
        }
        var new_user = {
            "u_id": last_id,
            "u_name": username,
            "u_pwd": password
        }
        users.push(new_user);
        json_attr(users, 'save-user-data');
        location.href = "login.html";
        return false;
    })
<<<<<<< HEAD
})
=======
})
function checkPwd() {
    console.log("checkPwd");
    // var passwordInput = document.getElementById("register_password");
    // var confirmPasswordInput = document.getElementById("confirm_register_password");
    // confirmPasswordInput.addEventListener("input", function () {
    //     if (confirmPasswordInput.value !== passwordInput.value) {
    //         confirmPasswordInput.setCustomValidity("Passwords do not match");
    //     }
    // });
    if($("#confirm_register_password").val() !== $("#register_password").val()){
        console.log("Passwords do not match");
        $('#password_error').show();
        $('#register_submit_button').attr('disabled', true);
        return false;
    }
    else{
        $('#password_error').hide();
        $('#register_submit_button').attr('disabled', false);
        return true;
    }
}
>>>>>>> 19798bbcad4181fff24106a9f0d81ecc8ee18bd7
