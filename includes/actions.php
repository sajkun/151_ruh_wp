<?php
function get_data_about_personal()
{
    $users = get_users([
        'posts_per_page' => -1,
    ]);

    $users_filtered = array_map(function ($user) {
        $first_name = get_user_meta($user->ID, 'first_name', true);
        $last_name = get_user_meta($user->ID, 'last_name', true);

        return [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $user->data->user_email,
            'roles' => $user->roles,
        ];
    }, $users);

    wp_send_json($users_filtered);
}

add_action('wp_head', 'get_data_about_personal');
add_action('wp_ajax_get_data_about_personal', 'get_data_about_personal');
add_action('wp_ajax_nopriv_get_data_about_personal', 'get_data_about_personal');
