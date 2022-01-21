Vue.component('email-popup-template', {
    data: function () {
        return {
            email_from: theme_user_email,
            email_to: '',
            template: '',
            show: false,
            patient_name: '',
            specialists_name: '',
            lead_id: -1,
            errors: {
                template: 0,
                email_from: 0,
                'Booked In': {
                    price: 0,
                    clinic: 0,
                },
            },

            template_data: {
                'Booked In': {
                    to: '',
                    subject: 'Your Ruhdental Book In',
                    from: theme_user_email,
                    template: 'booked-in',
                    template_name: 'Booked In',
                    price: '',
                    patient_name: '',
                    clinic: 'clinic',
                    specialists_name: '',
                    lead_id: '',
                },

                'Smile Trial': {
                    to: '',
                    template_name: 'Smile Trial',
                    subject: 'Your Ruhdental Smile Trial Offer',
                    from: theme_user_email,
                    template: 'smile-trial',
                    patient_name: '',
                    specialists_name: '',
                    lead_id: '',
                },

                // "Teeth Whitening": {
                //   to: "",
                //   template_name: "Teeth Whitening",
                //   subject: "Your Ruhdental Teeth Whitening Offer",
                //   from: theme_user_email,
                //   template: "teeth-whitening",
                //   patient_name: "",
                //   specialists_name: "",
                //   lead_id: "",
                // },

                'Treatment Options': {
                    to: '',
                    template_name: 'Treatment Options',
                    subject: 'Your Ruhdental Treatment Options',
                    from: theme_user_email,
                    template: 'treatment-options',
                    patient_name: '',
                    specialists_name: '',
                    lead_id: '',
                    invisalign: {
                        show: 1,
                        doctors: '',
                        price: 3800,
                    },
                    braces: {
                        show: 1,
                        doctors: '',
                        title: 'Fixed Braces',
                        items: [
                            {
                                title: 'Consultation',
                                price: 85,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Metal Braces',
                                price: 5000,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                            {
                                title: 'Clear Braces',
                                price: 5500,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                            {
                                title: 'Incognito Braces',
                                price: 8950,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                        ],
                    },
                    whitening: {
                        show: 1,
                        doctors: '',
                        title: 'Teeth Whitening',
                        items: [
                            {
                                title: 'Zoom Teeth Whitening',
                                price: 350,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                            {
                                title: 'Metal Braces',
                                price: 775,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                        ],
                    },
                    composite: {
                        show: 1,
                        doctors: '',
                        title: 'Composite Options',
                        items: [
                            {
                                title: 'Direct Composite Veneers',
                                price: 375,
                                description: 'price per tooth',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Composite Edge Bonding',
                                price: 275,
                                description: 'price per tooth',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Lab Made Procelain Veneers',
                                price: 875,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                        ],
                    },
                },

                'Orthodontic Consultation': {
                    to: '',
                    template_name: 'Orthodontic Consultation',
                    subject: 'Your Orthodontic Consultation Offer',
                    from: theme_user_email,
                    template: 'orthodontic-consultation',
                    patient_name: '',
                    specialists_name: '',
                    lead_id: '',
                    invisalign_braces: {
                        full: {
                            description: '',
                            price: 3850,
                            show: 1,
                        },
                        lite: {
                            description: '',
                            price: 3350,
                            show: 1,
                        },
                        complex: {
                            description: '',
                            price: 4200,
                            show: 1,
                        },
                        consultation: {
                            description: '',
                            price: 85,
                            show: 1,
                        },
                    },
                    lingual_braces: {
                        full: {
                            description: '',
                            price: 8950,
                            show: 1,
                        },
                        lite: {
                            description: '',
                            price: 6000,
                            show: 1,
                        },
                        consultation: {
                            description: '',
                            price: 85,
                            show: 1,
                        },
                    },
                    fixed_braces: {
                        ceramic: {
                            description: '',
                            price: 5500,
                            show: 1,
                        },
                        metal: {
                            description: '',
                            price: 5000,
                            show: 1,
                        },
                        consultation: {
                            description: '',
                            price: 85,
                            show: 1,
                        },
                    },
                },

                'Digital Consultation': {
                    to: '',
                    template_name: 'Digital Consultation',
                    subject: 'Your Ruhdental Digital Consultation',
                    from: theme_user_email,
                    template: 'digital-consultation',
                    patient_name: '',
                    specialists_name: '',
                    lead_id: '',
                    dentist_summary: '',
                    dentist: '',
                    stage_1: {
                        title: 'Stabilising Dental Health',
                        items: [
                            {
                                title: 'Exam with Xrays',
                                price: 85,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Hygiene Appointment',
                                price: 105,
                                description: '',
                                from: '',
                                show: 1,
                            },
                        ],
                    },
                    stage_2: {
                        title: 'Alignment of the Teeth ',
                        items_opt_1: [
                            {
                                title: 'Consultation',
                                price: 95,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Metal',
                                price: 5000,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                            {
                                title: 'Clear',
                                price: 5000,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                            {
                                title: 'Incognito',
                                price: 8950,
                                description: '',
                                from: 'from',
                                show: 1,
                            },
                        ],
                        items_opt_2: [
                            {
                                title: 'Invisalign Full',
                                price: 3800,
                                description: '',
                                from: '',
                                show: 1,
                            },
                        ],
                    },
                    stage_3: {
                        title: 'Cosmetic Dentistry',
                        summary: '',
                        items: [
                            {
                                title: 'Exam/Consultation',
                                price: 85,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Zoom Tooth Whitening',
                                price: 350,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Enlighten Tooth Whitening',
                                price: 775,
                                description: '',
                                from: '',
                                show: 1,
                            },
                            {
                                title: 'Direct Composite Bonding',
                                price: 375,
                                description: 'price per tooth',
                                from: '',
                                show: 1,
                            },
                        ],
                    },
                },
            },
        }
    },

    watch: {
        email_to: function (val) {
            if (val) {
                for (var template_name of this.select_data.templates) {
                    this.template_data[template_name].to = val
                }
                this.errors.email_to = 0
            }
        },

        lead_id: function (val) {
            for (var template_name of this.select_data.templates) {
                this.template_data[template_name].lead_id = val
            }
        },

        patient_name: function (val) {
            for (var template_name of this.select_data.templates) {
                this.template_data[template_name].patient_name = val
            }
        },

        specialists_name: function (val) {
            for (var template_name of this.select_data.templates) {
                this.template_data[template_name].specialists_name = val
            }
        },

        show: function (val) {
            this.template_data['Booked In'].price = ''
            this.template_data['Booked In'].clinic = 'clinic'
            this.template_data['Treatment Options'].invisalign = {
                show: 1,
                doctors: '',
                price: 3800,
            }

            this.template_data['Treatment Options'].braces = {
                show: 1,
                doctors: '',
                title: 'Fixed Braces',
                items: [
                    {
                        title: 'Consultation',
                        price: 85,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Metal Braces',
                        price: 5000,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                    {
                        title: 'Clear Braces',
                        price: 5500,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                    {
                        title: 'Incognito Braces',
                        price: 8950,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                ],
            }

            this.template_data['Treatment Options'].whitening = {
                show: 1,
                doctors: '',
                title: 'Teeth Whitening',
                items: [
                    {
                        title: 'Zoom Teeth Whitening',
                        price: 350,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                    {
                        title: 'Metal Braces',
                        price: 775,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                ],
            }

            this.template_data['Treatment Options'].composite = {
                show: 1,
                doctors: '',
                title: 'Composite Options',
                items: [
                    {
                        title: 'Direct Composite Veneers',
                        price: 375,
                        description: 'price per tooth',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Composite Edge Bonding',
                        price: 275,
                        description: 'price per tooth',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Lab Made Procelain Veneers',
                        price: 875,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                ],
            }

            this.template_data['Orthodontic Consultation'].invisalign_braces = {
                full: {
                    description: '',
                    price: 3850,
                    show: 1,
                },
                lite: {
                    description: '',
                    price: 3350,
                    show: 1,
                },
                complex: {
                    description: '',
                    price: 4200,
                    show: 1,
                },
                consultation: {
                    description: '',
                    price: 85,
                    show: 1,
                },
            }

            this.template_data['Orthodontic Consultation'].lingual_braces = {
                full: {
                    description: '',
                    price: 8950,
                    show: 1,
                },
                lite: {
                    description: '',
                    price: 6000,
                    show: 1,
                },
                consultation: {
                    description: '',
                    price: 85,
                    show: 1,
                },
            }

            this.template_data['Orthodontic Consultation'].fixed_braces = {
                ceramic: {
                    description: '',
                    price: 5500,
                    show: 1,
                },
                metal: {
                    description: '',
                    price: 5000,
                    show: 1,
                },
                consultation: {
                    description: '',
                    price: 85,
                    show: 1,
                },
            }

            this.template_data['Digital Consultation'].stage_1 = {
                title: 'Stabilising Dental Health',
                items: [
                    {
                        title: 'Exam with Xrays',
                        price: 85,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Hygiene Appointment',
                        price: 105,
                        description: '',
                        from: '',
                        show: 1,
                    },
                ],
            }
            this.template_data['Digital Consultation'].stage_2 = {
                title: 'Alignment of the Teeth ',
                items_opt_1: [
                    {
                        title: 'Consultation',
                        price: 95,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Metal',
                        price: 5000,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                    {
                        title: 'Clear',
                        price: 5000,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                    {
                        title: 'Incognito',
                        price: 8950,
                        description: '',
                        from: 'from',
                        show: 1,
                    },
                ],
                items_opt_2: [
                    {
                        title: 'Invisalign Full',
                        price: 3800,
                        description: '',
                        from: '',
                        show: 1,
                    },
                ],
            }

            this.template_data['Digital Consultation'].stage_3 = {
                title: 'Cosmetic Dentistry',
                summary: '',
                items: [
                    {
                        title: 'Exam/Consultation',
                        price: 85,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Zoom Tooth Whitening',
                        price: 350,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Enlighten Tooth Whitening',
                        price: 775,
                        description: '',
                        from: '',
                        show: 1,
                    },
                    {
                        title: 'Direct Composite Bonding',
                        price: 375,
                        description: 'price per tooth',
                        from: '',
                        show: 1,
                    },
                ],
            }

            if (!val) {
                this.template = ''
                this.lead_id = -1
            }
        },

        template: function (val) {
            if (val) {
                this.errors.template = 0
            }
        },
    },

    computed: {
        treatment_options_number: function () {
            return {
                invisalign: 1,
                braces:
                    this.template_data['Treatment Options'].invisalign.show + 1,
                whitening:
                    this.template_data['Treatment Options'].invisalign.show +
                    this.template_data['Treatment Options'].braces.show +
                    1,
                composite:
                    this.template_data['Treatment Options'].invisalign.show +
                    this.template_data['Treatment Options'].braces.show +
                    this.template_data['Treatment Options'].whitening.show +
                    1,
            }
        },

        select_data: function () {
            return {
                templates: Object.values(this.template_data).map((template) => {
                    return template.template_name
                }),

                prices: ['£50', '£100', '£150', '£200', '£250', '£300'],

                clinics: [
                    'London Fleet Street',
                    'London Notting Hill',
                    'Manchester',
                ],
            }
        },

        theme_user_data: function () {
            return {
                id: theme_user_id,
                name: theme_user_name,
            }
        },
    },

    methods: {
        submit: function () {
            var vm = this
            vm.errors.template = !vm.template
            vm.errors.email_from = !vm.email_from

            if (!vm.template || !vm.email_from) {
                return
            }

            var valid = vm.validate_email()

            if (!valid) {
                return
            }

            var data = vm.template_data[vm.template]

            wait_block.show()

            data.action = 'send_email'

            console.log(data)

            jQuery
                .ajax({
                    url: WP_URLS.wp_ajax_url,
                    type: 'POST',
                    data: data,
                })

                .done(function (e) {
                    alert(e.response)

                    vm.$parent.lead_data.meta.email_log = e.email_log
                    vm.show = false
                    console.log('success')
                })

                .fail(function (e) {
                    if ('undefined' != typeof e.data) {
                        alert(e.data.message)
                    }
                    console.log('error')
                })

                .always(function (e) {
                    wait_block.hide()
                    console.log(e)
                })
        },

        update_template: function (event, name) {
            this.template = event.val
        },

        update_template_data: function (event, name) {
            this.$set(this.template_data[name], event.name, event.val)
            this.errors[name] = 0
            // this.template_data[name][event.name] = event.val;
        },

        validate_email: function () {
            var vm = this
            var valid = true
            switch (vm.template) {
                case 'Booked In':
                    valid =
                        vm.template_data['Booked In'].price != ''
                            ? valid
                            : false
                    valid =
                        vm.template_data['Booked In'].clinic != 'clinic'
                            ? valid
                            : false
                    var valid_price =
                        vm.template_data['Booked In'].price != '' ? true : false
                    var valid_clinic =
                        vm.template_data['Booked In'].clinic != 'clinic'
                            ? true
                            : false

                    if (!valid_price) {
                        this.errors['Booked In'].price = 1
                        alert(
                            'Please set dentists consultation price inside a template'
                        )
                    } else {
                        this.errors['Booked In'].price = 0
                    }

                    if (!valid_clinic) {
                        this.errors['Booked In'].clinic = 1
                        alert('Please select a clinic in template')
                    } else {
                        this.errors['Booked In'].clinic = 0
                    }

                    return valid
                    break
                default:
                    return valid
                    break
            }
        },
    },

    template: '#email-popup-tmpl',
})
