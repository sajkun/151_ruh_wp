<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
  * Main theme class
  *
  * Inits all hooks, defines theme parameters
  *
  * @author: Kuleshov Vyacheslav
  *
  * @autho-URI: https://www.upwork.com/fl/viacheslavkuleshov
  *
  * @package theme
  *
  * @since v1.0
  */
class velesh_init_theme{

  /* main style location  */
  public $main_style = '/assets/css/main.min7.css';

  /*theme style file slug*/
  public $main_style_slug = 'theme-main-style-dev1';

  /*theme fonts file location*/
  public $font = '/assets/fonts/font.css';

  /* main script location  */
  public $main_script = '/assets/script/main.min22.js';

  public $main_script_spa = '/assets/script/main.spa.min22.js';

  /* main script slug */
  public $main_script_slug = 'theme-main-script-dev1';

  /* svg sprites files slug for local storage */
  public $svg_sprite_slug = 'svg_sprite_151_4';

  /* merged style file name */
  public $merged_style_name = 'merged-style3.css';


  /**
   * theme init defauls action
   */
  public function __construct(){
    $this->define_theme_globals();
    $this->define_theme_supports();
    $this->define_image_sizes();
    $this->remove_actions();
    $this->init_hooks();
    $this->include_global();
    $this->ajax();

    if( $this->is_request( 'frontend' )){
      $this->include_frontend();
      add_action('wp_head', array('theme_construct_page', 'init'));
    }

    if( $this->is_request( 'admin' )){
      $this->include_admin();
    }

    if('no' !== get_option( 'woocommerce_cart_redirect_after_add' ) ){
      update_option('woocommerce_cart_redirect_after_add', 'no');
    }
  }


  /**
   * defines theme globals
   */
  public function define_theme_globals(){
    define('THEME_PATH', get_stylesheet_directory());
    define('THEME_URL', get_template_directory_uri());
    define('HOME_URL', get_home_url());
    define('THEME_VERSION', '2.2');
    define('DUMMY_ADMIN', THEME_URL.'/assets/images/admin/blank.png');
    define('PROGRESS', THEME_URL.'/assets/images/admin/progress.gif');
    define('DUMMY', THEME_URL.'/assets/images/admin/blank.png');
    define('DUMMY_S', THEME_URL.'/assets/images/admin/blank_s.png');
    define('THEME_DEBUG', true);
    define('RELOAD_LEAD', false);
    define('THEME_SPA', true);
  }


