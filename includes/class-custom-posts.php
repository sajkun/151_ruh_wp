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
    add_action( 'delete_post', array(__CLASS__, 'remove_assigned_leads') );
    add_action( 'wp_trash_post', array(__CLASS__, 'remove_assigned_leads') );
    add_action( 'publish_to_trash', array(__CLASS__, 'remove_assigned_leads') );
    add_action( 'draft_to_trash', array(__CLASS__, 'remove_assigned_leads') );
    add_action( 'future_to_trash', array(__CLASS__, 'remove_assigned_leads') );

    add_action( 'wp_untrash_post', array(__CLASS__, 'restore_assigned_leads') );
    add_action( 'untrash_post', array(__CLASS__, 'restore_assigned_leads') );

    add_action('admin_menu', array(__CLASS__, 'add_leads_sub_menu_pages'));
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


  public static function add_leads_sub_menu_pages(){
    add_submenu_page( 'edit.php?post_type=lead_item', 'Leads\' Stages', 'Leads\' Stages', 'manage_options', 'leads-stages', array(__CLASS__, 'print_leads_stages_cb'));

    add_submenu_page( 'edit.php?post_type=lead_item', 'Clinics, treatment configurations', 'Clinics, treatment configurations', 'manage_options', 'clinics-treatment-configurations', array(__CLASS__, 'print_clinics_treatment_configurations_cb'));
  }

    public static function print_clinics_treatment_configurations_cb(){
      // echo "<pre>";
      // print_r($_POST);
      // echo "</pre>";

      if(isset($_POST['do_save']) && 'yes' === $_POST['do_save']){
        if(isset($_POST['clinic'])){
          update_option('clinics_list', $_POST['clinic']);
          ?>
          <div class="notice notice-success is-dismissible"><p>Clinics were saved succesfully</p></div>
          <?php
        }else{
          delete_option('clinics_list');
        }

        if(isset($_POST['treatment'])){
          update_option('treatments_list', $_POST['treatment']);
         ?>
          <div class="notice notice-success is-dismissible"><p>Treatments were saved succesfully</p></div>
          <?php
        }else{
          delete_option('treatments_list');
        }

        if(isset($_POST['campaign'])){
          update_option('campaigns_list', $_POST['campaign']);
         ?>
          <div class="notice notice-success is-dismissible"><p>Campaigns were saved succesfully</p></div>
          <?php
        }else{
          delete_option('campaigns_list');
        }
        if(isset($_POST['sources'])){
          update_option('sources_list', $_POST['sources']);
         ?>
          <div class="notice notice-success is-dismissible"><p>Sources were saved succesfully</p></div>
          <?php
        }else{
          delete_option('sources_list');
        }
      }

      $clinics = get_option('clinics_list');
      $treatments = get_option('treatments_list');
      $campaigns = get_option('campaigns_list');
      $sources = get_option('sources_list');

      ?>
        <h3>Set clinics, and treatments names</h3>
       <form action="<?php echo admin_url('edit.php?post_type=lead_item&page=clinics-treatment-configurations') ?>" method="POST">

        <div class="">
          <table class="fullwidth justify-table">
            <tr>
              <td>
                <h4>Clinics</h4>

                  <div class="clinics-list">
                    <?php if ($clinics): ?>

                    <?php foreach ($clinics as $key => $cl): ?>
                      <div class="input-control">
                        <p class="input-title">Clinic #<?php echo $key ?> <a href="javascript:void(0)" <?php echo 'style="float:right"' ?>onclick="delete_input(this)">Delete Clinic</a></p>
                        <input type="text" class="fullwidth" name="clinic[<?php echo $key ?>]" value="<?php echo $cl ?>">
                      </div>
                    <?php endforeach ?>
                    <?php endif ?>
                  </div>


              <a href="javascript:void(0)" class="button" onclick="add_input('clinic')">Add clinic</a>

                <input type="hidden" id="count_clinics" value="<?php echo  $clinics? count( $clinics): 0 ?>">
              </td>
              <td colspan="2">
                <h4>Treatment</h4>
                <div class="treatments-list" <?php echo 'style="column-count:2; column-gap:20px"' ?>>
                    <?php if ($treatments):
                      $counter = 0;
                      ?>

                    <?php foreach ($treatments as $key => $cl): ?>
                      <div class="input-control">
                        <p class="input-title">Treatment #<?php echo $counter;  ?> <a href="javascript:void(0)" <?php echo 'style="float:right"' ?> onclick="delete_input(this)">Delete treatment</a></p>
                        <input type="text" class="fullwidth" name="treatment[<?php echo $counter ?>]" value="<?php echo $cl ?>">
                      </div>
                    <?php
                      $counter++;
                      endforeach;
                     ?>
                    <?php endif ?>
                </div>
                <input type="hidden" id="count_treatment" value="<?php echo count($treatments); ?>">
                <a href="javascript:void(0)" class="button" onclick="add_input('treatment')">Add treatment</a>
              </td>
              <td></td>
            </tr>

            <tr>
              <td  colspan="1">
                <h4>Campaigns</h4>

                  <div class="campaigns-list">
                    <?php if ($campaigns): ?>

                    <?php foreach ($campaigns as $key => $cl): ?>
                      <div class="input-control">
                        <p class="input-title">Campaign #<?php echo $key ?> <a href="javascript:void(0)" <?php echo 'style="float:right"' ?> onclick="delete_input(this)">Delete Campaign</a></p>
                        <input type="text" class="fullwidth" name="campaign[<?php echo $key ?>]" value="<?php echo $cl ?>">
                      </div>
                    <?php endforeach ?>
                    <?php endif ?>
                  </div>

                 <a href="javascript:void(0)" class="button" onclick="add_input('campaign')">Add campaign</a>

                <input type="hidden" id="count_campaign" value="<?php echo  $campaigns? count( $campaigns): 0 ?>">
              </td>
              <td  colspan="1">
                <h4>Sources</h4>

                  <div class="sources-list">
                    <?php if ($sources): ?>

                    <?php foreach ($sources as $key => $cl): ?>
                      <div class="input-control">
                        <p class="input-title">Source #<?php echo $key ?> <a href="javascript:void(0)" <?php echo 'style="float:right"' ?> onclick="delete_input(this)">Delete Source</a></p>
                        <input type="text" class="fullwidth" name="sources[<?php echo $key ?>]" value="<?php echo $cl ?>">
                      </div>
                    <?php endforeach ?>
                    <?php endif ?>
                  </div>

                 <a href="javascript:void(0)" class="button" onclick="add_input('sources')">Add Source</a>

                <input type="hidden" id="count_sources" value="<?php echo  $sources? count( $sources): 0 ?>">
              </td>

              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

        <br><br>
        <button class="button button-primary" type="submit">Save</button>
        <input type="hidden" name="do_save" value="yes">
      </form>
      <?php
    }


    public static function print_leads_stages_cb(){
      // echo "<pre>";
      // print_r($_POST);
      // echo "</pre>";

      // save changes
      if(isset($_POST['save_leads_stages']) && 'yes' === $_POST['save_leads_stages']){
        $option = array();

        foreach ($_POST['leads_stages'] as $key => $lead) {
          $option[$lead['number']] = $lead;
        }

        $updated = update_option('leads_stages', $option);

        if($updated){
          ?>
          <div class="notice notice-success is-dismissible"><p>Changes were saved succesfully</p></div>
          <?php
        }

        if(isset($_POST['stage_for_converted'])){
          update_option('stage_for_converted', $_POST['stage_for_converted']);
        }else{
          delete_option('stage_for_converted');

          ?>
            <div class="notice notice-error is-dismissible"><p>No stage is selected as stage for converted leads</p></div>
          <?php
        }

        if(isset($_POST['stage_for_failed'])){
          update_option('stage_for_failed', $_POST['stage_for_failed']);
        }else{
          delete_option('stage_for_failed');
          ?>
            <div class="notice notice-error is-dismissible"><p>No stage is selected as stage for failed leads</p></div>
          <?php
        }
      }

      $stages = get_option('leads_stages');
      $stage_for_converted = get_option('stage_for_converted');
      $stage_for_failed    = get_option('stage_for_failed');

      if(!$stages){
        $stages = array();
      }
      ?>

        <h3>Stages of leads' processing</h3>
        <i>You may reorder stages by dragging them</i>

        <form action="<?php echo admin_url('edit.php?post_type=lead_item&page=leads-stages') ?>" method="POST">
          <br>
          <br>
        <a href="javasctipt:void(0)" onclick="add_leads_stage();" class="button">Add stage</a>
        <button class="button button-primary">Save</button>
          <br>

          <div class="stages-content">
            <ul class="stages-content__list">
              <?php
              $number = 0;
              if($stages):
               foreach ($stages as $key => $st): ?>
              <li>
                <div class="stages-content__item">
                  <table>
                    <tr>
                      <th colspan="4">
                        <h3>Stage #<span class="number"><?php echo ($number + 1) ?></span></h3>
                        <input type="hidden" name="leads_stages[<?php echo ($number) ?>][number]" value="<?php echo ($number) ?>" class="stage_order">
                        <a  href="javasctipt:void(0)" onclick="delete_leads_stage(this);">Delete Stage</a>
                      </th>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td colspan="3"><input type="text" class="regular-text" name="leads_stages[<?php echo ($number) ?>][name]" value="<?php echo $st['name'] ?>"></td>
                    </tr>

                    <tr>
                      <th>Background Color</th>
                      <td><input type="text" class="short-text colorpicker" name="leads_stages[<?php echo ($number) ?>][bg_color]" value="<?php echo $st['bg_color'] ?>"></td>

                      <th>Text Color</th>
                      <td><input type="text" class="short-text colorpicker" name="leads_stages[<?php echo ($number) ?>][text_color]" value="<?php echo $st['text_color'] ?>"></td>
                    </tr>

                    <tr><td colspan="4">
                      <label class="optional_label">
                      <input type="radio" name="stage_for_converted" class="stage_for_converted" value="<?php echo ($number) ?>" <?php echo  $stage_for_converted && (int)$number === (int)$stage_for_converted? 'checked="checked"': ''  ?>>
                      Is converted <br>
                      <i>Leads on this stage, and all hire stages,  will be counted as converted</i>
                      </label>

                      <label class="optional_label">
                      <input type="radio" name="stage_for_failed" class="stage_for_failed" value="<?php echo ($number) ?>" <?php echo !!$stage_for_failed && (int)$number === (int)$stage_for_failed? 'checked="checked"': ''  ?>>
                        Is failed <br>
                        <i>Leads on this stage, will be counted as failed</i>
                      </label>
                    </td></tr>
                  </table>
                </div>
              </li>
              <?php
               $number++;
               endforeach;
               endif; ?>
            </ul>
          </div>

          <a href="javasctipt:void(0)" onclick="add_leads_stage();" class="button">Add stage</a>

          <input type="hidden" name="save_leads_stages" value="yes">
          <input type="hidden" id="leads_count" value="<?php echo $number ?>">
          <button class="button button-primary">Save</button>
        </form>

      <?php
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

     add_meta_box( 'lead_stage', __( 'Current stage', 'theme-translations' ),  array(__CLASS__, 'lead_stage_cb'),  self::$lead, 'side', 'low' );
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_stage_cb($post){
    $meta = get_post_meta($post->ID, '_lead_stage', true);
    $stages = get_option('leads_stages');
    $select_first = true;

    if(!$meta){
      $select_first = true;
    }else{
      foreach ($stages as $key => $st) {
        $select_first = ($meta === $st['name'])? false : $select_first;
      }
    }

    if(!$stages){
      printf( ' No stages configured. You may do it <a href="%s">there</a>', admin_url('edit.php?post_type=lead_item&page=leads-stages'));
       return false;
    }
    ?>

    <select name="lead_stage" id="lead_stage" class="fullwidth">
      <?php foreach ($stages as $key => $st): ?>
        <option value="<?php echo $st['name']?>" <?php echo $meta === $st['name'] ||$select_first? 'selected="selected"' : '';?>><?php echo $st['name']?></option>
      <?php
       $select_first = false;
       endforeach; ?>
    </select>

    <?php
  }

  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_reminder_cb($post){
    $meta = get_post_meta($post->ID, '_reminder', true);
    ?>
      <input type="text" autocomplete="off" name="reminder" placeholder="Add" class="leads-block__input fullwidth datetimepicker"  value="<?php echo isset($meta)? $meta : ''; ?>">
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
    $clinics    = get_option('clinics_list');
    $treatments = get_option('treatments_list');
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
            <?php
              $sources = array(
                'Live Chat',
                'Instagram',
                'Slaine Instagram',
                'Riz Instagram',
                'Andy Instagram',
                'Pete Instagram',
                'Google PPC',
                'Website',
                'Phone',
                'Walk In',
                'Other',
              );
            ?>
            <select name="patient_data[source]" id="patient_data[source]" class="fullwidth">
              <option value="-1">Select</option>
              <?php foreach ($sources as $key => $s): ?>
              <option value="<?php echo $s ?>" <?php echo isset($meta['source']) && $s == $meta['source']?'selected="selected"' : ''; ?>><?php echo $s ?></option>
              <?php endforeach ?>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
          </td>
          <td><p class="leads-block__label">Treatment</p></td>
          <td>

            <select name="patient_data[treatment]" id="patient_data[treatment]" class="fullwidth">
              <option value="">Select</option>
              <?php foreach ($treatments as $s): ?>
              <option value="<?php echo $s ?>" <?php echo isset($meta['treatment']) && $s == $meta['treatment']?'selected="selected"' : ''; ?>><?php echo $s ?></option>
              <?php endforeach ?>
            </select>


          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
          </td>
          <td><p class="leads-block__label">Clinic</p></td>
          <td>

            <select name="patient_data[clinic]" id="patient_data[clinic]" class="fullwidth">
              <option value="">Select</option>
              <?php foreach ($clinics as $s): ?>
              <option value="<?php echo $s ?>" <?php echo isset($meta['clinic']) && $s == $meta['clinic']?'selected="selected"' : ''; ?>><?php echo $s ?></option>
              <?php endforeach ?>
            </select>

          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
          </td>
          <td><p class="leads-block__label">Date / Time</p></td>
          <td>
            <?php
               $date = new DateTime($post->post_modified);
             ?>
            <input type="text" readonly name="patient_data[date_time]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo $date->format('M d Y H:i') ?>">

          </td>
        </tr>
        <tr>
          <td>
            <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
          </td>
          <td><p class="leads-block__label">Campaign</p></td>
          <td>
            <?php
             ?>
            <input type="text" name="patient_data[campaign]" placeholder="Add" class="leads-block__input fullwidth"  value="<?php echo isset($meta['phone'])? $meta['phone'] : ''; ?>">

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
    $treatments = get_option('treatments_list');
    $meta = get_post_meta($post->ID, '_treatment_value', true);
    $terms = array(
      'Full Payment',
      '12 Months',
      '24 Months',
      '36 Months',
      '48 Months',
    );
    ?>
    <div class="leads-block__row">
      <h4>Treatment Value (£)</h4>
      <div class="leads-block__price">
        <input type="text" name="treatment_value[value]" placeholder="£00.00" class="leads-block__input xxl price_input"  value="<?php echo isset($meta['value']) ? $meta['value'] : ''; ?>">
      </div>
      <i>place only number without any separators or currency symbols</i>
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



            <select name="treatment_value[terms]" id="treatment_value[terms]" class="terms_select fullwidth">
              <?php foreach ($terms as $key => $s): ?>
              <option value="<?php echo $s ?>" <?php echo isset($meta['terms']) && $s == $meta['terms']?'selected="selected"' : ''; ?>><?php echo $s ?></option>
              <?php endforeach ?>
            </select>
            </td>
          </tr>
          <tr>
            <td>
              <svg class="icon svg-icon-monthly green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-monthly"></use> </svg>
            </td>
            <td><p class="leads-block__label">Monthly</p></td>
            <td>
              <input type="text" readonly name="treatment_value[mounthly]" placeholder="Add"  class="leads-block__input fullwidth treatment_mounthly" value="<?php echo isset($meta['mounthly']) ? $meta['mounthly'] : ''; ?>">
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
            <select name="treatment_value[treatment]" id="treatment_value[treatment]" class="fullwidth">
              <option value="">Select</option>
              <?php foreach ($treatments as $s): ?>
              <option value="<?php echo $s ?>" <?php echo isset($meta['treatment']) && $s == $meta['treatment']?'selected="selected"' : ''; ?>><?php echo $s ?></option>
              <?php endforeach ?>
            </select>
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
    $meta = get_post_meta($post->ID, '_lead_files', true);
    $count = 0;
    ?>
    <div class="uploaded-documents">

      <?php
        if($meta):
          foreach ($meta as $key => $m):
            if(empty($m['name']) && empty($m['url'])) continue;
            ?>
             <div class="document-block">
               <svg class="icon svg-icon-doc"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-doc"></use> </svg>

               <p class="document-block__text">
                 <span class="name"><?php echo $m['name'] ?></span>
                 <san class="date"><?php echo $m['date'] ?></span>
               </p>           <p class="document-block__actions">
                 <a href="<?php echo $m['url'] ?>" download style="text-decoration: none;"><svg class="icon svg-icon-download"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-download"></use> </svg> </a>
                 <svg class="icon svg-icon-trash" onclick="delete_file(this)"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use> </svg>
               </p>

               <input type="hidden" name="lead_files[<?php echo $count;?>][name]" value="<?php echo $m['name'] ?>">
               <input type="hidden" name="lead_files[<?php echo $count;?>][date]" value="<?php echo $m['date'] ?>">
               <input type="hidden" name="lead_files[<?php echo $count;?>][url]" value="<?php echo $m['url'] ?>">
             </div>
            <?php
            $count++;
          endforeach;
        endif;
         ?>
    </div>

    <?php /*<a href="javascript:void(0)" class="button" onclick="upload_document(this)">Upload Document</a> */ ?>
    <input type="hidden" id="files_count" value="<?php echo $count; ?>">
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_notes_cb($post){
    $meta = get_post_meta($post->ID, '_lead_notes', true);
    $count=0;


    $id = get_current_user_id();
    $user = get_user_by('ID',$id);
    $user = get_user_by('id', get_current_user_id());
    $user_name =  theme_get_user_name($user);
    ?>
    <div class="notes-block">


      <?php
      if($meta):
      foreach ($meta as $key => $m):
        if(empty($m['name']) && empty($m['text'])) continue;

        $_user = get_user_by('ID',(int)$m['user_id']);
        ?>
      <div class="note-block">
        <div class="note-block__header clearfix">
          <span class="name"><?php echo $m['user_name']; ?></span>
          <span class="date"><?php echo $m['date'] ?></span>
        </div>

        <div class="note-block__body">
          <?php echo $m['text'] ?>
        </div>

        <a href="javascript:void(0)" onclick="remove_note(this)"> Remove Note</a>

        <input type="hidden" name="lead_notes[<?php echo $count ?>][user_name]" value="<?php echo $m['user_name'] ?>}">
        <input type="hidden" name="lead_notes[<?php echo $count ?>][text]" value="<?php echo $m['text'] ?>">
        <input type="hidden" name="lead_notes[<?php echo $count ?>][date]" value="<?php echo $m['date'] ?>">
      </div>
      <br>
    <?php
      $count++;
      endforeach ;
    endif;
      ?>
    </div>

    <textarea class="fullwidth" id="lead_note" rows="10"></textarea>
    <a href="javascript:void(0)" class="button" onclick="add_note(this, <?php echo $id;?>)">Add Notes</a>
    <input type="hidden" id="notes_count" value="<?php echo $count; ?>">
    <input type="hidden" name="save_theme_meta" value="yes">
    <input type="hidden" name="save_theme_meta" value="yes">
    <input type="hidden" id="user_nice_name" value="<?php echo $user_name; ?>">

    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_specialists_cb($post){
    $meta = get_post_meta($post->ID, '_lead_specialists', true);
    $users = get_users(array());

    if(!$users) return;
    ?>
    <table class="team-leads">
      <tbody>
        <?php foreach ($users as $key => $user):

           $user_photo_id = get_the_author_meta('user_photo_id', $user->ID);
           $image =  wp_get_attachment_url( $user_photo_id );
           $image = ($image) ? $image : DUMMY_ADMIN;
           $name = theme_get_user_name($user);
           $user_position = get_the_author_meta('user_position', $user->ID);
          ?>
        <tr>
         <td><div class="team-leads__photo"><img src="<?php echo $image ?>" alt=""></div></td>
        <td colspan="3">
          <div class="clearfix">
            <span class="team-leads__name"><?php echo $name?></span>
            <span class="team-leads__post"><?php echo $user_position?></span>
          </div>
        </td>
        <td>
          <input type="hidden" name="lead_specialists[<?php echo $user->ID ?>]" value="no">
          <input type="checkbox" name="lead_specialists[<?php echo $user->ID ?>]" value="yes" <?php echo $meta[$user->ID] === 'yes'? 'checked="checked"' : '' ?>>
        </td>
     </tr>
    <?php endforeach ?>
    </tbody></table>
    <input type="hidden" name="save_theme_meta" value="yes">
    <?php
  }


  /**
   * callback for add_meta_box()
   *
   * @param $post - WP_Post object
   */
  public static function lead_logs_cb($post){
    $meta = get_post_meta($post->ID, '_lead_log', true);
    $date = new DateTime($post->post_date);

    ?>
    <ul class="leads-block__activity">
      <li>
        <i class="state-none icon-activity"></i> <span class="leads-block__activity-text"><span class="action">Lead Created</span> <span class="date"><?php echo $date->format('d M Y') ?> at <?php echo $date->format('H:I') ?> </span></span> <span class="length">0d 0h 0m</span></li>

        <?php if ($meta): ?>

        <?php foreach ($meta as $key => $d): ?>
        <li>
         <i class="state-none icon-activity"></i> <span class="leads-block__activity-text"><span class="action"><?php echo $d['text'] ?></span> <span class="date"><?php echo $d['date_formatted'] ?> </span></span> <span class="length"><?php echo $d['time_passed'] ?></span></li>
        <?php endforeach ?>
        <?php endif ?>
      </ul>
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
      ['name' => 'lead_files', 'unique' => true],
      ['name' => 'lead_notes', 'unique' => true],
      ['name' => 'lead_specialists', 'unique' => true],
      ['name' => 'lead_stage', 'unique' => true],
    );

    // sets post name
    if(isset($_POST['patient_data'])){

      $name = array();

      $patient_data = $_POST['patient_data'];

      foreach (array('name', 'treatment', 'clinic') as  $post_key) {

        if(isset($patient_data[ $post_key])){
          $name[] = $patient_data[ $post_key];
        }
      }

      $post = get_post($post_id);

      if(count($name) > 0){
        $_name = implode(' - ', $name);

        if( $post->post_title != $_name){
          wp_update_post(
              array (
                  'ID'            => $post_id,
                  'post_title'     => $_name,
              )
          );
        }
      }
    }


    if(isset($_POST['lead_specialists'])){
      foreach ($_POST['lead_specialists'] as $user_id => $assigned) {
        $assigned_posts = get_the_author_meta('_leads_assigned',  $user_id);

        if(!$assigned_posts){
          $assigned_posts = [];
        }

        if(!in_array($post_id, $assigned_posts) && 'yes' === $assigned){
          array_push($assigned_posts, $post_id);
        }

        if('no' === $assigned){
            $assigned_key = array_search($post_id, $assigned_posts);
            if($assigned_key){
              array_splice($assigned_posts, $assigned_key, 1);
            }
          }

        if(!update_user_meta( $user_id, '_leads_assigned', $assigned_posts )){
          add_user_meta( $user_id, '_leads_assigned', $assigned_posts );
        }
      }
    }

    //uncoment for debug
    // echo "<pre>";
    // print_r($_POST);
    // echo "</pre>";
      // exit();

    //saves meta
    foreach ($data as $_id => $_d) {
      if(isset($_POST[$_d['name']]) && !empty($_POST[$_d['name']])){
        $new_data = $_POST[$_d['name']];

       if(!update_post_meta($post_id, '_'.$_d['name'] , $new_data)){
          $test = add_post_meta( $post_id, '_'.$_d['name'] , $new_data, $_d['unique'] );
        }
      }else{
        $test = delete_post_meta( $post_id, '_'.$_d['name']);
      }
    }
  }

  public function remove_assigned_leads($post_id){
    foreach(get_users() as $user){
      $assigned_posts = get_the_author_meta('_leads_assigned', $user->ID);
      if(!$assigned_posts) continue;
      $key_to_remove  = array_search($post_id, $assigned_posts );
      if(!$key_to_remove) continue;
      unset($assigned_posts[$key_to_remove]);
      if(!update_user_meta( $user->ID, '_leads_assigned', $assigned_posts )){
        add_user_meta( $user->ID, '_leads_assigned', $assigned_posts );
      }
    }
  }

  public function restore_assigned_leads($post_id){
    $meta = get_post_meta($post_id, '_lead_specialists', true);
    if($meta){
      foreach ($meta as $user_id => $assigned) {
        $assigned_posts = get_the_author_meta('_leads_assigned',  $user_id);

        if(!$assigned_posts){
          $assigned_posts = [];
        }

        if(!in_array($post_id, $assigned_posts) && 'yes' === $assigned){
          array_push($assigned_posts, (int)$post_id);
        }

        if(!update_user_meta( $user_id, '_leads_assigned', $assigned_posts )){
          add_user_meta( $user_id, '_leads_assigned', $assigned_posts );
        }
      }
    }
  }
}

velesh_theme_posts::init();