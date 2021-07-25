<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
echo '<script type="text/x-template" id="email-popup-tmpl">';
?>

<div class="email-popup-wrapper" v-if="show">
  <div class="email-popup">
    <div class="email-popup__header">
      <svg class="icon svg-icon-email"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use></svg>
      <span class="email-popup__header-title">New E-mail</span>
    </div>


    <form action="" autocomplete="off">

    <div class="email-popup__row">
      <label for="email_popup_send_to">Send to</label>
      <input
        type="email"
        id="email_popup_send_to"
        v-model="email_to"
        :class="{'error': errors.email_from}"
      >
    </div>

    <div class="email-popup__row">
      <label for="email_popup_send_from">From</label>
      <input type="email" id="email_popup_send_from" readonly :value="email_from">
    </div>

    <div class="email-popup__row">
      <label for="email_popup_send_from">Select template</label>
      <select-imitation2
      _select_name="'template_name'"
      :_options="select_data.templates"
       v-on:update_list="update_template($event, 'template')"
       :class="{'error': errors.template, 'fullwidth': 1}"
        ></select-imitation2 >
    </div>
    <div class="spacer-h-20"></div>

    <div class="email-preview-block">
      <div v-if="template == 'Booked In'">
        <?php echo print_theme_template_part('booked-in', 'email-components'); ?>
      </div>
      <div v-if="template == 'Smile Trial'">
        <?php echo print_theme_template_part('smile-trial', 'email-components'); ?>
      </div>

      <div v-if="template == 'Teeth Whitening'">
        <?php echo print_theme_template_part('teeth-whitening', 'email-components'); ?>
      </div>
    </div>

    <div class="email-popup__footer">
      <a href="#" v-on:click.prevent="show=false" class="email-popup__cancel">Cancel</a>
      <a href="#" v-on:click.prevent="submit" class="email-popup__submit">Send</a>
    </div>
    </form>
  </div>
</div>
<?php
echo '</script>';
?>