  /**
   * defines theme supports
   */
  public function define_theme_supports(){
    add_theme_support( 'woocommerce' );

    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'caption' ) );

    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'custom-logo', array(
      'height'      => 70,
      'width'       => 221,
      'flex-height' => true,
      'flex-width'  => true,
      'header-text' => array( 'site-title', 'site-description' ),
    ));
  }


  /**
   * defines image sizes for attachments
   */
  public function define_image_sizes(){
    add_image_size('icon', 96, 96, true);
  }



  /**
   * enqueues javascripts and css for the frontend
   *
   * @hookedto - wp_enqueue_scripts 999
   */
  public function enqueue_scripts_styles_front(){
    wp_enqueue_style( $this->main_style_slug, THEME_URL.$this->main_style, THEME_VERSION );

    wp_enqueue_style( 'theme-jquery-ui-css', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css', THEME_VERSION );

    wp_enqueue_style( 'theme-daterangepicker-ui-css', THEME_URL.'/assets/libs/datepicker/daterangepicker.css', THEME_VERSION );

    wp_enqueue_style( 'theme-datetimepicker-ui-css', THEME_URL.'/assets/libs/datetimepicker/build/jquery.datetimepicker.min.css', THEME_VERSION );

    wp_enqueue_script('theme-chart-js', 'https://cdn.jsdelivr.net/npm/chart.js@2.8.0', array('jquery'), THEME_VERSION, true);

    wp_enqueue_script('theme-jquery-ui', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js', array('jquery'), THEME_VERSION, true);

    wp_enqueue_script('theme-moment-js', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js', array('jquery'), THEME_VERSION, true);

    wp_enqueue_script('theme-date-time-picker', THEME_URL.'/assets/libs/datetimepicker/build/jquery.datetimepicker.full.min.js', array('jquery'), THEME_VERSION, true);

    wp_enqueue_script('theme-date-range-picker', THEME_URL.'/assets/libs/datepicker/daterangepicker.js', array('jquery'), THEME_VERSION, true);

    if(THEME_SPA){
      wp_enqueue_script($this->main_script_slug, THEME_URL.$this->main_script_spa, array('jquery'), THEME_VERSION, true);
    }else{
      wp_enqueue_script($this->main_script_slug, THEME_URL.$this->main_script, array('jquery'), THEME_VERSION, true);
    }


    if(THEME_DEBUG){
      wp_localize_script($this->main_script_slug, 'theme_debug', 'yes');
    }
  }


  /**
   * enqueues javascripts and css for the frontend
   *
   * @hookedto - wp_enqueue_scripts 9999
   */
  public function print_theme_inline_styles(){

    $inline_styles_4_script = array(
      // 'theme_main_style' => THEME_URL.$this->main_style,
    );

    foreach ($inline_styles_4_script as $name => $url) {
       print_inline_style($url, $name);
    }
  }


  /**
   * enqueues javascripts and css for admin dashboard
   *
   * @hookedto - to admin_enqueue_scripts 5
   */
  public function enqueue_scripts_styles_admin(){
     wp_enqueue_style( 'wp-color-picker' );

    wp_enqueue_style( 'theme-datetimepicker-ui-css', THEME_URL.'/assets/libs/datetimepicker/build/jquery.datetimepicker.min.css', THEME_VERSION );

    wp_enqueue_style( $this->main_style_slug, THEME_URL.$this->main_style, THEME_VERSION );

    wp_enqueue_style( 'theme-admin-style', THEME_URL.'/assets/css/admin.css', THEME_VERSION );

    wp_enqueue_style( 'theme-jquery-ui-css', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css', THEME_VERSION );

    wp_enqueue_script('theme-jquery-ui', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js', array('jquery'), THEME_VERSION, true);

    wp_enqueue_script('theme-date-time-picker', THEME_URL.'/assets/libs/datetimepicker/build/jquery.datetimepicker.full.min.js', array('jquery', 'wp-color-picker'), THEME_VERSION, true);


    add_svg_sprite($this->svg_sprite_slug, THEME_URL.'/assets/svg_sprite/symbol_sprite.html');

    wp_enqueue_script('theme-script', THEME_URL.'/assets/script/admin.js', array('jquery'), THEME_VERSION, true);


    $settings_pages = array();

    if(isset($_GET['page'])){
      if(in_array($_GET['page'], $settings_pages)){
        wp_enqueue_media();
      }
    }
  }



  public static function ajax(){

  }



  /**
   * adds additional theme files on frontend
   */
  public function include_frontend(){
    global $pagenow;
    // include_once(THEME_PATH.'/includes/class-content-output.php');
  }



  /**
   * adds additional theme files on admin
   */
  public function include_admin(){
  }



  /**
   * adds additional theme files on both sides
   */
  public function include_global(){
    global $pagenow;
    include_once(THEME_PATH.'/includes/helpers.php');
    include_php_from_dir(THEME_PATH.'/includes/');
  }



  /**
   * Hooks theme actions
   */
  public function init_hooks(){

    add_action('wp_enqueue_scripts',  array($this,'enqueue_scripts_styles_front') , 9991);

    add_action('wp_enqueue_scripts', array($this,'prepare_template_data'),9992);

    add_action('wp_enqueue_scripts', array($this,'inline_custom_data'), 9990);

    add_action('do_theme_after_head', array($this,'print_theme_inline_styles'), 9999);


    add_filter( 'script_loader_tag', array($this,'add_async_attribute'), 10, 2 );

    /* js and css hooks for the admin dashboard*/

    add_action( 'admin_enqueue_scripts', array($this,'enqueue_scripts_styles_admin'), 5 );

    add_action( 'admin_enqueue_scripts', array($this,'inline_custom_data'), 13 );

    /* theme setup actions */

    add_action( 'after_setup_theme', array($this, 'setup_theme') );

    add_filter('upload_mimes', array($this, 'cc_mime_types'), 10);


    add_action('theme_start_page_header',array($this,'print_inline_data_body'));

    add_action('init',array($this,'add_cors_http_header'));

    add_action('wp_footer',array($this,'print_styles_in_footer'));

    add_action('admin_init', array($this,'add_reading_settings'));

    add_action('admin_menu', array($this,'add_option_pages'));

    add_action('init', array($this, 'manager_cant_see_dashboard'));

     if(THEME_DEBUG){
        add_action('wp_footer', 'exec_clog', PHP_INT_MAX);
        add_action('admin_footer', 'exec_clog', PHP_INT_MAX);
     }

  }


  public static function manager_cant_see_dashboard(){
    if( is_admin() && !defined('DOING_AJAX')){
      $user_id = get_current_user_id();

      $user_meta=get_userdata( $user_id );

      $user_roles=$user_meta->roles;

      if(in_array('manager', $user_roles)){
        wp_redirect(home_url());
        exit;
      }
    }
  }

  /**
   * puts styles and fonts to local storage
   *
   * @hookedto - wp_enqueue_scripts 9997
   */
  public function inline_custom_data(){}


  /**
   * prepares and prints variable data for javascripts
   *
   * @prints-for-js $wc_urls - {WP_URLS}
   * @prints-for-js $user_data - {USER_DATA}
   */
  public function prepare_template_data(){
    $wp_urls = array(
      'home_url'    => HOME_URL,
      'theme_url'   => THEME_URL,
      'wp_ajax_url' => admin_url('admin-ajax.php'),
    );

    wp_localize_script($this->main_script_slug,'WP_URLS', $wp_urls);
  }


  /**
   * prints inline data in body
   */
  public function print_inline_data_body(){
    print_inline_style(THEME_URL.'/assets/fonts/fonts.css', 'theme_fonts_151_2');
    add_svg_sprite($this->svg_sprite_slug, THEME_URL.'/assets/svg_sprite/symbol_sprite.html');
  }


  /**
   * unhooks unused functions
   */
  public function remove_actions(){
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
    remove_action( 'wp_head', 'wp_oembed_add_host_js' );
  }


  /**
   * function runs on theme setup
   *
   * @hookedto - after_setup_theme
   */
  public function setup_theme(){

    /*Theme translations*/
    load_theme_textdomain( 'theme-translations', THEME_PATH . '/languages' );

    /*Menu registrations*/

    $locations = array(
      'main_menu'       => __('Menu in header', 'theme-translations'),
      'footer_menu'     => __('Menu in footer', 'theme-translations'),
      'footer_menu_women' => __('Menu in footer, products for women', 'theme-translations'),
      'footer_menu_men'   => __('Menu in footer, products for men', 'theme-translations'),
      'social_menu'     => __('Menu with social links. Will be displayed both in footer and header', 'theme-translations'),
    );

    register_nav_menus($locations);
  }


  /**
   * adds async attribute to a <script> tag
   *
   * @hookedto - script_loader_tag 10
   *
   * @param string - $tag
   * @param string - $handle
   */
  public function add_async_attribute( $tag, $handle ) {
    if(is_admin() || is_customize_preview()) return $tag;

    do_action('before_add_async_attribute', $tag ,$handle);

    if(isset($_GET['action'])) return $tag;

    if('jquery' === $handle || 'jquery-core' === $handle){
      return $tag;
    }

    if(function_exists('wc') && (is_woocommerce())){return $tag;}

    if(function_exists('is_checkout') &&  is_checkout()){
       return $tag;
    }
      return str_replace( ' src', ' defer src', $tag );
  }



  /**
   * adds additional mime types for attachments
   *
   * @hookedto - upload_mimes 10
   */
  public function cc_mime_types($mimes) {
    $mimes['avi'] = 'video/avi';
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }



  /**
   * What type of request is this?
   *
   * @param  string $type admin, ajax, cron or frontend.
   * @return bool
   */
  private function is_request( $type ) {
    switch ( $type ) {
      case 'admin':
        return is_admin();
      case 'ajax':
        return defined( 'DOING_AJAX' );
      case 'cron':
        return defined( 'DOING_CRON' );
      case 'frontend':
        return ( ! is_admin() );
    }
  }



  /**
   * removes version for styles and scripts urls in tags <script> <style>
   *
   * @hookedto - script_loader_src 9998
   * @hookedto - style_loader_src 9998
   */
  public function remove_script_version( $src ){
    $parts = explode( '?', $src );
    return $parts[0];
  }


  public function print_styles_in_footer(){
    global $footer_inline_style;
    printf('<style>%s</style>', $footer_inline_style );
  }


  /**
   * merges all javascripts into 1 and puts file into a theme folder
   *
   * @hookedto - wp_enqueue_scripts 9999
   *
   * @deprecated
   */

  public function merge_all_scripts(){
  }


  /**
  * adds additional settings section
  */
  public function add_reading_settings(){
    add_settings_section('theme-pages-section', __('Custom page settings', 'theme-translations '), array($this, 'add_additional_page_settings'), 'reading');
  }


  /**
  * callback for settings section
  *
  * @data - array;
  *
  * @see $this->add_reading_settings()
  */
  public function add_additional_page_settings($data){
  }

  /**
  * adds options to reading sections
  * allow admin to define special pages
  */
  public function add_option_pages(){
    $options = array(
      'dashboard'        => __('Dashboard Page', 'theme-translations'),
      'leads'          => __('Leads Page', 'theme-translations'),
      'reception'          => __('Reception Page', 'theme-translations'),
      'reception_2'          => __('Reception Page 2', 'theme-translations'),
      'tco'          => __('TCO Page', 'theme-translations'),
      'tco_2'          => __('TCO Page 2', 'theme-translations'),
      'create_leads'         => __('Blank Lead Page', 'theme-translations'),
    );

    foreach ($options as $key => $name) {
      $option_name = 'theme_page_'.$key;

      register_setting( 'reading', $option_name );

      add_settings_field(
       'theme_setting_'.$key,
        $name,

        array(__CLASS__, 'page_select_callback'),

        'reading',
        'theme-pages-section',

        array(
          'id' => 'theme_setting_'.$key,
          'option_name' => $option_name,
        )
      );
    }
  }

  /**
   * callback to display a select option for page select
   *
   * @param $val - arrray
   *
   * @see $this->add_reading_settings()
   */
  public static function page_select_callback( $val ){
    $id = $val['id'];
    $option_name = $val['option_name'];
    $args = array(
      'posts_per_page' => -1,
      'limit'          => -1,
    );
    $pages = get_pages($args);
    echo ' <select name="'.$option_name .'">';
    echo '<option value="-1">— Select —</option>';

    foreach ($pages  as $id => $page) {
      $selected = (esc_attr( get_option($option_name) ) == $page->ID )? 'selected = "selected"' : '';
      ?>
        <option <?php echo $selected; ?> value="<?php echo $page->ID ?>"> <?php echo $page->post_title; ?></option>
      <?php
    }
    echo '</select>';
  }

  public static function add_cors_http_header(){
    // header("Access-Control-Allow-Origin: *");
  }
}

/* init theme*/
global $theme_init;
$theme_init = new velesh_init_theme();




