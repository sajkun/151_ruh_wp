<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * The main output class
 *
 * @package theme/output
 *
 * @since v1.0
 */

if (!class_exists('theme_ajax_action')) {
    class theme_ajax_action
    {
        public function __construct()
        {
            global $lead_to_delete;
            $lead_to_delete = -10;

            // login action
            add_action('wp_ajax_get_leads_by_dates', [$this, 'get_leads_by_dates_cb']);
            add_action('wp_ajax_nopriv_get_leads_by_dates', [$this, 'get_leads_by_dates_cb']);

            //
            add_action('wp_ajax_update_leads_list', [$this, 'update_leads_list_cb']);
            add_action('wp_ajax_nopriv_update_leads_list', [$this, 'update_leads_list_cb']);

            add_action('wp_ajax_save_lead_end_date', [$this, 'save_lead_end_date_cb']);
            add_action('wp_ajax_nopriv_save_lead_end_date', [$this, 'save_lead_end_date_cb']);

            add_action('wp_ajax_update_leads_order', [$this, 'update_leads_order_cb']);
            add_action('wp_ajax_nopriv_update_leads_order', [$this, 'update_leads_order_cb']);

            add_action('wp_ajax_upload_new_document', [$this, 'upload_new_document_cb']);
            add_action('wp_ajax_nopriv_upload_new_document', [$this, 'upload_new_document_cb']);

            add_action('wp_ajax_delete_file_from_lead', [$this, 'delete_file_from_lead_cb']);
            add_action('wp_ajax_nopriv_delete_file_from_lead', [$this, 'delete_file_from_lead_cb']);

            add_action('wp_ajax_update_lead_meta', [$this, 'update_lead_meta_cb']);
            add_action('wp_ajax_nopriv_update_lead_meta', [$this, 'update_lead_meta_cb']);

            add_action('wp_ajax_update_leads_log', [$this, 'update_leads_log_cb']);
            add_action('wp_ajax_nopriv_update_leads_log', [$this, 'update_leads_log_cb']);

            add_action('wp_ajax_delete_lead', [$this, 'delete_lead_cb']);
            add_action('wp_ajax_nopriv_delete_lead', [$this, 'delete_lead_cb']);

            add_action('wp_ajax_save_phones_count', [$this, 'save_phones_count_cb']);
            add_action('wp_ajax_nopriv_save_phones_count', [$this, 'save_phones_count_cb']);

            add_action('wp_ajax_save_phones_count_tco', [$this, 'save_phones_count_tco_cb']);
            add_action('wp_ajax_nopriv_save_phones_count_tco', [$this, 'save_phones_count_tco_cb']);

            add_action('wp_ajax_save_messages_count', [$this, 'save_messages_count_cb']);
            add_action('wp_ajax_nopriv_save_messages_count', [$this, 'save_messages_count_cb']);

            add_action('wp_ajax_save_messages_count_tco', [$this, 'save_messages_count_tco_cb']);
            add_action('wp_ajax_nopriv_save_messages_count_tco', [$this, 'save_messages_count_tco_cb']);

            add_action('wp_ajax_theme_get_users', [$this, 'theme_get_users_cb']);
            add_action('wp_ajax_nopriv_theme_get_users', [$this, 'theme_get_users_cb']);

            add_action('wp_ajax_run_login', [$this, 'run_login_cb']);
            add_action('wp_ajax_nopriv_run_login', [$this, 'run_login_cb']);

            add_action('wp_ajax_nopriv_add_a_lead_by_post', [$this, 'add_a_lead_by_post_cb']);

            add_action('wp_ajax_nopriv_store_online_journey', [$this, 'store_online_journey_cb']);

            add_action('wp_ajax_send_sms', [$this, 'send_sms_cb']);
            add_action('wp_ajax_nopriv_send_sms', [$this, 'send_sms_cb']);

            add_action('wp_ajax_do_ajax_search', [$this, 'do_ajax_search_cb']);
            add_action('wp_ajax_nopriv_do_ajax_search', [$this, 'do_ajax_search_cb']);

            add_action('wp_ajax_update_lead_specialist_meta', [$this, 'update_lead_specialist_meta_cb']);
            add_action('wp_ajax_nopriv_update_lead_specialist_meta', [$this, 'update_lead_specialist_meta_cb']);

            add_action('wp_ajax_deactivate_lead', [$this, 'deactivate_lead_cb']);
            add_action('wp_ajax_nopriv_deactivate_lead', [$this, 'deactivate_lead_cb']);

            add_action('wp_ajax_send_email', [$this, 'send_email_cb']);
            add_action('wp_ajax_nopriv_send_email', [$this, 'send_email_cb']);

            add_action('wp_ajax_test_cb', [$this, 'test_cb']);
            add_action('wp_ajax_nopriv_test_cb', [$this, 'test_cb']);
        }

        public static function send_email_cb()
        {
            require THEME_PATH . '/PHPMailer-master/src/Exception.php';
            require THEME_PATH . '/PHPMailer-master/src/PHPMailer.php';
            require THEME_PATH . '/PHPMailer-master/src/SMTP.php';

            $email_data = get_option('email_data');
            $clinic = get_the_author_meta('user_clinic', get_current_user_id());

            if (!$clinic || $clinic === 'none') {
                wp_send_json_error([
                    'message' => 'This user can\'t send emails',
                ]);
            }

            $to = $_POST['to'];
            $from = $_POST['from'];

            $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->Mailer = 'smtp';
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'ssl';
            $mail->SMTPAutoTLS = false;
            $mail->Port = 465;
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = $email_data[$clinic]['email'];
            $mail->Password = $email_data[$clinic]['password'];
            $mail->IsHTML(true);
            $mail->AddAddress($to, $_POST['patient_name']);
            $mail->SetFrom($from, $_POST['specialists_name']);
            $mail->AddReplyTo($from, $_POST['specialists_name']);
            // $mail->AddCC("cc-recipient-email@domain", "cc-recipient-name");
            $mail->Subject = $_POST['subject'];

            $args = $_POST;
            unset($args['template_name'], $args['action']);

            ob_start();
            echo print_theme_template_part($args['template'], 'emails', $args);
            $content = ob_get_contents();
            ob_get_clean();

            $mail->MsgHTML($content);

            $lead_id = (int)$_POST['lead_id'];

            $email_log = get_post_meta($lead_id, '_email_log', true);

            if (!$email_log) {
                $email_log = [];
            }

            $date = new DateTime();

            $email_log[] = [
                'specialists_name' => $_POST['specialists_name'],
                'template_name' => $_POST['template_name'],
                'posted_data' => $_POST,
                'date' => $date->format('Y-m-d H:i:sP'),
            ];

            if (!update_post_meta($lead_id, '_email_log', $email_log)) {
                add_post_meta($lead_id, '_email_log', $email_log);
            }

            $email_log = get_post_meta($lead_id, '_email_log', true);

            if ($mail->Send()) {
                wp_send_json([
                    'post' => $_POST,
                    'email_log' => $email_log ?: [],
                    'message' => $message,
                    'response' => 'Your mail has been sent successfully.',
                ]);
            } else {
                wp_send_json_error();
            }
        }

        public static function test_cb()
        {
            wp_send_json([
                'post' => $_POST,
            ]);
        }

        public static function deactivate_lead_cb()
        {
            $post_id = (int)$_POST['lead_id'];
            $value = $_POST['value'];

            $updated = update_post_meta($post_id, '_deactivated_lead', $value);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_deactivated_lead', $value, true);
            }

            wp_send_json([
                'post' => $_POST,
                'updated' => $updated,
            ]);
        }

        public static function store_online_journey_cb()
        {
            header('Access-Control-Allow-Origin: *');
            $meta = $_POST;

            $_name = [$meta['first_name'], $meta['last_name'], 'online-journey'];

            $name = [];

            foreach ($_name as $key => $n) {
                if (trim($n)) {
                    array_push($name, $n);
                }
            }

            $name_str = implode(' - ', $name);

            $date = new DateTime();

            $post_data = [
                'post_title' => $name_str,
                'post_content' => '',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => velesh_theme_posts::$lead,
                'post_date' => $date->format('Y-m-d H:i:s'),
            ];

            if ($name_str) {
                $post_id = wp_insert_post($post_data);
            // $meta['date_time'] = $date->format('d M Y'). ' at '. $date->format('H:i');
            } else {
                wp_send_json_error(['no data passed'], 418);
            }

            $patient_data = [
                'name' => $meta['first_name'] . ' ' . $meta['last_name'],
                'phone' => $meta['phone'],
                'email' => $meta['email'],
                'clinic' => $meta['clinic'],
                'source' => $meta['source'],
            ];

            $updated = update_post_meta($post_id, '_patient_data', $patient_data);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_patient_data', $patient_data, true);
            }

            unset($meta['first_name'], $meta['last_name'], $meta['phone'], $meta['email']);

            $updated = update_post_meta($post_id, '_online_journey', $meta);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_online_journey', $meta, true);
            }

            wp_send_json([
                'post' => $_POST,
                'post_id' => $post_id,
            ]);
        }

        public static function send_sms_cb()
        {
        }

        public static function update_lead_specialist_meta_cb()
        {
            $post_id = (int)$_POST['lead_data']['lead_id'];
            $meta = $_POST['meta'];

            if ($meta && is_array($meta) || is_object($meta)) {
                foreach ($meta as $meta_key => $data) {
                    $key = '_' . $meta_key;

                    if (!update_post_meta($post_id, $key, $data)) {
                        $removed = add_post_meta($post_id, $key, $data, true);
                    }
                }
            }

            wp_send_json([
                '$_POST' => $_POST,

            ]);
        }

        public static function theme_get_users_cb()
        {
            $available_dentists = [];
            $available_staff = [];
            $staff_roles = [get_theme_roles('staff'), 'manager', 'administrator'];

            if (get_theme_roles('reception')) {
                $staff_roles[] = get_theme_roles('reception');
            }

            if (get_theme_roles('tco')) {
                $staff_roles[] = get_theme_roles('tco');
            }

            $dentists_roles = [get_theme_roles('dentist')];

            foreach (theme_get_all_users(false, true) as $user_id => $user) {
                $name = isset($user['last_name']) || isset($user['first_name']) ? trim($user['first_name'] . ' ' . $user['last_name']) : $user['nickname'];

                if (count(array_intersect($staff_roles, $user['roles'])) > 0) {
                    $available_staff[] = $name;
                }

                if (count(array_intersect($dentists_roles, $user['roles'])) > 0) {
                    $available_dentists[] = $name;
                }
            }

            wp_send_json([
                'available_dentists' => $available_dentists,
                'available_staff' => $available_staff,
                'users' => theme_get_all_users(false, true),
            ]);
        }

        public static function save_lead_end_date_cb()
        {
            $post_id = (int)$_POST['lead_id'];

            $post = get_post($post_id);

            $date_start = new DateTime($post->post_date);
            $date_start->modify('+1 month');
            $date_start_formatted = $date_start->format('Y-m-d H:i:s');

            $updated = update_post_meta($post_id, '_end_date', $_POST['date']);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_end_date', $_POST['date'], true);
            }

            $updated2 = update_post_meta($post_id, '_start_date', $date_start_formatted);
            if (!$updated2) {
                $updated2 = add_post_meta($post_id, '_start_date', $date_start_formatted, true);
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($updated);
        }

        /**
        * saves meta data for marked messages icons
        */
        public function save_phones_count_cb()
        {
            $post_id = (int)$_POST['lead_id'];

            $updated = update_post_meta($post_id, '_phone_count', $_POST['count']);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_phone_count', $_POST['count'], true);
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($updated);
        }

        /**
        * saves meta data for marked messages icons
        */
        public function save_phones_count_tco_cb()
        {
            $post_id = (int)$_POST['lead_id'];

            $updated = update_post_meta($post_id, '_phone_count_tco', $_POST['count']);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_phone_count_tco', $_POST['count'], true);
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($updated);
        }

        /**
        * saves meta data for marked messages icons
        */
        public function save_messages_count_cb()
        {
            $post_id = (int)$_POST['lead_id'];

            $updated = update_post_meta($post_id, '_message_count', $_POST['count']);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_message_count', $_POST['count'], true);
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($updated);
        }

        /**
        * saves meta data for marked messages icons
        */
        public function save_messages_count_tco_cb()
        {
            $post_id = (int)$_POST['lead_id'];

            $updated = update_post_meta($post_id, '_message_count_tco', $_POST['count']);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_message_count_tco', $_POST['count'], true);
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($updated);
        }

        /**
        * adds lead by ajax request
        */
        public function add_a_lead_by_post_cb()
        {
            $meta = $_POST;

            unset($meta['action']);

            $_name = [$meta['name'], $meta['treatment'], $meta['clinic']];

            $name = [];

            foreach ($_name as $key => $n) {
                if (trim($n)) {
                    array_push($name, $n);
                }
            }

            $name_str = implode(' - ', $name);

            $date = new DateTime();

            $post_data = [
                'post_title' => $name_str,
                'post_content' => '',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => velesh_theme_posts::$lead,
                'post_date' => $date->format('Y-m-d H:i:s'),
            ];

            if ($name_str) {
                $post_id = wp_insert_post($post_data);
            // $meta['date_time'] = $date->format('d M Y'). ' at '. $date->format('H:i');
            } else {
                wp_send_json_error(['no data passed'], 418);
            }

            $updated = update_post_meta($post_id, '_patient_data', $meta);

            if (!$updated) {
                $updated = add_post_meta($post_id, '_patient_data', $meta, true);
            }

            $response = [
                'posted' => $_POST,
                'url' => get_permalink($post_id),
                'created' => [
                    'updated' => $updated,
                    'post_id' => $post_id,
                ],
            ];

            wp_send_json($response);
        }

        /**
        * Login ajax action
        */
        public function run_login_cb()
        {
            $verify = wp_verify_nonce($_POST['wp-nonce-login'], 'login_nonce_check');

            if (!$verify) {
                wp_send_json_error(['Nonce field check failed'], 418);
            }

            $data = $_POST;
            unset($data['action']);

            $user = wp_signon($data);

            if (isset($user->errors)) {
                wp_send_json_error($user->errors, 418);
            }

            wp_send_json(['user' => $user, 'redirect' => HOME_URL]);
        }

        /**
        * deletes a lead
        */
        public function delete_lead_cb()
        {
            $post_id = (int)$_POST['lead_id'];
            global $lead_to_delete;
            $lead_to_delete = $post_id ;
            wp_delete_post($post_id, true);
            wp_send_json(['redirect' => 0]);
        }

        /**
        * adds an action log for a lead
        */
        public function update_leads_log_cb()
        {
            $post_id = (int)$_POST['post_id'];

            global $lead_to_delete;

            if ($lead_to_delete == $post_id) {
                wp_send_json_error(['message' => 'lead_to_delete'], 418);
                exit();
            }

            $post = get_post($post_id);
            $meta = get_post_meta($post_id, '_lead_log', true);

            if (!$meta) {
                $meta = [];
            }

            $data_to_save = false;

            switch ($_POST['event']) {
        case 'stage_changed':
          $date_passed = $_POST['date'];
          $date_prev_str = (isset($meta[count($meta) - 1])) ? $meta[count($meta) - 1]['date'] : $post->post_date;

          $date = new DateTime($date_passed);
          $date_prev = new DateTime($date_prev_str);
          $diff = date_diff($date, $date_prev);

          $data_to_save = [
              'text' => 'Moved from ' . $_POST['list_id_prev'] . ' to ' . $_POST['list_id_new'] . ' by ' . $_POST['user_name'],
              'date_formatted' => $date->format('d M Y') . ' at ' . $date->format('H:i'),
              'date' => $_POST['date'],
              'user_name' => $_POST['user_name'],
              'user_id' => $_POST['user_id'],
              'time_passed' => $diff->format('%dd %hh %is'),
          ];

          array_push($meta, $data_to_save);
          break;

        case 'specialist_updated':
          $date_passed = $_POST['date'];
          $date_prev_str = (isset($meta[count($meta) - 1])) ? $meta[count($meta) - 1]['date'] : $post->post_date;

          $date = new DateTime($date_passed);
          $date_prev = new DateTime($date_prev_str);
          $diff = date_diff($date, $date_prev);

          $data_to_save = [
              'text' => $_POST['text'],
              'date_formatted' => $date->format('d M Y') . ' at ' . $date->format('H:i'),
              'date' => $_POST['date'],
              'user_name' => $_POST['user_name'],
              'user_id' => $_POST['user_id'],
              'time_passed' => $diff->format('%dd %hh %is'),
          ];
          array_push($meta, $data_to_save);
          break;
      }

            if (!$data_to_save) {
                wp_send_json_error(['message' => 'failed to save'], 418);
            }

            if (!update_post_meta($post_id, '_lead_log', $meta)) {
                add_post_meta($post_id, '_lead_log', $meta, true);
            }

            wp_send_json(['result' => 'success', 'logs' => $meta]);
        }

        /**
        * updates a leads meta
        */
        public function update_lead_meta_cb()
        {
            // $verify =  wp_verify_nonce(  $_POST['nonce'], 'update_meta_nonce_id' );

            // if(!$verify){
            //   wp_send_json_error(array('Nonce field check failed'), 418);
            // }
            $post_id = (int)$_POST['lead_data']['lead_id'];

            global $lead_to_delete;

            if ($lead_to_delete == $post_id) {
                wp_send_json_error(['message' => 'lead_to_delete'], 418);
            }

            $meta = isset($_POST['meta']) ? $_POST['meta'] : [];

            if ((isset($_POST['confirmed']) && (int)$_POST['confirmed'] === 0) && $post_id < 0 && $meta) {
                global $wpdb;
                $name = $meta['patient_data']['name'];
                $phone = $meta['patient_data']['phone'];
                $email = $meta['patient_data']['email'];
                $querystr = "
          SELECT $wpdb->postmeta.*
          FROM $wpdb->postmeta
          WHERE $wpdb->postmeta.meta_key = '_patient_data'
          AND $wpdb->postmeta.meta_value LIKE '%$name%'
          OR $wpdb->postmeta.meta_value LIKE '%$phone%'
          OR $wpdb->postmeta.meta_value LIKE '%$email%'
       ";

                $request = $wpdb->get_results($querystr, OBJECT);

                if ($request && count($request) > 0) {
                    $ids = array_map(function ($el) {return (int)$el->post_id; }, $request);

                    $leads = get_posts([
                        'post__in' => $ids,
                        'post_type' => velesh_theme_posts::$lead,
                    ]);

                    $leads = get_leads_meta($leads);

                    wp_send_json(
                        [
                            'leads' => $leads,
                            'ids' => $ids,
                            'request' => $request,
                            'exist_leads' => 1,
                            // 'reload' => 1,
                            'url' => get_permalink($request[0]->post_id),
                        ]
                    );
                }
            }

            $reload = false;

            if ($post_id === -1) {
                $date = new DateTime();
                $reload = true;
                $_name = [$meta['patient_data']['name'], $meta['patient_data']['clinic'], $date->format('Y-m-d H:i:s')];

                $name = [];

                foreach ($_name as $key => $n) {
                    if (trim($n)) {
                        array_push($name, $n);
                    }
                }

                $name_str = implode(' - ', $name);
                $current_user_id = get_current_user_id();

                $post_data = [
                    'post_title' => $name_str,
                    'post_content' => '',
                    'post_status' => 'publish',
                    'post_author' => $current_user_id,
                    'post_type' => velesh_theme_posts::$lead,
                    'post_date' => $date->format('Y-m-d H:i:s'),
                ];

                if ($name_str) {
                    $post_id = wp_insert_post($post_data);
                    $meta['patient_data']['date_time'] = $date->format('d M Y') . ' at ' . $date->format('H:i');
                } else {
                    wp_send_json_error(['no data passed'], 418);
                }
            }

            if (isset($meta['treatment_value'])) {
                $meta['treatment_value']['value'] = price_to_number($meta['treatment_value']['value']);
            }

            if (isset($meta['lead_specialists'])) {
                foreach ($meta['lead_specialists'] as $user_id => $assigned) {
                    $assigned_posts = get_the_author_meta('_leads_assigned', $user_id);

                    if (!$assigned_posts) {
                        $assigned_posts = [];
                    }

                    if (!in_array($post_id, $assigned_posts) && 'yes' === $assigned) {
                        array_push($assigned_posts, $post_id);
                    }

                    if ('no' === $assigned) {
                        $assigned_key = array_search($post_id, $assigned_posts);
                        if ($assigned_key) {
                            array_splice($assigned_posts, $assigned_key, 1);
                        }
                    }

                    if (!update_user_meta($user_id, '_leads_assigned', $assigned_posts)) {
                        add_user_meta($user_id, '_leads_assigned', $assigned_posts);
                    }
                }
            }

            // sets time when a lead becomes converted
            if (isset($meta['lead_stage'])) {
                $meta_converted_time = get_post_meta($post_id, '_time_converted', true);

                if (!$meta_converted_time && in_array($meta['lead_stage'], get_converted_stages())) {
                    $today = new DateTime();
                    $today_formatted = $today->format('Y-m-d H:i:s');

                    if (!update_post_meta($post_id, '_time_converted', $today_formatted)) {
                        $removed = add_post_meta($post_id, '_time_converted', $today_formatted, true);
                    }
                }
            }

            if ($meta && is_array($meta) || is_object($meta)) {
                foreach ($meta as $meta_key => $data) {
                    $key = '_' . $meta_key;

                    if (!update_post_meta($post_id, $key, $data)) {
                        $removed = add_post_meta($post_id, $key, $data, true);
                    }
                }
            }

            $meta['post_id'] = $post_id;
            $meta['POST'] = $_POST;
            $meta['reload'] = $reload;
            $meta['url'] = get_permalink($post_id);
            $meta['author'] = $current_user_id;

            if ($post_id > 0) {
                $post = get_post($post_id);
                $leads = get_leads_meta([$post]);
                $meta['new_leads'] = $leads;
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($meta);
        }

        public function delete_file_from_lead_cb()
        {
            $post_id = (int)$_POST['lead_id'];
            $file_id = (int)$_POST['file_id'];
            $lead_files = get_post_meta($post_id, '_lead_files', true);

            foreach ($lead_files as $key => $file) {
                if ($file['file_id'] === $_POST['file_data']['file_id']) {
                    if (file_exists($file['path'])) {
                        unlink($file['path']);
                    }
                    unset($lead_files[$key]);
                }
            }

            $removed = 'yes';
            if (count($lead_files) > 0) {
                if (!update_post_meta($post_id, '_lead_files', $lead_files)) {
                    $removed = add_post_meta($post_id, '_lead_files', $lead_files, true);
                }
            } else {
                $removed = delete_post_meta($post_id, '_lead_files');
            }

            $update = ['ID' => $post_id];
            wp_update_post($update);

            wp_send_json($removed);
        }

        public function upload_new_document_cb()
        {
            $upload = exec_upload_file('file');
            $upload['post'] = $_POST;
            if (isset($upload['error'])) {
                wp_send_json_error($upload['error'], 418);
            } else {
                $post_id = (int)$_POST['lead_id'];

                $lead_files = get_post_meta($post_id, '_lead_files', true);

                if (!$lead_files) {
                    $lead_files = [];
                }

                $date = new DateTime();

                $date_formatted = $date->format('j M Y') . ' at ' . $date->format('H:i');

                $file_data = [
                    'file_id' => md5($upload['file']['name']) . md5($date_formatted),
                    'name' => $upload['file']['name'],
                    'type' => $upload['file']['type'],
                    'url' => $upload['file_loaded']['url'],
                    'path' => $upload['file_loaded']['file'],
                    'date' => $date_formatted,
                    'date_not_formatted' => $date->format('j M Y H:i'),
                    'user' => $_POST['user_name'],
                ];

                array_push($lead_files, $file_data);

                if (!update_post_meta($post_id, '_lead_files', $lead_files)) {
                    add_post_meta($post_id, '_lead_files', $lead_files, true);
                }

                $upload['meta'] = $lead_files;
                $upload['file_data'] = $file_data;

                $update = ['ID' => $post_id];
                wp_update_post($update);

                wp_send_json($upload);
            }
        }

        public function update_leads_order_cb()
        {
            $result = [];

            foreach ($_POST['order'] as $key => $data) {
                $update = update_post_meta((int)$data['post_id'], '_lead_order', $data['order']);

                if (!$update) {
                    $update = add_post_meta((int)$data['post_id'], '_lead_order', $data['order']);
                }

                $result[] = $update;
            }

            wp_send_json($result);
        }

        public static function update_leads_list_cb()
        {
            $post_id = (int)$_POST['post_id'];

            if (!isset($_POST['post_id']) || !isset($_POST['list_id'])) {
                wp_send_json(['success' => false]);
            }

            // sets time when a lead becomes converted
            if (isset($_POST['list_id'])) {
                $meta_converted_time = get_post_meta($post_id, '_time_converted', true);

                if (!$meta_converted_time && in_array($_POST['list_id'], get_converted_stages())) {
                    $today = new DateTime();
                    $today_formatted = $today->format('Y-m-d H:i:s');

                    if (!update_post_meta($post_id, '_time_converted', $today_formatted)) {
                        add_post_meta($post_id, '_time_converted', $today_formatted, true);
                    }
                } elseif (!in_array($_POST['list_id'], get_converted_stages())) {
                    delete_post_meta($post_id, '_time_converted');
                }
            }

            $update = update_post_meta($post_id, '_lead_stage', $_POST['list_id']);
            $lead_log = get_post_meta($post_id, '_lead_stage_log2', true);
            $lead_log = $lead_log ?: [];
            $time = new DateTime();
            $lead_log[] = [
                'stage' => $_POST['list_id'],
                'date' => $time->format('Y-m-d H:i:s'),
            ];

            $update = update_post_meta($post_id, '_lead_stage_log2', $lead_log);

            $data = ['ID' => $post_id];
            wp_update_post($data);

            if (!$update) {
                $update = add_post_meta($post_id, '_lead_stage', $_POST['list_id']);
            }

            wp_send_json(['success' => $update]);
        }

        public static function do_ajax_search_cb()
        {
            $args = [
                'post_type' => velesh_theme_posts::$lead,
                'posts_per_page' => -1,
                'limit' => -1,
                'meta_query' => [[
                    'key' => '_patient_data',
                    'value' => $_POST['search'],
                    'compare_key' => 'LIKE',
                    'compare' => 'LIKE',
                ]],
            ];

            $leads = get_leads_meta(get_posts($args));

            wp_send_json([
                'post' => $_POST,
                'leads' => $leads,
            ]);
        }

        public static function get_leads_by_dates_cb()
        {
            try {
                // define('DOING_AJAX', true);

                $from = new DateTime($_POST['from']);
                $to = new DateTime($_POST['to']);

                $from_formated = $from->format('M d Y');
                $to_formated = $to->format('M d Y');

                $leads = get_posts_by_dates($from_formated, $to_formated, false);

                $leads = get_leads_meta($leads);

                // $team_perfomance = get_users_leads($from_formated , $to_formated);

                // prepare data for filters

                $filter_data = get_filters_by_leads($leads);
                $filter_data_csv = get_filters_by_leads($leads, true);

                $data_4_billed_revenue_period = get_billed_totals($from->format('Y-m-d H:i:s'), $to->format('Y-m-d H:i:s'));

                $_args = [
                    'post_type' => velesh_theme_posts::$lead,
                    'include' => $data_4_billed_revenue_period['ids'],
                    'posts_per_page' => -1,
                ];

                $billed_posts = get_posts($_args);
                $billed_posts = get_leads_meta($billed_posts);

                $data = [
                    'leads' => $leads,
                    'filter_data' => $filter_data,
                    'filter_data_csv' => $filter_data_csv,
                    'from_formated' => $from_formated,
                    'to_formated' => $to_formated,
                    // 'team_perfomance'   => $team_perfomance,
                    'leads_prev' => false,
                    'days_count_prev' => -1,
                    'billed_posts' => $billed_posts,
                    'from' => $from->format('Y-m-d H:i:s'),
                    'to' => $to->format('Y-m-d H:i:s'),
                    'POST' => $_POST,
                ];

                $period_compared = [
                    'Past 7 Days' => 7,
                    'Past 30 Days' => 30,
                    'Past 90 Days' => 90,
                ];

                if (isset($_POST['get_previous_data']) && $_POST['get_previous_data'] && in_array($_POST['label'], array_keys($period_compared))) {
                    $delta = ($period_compared[$_POST['label']] + 1);

                    $date_prev_period_end = new DateTime($_POST['from']);
                    $date_prev_period_start = new DateTime($_POST['from']);

                    $date_prev_period_start->modify('-' . $delta . ' days');
                    $date_prev_period_end->modify('-1 days');

                    $from_formated_prev = $date_prev_period_start->format('M d Y');
                    $to_formatted_prev = $date_prev_period_end->format('M d Y');

                    $leads_prev = get_posts_by_dates($from_formated_prev, $to_formatted_prev, false);
                    $leads_prev = get_leads_meta($leads_prev);

                    $data['from_formated_prev'] = $from_formated_prev;
                    $data['to_formatted_prev'] = $to_formatted_prev;

                    $data['leads_prev'] = $leads_prev;
                    $data['days_count_prev'] = $period_compared[$_POST['label']];

                    $data_4_billed_revenue_period_prev = get_billed_totals($date_prev_period_start->format('Y-m-d H:i:s'), $date_prev_period_end->format('Y-m-d H:i:s'));

                    $_args = [
                        'post_type' => velesh_theme_posts::$lead,
                        'include' => $data_4_billed_revenue_period['ids'],
                        'posts_per_page' => -1,
                    ];

                    $billed_posts_prev = get_posts($_args);
                    $billed_posts_prev = get_leads_meta($billed_posts_prev);

                    $data['billed_posts_prev'] = $billed_posts_prev;
                }

                wp_send_json($data);
            } catch (Exception $e) {
                wp_send_json($e->getMessage());
            }
        }
    }
}

new theme_ajax_action();
