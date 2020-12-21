$(document).ready( function(){
$('#message').html(Date.now());

  $('#button').click( function(){

    let named = $('#app').attr('title');

      var name  = $('#name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var message = $('#message').val();
      
      //destination email web@SEUSITE.com.br
      var destination = named; 
  
      //if(name.length <= 3){
      if(!name){
        $('.alert').fadeIn('fast');
        $('.alert').addClass("alert alert-danger");
        $('.warning').html('Informe seu nome');
          return false;
      }
      if(email.length <= 5){
        $('.alert').fadeIn('fast');
        $('.alert').addClass("alert alert-danger");
        $('.warning').html('Informe seu email');
          return false;
      }
      if(phone.length <= 4){
        $('.alert').fadeIn('fast');
        $('.alert').addClass("alert alert-danger");
        $('.warning').html('Informe seu telefone');
          return false;
      }
      if(message.length <= 5){
        $('.alert').fadeIn('fast');
        $('.alert').addClass("alert alert-danger");
        $('.warning').html('Escreva uma mensagem');
          return false;
      }

      var urlData = "&name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message + "&destination=" + destination;

      /* Ajax */
      $.ajax({
           type: "POST",
           url: "https://SEUSITE.com.br/sender.php", /* endereço do phpmailer */
           async: true,
           data: urlData,
           success: function(data) {
           if(data.includes("Algo")){
               $('.alert').fadeIn('fast');
               $('.warning').html(data);
               $('.alert').addClass("alert-danger");
            }else{
               $('.alert').fadeIn('fast');
               $('.warning').html(data);
               $('.alert').removeClass("alert-danger");
               $('.alert').addClass("alert-success");
              
               $('#button').prop('disabled', true);

             console.log(urlData);
             
               setTimeout(function(){
                 $('#button').prop('disabled', false);
           
               },3000);
              }
            },
           beforeSend: function() {
               //$('.loading').fadeIn('fast');
               console.log('beforeSend');
               $('#button').html('<i class="fa fa-spinner fa-spin"></i> Enviando ..');
                 $('#name').val('');
                 $('#email').val('');
                 $('#phone').val('');
                 $('#message').val('');
           },
           complete: function(data){ 
               $('#button').html('Enviar');

               console.log('complete');
               console.log(JSON.stringify(data));
           }
       });
    });

    console.log('loaded');

});