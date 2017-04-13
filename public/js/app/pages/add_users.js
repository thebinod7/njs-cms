$(document).ready(function() {
    $('#btnAddUsers').on("click", function () {
        var role = $('#user_role').val();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var contact = $('#phone').val();
        var email = $('#email').val();
        var pass = 'happynewyear';
        if(fname == '' || lname == '' || email == '' || role == 0 ){
            $('#msg').html('<p class="alert alert-danger"><strong>Fields with * are required!</strong></p>');
            return;
        }
        else {
            var model = {
                role : role,
                firstName : fname,
                lastName : lname,
                contactNumber: contact,
                email : email,
                password : pass
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: '/users/add',
                success: function (data) {
                    if(data.result){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>User added successfully!</strong></p></div>' );
                        clearForm();
                    }
                    else {
                        $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Something went wrong, Tyr again!!!</strong></p></div>' );
                    }
                },
                error: function(err) {
                    $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Something went wrong, Tyr again!!!</strong></p></div>' );
                }
            });
        }
    });
});

function clearForm() {
    $('#fname').val('');
    $('#lname').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#socialUrl').val('');
    $("#user_role").val($("#user_role option:first").val());
}