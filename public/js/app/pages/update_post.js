$(document).ready(function() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $('#btnUpdateContent').on("click", function () {
        var content = CKEDITOR.instances.editor1.getData();
        var category = $('#post_category').val();
        var title = $('#title').val();
        var seoUrl = title.toLowerCase().replace(/ /g, '-');
        var seoUrl = seoUrl;
        if(category == 0 || title == ''){
            $('#msg').html('<p class="alert alert-danger"><strong>Please select category!</strong></p>');
            return;
        }
        else {
            var model = {
                category : category,
                title: title,
                seoUrl : seoUrl,
                content : content
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: '/post/' + id ,
                success: function (data) {
                    if(data.result){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Post updated successfully!</strong></p></div>' );
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

    $('#btnDeleteContent').on("click", function () {
        var r = confirm("Attention! deleted content cant be recovered!");
        if (r == true) {
            $.ajax({
                method: 'DELETE',
                url: '/post/' + id,
                success: function (data) {
                    console.log(data);
                    if(data.msg != null){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Post deleted successfully!</strong></p></div>' );
                        clearForm();
                    }
                    else {
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Something went wrogn, plese try again.</strong></p></div>' );
                    }
                },
                error: function(err) {
                    console.log(err);
                    $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Something went wrogn, plese try again.</strong></p></div>' );
                }
            });
        } else {
            return;
        }
    });
});

function clearForm() {
    $("#post_category").val($("#post_category option:first").val());
    $('#title').val('');
    CKEDITOR.instances.editor1.setData('');
}