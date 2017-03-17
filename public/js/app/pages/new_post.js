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
                console.log('file name:' + featuredImgName);
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });

    $('#btnAddConent').on("click", function () {
        var category = $('#post_category').val();
        var title = $('#title').val();
        title = title.toLowerCase().replace(/ /g, '-');
        var seoUrl = title;
        console.log(seoUrl);
        console.log(category);
        if(category == 0){
            $('#msg').html('<p class="alert alert-danger"><strong>Please select category of post!</strong></p>');
            return;
        }
    });
});