<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: Content-Type");

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$content = $_POST['message'];
$destination = $_POST['destination'];
#$from = $name . " | " . $email;
$thanks = 'Obrigado pelo contato. ' . $name. ' retornaremos o mais breve possível.';

  $message = '<html><body>';
     $message .= '<p><strong>Nome: </strong>'. $name .'</p>';
     $message .= '<p><strong>Telefone: </strong><a href="tel:'. $phone .'">'. $phone .'</a></p>';
     $message .= '<p><strong>Email: </strong><a href="mailto:'. $email .'">'. $email .'</a></p>';
     $message .= '<p><strong>Mensagem: </strong>'. $content .'</p>';
     $message .= '</body></html>';

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: '. $email . "\r\n";

// More headers

$reply = "MIME-Version: 1.0" . "\r\n";
$reply .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$reply .= 'From: '. $destination . "\r\n";

if(mail($destination, 'Contato do site', $message, $headers)){
    echo 'Enviado com sucesso!';
    mail($email, 'Recebemos seu contato.', $thanks, $reply);
}else{
    echo 'Algo deu errado, envie-nos um email para: ' . $destination;
};

?>