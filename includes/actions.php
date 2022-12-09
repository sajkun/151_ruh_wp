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

    clog($users_filtered);

    $users_filtered2 = array_filter($users_filtered, function ($user) {
        return in_array('editor', $user['roles']);
    });

    clog($users);
    clog($users_filtered2);

    return array_values($users_filtered2);
}

add_action('wp_head', 'get_data_about_personal');
