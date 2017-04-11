$(document).ready(function() {
    $('#btnAddRole').on("click", function () {
        var perms = [];
        $.each($("input[name='perm']:checked"), function(){
            perms.push($(this).val());
        });
        var permissions = perms.join(", ");
        var roleName = $('#roleName').val();
        var roleDesc = $('#roleDesc').val();
        console.log(permissions);
        if(roleName == ''){
            $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Role name is required!</strong></p></div>' );
            return;
        }
        else {
            var model = {
                roleName : roleName,
                permissions : permissions,
                roleDesc: roleDesc
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: '/role/add',
                success: function (data) {
                    console.log(data);
                    if(data){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Role added successfully.</strong></p></div>' );
                        clearForm();
                    }
                    else {
                        $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Server error! Please try again.</strong></p></div>' );
                    }
                },
                error: function(err) {
                    console.log(err);
                    $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Server error! Please try again.</strong></p></div>' );
                }
            });
        }
    });
});

function clearForm() {
    $('#roleName').val('');
    $('#roleDesc').val('');
    $('input:checkbox').removeAttr('checked');
}

