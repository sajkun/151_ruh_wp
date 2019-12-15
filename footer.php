<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 */
?>
<div class="block-hold-on" id="wait-block" v-bind:class="show_class">
  <div class="text">{{wait_text}}</div>
</div>
<?php wp_footer(); ?>
<?php
  do_action('finish_page');
 ?>
</body>
</html>

