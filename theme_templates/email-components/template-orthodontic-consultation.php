<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
?>
    <div class="letter-body">
      <table
        class="letter-welcome-screen"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td>
            <div class="letter-welcome-screen__col">
              <img
                src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png"
                alt=""
                class="logo-image"
                width="132"
                height="21"
              />
              <p class="title-white">
                Braces & <br />
                Clear Aligners
              </p>
              <span class="comment-white"
                >Which orthodontic option is best for you?</span
              >
            </div>
          </td>
          <td>
            <img
              src="<?php echo THEME_URL; ?>/assets/images/letter/h1.jpg"
              class="full-image"
              alt=""
              width="273"
              height="313"
            />
          </td>
        </tr>
      </table>

      <table
        class="text-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td>
            Hi, {{patient_name}}
            <br /><br />

            Thank you for expressing your interest in straightening your teeth.
            Please see below an outline of all the Orthodontic options we
            provide:
          </td>
        </tr>
      </table>

      <table
        class="most-popular-option-left"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          background-image: url(<?php echo THEME_URL; ?>/assets/images/letter/bg_mp.jpg);
        "
      >
        <tr>
          <td>
            <div class="spacer-h-20"></div>
            <span class="most-popular-option__tag">MOST POPULAR</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span class="most-popular-option__title">Invisalign® Braces</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span class="most-popular-option__text"
              >Invisalign is a removable clear brace which when worn, enable
              teeth to be straightened discreetly and efficiently with minimal
              visits to the dentist</span
            >
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div class="spacer-h-10"></div>
          </td>
        </tr>
      </table>

      <table
        class="list-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td><div class="spacer-h-10"></div></td>
          <td></td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Removable aligners, very discreet</td>
          <td>⚡️ Easy to keep teeth clean</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ No metal wires of brackets</td>
          <td>⚡️ No Speech Difficulty</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Custom made</td>
          <td>⚡️ Need to remove when eating/drinking</td>
          <td class="margin"></td>
        </tr>
      </table>
      <table
        class="pricing-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title"> Invisalign Full</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].invisalign_braces.full.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].invisalign_braces.full.price'/>
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Invisalign Lite</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].invisalign_braces.lite.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price"  v-model='template_data["Orthodontic Consultation"].invisalign_braces.lite.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Invisalign Complex</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].invisalign_braces.complex.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price"  v-model='template_data["Orthodontic Consultation"].invisalign_braces.complex.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Invisalign Consultation</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].invisalign_braces.consultation.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">£</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].invisalign_braces.consultation.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
      </table>
      <div class="spacer-h-20"></div>

      <table
        class="lingual-braces-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          background-image: url(<?php echo THEME_URL; ?>/assets/images/letter/bg_mp2.jpg);
        "
      >
        <tr>
          <td class="margin"></td>
          <td class="content">
            <div class="spacer-h-20"></div>
            <span class="lingual-braces-block__title">Lingual Braces</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>
            <span class="lingual-braces-block__text"
              >The most accurate, discreet and efficient way to move teeth.
              Incognito braces are hidden discreetly on the inside of the teeth
              ensuring that the braces are not visible
            </span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="spacer-h-30"></div>
          </td>
          <td></td>
        </tr>
      </table>
      <table
        class="list-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td><div class="spacer-h-10"></div></td>
          <td></td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Completely hidden</td>
          <td>⚡️ Slightly trickier to brush</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Metal wire and brackets</td>
          <td>⚡️ Speech difficulty for approx. 1 week</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Custom made</td>
          <td>⚡️ Fixed onto teeth while eating/drinking</td>
          <td class="margin"></td>
        </tr>
      </table>
      <table
        class="pricing-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Lingual Braces Full</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].lingual_braces.full.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].lingual_braces.full.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Lingual Braces Lite</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].lingual_braces.lite.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].lingual_braces.lite.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Specialist Orthodontic Consultation</span>
            <span class="text">
              <input type="text" placeholder="Add short description"  v-model='template_data["Orthodontic Consultation"].lingual_braces.consultation.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">£</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].lingual_braces.consultation.price'/>
          </td>
          <td class="remove-cell">

          </td>
        </tr>
      </table>
      <div class="spacer-h-20"></div>

      <table
        class="fixed-braces-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          background-image: url(<?php echo THEME_URL; ?>/assets/images/letter/bg_mp3.jpg);
        "
      >
        <tr>
          <td class="margin"></td>
          <td class="content">
            <div class="spacer-h-20"></div>
            <span class="fixed-braces-block__title">Fixed Braces</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>
            <span class="fixed-braces-block__text"
              >Teeth can be straightened in a number of ways using Invisalign,
              incognito braces or traditional "train track" braces. We provide
              all of the above options to help close gaps, straighten crowded
              teeth and help improve the bite
            </span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="spacer-h-30"></div>
          </td>
          <td></td>
        </tr>
      </table>
      <table
        class="list-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td><div class="spacer-h-10"></div></td>
          <td></td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Visible</td>
          <td>⚡️ Slightly trickier to brush</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ No metal wires of brackets</td>
          <td>⚡️ Speech difficulty for approx. 1 week</td>
          <td class="margin"></td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td>⚡️ Not custom made</td>
          <td>⚡️ Fixed onto teeth while eating/drinking</td>
          <td class="margin"></td>
        </tr>
      </table>
      <table
        class="pricing-table"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Ceramic Braces</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].fixed_braces.ceramic.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price"  v-model='template_data["Orthodontic Consultation"].fixed_braces.ceramic.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Metal Braces</span>
            <span class="text">
              <input type="text" placeholder="Add short description" v-model='template_data["Orthodontic Consultation"].fixed_braces.metal.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">from £</span>
            <input type="text" class="price"  v-model='template_data["Orthodontic Consultation"].fixed_braces.metal.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
        <tr>
          <td class="margin"></td>
          <td class="cell">
            <span class="title">Specialist Orthodontic Consultation</span>
            <span class="text">
              <input type="text" placeholder="Add short description"  v-model='template_data["Orthodontic Consultation"].fixed_braces.consultation.description'
            /></span>
          </td>
          <td class="cell right">
            <span class="from">£</span>
            <input type="text" class="price" v-model='template_data["Orthodontic Consultation"].fixed_braces.consultation.price' />
          </td>
          <td class="remove-cell">

          </td>
        </tr>
      </table>
      <div class="spacer-h-20"></div>
      <table
        class="black-block-option"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tbody>
          <tr>
            <td class="text-center">
              <img
                src="<?php echo THEME_URL; ?>/assets/images/letter/ruh.png"
                alt=""
                class="ruh-img"
                width="199"
                height="69"
              />
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <p class="title">Payment Options</p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="text">
                We offer multiple payment options including 0% finance over 12
                or 18 months.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <ul class="shift-list-1">
                <li><span>0% finance over 12 or 18 months</span></li>
                <li><span>Pay upfront and receive a 5% discount</span></li>
                <li>
                  <span
                    >Pay as you go (Deposit paid and then the rest <br />
                    over the time of treatment using GO CARDLESS)</span
                  >
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="spacer-h-20"></div>
      <table
        class="text-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td>
            If you would like to come in for a detailed consultation to discuss
            your options, I would be happy to book you in.
          </td>
        </tr>
        <tr>
          <td>
            If you have any further questions please don’t hesitate to ask.
          </td>
        </tr>

        <tr>
          <td>
            Kind Regards,<br /><br />
            {{specialists_name}}
            <br />
            Treatment Co-ordinator
          </td>
        </tr>
      </table>

      <table
        class="black-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td>
            <img
              src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png"
              alt=""
              class="logo-image"
              width="132"
              height="21"
            />

            <a href="tel:+440203904765" class="phone-link">
              <img
                src="<?php echo THEME_URL; ?>/assets/images/letter/dialer-icon.png"
                alt=""
                width="11"
                height="15"
              />
              +44 (0)20 3904 7655
            </a>
          </td>
        </tr>
      </table>

      <table
        class="black-block clinics"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td colspan="">
            <span class="label">Our Clinics</span>
          </td>
          <td class="to-right">
            <a
              href="https://ruhdental.com/clinics/london-fleet-street/"
              target="_blank"
              >London Fleet Street</a
            >

            <a
              href="https://ruhdental.com/clinics/london-notting-hill/"
              target="_blank"
              >London Notting Hill</a
            >

            <a href="https://ruhdental.com/clinics/manchester/" target="_blank"
              >Manchester</a
            >
          </td>
        </tr>
      </table>

      <table
        class="black-block"
        role="presentation"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td>
            <span class="copyrights"
              >© 2021 Ruh Dental. All rights reserved
            </span>
          </td>
        </tr>
      </table>
    </div>