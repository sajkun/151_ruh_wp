<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once __DIR__.'/Twilio/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

$sid         = $_POST['sms_data']['sid'];
$token       = $_POST['sms_data']['token'];
$phone_from  = '+'.preg_replace('/\\D/','',$_POST['sms_data']['phone']);
$phone_to    = $_POST['phone'];


$twilio = new Client($sid, $token);

  try {
    if ($phone_to === 'all') {
      $by_phones = array();

      $messages = $twilio->messages
                       ->read([]);

      foreach ($messages as $msg) {
        $tmp_message =  array(
          'body'             => $msg->body,
          'date'             => $msg->dateSent,
          'date_for_request' => $msg->dateSent->format('Y-m-d'),
          'date_sent'        => $msg->dateSent->format('M d Y g:ia'),
          'errorMessage'     => $msg->errorMessage,
          'from'             => str_replace('+44', '0', $msg->from),
          'to'               => str_replace('+44', '0', $msg->to),
          'type'             => $msg->from === $phone_from ? 'we' : 'him',
        );

        $msg_phone_from = str_replace('+44', '0', $msg->from);
        $msg_phone_to   = str_replace('+44', '0', $msg->to);

        if(!isset($by_phones_data[$msg->from])){
          $by_phones_data[$msg->from] = array();
        }

        if(!isset($by_phones_data[$msg_phone_from])){
          $by_phones_data[$msg_phone_from] = array();
        }

        if(!isset($by_phones_data[$msg->to])){
          $by_phones_data[$msg->to] = array();
        }

        if(!isset($by_phones_data[ $msg_phone_to ])){
          $by_phones_data[ $msg_phone_to ] = array();
        }

        if(!isset($by_phones[$msg->from])){
          $by_phones[$msg->from] = 0;
        }

        if(!isset($by_phones[$msg_phone_from])){
          $by_phones[$msg_phone_from] = 0;
        }

        if(!isset($by_phones[ $msg_phone_to])){
          $by_phones[$msg_phone_to] = 0;
        }

        if(!isset($by_phones[$msg->to])){
          $by_phones[$msg->to] = 0;
        }

        $by_phones[$msg->from]++;
        $by_phones[$msg_phone_from]++;
        $by_phones[$msg->to]++;
        $by_phones[ $msg_phone_to]++;
        $by_phones_data[$msg->to][] = $tmp_message;
        $by_phones_data[$msg->from][]= $tmp_message;
        $by_phones_data[$msg_phone_from][]= $tmp_message;
        $by_phones_data[ $msg_phone_to ][]= $tmp_message;

        $messages_all[] = $tmp_message;
      }

      foreach ($by_phones_data as $phone => $message) {
        usort($by_phones_data[$phone], 'sort_by_date');
      }

    }else{
      $first_symbol = substr( $phone_to, 0 , 1 );
      $by_phones_data = false;

      if($first_symbol === "0"){
        $phone_to = '+44'. substr( $phone_to, 1 ,strlen( $phone_to ) - 1 );
      }

       $by_phones = false;
       $messages_to = $twilio->messages
                       ->read([
                        'to' => $phone_to,
                              ]);

       $messages_from = $twilio->messages
                       ->read([
                        'from' => $phone_to,
                              ]);

       $messages_all = array();

     foreach ($messages_to as $msg) {
       $messages_all[] =  array(
        'body'             => $msg->body,
        'date'             => $msg->dateSent,
        'date_for_request' => $msg->dateSent->format('Y-m-d'),
        'date_sent'        => $msg->dateSent->format('M d Y g:ia'),
        'errorMessage'     => $msg->errorMessage,
        'status'           => $msg->status,
        'type'             => 'we',
       );
     }

     foreach ($messages_from as $msg) {
       $messages_all[] =  array(
        'body'          => $msg->body,
        'date'          => $msg->dateSent,
        'date_for_request' => $msg->dateSent->format('Y-m-d'),
        'date_sent'     => $msg->dateSent->format('M d Y g:ia'),
        'errorMessage'  => $msg->errorMessage,
        'type'          => 'him',
       );
     }
  }

  usort($messages_all, 'sort_by_date');

  echo json_encode(array(
      'error'    => false,
      'POST'     => $_POST,
      'messages' => $messages_all,
      'by_phones' => $by_phones,
      'phone_to ' => $phone_to ,
      'by_phones_data' => $by_phones_data,
  ));

  } catch (Exception $e) {
   echo json_encode(array(
      'error' => $e->getMessage(),
    ));
  }


function sort_by_date($a, $b){
    if ($a[ 'date' ] == $b[ 'date']) {
        return 0;
    }
    return ($a[ 'date' ] < $b[ 'date']) ? -1 : 1;
}