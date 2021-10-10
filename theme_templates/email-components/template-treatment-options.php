<div class="letter-body">
    <table class="letter-welcome-screen" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                <div class="letter-welcome-screen__col">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image"
                        width="132" height="21" />
                    <p class="title-white">
                        Treatment <br />
                        Options
                    </p>
                    <span class="comment-white">
                        Which orthodontic option is best for you?
                    </span>
                </div>
            </td>
        </tr>
    </table>
    <div class="spacer-h-20"></div>
    <table class="text-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                Dear,
                <?php echo $patient_name;?>
                <br /><br />

                It was so lovely meeting you yesterday and discussing the options
                available to you. I just wanted to go over what we discussed as I
                know it can be information overload on the day 😊
            </td>
        </tr>
    </table>

    <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
        v-if="template_data['Treatment Options'].invisalign.show">
        <tr>
            <td class="margin"></td>
            <td class="text-center">
                <span class="title-underline">TREATMENT OPTIONS</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center">
                <span class="tag-option">OPTION 1</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="template_data['Treatment Options'].invisalign.show = 0">-</span>
            </td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center">
                <span class="service-name">Invisalign Full/Light</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center">
                <span class="service-name">
                    <input type="text" class="single-line" placeholder="Treatment with Dr … and Therapist, …"
                        v-model="template_data['Treatment Options'].invisalign.doctors" />
                </span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center">
                <span class="from">£</span><input type="text" class="price"
                    v-model="template_data['Treatment Options'].invisalign.price" />
            </td>
            <td class="margin"></td>
        </tr>
    </table>

    <div class="hr" v-if="template_data['Treatment Options'].invisalign.show"></div>

    <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
        v-if="template_data['Treatment Options'].braces.show">
        <tr>
            <td class="margin"></td>
            <td colspan="2" class="text-center">
                <span class="tag-option">OPTION {{treatment_options_number.braces}}</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="template_data['Treatment Options'].braces.show = 0">-</span>
            </td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">Fixed Braces</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">
                    <input type="text" class="single-line" placeholder="Treatment with Dr … and Therapist, …"
                        v-model="template_data['Treatment Options'].braces.doctors" />
                </span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr v-for="item, key in template_data['Treatment Options'].braces.items" v-if="item.show">
            <td class="margin"></td>
            <td class="cell">
                <span class="title">{{item.title}}</span>
                <span class="text"><input type="text" placeholder="Add short description"
                        v-model="item.description" /></span>
            </td>
            <td class="cell right">
                <span class="from">{{item.from}} £</span>
                <input type="text" class="price" v-model="item.price" />
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="item.show = 0">-</span>
            </td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="" colspan="2">
                <p class="list-imitation">
                    <b> All of our Orthodontic plans include:</b> <br />
                    👉 Brace fitting, removal and all appointments between. <br />
                    👉 Removable and fixed retainers at the end of treatment. <br />
                    👉 Home whitening. <br />
                </p>
            </td>
            <td class="margin"></td>
        </tr>
    </table>
    <div class="hr" v-if="template_data['Treatment Options'].braces.show"></div>

    <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
        v-if="template_data['Treatment Options'].whitening.show">
        <tr>
            <td class="margin"></td>
            <td colspan="2" class="text-center">
                <span class="tag-option">OPTION {{treatment_options_number.whitening}}</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="template_data['Treatment Options'].whitening.show = 0">-</span>
            </td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">Teeth Whitening</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">
                    <input type="text" class="single-line" placeholder="Treatment with Dr … and Therapist, …"
                        v-model="template_data['Treatment Options'].whitening.doctors" />
                </span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>

        <tr v-for="item, key in template_data['Treatment Options'].whitening.items" v-if="item.show">
            <td class="margin"></td>
            <td class="cell">
                <span class="title">{{item.title}}</span>
                <span class="text"><input type="text" placeholder="Add short description"
                        v-model="item.description" /></span>
            </td>
            <td class="cell right">
                <span class="from">{{item.from}} £</span>
                <input type="text" class="price" v-model="item.price" />
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="item.show = 0">-</span>
            </td>
        </tr>
    </table>

    <div class="hr" v-on:click="template_data['Treatment Options'].composite.show = 0"></div>
    <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
        v-if="template_data['Treatment Options'].composite.show">
        <tr>
            <td class="margin"></td>
            <td colspan="2" class="text-center">
                <span class="tag-option">OPTION {{treatment_options_number.composite}}</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="template_data['Treatment Options'].composite.show = 0">-</span>
            </td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">Composite Options</span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>
        <tr>
            <td class="margin"></td>
            <td class="text-center" colspan="2">
                <span class="service-name">
                    <input type="text" class="single-line" placeholder="Treatment with Dr … and Therapist, …"
                        v-model="template_data['Treatment Options'].composite.doctors" />
                </span>
                <div class="spacer-h-20"></div>
            </td>
            <td class="margin"></td>
        </tr>

        <tr v-for="item, key in template_data['Treatment Options'].composite.items" v-if="item.show">
            <td class="margin"></td>
            <td class="cell">
                <span class="title">{{item.title}}</span>
                <span class="text"><input type="text" placeholder="Add short description"
                        v-model="item.description" /></span>
            </td>
            <td class="cell right">
                <span class="from">{{item.from}} £</span>
                <input type="text" class="price" v-model="item.price" />
            </td>
            <td class="remove-cell">
                <span class="remove" v-on:click="item.show = 0">-</span>
            </td>
        </tr>
    </table>

    <div class="hr" v-on:click="template_data['Treatment Options'].composite.show = 0"></div>

    <table class="black-block-option" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td class="text-center">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/ruh.png" alt="" class="ruh-img" width="199"
                        height="69" />
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
                            <span>Pay as you go (Deposit paid and then the rest <br />
                                over the time of treatment using GO CARDLESS)</span>
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
    <table class="text-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                If you have any further questions regarding your treatment plan, of
                you would like to book in your next appointment please do not
                hesitate to contact me.
            </td>
        </tr>
        <tr>
            <td>
                Kind Regards,<br />
                <div class="placeholder">« {{specialists_name}} »</div>
                <br />
                Treatment Co-ordinator
            </td>
        </tr>
    </table>

    <table class="black-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="inner">
                <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image" width="132"
                    height="21" />

                <a href="tel:+ 01613488738" class="phone-link">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/dialer-icon.png" alt="" width="11"
                        height="15" />
                    0161 348 8738
                </a>
            </td>
        </tr>
    </table>

    <table class="black-block clinics" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
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

    <table class="black-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                <span class="copyrights">© 2021 Ruh Dental. All rights reserved
                </span>
            </td>
        </tr>
    </table>
</div>