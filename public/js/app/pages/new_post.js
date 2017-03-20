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
        return false;
    });

   /* $('form.uploadForm').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize()
        }).done(function(data) {
            console.log(data);
            // Optionally alert the user of success here...
        }).fail(function(data) {
            // Optionally alert the user of an error here...
        });
       // Prevent the form from submitting via the browser
    }); */

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