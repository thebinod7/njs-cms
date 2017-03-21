$(document).ready(function() {
    var featuredImgName;
    $('#uploadForm').submit(function () {
        $("#status").empty().text("File is uploading...");

        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                $("#status").empty().text('File Uploaded Successfully.');
                featuredImgName = response.result;
               // console.log('file name:' + featuredImgName);

            }
        });
        return false;
    });

    $('#btnAddConent').on("click", function () {
        var featuredImgUrl = featuredImgName;
        var content = CKEDITOR.instances.editor1.getData();
        var category = $('#post_category').val();
        var title = $('#title').val();
        title = title.toLowerCase().replace(/ /g, '-');
        var seoUrl = title;
        if(category == 0 || title == ''){
            $('#msg').html('<p class="alert alert-danger"><strong>Please select category and enter title of post!</strong></p>');
            return;
        }
        else {
            var model = {
                featuredImgUrl : featuredImgUrl,
                category : category,
                title: title,
                seoUrl : seoUrl,
                content : content
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: 'post/add',
                success: function (data) {
                    if(data.result){
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-success"><strong>Post created successfully!</strong></p></div>' );
                        clearForm();
                    }
                    else {
                        $( "#msg" ).html( '<div class="alert alert-success"><p class="text-danger"><strong>Something went wrong, Tyr again!!!</strong></p></div>' );
                    }
                },
                error: function(err) {
                    $( "#msg" ).html( '<div class="alert alert-success"><p class="text-danger"><strong>Something went wrong, Tyr again!!!</strong></p></div>' );
                }
            });
        }
    });
});

function clearForm() {
    $("#post_category").val($("#post_category option:first").val());
    $('#title').val('');
    CKEDITOR.instances.editor1.setData('');
}