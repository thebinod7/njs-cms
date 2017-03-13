$(document).ready(function() {
    $('#btnLogin').on("click", function () {
        var data = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        $.ajax({
            method: 'POST',
            data:data,
            url: '/users/auth',
            success: function (data) {
                console.log(data.token);
                console.log(data.user.id);
                if(data.user.id != null){
                    localStorage.setItem('userSession',JSON.stringify(data));
                    location.replace('/dashboard');
                }
                else {
                    $( "#errorMessage" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
                  //  $( "#msg" ).html( '<p class="text-danger"><strong>'+ data.msg +'</strong></p>' );
                }
            },
            error: function(err) {
                console.log(err);
                $( "#errorMessage" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
            }
        });
    });
});