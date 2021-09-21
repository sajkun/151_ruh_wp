<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
echo '<script type="text/x-template" id="email-view-tmpl">';
?>

<div class="email-popup-wrapper" v-if="show">
  <div class="email-popup">
    <div class="email-popup__header">
      <svg class="icon svg-icon-email"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use></svg>
      <span class="email-popup__header-title">{{log.template_name}}</span>
    </div>

    <div class="email-preview-block">
      <div v-if="log.template_name == 'Booked In'">
        <?php echo print_theme_template_part('booked-in', 'email-components'); ?>
      </div>
      <div v-if="log.template_name == 'Smile Trial'">
        <?php echo print_theme_template_part('smile-trial', 'email-components'); ?>
      </div>
      <div v-if="log.template_name == 'Teeth Whitening'">
        <?php echo print_theme_template_part('teeth-whitening', 'email-components'); ?>
      </div>
      <div v-if="log.template_name == 'Orthodontic Consultation'">
        <?php echo print_theme_template_part('orthodontic-consultation', 'email-components'); ?>
      </div>
      <div v-if="log.template_name == 'Treatment Options'">
        <?php echo print_theme_template_part('treatment-options', 'email-components'); ?>
      </div>
    </div>

    <div class="email-popup__footer">
      <a href="#" v-on:click.prevent="show=false" class="email-popup__cancel">Close</a>
    </div>
  </div>
</div>
<?php
echo '</script>';
?>