<html>

<body>
    <div style="background: #fff; box-sizing: inherit; display: block; margin: 0 auto; max-width: 546px; padding: 5px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="border-collapse: collapse; box-sizing: inherit; overflow: hidden; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; line-height: 0; overflow: hidden; vertical-align: top;">
                    <div style="background: #000; box-sizing: inherit; line-height: 1.2; padding: 34px 20px 30px 40px;">
                        <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt width="132" height="21"
                            style="border-style: none; box-sizing: inherit; height: 21px; margin: 0 0 30px; width: 132px;">
                        <p
                            style="box-sizing: inherit; color: #fff; display: block; font-family: 'Libre Baskerville',serif; font-size: 33px; margin: 0 0 10px;">
                            Treatment <br style="box-sizing: inherit;">
                            Options
                        </p>
                        <span
                            style="box-sizing: inherit; color: #fff; display: block; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; font-style: normal; font-weight: 500; letter-spacing: normal; line-height: 22px; margin: 0; text-align: left;">
                            Which orthodontic option is best for you?
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
                    Dear,
                    <?php echo $patient_name;?>
                    <br style="box-sizing: inherit;"><br style="box-sizing: inherit;">

                    It was so lovely meeting you yesterday and discussing the options
                    available to you. I just wanted to go over what we discussed as I
                    know it can be information overload on the day 😊
                </td>
            </tr>
        </table>

        <?php $key = 1; ?>

        <?php if($invisalign['show']): ?>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="box-sizing: inherit; text-align: center;">
                    <span
                        style="border-bottom: 3px solid #c29265; box-sizing: inherit; color: #1a1c1a; font-family: PoppinsFont,sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2.44px; line-height: 24px; padding: 5px 0; text-transform: uppercase;">TREATMENT
                        OPTIONS</span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="box-sizing: inherit; text-align: center;">
                    <span
                        style="background-color: #b2a687; border-radius: 9999px; box-sizing: inherit; color: #fff; display: inline-block; font-size: 8px; padding: 4px 10px; text-transform: uppercase;">OPTION
                        1</span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;">Invisalign
                        Full/Light</span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="box-sizing: inherit; text-align: center;">
                    <span style="box-sizing: inherit; color: #504b40; font-size: 12px; margin: 0; text-align: center;">
                        <?php echo $invisalign['doctors'];?>
                    </span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #1a1c1a; font-family: serif; font-size: 12px; vertical-align: middle;">£</span>
                    <span
                        style="border-bottom: 2px dashed #cbd5e3; box-sizing: inherit; color: #c29265; display: inline; font-family: serif; font-size: 30px; text-align: right; vertical-align: middle;"><?php echo $invisalign['price'];?></span>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
        </table>

        <div style="background-color: #eeeded; box-sizing: inherit; height: 1px; margin: 20px 0 40px;"></div>
        <?php
      $key++;
      endif;?>

        <?php if($braces['show']): ?>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="background-color: #b2a687; border-radius: 9999px; box-sizing: inherit; color: #fff; display: inline-block; font-size: 8px; padding: 4px 10px; text-transform: uppercase;">OPTION
                        <?php echo $key; ?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;"><?php echo $braces['title'];?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;">
                        <span
                            style="box-sizing: inherit; color: #504b40; font-size: 12px; margin: 0; text-align: center;">
                            <?php echo $braces['doctors'];?>
                        </span>
                    </span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php foreach($braces['items'] as $item): if(!item['show']) continue; ?>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0;">
                    <span
                        style="box-sizing: inherit; color: #052116; display: block; font-size: 15px; font-weight: 600; margin: 0 0 5px;"><?php echo $item['title']?></span>
                    <span
                        style="border: 0; box-sizing: inherit; color: #1a1c1a; display: block; font-size: 13px; margin: 0; outline: 0;"><?php echo $item['description']?></span>
                </td>
                <td
                    style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0; text-align: right; vertical-align: middle;">
                    <span
                        style="box-sizing: inherit; color: #1a1c1a; font-family: serif; font-size: 12px; vertical-align: middle;">
                        <?php echo $item['from']?>
                        £
                    </span>
                    <span
                        style="border-bottom: 2px dashed #cbd5e3; box-sizing: inherit; color: #c29265; display: inline; font-family: serif; font-size: 30px; text-align: right; vertical-align: middle;"><?php echo $item['price']?></span>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php endforeach; ?>

            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit;">
                    <p style="box-sizing: inherit; color: #1a1c1a; font-size: 13px; line-height: 24px; margin: 20px 0;">
                        <b style="box-sizing: inherit; font-weight: bolder;"> All of our Orthodontic plans include:</b>
                        <br style="box-sizing: inherit;">
                        👉 Brace fitting, removal and all appointments between. <br style="box-sizing: inherit;">
                        👉 Removable and fixed retainers at the end of treatment. <br style="box-sizing: inherit;">
                        👉 Home whitening. <br style="box-sizing: inherit;">
                    </p>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
        </table>
        <div style="background-color: #eeeded; box-sizing: inherit; height: 1px; margin: 20px 0 40px;"></div>

        <?php
      $key++;
      endif;?>

        <?php if($whitening['show']): ?>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="background-color: #b2a687; border-radius: 9999px; box-sizing: inherit; color: #fff; display: inline-block; font-size: 8px; padding: 4px 10px; text-transform: uppercase;">OPTION
                        <?php echo $key; ?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; padding: 0 10px;"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;"><?php echo $whitening['title'];?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;">
                        <span
                            style="box-sizing: inherit; color: #504b40; font-size: 12px; margin: 0; text-align: center;">
                            <?php echo $whitening['doctors'];?>
                        </span>
                    </span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php foreach($whitening['items'] as $item): if(!item['show']) continue; ?>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0;">
                    <span
                        style="box-sizing: inherit; color: #052116; display: block; font-size: 15px; font-weight: 600; margin: 0 0 5px;"><?php echo $item['title']?></span>
                    <span
                        style="border: 0; box-sizing: inherit; color: #1a1c1a; display: block; font-size: 13px; margin: 0; outline: 0;"><?php echo $item['description']?></span>
                </td>
                <td
                    style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0; text-align: right; vertical-align: middle;">
                    <span
                        style="box-sizing: inherit; color: #1a1c1a; font-family: serif; font-size: 12px; vertical-align: middle;">
                        <?php echo $item['from']?>
                        £
                    </span>
                    <span
                        style="border-bottom: 2px dashed #cbd5e3; box-sizing: inherit; color: #c29265; display: inline; font-family: serif; font-size: 30px; text-align: right; vertical-align: middle;"><?php echo $item['price']?></span>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php endforeach; ?>
        </table>
        <div style="box-sizing: inherit; height: 30px;"></div>
        <?php
      $key++;
      endif;?>

        <?php if($composite['show']): ?>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; width: 100%;">
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="background-color: #b2a687; border-radius: 9999px; box-sizing: inherit; color: #fff; display: inline-block; font-size: 8px; padding: 4px 10px; text-transform: uppercase;">OPTION
                        <?php echo $key; ?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; padding: 0 10px;"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;"><?php echo $composite['title'];?></span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td colspan="2" style="box-sizing: inherit; text-align: center;">
                    <span
                        style="box-sizing: inherit; color: #000; font-family: sans-serif; font-size: 18px; font-weight: 600; margin: 0;">
                        <span
                            style="box-sizing: inherit; color: #504b40; font-size: 12px; margin: 0; text-align: center;">
                            <?php echo $composite['doctors'];?>
                        </span>
                    </span>
                    <div style="box-sizing: inherit; height: 20px;"></div>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php foreach($composite['items'] as $item):
        if(!item['show']) continue;
        ?>
            <tr style="box-sizing: inherit;">
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
                <td style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0;">
                    <span
                        style="box-sizing: inherit; color: #052116; display: block; font-size: 15px; font-weight: 600; margin: 0 0 5px;"><?php echo $item['title']?></span>
                    <span
                        style="border: 0; box-sizing: inherit; color: #1a1c1a; display: block; font-size: 13px; margin: 0; outline: 0;"><?php echo $item['description']?></span>
                </td>
                <td
                    style="border-bottom: 1px solid #eeeded; box-sizing: inherit; padding: 20px 0; text-align: right; vertical-align: middle;">
                    <span
                        style="box-sizing: inherit; color: #1a1c1a; font-family: serif; font-size: 12px; vertical-align: middle;">
                        <?php echo $item['from']?>
                        £
                    </span>
                    <span
                        style="border-bottom: 2px dashed #cbd5e3; box-sizing: inherit; color: #c29265; display: inline; font-family: serif; font-size: 30px; text-align: right; vertical-align: middle;"><?php echo $item['price']?></span>
                </td>
                <td style="box-sizing: inherit; width: 30px;" width="30"></td>
            </tr>

            <?php endforeach; ?>
        </table>
        <div style="box-sizing: inherit; height: 30px;"></div>
        <?php
      $key++;
      endif;?>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="background-color: #1a1c1a; box-sizing: inherit; width: 100%;">
            <tbody style="box-sizing: inherit;">
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
                            Payment Options</p>
                    </td>
                </tr>
                <tr style="box-sizing: inherit;">
                    <td style="box-sizing: inherit;">
                        <p
                            style="box-sizing: inherit; color: #b2a7a5; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-style: normal; letter-spacing: normal; line-height: 20px; text-align: center;">
                            We offer multiple payment options including 0% finance over 12
                            or 18 months.
                        </p>
                    </td>
                </tr>
                <tr style="box-sizing: inherit;">
                    <td style="box-sizing: inherit;">
                        <ul style="box-sizing: inherit; display: block; margin: 20px 0 0 120px; padding: 0;">
                            <li
                                style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                                <span style="box-sizing: inherit; color: #e2e0da;">0% finance over 12 or 18
                                    months</span></li>
                            <li
                                style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                                <span style="box-sizing: inherit; color: #e2e0da;">Pay upfront and receive a 5%
                                    discount</span></li>
                            <li
                                style="box-sizing: inherit; color: #c6bba2; font-family: 'Helvetica Neue',sans-serif; font-size: 12px; font-weight: 500; margin: 0 0 15px;">
                                <span style="box-sizing: inherit; color: #e2e0da;">Pay as you go (Deposit paid and then
                                    the rest <br style="box-sizing: inherit;">
                                    over the time of treatment using GO CARDLESS)</span>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr style="box-sizing: inherit;">
                    <td style="box-sizing: inherit;">
                        <br style="box-sizing: inherit;">
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="box-sizing: inherit; height: 20px;"></div>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
            style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left; width: 100%;">
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    If you have any further questions regarding your treatment plan, of
                    you would like to book in your next appointment please do not
                    hesitate to contact me.
                </td>
            </tr>
            <tr
                style="box-sizing: inherit; color: #1a1c1a; font-family: 'Helvetica Neue',sans-serif; font-size: 13px; line-height: 17px; text-align: left;">
                <td style="box-sizing: inherit; padding: 0 45px 20px;">
                    Kind Regards,<br style="box-sizing: inherit;"><br style="box-sizing: inherit;">
                    <?php echo $specialists_name;?>
                    <br style="box-sizing: inherit;">
                    Treatment Co-ordinator
                </td>
            </tr>
        </table>

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