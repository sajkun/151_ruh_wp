<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}


/**
 * Post types Class.
 */
class velesh_theme_posts {


  public static $lead  = 'lead_item';


  /**
   * Hook in methods.
   */
  public static function init() {
    add_action( 'init', array( __CLASS__, 'register_taxonomies' ), 5 );
    add_action( 'init', array( __CLASS__, 'register_post_types' ), 5 );
    add_action( 'init', array( __CLASS__, 'support_jetpack_omnisearch' ) );
    add_filter( 'rest_api_allowed_post_types', array( __CLASS__, 'rest_api_allowed_post_types' ) );
    add_action( 'velesh_theme_after_register_post_type', array( __CLASS__, 'maybe_flush_rewrite_rules' ) );

    add_filter( 'gutenberg_can_edit_post_type', array( __CLASS__, 'gutenberg_can_edit_post_type' ), 10, 2 );
    add_filter( 'use_block_editor_for_post_type', array( __CLASS__, 'gutenberg_can_edit_post_type' ), 10, 2 );

    add_action( 'add_meta_boxes', array( __CLASS__, 'add_metaboxes' ) );

    add_action( 'save_post' ,array( __CLASS__, 'save_meta' ) , 99999);
  }

  public static function register_taxonomies(){
    if ( ! is_blog_installed() ) {
      return;
    }
  }


  /**
   * Register core post types.
   */
  public static function register_post_types() {
    if ( ! is_blog_installed()) {
      return;
    }

   $lead = self::$lead;

    if(!post_type_exists( $lead )):
      register_post_type(
       $lead ,
        array(
          'labels'              => array(
            'name'                  => __( 'Leads', 'theme-translation' ),
            'singular_name'         => __( 'Lead', 'theme-translation' ),
            'all_items'             => __( 'All leads', 'theme-translation' ),
            'menu_name'             => _x( 'Leads', 'Admin menu name', 'theme-translation' ),
            'add_new'               => __( 'Add New', 'theme-translation' ),
            'add_new_item'          => __( 'Add new lead', 'theme-translation' ),
            'edit'                  => __( 'Edit', 'theme-translation' ),
            'edit_item'             => __( 'Edit lead', 'theme-translation' ),
            'new_item'              => __( 'New lead', 'theme-translation' ),
            'view_item'             => __( 'View lead', 'theme-translation' ),
            'view_items'            => __( 'View lead', 'theme-translation' ),
            'search_items'          => __( 'Search lead', 'theme-translation' ), 'not_found'             => __( 'No lead found', 'theme-translation' ),
            'not_found_in_trash'    => __( 'No lead found in trash', 'theme-translation' ),
            'parent'                => __( 'Parent of a lead', 'theme-translation' ),
            'featured_image'        => __( 'lead photo', 'theme-translation' ),
            'set_featured_image'    => __( 'Set lead background', 'theme-translation' ),
            'remove_featured_image' => __( 'Remove lead background', 'theme-translation' ),
            'use_featured_image'    => __( 'Use as lead background', 'theme-translation' ),
            'insert_into_item'      => __( 'Insert', 'theme-translation' ),
            'uploaded_to_this_item' => __( 'Uploaded', 'theme-translation' ),
            'filter_items_list'     => __( 'Filter leads', 'theme-translation' ),
            'items_list_navigation' => __( 'leads navigation', 'theme-translation' ),
            'items_list'            => __( 'leads list', 'theme-translation' ),
          ),
          'description'         => __( 'This is where you can add new team member to your site.', 'theme-translation' ),
          'public'              => true,
          'show_ui'             => true,
          'capability_type'     => 'post',
          'map_meta_cap'        => true,
          'publicly_queryable'  => true,
          'exclude_from_search' => false,
          'hierarchical'        => false, // Hierarchical causes memory issues - WP loads all records!
          'rewrite'             => 'lead',
          'query_var'           => true,
          'supports'            => array( 'title'),
          'has_archive'         => false,
          'show_in_nav_menus'   => true,
          'show_in_rest'        => false,
          'menu_icon'           => 'dashicons-image-filter',
        )
      );
    endif;


    do_action( 'velesh_theme_after_register_post_type' );
  }


  /**
   * Flush rules if the prize is queued.
   *
   * @since 3.3.0
   */
  public static function maybe_flush_rewrite_rules() {
    if ( 'yes' === get_option( 'theme_posts_queue_flush_rewrite_rules2' ) ) {
      update_option( 'theme_posts_queue_flush_rewrite_rules2', 'no' );
      self::flush_rewrite_rules();
    }
  }

  /**
   * Flush rewrite rules.
   */
  public static function flush_rewrite_rules() {
    flush_rewrite_rules();
  }

  /**
   * Disable Gutenberg for prize.
   *
   * @param bool   $can_edit Whether the post type can be edited or not.
   * @param string $post_type The post type being checked.
   * @return bool
   */
  public static function gutenberg_can_edit_post_type( $can_edit, $post_type ) {
    return 'prize' === $post_type ? false : $can_edit;
  }

