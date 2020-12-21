"use strict";

let content = `
    <div class="form-group">
        <label for="email">Nome:</label>
        <input type="text" class="form-control" id="name" placeholder="Seu nome" name="name" value="Rafael">
    </div>

    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Seu email" name="email" value="web@4pme.com.br">
    </div>

    <div class="form-group">
        <label for="email">Telefone:</label>
        <input type="number" class="form-control" id="phone" placeholder="Seu telefone" name="phone" value="1930348489">
    </div>

    <div class="form-group">
        <label for="comment">Mensagem:</label>
        <textarea class="form-control" id="message" rows="5" name="message" placeholder="Sua mensagem.."></textarea>
    </div>

    <button type="button" class="btn btn-primary" id="button">Enviar</button>
    <div class="alert alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <div class="warning"></div>
    </div>
    `;

$(document).ready(function () {
    $('#app').html(content);
});


//add styles
function addStyle(style) {
    var node = document.createElement('style');
    node.innerHTML = style;
    document.body.appendChild(node);
}

addStyle(`
         label{ display: none !important}
#app input {
  width: 100%;
  margin-bottom: 10px;
  padding: 20px 10px;
  border-radius: 8px;
  border: none;
  background-color: white;
  font-size: 14px;
}

#app textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: white;
  font-size: 14px;
}

#button{
  width: 100%;
  background-color: #262626;
  padding: 16px 20px;
  border: none;
  border-radius: 8px;
  text-transform: uppercase;
  color: white;
  font-size: 12px;
  letter-spacing: 2px;
  margin: 0px 0px 10px;
  font-weight: bold
}
.alert,
.alert-success,
.alert-danger{
  display: none
}
         `);

//add addScript
function addScript(addScript) {
    var script = document.createElement('script');
    script.innerHTML = addScript;
    document.body.appendChild(script);
}

addScript(`
$(document).ready( function(){
$('#message').html(Date.now());

  $('#button').click( function(){

    let named = $('#app').attr('title');

      var name  = $('#name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var message = $('#message').val();
      
      //destination email web@4pme.com.br
      var destination = named; 
  
      if(name.length <= 3){
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
           url: "https://4pmesites.com.br/sender.php", /* endereço do phpmailer */
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
`)
