<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 */
?>
<div class="block-hold-on" id="wait-block" v-bind:class="show_class">
  <div class="text">{{wait_text}} <br>
  <img style="width: 52px" src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt="">
  </div>
</div>
<?php wp_footer(); ?>
<?php
  do_action('finish_page');
 ?>
</body>
</html>

