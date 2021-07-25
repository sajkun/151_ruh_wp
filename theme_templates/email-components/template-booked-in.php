<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
?>

  <div class="letter-body">
    <table class="letter-welcome-screen" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <div class="letter-welcome-screen__col">
            <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image" width="132" height="21">
            <p class="title-white">Let’s get you <br> booked in</p>
            <span class="comment-white"> We can’t wait to see you in our clinic and get your smile journey started. </span>
          </div>
        </td>
        <td>
          <img src="<?php echo THEME_URL; ?>/assets/images/letter/h1.jpg" class="full-image" alt="" width="273" height="313">
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <div class="text-block">
            Dear, <span class="placeholder">{{patient_name}}</span> <br><br>

            Thank you for your enquiry for a dental consultation <br> here at
            <select-imitation2
            _select_name="clinic"
            :_selected ="'clinic'"
            :_options="select_data.clinics"
             v-on:update_list="update_template_data($event, 'Booked In')"
             :class="{'error': errors['Booked In'].clinic, 'relative': 1}"
             ref="clinics_select"></select-imitation2 > <br>
            I hope that you are well. <br> <br>
            In order to proceed with your booking, we have two options:
          </div>
        </td>
      </tr>
    </table>
    <div class="spacer-h-30"></div>
    <table class="black-block-option" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="text-center">
          <img src="<?php echo THEME_URL; ?>/assets/images/letter/ruh.png" alt="" class="ruh-img" width="199" height="69">
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <p class="title">Complimentary Consultation</p>
        </td>
      </tr>
      <tr>
        <td>
          <p class="text">All of our treatment coordinators are highly skilled in the field of dentistry and will be <br> able to discuss treatment options best suited to your needs, approximate price and <br> payment plans. These consultations can be done either in house or via zoom.</p>
        </td>
      </tr>
      <tr>
        <td>
          <ul class="shift-list-1">
            <li><span>No obligation consultation</span></li>
            <li><span>Understand the treatment options available</span></li>
            <li><span>Understand the finance options and breakdown of cost</span></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          <br>
        </td>
      </tr>
    </table>
    <div class="spacer-h-15"></div>

    <table class="grey-block-option" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">

      <tr>
        <td>
          <span class="title">Paid Consultation with a Dentist</span>
          <div class="text-center-element">
            <select-imitation2
            _select_name="price"
            :_selected ="'Price'"
            :_options="select_data.prices"
             v-on:update_list="update_template_data($event, 'Booked In')"
             :class="{'error': errors['Booked In'].price, 'small-width': 1, 'relative': 1}"
             ref="prices_select"></select-imitation2 >
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="text"> The dentist will complete a full mouth assessment and discuss treatment options best suited to your needs. We are then able to provide you with a bespoke treatment plan and our team will discuss all payment options, and appointment availability should you wish to proceed. The cost of this is <span class="placeholder">{{template_data['Booked In'].price}}</span></p>

        </td>
      </tr>
      <tr>
        <td>
          <ul class="shift-list-2">
            <li><span>Full Dental examination by a dentist including dental x-rays</span></li>
            <li><span>Consultation with treatment co-ordinator and associated benefits</span></li>
            <li><span>Optional Trial Smile included if requested</span></li>
          </ul>
        </td>
      </tr>
    </table>
    <div class="spacer-h-30"></div>

    <table class="text-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          We do require £50 as a holding deposit in order to secure your appointment with us at the time of booking. This is refundable if you would decide not to have treatment or we can credit this towards your treatment plan. <br>
        </td>
      </tr>
      <tr>
        <td>
          Please note that you will be with us at the clinic for approximately 1 hour whilst your dedicated Treatment Coordinator discusses your options in detail.<br>
        </td>
      </tr>

      <tr>
        <td>Should you wish for me to assist you further kindly let me know and I will be happy to accommodate you.<br></td>
      </tr>
      <tr>
        <td>I look forward to hearing from you.</td>
      </tr>
      <tr>
        <td>
          Kind Regards,<br><br>

          <div class="placeholder">« {{specialists_name}} »</div> <br>
          Treatment Co-ordinator
        </td>
      </tr>
    </table>

    <div class="spacer-h-30"></div>

    <div class="links-block">
      <table class=""  role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="first">
            <a href="https://ruhdental.com/"  target="_blank">
              <img src="<?php echo THEME_URL; ?>/assets/images/letter/tooth-icon.png" alt="" class="icon-image" width="28" height="28">
              Treatments
            </a>

          </td>
          <td class="middle">
            <a href="https://ruhdental.com/smile-stories/"  target="_blank">
              <img src="<?php echo THEME_URL; ?>/assets/images/letter/camera-icon.png" alt="" class="icon-image" width="28" height="28">
              Smile Stories
            </a>

          </td>
          <td class="last">
            <a href="https://ruhdental.com/pricing/"  target="_blank">
              <img src="<?php echo THEME_URL; ?>/assets/images/letter/price-icon.png" alt="" class="icon-image" width="28" height="28">
             Price List
            </a>
          </td>
        </tr>
      </table>
    </div>

    <table class="black-block"  role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image" width="132" height="21">

          <a href="tel:+440203904765" class="phone-link">
            <img src="<?php echo THEME_URL; ?>/assets/images/letter/dialer-icon.png" alt="" width="11" height="15">
            +44 (0)20 3904 7655
          </a>
        </td>
      </tr>
    </table>

    <table class="black-block clinics"  role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td colspan="">
          <span class="label">Our Clinics</span>
        </td>
        <td class="to-right">
          <a href="https://ruhdental.com/clinics/london-fleet-street/" target="_blank">London Fleet Street</a>

          <a href="https://ruhdental.com/clinics/london-notting-hill/" target="_blank">London Notting Hill</a>

          <a href="https://ruhdental.com/clinics/manchester/" target="_blank">Manchester</a>
        </td>
      </tr>
    </table>

    <table class="black-block"  role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <span class="copyrights">© 2021 Ruh Dental. All rights reserved </span>
        </td>
      </tr>
    </table>
  </div>