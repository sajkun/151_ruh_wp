<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once __DIR__.'/Twilio/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

$sid         = $_POST['sms_data']['sid'];
$token       = $_POST['sms_data']['token'];
$phone_from  = $_POST['sms_data']['phone'];
$phone_to    = $_POST['phone'];

$twilio = new Client($sid, $token);

  try {
    if ($phone_to === 'all') {
      $by_phones = array();

      $messages = $twilio->messages
                       ->read([]);

      foreach ($messages as $msg) {
        $messages_all[] =  array(
          'body'             => $msg->body,
          'date'             => $msg->dateSent,
          'date_for_request' => $msg->dateSent->format('Y-m-d'),
          'date_sent'        => $msg->dateSent->format('M d Y g:ia'),
          'errorMessage'     => $msg->errorMessage,
          'from'             => $msg->from,
          'to'               => $msg->to,
          'type'             => $msg->from === $phone_from ?'we' : 'him',
        );

        if(!isset($by_phones[$msg->from])){
          $by_phones[$msg->from] = 0;
        }

        if(!isset($by_phones[$msg->to])){
          $by_phones[$msg->to] = 0;
        }

        $by_phones[$msg->from]++;
        $by_phones[$msg->to]++;
      }

    }else{
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
      'POST'     => $_POST,
      'messages' => $messages_all,
      'by_phones' => $by_phones,
      'error'    => false,
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