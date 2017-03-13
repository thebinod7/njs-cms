$(document).ready(function() {
    $('#btnAddCategory').on("click", function () {
        var category = $('#categoryName').val();
        var catDesc = $('#categoryDesc').val();
        if(category == ''){
            $( "#msg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Category name is required!</strong></p></div>' );
            return;
        }
        else {
            var model = {
                categoryName : category,
                categoryDesc: catDesc
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: 'category/add',
                success: function (data) {
                    console.log(data);
                    if(data){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Category added successfully.</strong></p></div>' );
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
    $('#categoryName').val('');
    $('#categoryDesc').val('');
}