<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
/**
* Class that adds additional metaboxes and settings to theme
*
* @package theme/settings
*/

class velesh_theme_meta{

  /**
  * default callback
  */
  public function __construct(){
    add_action( 'save_post', array($this, 'save_custom_postdata' ), 98 );
    add_action( 'edited_category', array($this, 'save_tax_meta'), 97);
    add_action('admin_menu', array($this, 'print_metaboxes'));
  }


  /**
  * Save additional term meta
  *
  * @param #term_id - integer
  */
  public static function save_tax_meta( $term_id ){
    /**
    * to run this save an option  do_theme_save = yes  should esist in $_POST.
    */
    if( !isset($_POST['do_theme_save']) ) return;
    /**
    * an array of saving parameters
    * should have structure like: ['name' => {string}, 'unique' => {bool}],
    */
    $data     = array();

    foreach ($data as $_id => $_d) {
      if(isset($_POST[$_d['name']]) && !empty($_POST[$_d['name']])){
        $new_data = $_POST[$_d['name']];

        if(!update_term_meta($term_id, $_d['name'] , $new_data)){
          add_term_meta( $term_id, $_d['name'] , $new_data, $_d['unique'] );
        }
      }else{
        delete_term_meta( $term_id, $_d['name']);
      }
    }
  }


  /**
  * Save additional post meta
  *
  * @param #post_id - integer
  */
  public static function save_custom_postdata($post_id){
    /**
    * to run this save an option  do_theme_save = yes  should esist in $_POST.
    */
    if( !isset($_POST['do_theme_save']) ) return;

    /**
    * an array of saving parameters
    * should have structure like: ['name' => {string}, 'unique' => {bool}],
    */
    $data     = array();

    foreach ($data as $_id => $_d) {
      if(isset($_POST[$_d['name']]) && !empty($_POST[$_d['name']])){
        $new_data = $_POST[$_d['name']];

        if(!update_post_meta($post_id, $_d['name'] , $new_data)){
          add_post_meta( $post_id, $_d['name'] , $new_data, $_d['unique'] );
        }
      }else{
        delete_post_meta( $post_id, $_d['name']);
      }
    }
  }


  /**
  * Adds metaboxes to posts
  */
  public static function print_metaboxes(){
    /* should contain only add_meta_box($args) functions */
  }

}