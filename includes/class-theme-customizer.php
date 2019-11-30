<?php
/**
 * Adds options to the customizer for theme.
 *
 * @package theme
 */
// defined( 'ABSPATH' ) || exit;

class velesh_theme_customizer{
    /**
   * Constructor.
   */
  public function __construct() {
    add_action( 'customize_register', array( $this, 'add_sections' ) );

    add_action( 'customize_controls_enqueue_scripts', array( $this, 'add_scripts' ), 999 );
    // add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ), 999 );
    // add_action( 'customize_controls_print_styles', array( $this, 'add_styles' ) );
    // add_action( 'customize_controls_print_scripts', array( $this, 'add_scripts' ), 30 );
    // add_action( 'customize_controls_print_styles', array( $this, 'add_inline_styles' ) );
  }



  /**
   * Add settings to the customizer.
   *
   * @param WP_Customize_Manager $wp_customize Theme Customizer object.
   */
  public function add_sections( $wp_customize ) {
    $this->add_site_footer_section( $wp_customize );
    // $this->add_site_header( $wp_customize );
    // $this->add_site_static_sections( $wp_customize );
    // $this->add_site_woo_scections( $wp_customize );
    // $this->add_product_images_section( $wp_customize );
    // $this->add_checkout_section( $wp_customize );
  }


  /**
   * Scripts to improve our form.
   */
  public function add_scripts() {
      wp_enqueue_script('velesh_theme_customizer', THEME_URL .'/script/customizer.js', array( 'jquery','customize-preview' ), '', true );
  }

  /**
   * Store site footer section.
   *
   * @param WP_Customize_Manager $wp_customize Theme Customizer object.
   */
  public function add_site_footer_section( $wp_customize ){

    /*footer settings*/

      $wp_customize->add_section(
          'theme_footer_section',
          array(
              'title'       => 'Theme Footer',
              'priority'    => 300,
              'description' => ' This section is designed to change displaying of footer settings'
          )
      );


      /*copyrights setting*/

        $wp_customize->add_setting(
            'theme_footer_copyrights',
            array(
                'default'    => '',
                'transport'  => 'postMessage',
                'type'       => 'option'
            )
        );

        $wp_customize->add_control(
          'theme_footer_copyrights',
          array(
              'section'   => 'theme_footer_section',
              'label'     => __('Copyrights', 'theme-translations'),
              'type'      => 'textarea',
              'settings'  => 'theme_footer_copyrights',
          )
        );

        $wp_customize->selective_refresh->add_partial( 'theme_footer_copyrights', array(
            'selector' => '.site-footer .copyrights',
        ) );

    /**/
  }


}

new velesh_theme_customizer();

if ( ! class_exists( 'Prefix_Separator_Control' ) ) {
  return null;
}
/**
 * Class Prefix_Separator_Control
 *
 * Custom control to display separator
 */
class Prefix_Separator_Control extends WP_Customize_Control {
  public function render_content() {
    ?>
    <label><br>
      <hr>
    </label>
      <?php if ( $this->label ): ?>
        <h4 style="text-transform: uppercase; margin: 0"><?php echo $this->label; ?>:</h4>
      <?php else: ?>
        <br>
      <?php endif ?>
    <?php
  }
}
