<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
/**
 * The main template file
 *
 * @package theme/templates
 *
 * @since v1.0
 */

get_header();
$data = get_queried_object();
$start = microtime(true);
?>

<div class="site-container" id="site-body">
  <?php
    do_action('do_theme_before_header');
    do_action('do_theme_header');
    do_action('do_theme_after_header');
?>
    <main class="site-inner">
 <?php
    do_action('do_theme_before_content');
    do_action('do_theme_content');
    do_action('do_theme_after_content');
  ?>
  </main>
 <?php
    do_action('do_theme_before_footer');
    do_action('do_theme_footer');
    do_action('do_theme_after_footer');
  ?>
</div>

<?php
    clog('print_document: '.round(microtime(true) - $start, 4).' сек.' , 'red');
 ?>

<?php get_footer(); ?>
