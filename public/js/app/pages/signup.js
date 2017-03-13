$(document).ready(function() {
    $('#btnSignup').on("click", function () {
        var fname = $('#firstName').val();
        var lname = $('#lastName').val();
        var email = $('#email').val();
        var pass =  $('#password').val();
        if(fname == '' || lname == '' || email == '' || pass == ''){
            $( "#msg" ).html( '<p class="text-danger"><strong>All fields are required. Please enter valid data.</strong></p>' );
            return;
        }
        else {
            var data = {
                firstName: fname,
                lastName: lname,
                email: email,
                password: pass
            };
            $.ajax({
                method: 'POST',
                data:data,
                contentType: 'application/x-www-form-urlencoded',
                url: '/users/register',
                success: function (data) {
                    if(data.result._id != null){
                        localStorage.setItem('userSession',data);
                        location.replace('/dashboard');
                    }
                    else {
                        $( "#msg" ).html( '<p class="text-danger"><strong>'+ data.result.msg +'</strong></p>' );
                    }
                },
                error: function(err) {
                    $( "#msg" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
                }
            });
        }
    });
});