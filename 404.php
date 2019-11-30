<?php
get_header();
$data = get_queried_object();

?>
<div class="site-container <?php echo apply_filters('theme_site_container_styles', $data); ?>" id="site-body">
  <?php
    do_action('do_theme_before_header');
    do_action('do_theme_header');
    do_action('do_theme_after_header');
?>
    <main class="site-inner">
<?php
  ?>
      <h1 class="textcenter">
        <?php _e('Error 404'); ?>
      </h1>

  </main>
<?php

    do_action('do_theme_before_footer');
    do_action('do_theme_footer');
    do_action('do_theme_after_footer');
  ?>
</div>

<?php
 ?>

<?php get_footer(); ?>