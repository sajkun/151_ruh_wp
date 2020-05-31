<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div class="spacer-h-50 spacer-h-lg-150"></div>

<div class="login-form">
  <a href="" class="logo"><img src="<?php echo THEME_URL; ?>/assets/images/logo.svg" alt=""><span class="logo__text"> tracker</span></a>
  <br><br>

  <form action="javascript:void(0)" id="login-form">
    <label for="login">User Name or Email</label>
    <input type="text" id="login" name="user_login">
    <label for="password">Password</label>
    <input type="password" id="password" name="user_password">
    <button class="button-submit button-assign">Log In</button>
    <?php wp_nonce_field( 'login_nonce_check', 'wp-nonce-login', false); ?>
  </form>
</div>