<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}

// @param $patient_name
// @param $clinic
// @param $specialists_name
// @param $price
?>
<html>

<body>
    <div
        style="background: #fff; box-sizing: inherit; display: block; margin: 0 auto; max-width: 546px; padding: 25px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="border-collapse: collapse; box-sizing: inherit; overflow: hidden; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; line-height: 0; overflow: hidden; vertical-align: top;">
                    <div style="background: #000; box-sizing: inherit; line-height: 1.2; padding: 34px 20px 30px 40px;">
                        <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt width="132" height="21"
                            style="border-style: none; box-sizing: inherit; height: 21px; margin: 0 0 30px; width: 132px;">
                        <p
                            style="box-sizing: inherit; color: #fff; display: block; font-family: 'Libre Baskerville',serif; font-size: 33px; margin: 0 0 10px;">
                            Let’s get you <br />
                            booked in
                        </p>
                        <span
                            style="box-sizing: inherit; color: #fff; display: block; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; font-style: normal; font-weight: 500; letter-spacing: normal; line-height: 22px; margin: 0; text-align: left;">
                            We can’t wait to see you in our clinic and get your smile
                            journey started.
                        </span>
                    </div>
                </td>
            </tr>
        </table>
        <div style="box-sizing: inherit; height: 20px;"></div>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left; width: 100%;">
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    <div " style=" box-sizing: inherit;">
                        Dear, <?php echo $patient_name; ?>
                        <span
                            style="background-color: #fff; border: 1px solid #e1e6eb; border-radius: 5px; box-shadow: 0 1px 6px rgba(0,0,0,.06); box-sizing: inherit; color: #908d8d; display: inline-block; font-family: 'Helvetica Neue',sans-sewrif; font-size: 13px; height: 29px; line-height: 29px; padding: 0 10px;"><?php echo $patient_name; ?></span>
                        <br /><br />

                        Thank you for your enquiry for a dental consultation <br />
                        here at
                        <?php echo $clinic; ?><br />
                        I hope that you are well. <br />
                        <br />

                        In order to proceed with your booking, we have two options:
                    </div>
                </td>
            </tr>
        </table>
        <div style="box-sizing: inherit; height: 30px;"></div>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #1a1c1a; box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; text-align: center;">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/ruh.png" alt width="199" height="69"
                        style="border-style: none; box-sizing: inherit; display: block; margin: 0 auto 10px;">
                </td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; text-align: center;">
                    <p
                        style="box-sizing: inherit; color: #fff; display: block; font-family: 'Poppins Type',Poppins,sans-serif; font-size: 18px; font-style: normal; font-weight: 600; letter-spacing: -.07px; line-height: 42px; margin: 0; text-align: center;">
                        Complimentary Consultation</p>
                </td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit;">
                    <p
                        style="box-sizing: inherit; color: #b2a7a5; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-style: normal; letter-spacing: normal; line-height: 20px; text-align: center;">
                        All of our treatment coordinators are highly skilled in the field
                        of dentistry and will be <br />
                        able to discuss treatment options best suited to your needs,
                        approximate price and <br />
                        payment plans. These consultations can be done either in house or
                        via zoom.
                    </p>
                </td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit;">
                    <ul style="box-sizing: inherit; display: block; margin: 20px 0 0 120px; padding: 0;">
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">No obligation consultation</span>
                        </li>
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">Understand the treatment options
                                available</span>
                        </li>
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">Understand the finance options and
                                breakdown of cost</span>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit;">
                    <br />
                </td>
            </tr>
        </table>
        <div style="box-sizing: inherit; height: 15px;"></div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #6c675a; box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; padding: 30px 15px 0; padding-left: 15px; padding-right: 15px;">
                    <p
                        style="box-sizing: inherit; color: #f0e9e8; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-style: normal; letter-spacing: normal; line-height: 20px; text-align: center;">
                        The dentist will complete a full mouth assessment and discuss
                        treatment options best suited to your needs. We are then able to
                        provide you with a bespoke treatment plan and our team will
                        discuss all payment options, and appointment availability should
                        you wish to proceed. The cost of this is
                        <?php echo $price; ?>
                    </p>
                </td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; padding: 0 15px 20px; padding-left: 15px; padding-right: 15px;">
                    <ul style="box-sizing: inherit; display: block; margin: 20px 0 0 95px; padding: 0;">
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">Full Dental examination by a dentist
                                including dental
                                x-rays</span>
                        </li>
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">Consultation with treatment co-ordinator
                                and associated
                                benefits</span>
                        </li>
                        <li
                            style="box-sizing: inherit; color: #c6bba2; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                            <span style="box-sizing: inherit; color: #e2e0da;">Optional Trial Smile included if
                                requested</span>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>
        <div style="box-sizing: inherit; height: 30px;"></div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left; width: 100%;">
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    We do require £50 as a holding deposit in order to secure your
                    appointment with us at the time of booking. This is refundable if
                    you would decide not to have treatment or we can credit this towards
                    your treatment plan. <br />
                </td>
            </tr>
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    Please note that you will be with us at the clinic for approximately
                    1 hour whilst your dedicated Treatment Coordinator discusses your
                    options in detail.<br />
                </td>
            </tr>

            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    Should you wish for me to assist you further kindly let me know and
                    I will be happy to accommodate you.<br />
                </td>
            </tr>
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">I look forward to hearing from you.</td>
            </tr>
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    Kind Regards,<br /><br />
                    <?php echo $specialists_name; ?>
                    Treatment Co-ordinator
                </td>
            </tr>
        </table>

        <div style="box-sizing: inherit; height: 30px;"></div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #1a1c1a; border-bottom: 1px solid #2b2d2b; box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td
                    style="box-sizing: inherit; padding: 20px 44px; padding-bottom: 20px; padding-left: 44px; padding-right: 44px; padding-top: 20px;">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt width="132" height="21"
                        style="border-style: none; box-sizing: inherit;">

                    <a href="tel:+01613488738"
                        style="-webkit-text-decoration-skip: objects; background-color: transparent; box-sizing: inherit; color: #fff; float: right; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 700; margin-top: 4px; text-decoration: none;">
                        <img src="<?php echo THEME_URL; ?>/assets/images/letter/dialer-icon.png" alt width="11"
                            height="15"
                            style="border-style: none; box-sizing: inherit; display: inline; height: 15px; vertical-align: middle; width: 11px;">
                        +0161 348 8738
                    </a>
                </td>
            </tr>
        </table>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #1a1c1a; border-bottom: 1px solid #2b2d2b; box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td colspan style="box-sizing: inherit; padding-bottom: 20px; padding-left: 44px; padding-top: 20px;">
                    <span
                        style="box-sizing: inherit; color: #fff; display: inline; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 700;">Our
                        Clinics</span>
                </td>
                <td
                    style="box-sizing: inherit; float: right; padding-bottom: 20px; padding-right: 44px; padding-top: 20px; text-align: right;">
                    <a href="https://ruhdental.com/clinics/london-fleet-street/" target="_blank"
                        style="-webkit-text-decoration-skip: objects; background-color: transparent; box-sizing: inherit; color: #fff; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin-left: 20px; text-decoration: none;">London
                        Fleet Street</a>

                    <a href="https://ruhdental.com/clinics/london-notting-hill/" target="_blank"
                        style="-webkit-text-decoration-skip: objects; background-color: transparent; box-sizing: inherit; color: #fff; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin-left: 20px; text-decoration: none;">London
                        Notting Hill</a>

                    <a href="https://ruhdental.com/clinics/manchester/" target="_blank"
                        style="-webkit-text-decoration-skip: objects; background-color: transparent; box-sizing: inherit; color: #fff; font-family: HelveticaFont_,sans-serif; font-size: 12px; font-weight: 500; margin-left: 20px; text-decoration: none;">Manchester</a>
                </td>
            </tr>
        </table>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #1a1c1a; border-bottom: 1px solid #2b2d2b; box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td
                    style="box-sizing: inherit; padding: 20px 44px; padding-bottom: 20px; padding-left: 44px; padding-right: 44px; padding-top: 20px;">
                    <span
                        style="box-sizing: inherit; color: #757372; font-family: HelveticaFont_,sans-serif; font-size: 11px; font-style: normal; letter-spacing: normal; line-height: 20px; text-align: left;">©
                        2021 Ruh Dental. All rights reserved
                    </span>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>