  /**
   * Add prize Support to Jetpack Omnisearch.
   */
  public static function support_jetpack_omnisearch() {
    if ( class_exists( 'Jetpack_Omnisearch_Posts' ) ) {
      new Jetpack_Omnisearch_Posts( 'prize' );
    }
  }

  /**
   * Added prize for Jetpack related posts.
   *
   * @param  array $post_types Post types.
   * @return array
   */
  public static function rest_api_allowed_post_types( $post_types ) {
    $post_types[] = 'prize';

    return $post_types;
  }


  /**
   * adds metaboxes
   */
  public static function add_metaboxes(){
     wp_enqueue_media();

     add_meta_box( 'lead_patient_data', __( 'Patient Information', 'theme-translations' ),  array(__CLASS__, 'lead_patient_data_cb'),  self::$lead, 'normal', 'high' );

     add_meta_box( 'lead_proposed_treatment_value', __( 'Proposed Treatment Value', 'theme-translations' ),  array(__CLASS__, 'lead_proposed_treatment_value_cb'),  self::$lead, 'normal', 'high' );

     add_meta_box( 'lead_treatment_coordinator', __( 'Treatment Co-Ordinator', 'theme-translations' ),  array(__CLASS__, 'lead_treatment_coordinator_cb'),  self::$lead, 'normal', 'high' );

     add_meta_box( 'lead_documents', __( 'Documents', 'theme-translations' ),  array(__CLASS__, 'lead_documents_cb'),  self::$lead, 'normal', 'high' );

     add_meta_box( 'lead_notes', __( 'Notes', 'theme-translations' ),  array(__CLASS__, 'lead_notes_cb'),  self::$lead, 'normal', 'high' );

     add_meta_box( 'lead_specialists', __( 'Team', 'theme-translations' ),  array(__CLASS__, 'lead_specialists_cb'),  self::$lead, 'side', 'low' );


     add_meta_box( 'lead_logs', __( 'Activity', 'theme-translations' ),  array(__CLASS__, 'lead_logs_cb'),  self::$lead, 'side', 'low' );

     add_meta_box( 'lead_reminder', __( 'Reminder', 'theme-translations' ),  array(__CLASS__, 'lead_reminder_cb'),  self::$lead, 'side', 'low' );
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_reminder_cb($post){
    $meta = get_post_meta($post->ID, '_reminder', true);
    ?>
      <input type="text" name="reminder" placeholder="Add" class="leads-block__input fullwidth datetimepicker"  value="<?php echo isset($meta)? $meta : ''; ?>">
      <br> <br>
      <a href="javascript:void(0)" onclick="clear_input(this)">Clear Reminder</a>
    <?php
  }

  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_patient_data_cb($post){
    $meta = get_post_meta($post->ID, '_patient_data', true);
    ?>

    <div class="leads-block__row">
      <div class="leads-block__name">
        <h4>Name</h4>
        <input type="text" name="patient_data[name]" value="<?php echo isset($meta['name']) ? $meta['name'] : ''; ?>" placeholder="Enter Name" class="leads-block__input lg">
      </div>
      <br>
      <table class="leads-block__data fullwidth" style="width: 100%">
        <tbody>
          <tr>
          <td>
            <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
          </td>
          <td width="200" style="width:200px"><p class="leads-block__label">Phone</p></td>
          <td>
            <input type="text" name="patient_data[phone]" value="<?php echo isset($meta['phone'])? $meta['phone'] : ''; ?>" placeholder="Add" class="leads-block__input fullwidth">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
          </td>
          <td><p class="leads-block__label">E-mail</p></td>
          <td>
            <input type="text" name="patient_data[email]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo isset($meta['email'])? $meta['email'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
          </td>
          <td><p class="leads-block__label">Source</p></td>
          <td>
            <input type="text" name="patient_data[sourse]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo isset($meta['sourse'])? $meta['sourse'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
          </td>
          <td><p class="leads-block__label">Treatment</p></td>
          <td>
            <input type="text" name="patient_data[treatment]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo isset($meta['treatment'])? $meta['treatment'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
          </td>
          <td><p class="leads-block__label">Clinic</p></td>
          <td>
            <input type="text" name="patient_data[clinic]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo isset($meta['clinic'])? $meta['clinic'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
          </td>
          <td><p class="leads-block__label">Date / Time</p></td>
          <td>
            <input type="text" name="patient_data[date_time]" placeholder="Add" class="leads-block__input fullwidth datetimepicker"  value="<?php echo isset($meta['date_time'])? $meta['date_time'] : ''; ?>">
          </td>
        </tr>
      </tbody></table>
    </div>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_proposed_treatment_value_cb($post){
    $meta = get_post_meta($post->ID, '_treatment_value', true);
    ?>
    <div class="leads-block__row">
      <h4>Treatment Value</h4>
      <div class="leads-block__price">
        <input type="text" name="treatment_value[value]" placeholder="£00.00" class="leads-block__input xxl"  value="<?php echo isset($meta['value']) ? $meta['value'] : ''; ?>">
      </div>
    </div>
    <br>

    <div class="leads-block__row">
      <table class="leads-block__data fullwidth">
        <tbody>
          <tr>
            <td>
              <svg class="icon svg-icon-clock green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clock"></use> </svg>
            </td>
            <td><p class="leads-block__label">Payment Terms</p></td>
            <td>
              <input type="text" name="treatment_value[terms]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['terms']) ? $meta['terms'] : ''; ?>">
            </td>
          </tr>
          <tr>
            <td>
              <svg class="icon svg-icon-monthly green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-monthly"></use> </svg>
            </td>
            <td><p class="leads-block__label">Monthly</p></td>
            <td>
              <input type="text" name="treatment_value[mounthly]" placeholder="Add"  class="leads-block__input fullwidth" value="<?php echo isset($meta['mounthly']) ? $meta['mounthly'] : ''; ?>">
            </td>
          </tr>
          <tr>
          <td>
            <svg class="icon svg-icon-card green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
          </td>
          <td><p class="leads-block__label">Payment Method</p></td>
          <td>
            <input type="text" name="treatment_value[payment_method]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['payment_method']) ? $meta['payment_method'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-tooth green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
          </td>
          <td><p class="leads-block__label">Treatment</p></td>
          <td>
            <input type="text" name="treatment_value[treatment]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['treatment']) ? $meta['treatment'] : ''; ?>">
          </td>
        </tr>
      </tbody></table>
    </div>

    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_treatment_coordinator_cb($post){
    $meta = get_post_meta($post->ID, '_treatment_coordinator', true);
    ?>
    <div class="leads-block__row">
      <table class="leads-block__data fullwidth">
        <tbody><tr>
          <td>
            <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
          </td>
          <td><p class="leads-block__label">Consultation Date</p></td>
          <td>
            <input type="text" name="treatment_coordinator[consultation_date]" placeholder="Add" class="leads-block__input fullwidth datetimepicker" value="<?php echo isset($meta['consultation_date']) ? $meta['consultation_date'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-lamp"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-lamp"></use> </svg>
          </td>
          <td><p class="leads-block__label">Reason for Appt.</p></td>
          <td>
            <input type="text" name="treatment_coordinator[reason]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['reason']) ? $meta['reason'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-leaps"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leaps"></use> </svg>
          </td>
          <td><p class="leads-block__label">Dentist Seen</p></td>
          <td>
            <input type="text" name="treatment_coordinator[specialist]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['specialist']) ? $meta['specialist'] : ''; ?>">
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-chat"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-chat"></use> </svg>
          </td>
          <td><p class="leads-block__label">Follow Up</p></td>
          <td>
            <input type="text" name="treatment_coordinator[follow]" placeholder="Add" class="leads-block__input fullwidth" value="<?php echo isset($meta['follow']) ? $meta['follow'] : ''; ?>">
          </td>
        </tr>

      </tbody></table>
    </div>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_documents_cb($post){
    $meta = get_post_meta($post->ID, '_product_cat', true);
    ?>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_notes_cb($post){
    $meta = get_post_meta($post->ID, '_product_cat', true);
    ?>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_specialists_cb($post){
    $meta = get_post_meta($post->ID, '_product_cat', true);
    ?>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_logs_cb($post){
    $meta = get_post_meta($post->ID, '_product_cat', true);
    ?>
    <input type="hidden" name="lead_logs" value="yes">
    <?php
  }

  /**
   * Saves  post's metadata
   *
   * @param $post_id - integer
   */
  public static function save_meta($post_id){
    if(!isset($_POST['save_theme_meta']) || 'yes' !== $_POST['save_theme_meta'] ) return;

    $data     = array(
      ['name' => 'patient_data', 'unique' => true],
      ['name' => 'treatment_value', 'unique' => true],
      ['name' => 'treatment_coordinator', 'unique' => true],
      ['name' => 'reminder', 'unique' => true],
    );

    // print_r($_POST);
    // exit();

    foreach ($data as $_id => $_d) {
      if(isset($_POST[$_d['name']]) && !empty($_POST[$_d['name']])){
        $new_data = $_POST[$_d['name']];

        if($_d['name'] === 'product_cat'){
          foreach ($new_data as $key => $term_id) {
            if(!update_term_meta($term_id, '_special_offer_id', $post_id )){
              add_term_meta( $term_id, '_special_offer_id', $post_id, true);
            }
          }
        }

       if(!update_post_meta($post_id, '_'.$_d['name'] , $new_data)){
          $test = add_post_meta( $post_id, '_'.$_d['name'] , $new_data, $_d['unique'] );
        }
      }else{
        delete_post_meta( $post_id, $_d['name']);
      }
    }
    // exit();
  }

}

velesh_theme_posts::init();