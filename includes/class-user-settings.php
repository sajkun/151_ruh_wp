<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
/**
* Class that used to add different filters to theme
*
* @package theme/helpers
*/

class theme_user_settings{

  public function __construct(){
    add_action( 'show_user_profile', array($this,  'custom_user_fields' ));
    add_action( 'edit_user_profile',  array($this, 'custom_user_fields' ));
    add_action( 'personal_options_update', array($this, 'edit_user_fields') );
    add_action( 'edit_user_profile_update', array($this, 'edit_user_fields') );
  }

  public static function custom_user_fields( $user ){
    wp_enqueue_media();

    $photo_id = get_the_author_meta('user_photo_id', $user->ID);

    $image =  wp_get_attachment_url( $photo_id );
    $image = ($image) ? $image : DUMMY_ADMIN;
    ?>
    <table class="form-table">
    <tr>
      <th><label for="user_photo_id"><?php esc_html_e( 'User Photo', 'crf' ); ?></label></th>
      <td>

        <div class="photo-holder" onclick="theme_actions.load_image(this, '.photo-holder', '.photo-id')">
           <div class="image-placeholder user"><img src="<?php echo $image ?>" alt=""></div>
           <input type="hidden" class="photo-id" name="user_photo_id" id="user_photo_id" onclick="theme_actions.load_image(this, '.photo-holder', '.photo-id')">
           <a href="javascript:void(0)" class="button" onclick="theme_actions.load_image(this, '.photo-holder', '.photo-id')">Load Photo</a>
        </div>
      </td>
    </tr>
    <tr>
      <th><label for="user_position"><?php esc_html_e( 'User Position', 'crf' ); ?></label></th>
      <td><input type="text" name="user_position" id="user_position" value="<?php echo esc_html( get_the_author_meta( 'user_position', $user->ID ) ); ?>" class="regular-text"></td>
    </tr>
  </table>

  <?php
  }


  function edit_user_fields( $user_id ) {
    if ( ! current_user_can( 'edit_user', $user_id ) ) {
      return false;
    }


    if ( ! empty( $_POST['user_position'] ) ) {
      if(!update_user_meta( $user_id, 'user_position', $_POST['user_position'] )){
        add_user_meta( $user_id, 'user_position', $_POST['user_position']);
      }
    }

    if ( ! empty( $_POST['user_photo_id'] ) ) {
      if(!update_user_meta( $user_id, 'user_photo_id', $_POST['user_photo_id'] )){
        add_user_meta( $user_id, 'user_photo_id', $_POST['user_photo_id']);
      }
    }

    // echo  $user_id;
    // print_r( $_POST);
    // exit();
  }
}


new theme_user_settings();