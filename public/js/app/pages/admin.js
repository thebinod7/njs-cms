$(document).ready(function() {
    $('#btnLogin').on("click", function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if(username == 'thebinod7' && password == 'darksideofthemoon'){
           location.replace('/profile');
        }
        else {
            $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Username or password did not match!</strong></p></div>' );
        }
    });
});