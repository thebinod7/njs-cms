$(document).ready(function() {
    $('#btnUpdateProfile').on("click", function () {
        var userId = $('#userId').val();
        var email = $('#email').val();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var phone = $('#phone').val();
        var socialUrl = $('#socialUrl').val();
        console.log(userId);
        var model = {
            email : email,
            firstName : fname,
            lastName : lname,
            contactNumber : phone,
            socialUrl : socialUrl
        };
        $.ajax({
            method: 'POST',
            data: model,
            url: '/users/' + userId,
            success: function (data) {
                console.log(data);
                if(data){
                    $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>'+ data.msg +'</strong></p></div>' );
                }
                else {
                    $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>'+ data.msg +'</strong></p></div>' );
                }
            },
            error: function(err) {
                console.log(err);
                $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>'+ data.msg +'</strong></p></div>' );
            }
        });
    });
});
