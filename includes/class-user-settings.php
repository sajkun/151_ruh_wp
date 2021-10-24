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
    add_action( 'user_new_form',  array($this, 'custom_user_fields' ));

    add_action( 'personal_options_update', array($this, 'edit_user_fields') );
    add_action( 'edit_user_profile_update', array($this, 'edit_user_fields') );
    add_action( 'user_register', array($this, 'edit_user_fields') );
  }

  public static function custom_user_fields( $user ){
    wp_enqueue_media();
    $clinics = get_option('clinics_list');
    ?>
    <table class="form-table">
    <tr>
      <th><label for="user_clinic"><?php esc_html_e( 'Clinic', 'crf' ); ?></label></th>
      <td>
        <select name="user_clinic" id="user_clinic">
            <option value="none">---Select Clinic ---</option>
            <?php foreach ($clinics as $key => $c) { 
               printf('<option value="%s" %s>%s</value>',
                $c,
               $c === get_the_author_meta( 'user_clinic', $user->ID )? 'selected="selected"' : '',
               $c
            );
            }?>
        </select>    
    </tr>
  </table>

  <?php
  }


  function edit_user_fields( $user_id ) {
    if ( ! current_user_can( 'edit_user', $user_id ) ) {
      return false;
    }


    if ( ! empty( $_POST['user_clinic'] ) ) {
      if(!update_user_meta( $user_id, 'user_clinic', $_POST['user_clinic'] )){
        add_user_meta( $user_id, 'user_clinic', $_POST['user_clinic']);
      }
    }
  }
}


new theme_user_settings();