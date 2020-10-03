<?php

  require_once __DIR__.'/Twilio/autoload.php';

  use Twilio\Rest\Client;

  // Find your Account Sid and Auth Token at twilio.com/console
  // DANGER! This is insecure. See http://twil.io/secure
  $sid    = $_POST['sms_data']['sid'];
  $token  = $_POST['sms_data']['token'];
  $phone  = $_POST['sms_data']['phone'];

  $twilio = new Client($sid, $token);

  try {
    $message = $twilio->messages
                      ->create($_POST['phone'], // to
                               ["from" => $phone, "body" => $_POST['text']]
                      );


    echo json_encode(array(
      'POST' => $_POST,
      'twilio' => $twilio,
      'message' => $message->sid,
      'error' => false,
    ));

  } catch (Exception $e) {
   echo json_encode(array(
      'error' => $e->getMessage(),
    ));
  }
?>