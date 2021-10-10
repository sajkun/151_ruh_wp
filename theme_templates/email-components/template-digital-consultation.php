    <div class="letter-body">
        <table class="letter-welcome-screen" role="presentation" width="100%" border="0" cellspacing="0"
            cellpadding="0">
            <tr>
                <td>
                    <div class="letter-welcome-screen__col">
                        <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image"
                            width="132" height="21" />
                        <p class="title-white">
                            Digital <br />
                            Consultation <br />
                            Report
                        </p>
                        <span class="comment-white"> Your treatment options </span>
                    </div>
                </td>
            </tr>
        </table>
        <div class="spacer-h-20"></div>
        <table class="text-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td>
                    Dear,
                    {{patient_name}}
                    <br /><br />
                    I hope you are well. It was lovely talking to you <br />
                    I have discussed your photographs with your Dentists and he feels
                    that
                </td>
            </tr>

            <tr>
                <td>
                    <textarea name="" id="" cols="30" rows="4" class="textarea" placeholder="Enter dentist summary"
                        v-model="template_data['Digital Consultation'].dentist_summary"></textarea>
                </td>
            </tr>
        </table>

        <div class="hr"></div>

        <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0"
            cellpadding="0">
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="text">I have listed below some ideas on the costings of treatment
                        options available
                    </span>
                    <div class="spacer-h-30"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <b class="text">TREATING DENTIST </b>
                    <div class="spacer-h-10"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <input type="text" placeholder="Enter dentists data there" class="single-line"
                        v-model="template_data['Digital Consultation'].dentist" />
                    <div class="spacer-h-50"></div>
                </td>
                <td class="margin"></td>
            </tr>

            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="tag-option">STAGE 1</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="service-name">{{template_data['Digital Consultation'].stage_1.title}}</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="text">
                        We will always begin by ensuring your teeth and gums are healthy.
                        For this we have suggested the following. Either or/and
                    </span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr v-for="item, key in template_data['Digital Consultation'].stage_1.items" v-if="item.show">
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

        <div class="spacer-h-30"></div>

        <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0"
            cellpadding="0">
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="tag-option">STAGE 2</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="service-name">{{template_data['Digital Consultation'].stage_2.title}}</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td class="text-left" colspan="2">
                    <span class="title-underline">OPTION 1</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td class="text-left" colspan="2">
                    <span class="text">To see our specialist Orthodontist for a consultation and discuss
                        correcting your bite. The prices for fixed braces with our
                        Orthodontist are:
                    </span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>

            <tr v-for="item, key in template_data['Digital Consultation'].stage_2.items_opt_1" v-if="item.show">
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

        <div class="hr"></div>

        <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0"
            cellpadding="0">
            <tr>
                <td class="margin"></td>
                <td class="text-left" colspan="2">
                    <span class="title-underline">OPTION 2</span>
                </td>
                <td class="margin"></td>
            </tr>
            <tr v-for="item, key in template_data['Digital Consultation'].stage_2.items_opt_2">
                <td class="margin"></td>
                <td class="cell-2">
                    <span class="title">{{item.title}}</span>
                    <span class="text"><input type="text" placeholder="Add short description"
                            v-model="item.description" /></span>
                </td>
                <td class="cell-2 right">
                    <span class="from">{{item.from}} £</span>
                    <input type="text" class="price" v-model="item.price" />
                </td>
                <td class="remove-cell">
                </td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td class="text-left" colspan="2">
                    <span class="text">
                        Includes all aligners and refinements, plus removable retainers at
                        the end of treatment.
                    </span>
                </td>
                <td class="margin"></td>
            </tr>

            <tr>
                <td class="margin"></td>
                <td class="" colspan="2">
                    <p class="marked-text">
                        Once this is complete you can opt for Cosmetic treatment to change
                        the shape of the teeth
                    </p>
                </td>
                <td class="margin"></td>
            </tr>
        </table>

        <div class="spacer-h-30"></div>

        <table class="pricing-table-no-color" role="presentation" width="100%" border="0" cellspacing="0"
            cellpadding="0">
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="tag-option">STAGE 3</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr>
                <td class="margin"></td>
                <td colspan="2" class="text-center">
                    <span class="service-name">{{template_data['Digital Consultation'].stage_3.title}}</span>
                    <div class="spacer-h-20"></div>
                </td>
                <td class="margin"></td>
            </tr>
            <tr v-for="item, key in template_data['Digital Consultation'].stage_3.items">
                <td class="margin"></td>
                <td class="cell-2">
                    <span class="title">{{item.title}}</span>
                    <span class="text"><input type="text" placeholder="Add short description"
                            v-model="item.description" /></span>
                </td>
                <td class="cell-2 right">
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
                    <textarea name="" id="" cols="30" rows="4" class="textarea" placeholder="Enter stage summary"
                        v-model="template_data['Digital Consultation'].stage_3.summary"></textarea>
                </td>
                <td class="margin"></td>
            </tr>
        </table>

        <div class="spacer-h-30"></div>

        <table class="black-block-option" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="text-center">
                        <img src="<?php echo THEME_URL; ?>/assets/images/letter/ruh.png" alt="" class="ruh-img"
                            width="199" height="69" />
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
                    Kind Regards,<br /><br />
                    {{specialists_name}}
                    <br />
                    Treatment Co-ordinator
                </td>
            </tr>
        </table>

        <table class="black-block" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="inner">
                    <img src="<?php echo THEME_URL; ?>/assets/images/letter/logo.png" alt="" class="logo-image"
                        width="132" height="21" />

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