$(function () {
    $("#register_submit_button").on("click", function () {
        var users = userArray;
        var username = $("#register_username").val();
        var password = $("#register_password").val();
        var passwordInput = document.getElementById("register_password");
        var confirmPasswordInput = document.getElementById("confirm_register_password");
        confirmPasswordInput.addEventListener("input", function () {
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordInput.setCustomValidity("Passwords do not match");
                alert("Passwords do not match");
                
            }
        });
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
})