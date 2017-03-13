$(document).ready(function() {
   var userData = JSON.parse(localStorage.getItem('userSession'));
   if(userData){
       $.ajax({
           method: 'GET',
           url: '/users/' + userData.user.id,
           success: function (data) {
               if(data){
                 $('#user_fname').html(data.result.firstName);
                 $('#userFullName').html(data.result.firstName + ' ' + data.result.lastName);
                 $('#email').val(data.result.email);
                 $('#fname').val(data.result.firstName);
                 $('#lname').val(data.result.lastName);
                 $('#phone').val(data.result.phone);
               }
               else {
                   $( "#msg" ).html( '<p class="text-danger"><strong>Data Not Found!</strong></p>' );
               }
           },
           error: function(err) {
               $( "#msg" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
           }
       });


       $('#btnUpdate').on("click", function () {
           var fname = $('#fname').val();
           var lname = $('#lname').val();
           var email = $('#email').val();
           var phone =  $('#phone').val();
           var data = {
               firstName: fname,
               lastName: lname,
               email: email,
               phone: phone
           };
           console.log(userData);
           $.ajax({
               method: 'POST',
               data:data,
               url: '/users/' + userData.user.id,
               success: function (data) {
                   if(data.result._id != null){
                       $( "#msg" ).html( '<p class="text-success"><strong>Proile updated successfully.</strong></p>' );
                   }
                   else {
                       $( "#msg" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
                   }
               },
               error: function(err) {
                   $( "#msg" ).html( '<p class="text-danger"><strong>Oops error occured, please try again.</strong></p>' );
               }
           });
       });
   }
   else {
      location.replace('/login');
   }
//   console.log(JSON.parse(userData).user.firstName);
});
