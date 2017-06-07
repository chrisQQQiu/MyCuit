/**
 * Created by Esong on 2017/6/6.
 */
function login() {
    var number = document.getElementById("number");
    var password = document.getElementById("password");
    $.ajax({
        type: "POST",
        url: "/evaluate/userLogin.do",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: "number="+number.value+"&password="+password.value,
        success: function (jsonResult) {
            var errorLabel = document.getElementById("error-msg-label");
            if (jsonResult.stateCode != 1){
                errorLabel.style.display = "block";
                errorLabel.innerHTML = jsonResult.stateInfo;
            }else{
                errorLabel.style.display = "none";
                if (jsonResult.userInfo.uType == "stu"){
                    window.location = "starter.html";
                }
            }
        }
    });
}

function checkLogin() {
    $.ajax({
        type:"GET",
        url:"/evaluate/checkLogin.do",
        dataType: "json",
        success: function (jsonData) {
            var url = location.toString().split("/");
            if (jsonData.state == "login" && url[url.length-1] == "login.html"){
                window.location = "starter.html";
            }
            else if (jsonData.state == "logout" && url[url.length-1] == "starter.html"){
                window.location = "login.html";
            }
        }
    });
}