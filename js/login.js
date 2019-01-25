$(function() {

    if( $("#btn-login".lenght) ) {
        let request = new XMLHttpRequest;

        let userEmail = $("#inputEmail");
        let userPassword = $("#inputPassword");


        request.onload = function() {
            let user = JSON.parse(this.response);
                
            let acceptedEmail = user.email;
            let acceptedPassword = user.password;
            
            if( request.readyState == 4 && request.status == 200) {
                $("#btn-login").on("click", function() {

                    if( userEmail.val() == acceptedEmail && userPassword.val() == acceptedPassword) {
                        window.location.replace("dashboard.html");
                    } else if(userEmail.val() == "" || userPassword.val() == "") {
                        userPassword.addClass("is-invalid");
                        $("#invalid-feedback").text("Fälten får inte vara tomma");
                    } else if(userEmail.val() != acceptedEmail || !userPassword.val() != acceptedPassword) {
                        userPassword.addClass("is-invalid");
                        $("#invalid-feedback").text("Fel e-post eller lösenord!");
                    }
                });
            }
        }
        request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
        request.send();
    }
});