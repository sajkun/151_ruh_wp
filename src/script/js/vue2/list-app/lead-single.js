Vue.component('comp-single-lead', {
	data: function () {
		return {
			visible: false,
			failed_reasons: failed_reasons,
			failed_reason_text: '',
			lead_data: {
				phone_count: 0,
				message_count: 0,
				phone_count_tco: 0,
				message_count_tco: 0,
				meta: {
					treatment_value: {
						billed: 0,
						value: 0,
						terms: '',
						mounthly: '',
						date_end: '',
					},
					reminder: '',
					specialists_assigned: false,
					specialists_assigned_tco: false,
					tco_data: {
						digital: false,
						tco: false,
						dentist: false,
						attended: false,
						fta_cancelled: false,
						tax: false,
					},
					patient_data: {
						name: '',
						phone: '',
						email: '',
						source: '',
						treatment: '',
						clinic: '',
						campaign: '',
					},
					failed_reason: {
						text: '',
						reason: '',
						author: '',
						date: '',
					},
					treatment_data: [],
				},
			},
			balance: 0,
			enquery_notes_count: 1,
			tco_notes_count: 1,
			text_messages_to_show: 2,
			note_text: '',
			note_text_tco: '',
			file_changed: '',
			new_file: '',
			specialists_data: specialists_data,
			requre_save: true,
			// requre_save: false,
			show_confirmation_popup: false,
			text_messages: false,
			message_to_client: '',
			sms_data: sms_data,
		}
	},

	watch: {
		'lead_data.meta.email_log': function (val) {
			// console.log(val);
			this.save_parent_meta(this.lead_data.ID, val, 'email_log', true)
		},

		'lead_data.meta.reminder': function (val) {
			console.log(val)
		},

		'lead_data.lead_stage': function (val) {
			if (failed_stage_name.indexOf(val) >= 0) {
				this.$set(this.lead_data, 'is_failed', 'yes')
			} else {
				this.$set(this.lead_data, 'is_failed', 'no')
			}

			if (converted_stages.indexOf(val) >= 0) {
				this.$set(this.lead_data, 'is_converted', 'yes')
			} else {
				this.$set(this.lead_data, 'is_converted', 'no')
			}
		},

		'lead_data.meta.patient_data.name': function () {
			jQuery('input[name=name]').removeClass('error')
		},

		'lead_data.meta.patient_data.phone': function () {
			jQuery('input[name=phone]').removeClass('error')
		},

		'lead_data.meta.patient_data.email': function (val) {
			jQuery('input[name=email]').removeClass('error')
		},

		show_confirmation_popup: function (val) {
			if (val) {
				this.$refs.popup._stage = this.lead_data.lead_stage
				this.$refs.popup.show_confirmation_popup = true
			}
		},

		text_messages_to_show: function (val) {
			if (val > 2) {
				Vue.nextTick(function () {
					jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight
				})
			}
		},

		note_text: function () {
			this.$refs.note_textarea.style.height = ''
			this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px'
		},

		note_text_tco: function () {
			this.$refs.note_textarea_tco.style.height = ''
			this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px'
		},

		visible: function (show) {
			var vm = this

			if (show) {
				this.treatment_data_selects()
				this.requre_save = true
				// this.requre_save  = false;
			} else {
				this.enquery_notes_count = 1
				this.tco_notes_count = 1
				this.note_text = ''
				this.note_text_tco = ''
				this.files_updated = ''
				this.file_changed = ''
				this.specialists_data = specialists_data
				this.requre_save = true
				// this.requre_save  = false;
				this.show_confirmation_popup = false
			}
		},

		'lead_data.meta.treatment_value.billed': function (val) {
			var balance =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) -
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)

			this.lead_data.meta.treatment_value.terms =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) ===
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)
					? 'Full Payment'
					: '12 Months'

			this.lead_data.meta.treatment_value.mounthly =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) ===
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)
					? 0
					: balance / 12
			this.balance = formatMoney(balance, 2, '.', ',')
		},

		'lead_data.meta.treatment_value.value': function (val) {
			var balance =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) -
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)

			this.lead_data.meta.treatment_value.terms =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) ===
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)
					? 'Full Payment'
					: '12 Months'

			this.lead_data.meta.treatment_value.mounthly =
				get_sum_from_price(this.lead_data.meta.treatment_value.value) ===
				get_sum_from_price(this.lead_data.meta.treatment_value.billed)
					? 0
					: balance / 12
			this.balance = formatMoney(balance, 2, '.', ',')
		},
	},

	computed: {
		balance: function () {
			return ''
		},

		deactivate_text: function () {
			return this.lead_data.meta.deactivated_lead === 'yes' ? 'Activate' : 'Deactivate'
		},

		disable_sms: function () {
			return (
				typeof this.lead_data.meta.disable_sms != 'undefined' &&
				this.lead_data.meta.disable_sms == 1
			)
		},

		email_log: function () {
			if ('undefined' == typeof this.lead_data.meta.email_log) {
				return []
			}

			var logs = this.lead_data.meta.email_log.map(e => {
				var date = new Date(e.date)
				var fmt = new DateFormatter()
				e.date_formatted = fmt.formatDate(date, 'F d Y') + ' at ' + fmt.formatDate(date, 'H:ia')

				// console.log();

				return e
			})

			return logs
		},

		enquery_notes_c: function () {
			var notes = this.lead_data.meta.lead_notes
			var notes_c = []
			var counter = 0

			if (!notes) {
				return notes_c
			}

			for (var id = notes.length - 1; id >= 0; id--) {
				var note = notes[id]

				if (note.show == 1 && counter < this.enquery_notes_count) {
					note.key = notes.length - 1 - id
					notes_c.push(note)
					counter++
				}
			}

			return notes_c
		},

		enquery_notes_count_c: function () {
			var counter = 0
			var notes = this.lead_data.meta.lead_notes

			if (!notes) {
				return counter
			}

			for (var id = notes.length - 1; id >= 0; id--) {
				var note = notes[id]

				if (note.show == 1) {
					counter++
				}
			}

			return counter
		},

		file_is_prepared: function () {
			return this.new_file.length > 0
		},

		files_updated: function () {
			return this.lead_data.meta.lead_files
		},

		get_treatment_value: function () {
			return this.lead_data.meta.treatment_value.value
		},

		get_billed_value: function () {
			return this.lead_data.meta.treatment_value.billed
		},

		get_terms_count: function () {
			$return = 1
			switch (this.lead_data.meta.treatment_value.terms) {
				case '12 Months':
					$return = 12
					break
				case '18 Months':
					$return = 18
					break
				case '24 Months':
					$return = 24
					break
				case '36 Months':
					$return = 36
					break
				case '48 Months':
					$return = 48
					break
				default:
					$return = 1
					break
			}

			return $return
		},

		journey_data: function () {
			return {
				'Straighter Teeth': {
					text: 'I want to fix the alignment of my smile',
					icon: '<svg class="icon svg-icon-teeth"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-teeth"></use></svg>',
				},
				'Whiter Teeth': {
					text: 'I’d like my teeth to shine brighter',
					icon: '<svg class="icon svg-icon-whiter"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-whiter"></use></svg>',
				},
				'Healthier Teeth': {
					text: 'I would like an examination and/or hygiene',
					icon: '<svg class="icon svg-icon-helthier"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-helthier"></use></svg>',
				},
				'Complete Smile Makeover': {
					text: 'I want to transform my smile entirely',
					icon: '<svg class="icon svg-icon-smiler"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-smiler"></use></svg>',
				},
			}
		},

		lead_status: function () {
			if (this.lead_data.is_converted == 'yes') {
				return {
					text: 'Converted Lead',
					class: 'converted',
				}
			} else if (this.lead_data.is_failed == 'yes') {
				return {
					text: 'Failed Lead',
					class: 'failed',
				}
			} else {
				return {
					text: 'Opened Lead',
					class: 'opened',
				}
			}
		},

		monthly_payment: function () {
			var billed = get_sum_from_price(this.get_billed_value)
			var summ =
				(get_sum_from_price(this.get_treatment_value) -
					get_sum_from_price(this.get_billed_value)) /
				this.get_terms_count
			summ = summ.toFixed(2)
			this.lead_data.meta.treatment_value.mounthly = summ
			return '£' + formatMoney(summ, 2, '.', ',')
		},

		messages_count: function () {
			return parseInt(this.lead_data.message_count)
		},

		messages_left: function () {
			return Math.max(0, 3 - this.lead_data.message_count)
		},

		messages_tco: function () {
			return parseInt(this.lead_data.message_count_tco)
		},

		patient_data: function () {
			return 0
		},

		phones_left: function () {
			return Math.max(0, 3 - parseInt(this.lead_data.phone_count))
		},

		phones_count: function () {
			return parseInt(this.lead_data.phone_count)
		},

		phones_tco: function () {
			return parseInt(this.lead_data.phone_count_tco)
		},

		select_data: function () {
			return {
				clinics: clinics,
				sources: theme_leads_sources,
				campaigns: campaigns,
				treatments: treatments,
				specialists: specialists,
				specialists_tco: specialists_tco,
				payment_methods: payment_methods,
				available_dentists: available_dentists,
				tags_cloud: tags_cloud,
				confidence: ['Not at all', 'Slightly', 'A lot'],
				checkup: ['Never', 'Occassionally', 'Regularly'],
				had_cosmetic: ['Whitening', 'Veneers', 'Bonding', 'Other'],
				how_ever: ['Fixed Braces', 'Aligners', 'None', 'Other'],
			}
		},

		show_clear_reminder: function () {
			return (
				this.lead_data.meta.reminder &&
				(failed_stage_name.indexOf(this.lead_data.lead_stage) >= 0 ||
					converted_stages.indexOf(this.lead_data.lead_stage) >= 0)
			)
		},

		tco_notes_c: function () {
			var notes = this.lead_data.meta.lead_notes_tco
			var notes_c = []
			var counter = 0

			if (!notes) {
				return notes_c
			}

			for (var id = notes.length - 1; id >= 0; id--) {
				var note = notes[id]

				if (note.show == 1 && counter < this.tco_notes_count) {
					note.key = notes.length - 1 - id
					notes_c.push(note)
					counter++
				}
			}

			return notes_c
		},

		tco_notes_count_c: function () {
			var counter = 0
			var notes = this.lead_data.meta.lead_notes_tco

			if (!notes) {
				return counter
			}
			for (var id = notes.length - 1; id >= 0; id--) {
				var note = notes[id]

				if (note.show == 1) {
					counter++
				}
			}

			return counter
		},

		text_messages_shown: function () {
			if (this.text_messages_to_show == 2 && this.text_messages.length > 2) {
				var messages = []
				for (var i = 2; i > 0; i--) {
					messages.push(this.text_messages[this.text_messages.length - i])
				}
				return messages
			} else {
				return this.text_messages
			}
		},

		treatment_data: function () {
			return this.lead_data.meta.treatment_data ? this.lead_data.meta.treatment_data : []
		},

		visible_specialists: function () {
			var ids = []

			if ('object' == typeof this.lead_data.meta.specialists_assigned) {
				for (var _id in this.lead_data.meta.specialists_assigned) {
					if (this.lead_data.meta.specialists_assigned[_id] == 'yes') {
						ids.push(parseInt(_id))
					}
				}
			}

			var data = Object.values(specialists_data).filter(el => {
				return ids.indexOf(el.user_id) >= 0
			})

			return data
		},

		visible_specialists_tco: function () {
			var ids = []

			if ('object' == typeof this.lead_data.meta.specialists_assigned_tco) {
				for (var _id in this.lead_data.meta.specialists_assigned_tco) {
					if (this.lead_data.meta.specialists_assigned_tco[_id] == 'yes') {
						ids.push(parseInt(_id))
					}
				}
			}

			var data = Object.values(specialists_data).filter(el => {
				return ids.indexOf(el.user_id) >= 0
			})

			return data
		},

		visible_specialists_show_select: function () {
			return true
			if (!this.lead_data.meta.specialists_assigned) {
				return true
			}
			var id = -1

			if ('object' == typeof this.lead_data.meta.specialists_assigned) {
				for (var _id in this.lead_data.meta.specialists_assigned) {
					if (this.lead_data.meta.specialists_assigned[_id] == 'yes') {
						id = _id
					}
				}
			}

			var _class = parseInt(id) > 0 ? false : true

			return _class
		},

		visible_specialists_show_select_tco: function () {
			return true
			if (!this.lead_data.meta.specialists_assigned_tco) {
				return true
			}
			var id = -1

			if ('object' == typeof this.lead_data.meta.specialists_assigned_tco) {
				for (var _id in this.lead_data.meta.specialists_assigned_tco) {
					if (this.lead_data.meta.specialists_assigned_tco[_id] == 'yes') {
						id = _id
					}
				}
			}
			var _class = parseInt(id) > 0 ? false : true
			return _class
		},
	},

	mounted: function () {
		var vm = this

		Vue.nextTick(function () {
			vm.$forceUpdate()
		})
	},

	methods: {
		add_note: function (type) {
			type = 'undefined' !== typeof type ? type : 'enquery'

			if (!this.note_text && type == 'enquery') {
				alert('Please enter some text')
				return false
			} else if (!this.note_text_tco && type == 'tco') {
				alert('Please enter some text')
				return false
			}

			var date = new Date()
			var fmt = new DateFormatter()
			var date_formatted = fmt.formatDate(date, 'F d Y') + ' at ' + fmt.formatDate(date, 'H:i')

			var new_note = {
				date: date_formatted,
				user_name: this.lead_data.user_name,
				user_id: this.lead_data.user_id,
				text: type == 'enquery' ? this.note_text : this.note_text_tco,
				is_manager: is_manager,
				done: 'no',
				show: 1,
			}

			if (type == 'enquery') {
				if (!this.lead_data.meta.lead_notes || this.lead_data.meta.lead_notes == 'false') {
					this.$set(this.lead_data.meta, 'lead_notes', [])
				}

				this.lead_data.meta.lead_notes.push(new_note)
				this.note_text = ''
				this.$refs.note_textarea.style.height = ''
				this.save_lead_meta('lead_notes', 'lead_notes')
			} else if (type == 'tco') {
				if (
					!this.lead_data.meta.lead_notes_tco ||
					this.lead_data.meta.lead_notes_tco == 'false'
				) {
					this.$set(this.lead_data.meta, 'lead_notes_tco', [])
				}

				this.lead_data.meta.lead_notes_tco.push(new_note)
				this.note_text_tco = ''
				this.$refs.note_textarea_tco.style.height = ''
				this.save_lead_meta('lead_notes_tco', 'lead_notes_tco')
			}
		},

		add_treatment_dentist: function () {
			this.lead_data.meta.treatment_data.push({
				treatment: '',
				dentist: '',
				billed: 0,
				payment_method: '',
			})

			var vm = this
			Vue.nextTick(function () {
				var select_id = vm.lead_data.meta.treatment_data.length - 1

				if (is_dentist === 'yes') {
					vm.$refs['select_dentist'][select_id].set_value('selected', dentist_name)
				}
			})

			this.requre_save = true
		},

		add_enquery: function () {
			var treatments = Object.values(this.lead_data.meta.patient_data.treatment)
			treatments.push(' ')
			this.$set(this.lead_data.meta.patient_data, 'treatment', treatments)
		},

		assign_specialist: function () {
			// this.selected_specialist = false;
			// this.save_sepcialists_meta();
		},

		change_image_uploaded_cb: function (event, name) {
			var path = this.lead_data.meta.online_journey.dropbox_path + event.file.name
			this.upload_image_to_dropbox(event.file, path, name)
		},

		change_stage_popup_cb: function (data) {
			var vm = this

			if (this.lead_data.lead_stage != data.stage) {
				var fmt = new DateFormatter()
				var today = new Date()

				var lead_stage_log2 = strip(this.lead_data.meta.lead_stage_log2)
				lead_stage_log2.push({
					stage: data.stage,
					date: fmt.formatDate(today, 'Y-m-d H:i:s'),
					by: theme_user_name,
				})
				this.$set(this.lead_data.meta, 'lead_stage_log2', lead_stage_log2)

				this.save_lead_meta('lead_stage_log2', 'lead_stage_log2')
			}

			Vue.nextTick(function () {
				vm.lead_data.lead_stage = data.stage

				if (
					!vm.lead_data.meta.reminder &&
					failed_stage_name.indexOf(data.stage) < 0 &&
					converted_stages.indexOf(data.stage) < 0
				) {
					vm.$refs.alert_alarm.show = true
					vm.$refs.alert_alarm.ID = vm.lead_data.ID
					return
				}

				vm.save_lead_meta(false)
			})
		},

		deactivate_lead: function () {
			wait_block.show()
			var vm = this
			var data = {
				action: 'deactivate_lead',
				value: this.lead_data.meta.deactivated_lead == 'no' ? 'yes' : 'no',
				lead_id: this.lead_data.ID,
			}

			jQuery
				.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					data: data,
				})

				.done(function (e) {
					console.log('success')
					vm.lead_data.meta
					vm.$set(vm.lead_data.meta, 'deactivated_lead', data.value)
				})
				.fail(function (e) {
					console.log('error')
				})
				.always(function (e) {
					wait_block.hide()
					console.log(e)
				})
		},

		do_delete_or_return: function () {
			this.deleting_lead = true
			var vm = this

			wait_block.show()

			if (parseInt(this.lead_data.lead_id) === -1) {
				wait_block.hide()
			} else {
				var data = {
					action: 'delete_lead',
					lead_id: parseInt(this.lead_data.ID),
				}

				jQuery.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					data: data,

					complete: function (xhr, textStatus) {
						wait_block.hide()
						clog(xhr)
					},

					success: function (data, textStatus, xhr) {
						if ('undefined' != typeof data.redirect) {
							// location.href = data.redirect;
						}

						var index = vm.$parent.leads.findIndex(el => {
							return el.ID == vm.lead_data.ID
						})
						vm.$parent.leads.splice(index, 1)
						vm.visible = false
						vm.$parent.show_list = true
					},

					error: function (xhr, textStatus, errorThrown) {
						clog(xhr)
						if (xhr.status === 418) {
							var response_text = JSON.parse(xhr.responseText)
							alert(response_text.data[0])
						} else {
							alert(xhr.status + ' ' + errorThrown)
						}
					},
				})
			}
		},

		delete_note: function (key, type) {
			type = 'undefined' !== typeof type ? type : 'enquery'

			if (type == 'enquery') {
				key = this.lead_data.meta.lead_notes.length - key - 1
				this.lead_data.meta.lead_notes[key].show = 0
				this.save_lead_meta('lead_notes', 'lead_notes')
			}
			if (type == 'tco') {
				key = this.lead_data.meta.lead_notes_tco.length - key - 1
				this.lead_data.meta.lead_notes_tco[key].show = 0
				this.save_lead_meta('lead_notes_tco', 'lead_notes_tco')
			}
		},

		exec_save: function () {
			if (this.requre_save) {
				this.show_confirmation_popup = true
			}
		},

		update_reminder_cb: function (event) {
			console.log(event)
			this.lead_data.meta.reminder = event.reminder
			this.$refs.reminder.value = event.reminder

			var vm = this

			Vue.nextTick(function () {
				vm.save_lead_meta(false)
			})
		},

		get_tag_match: function (tag) {
			var tags =
				'undefined' != typeof this.lead_data.meta.tags_cloud
					? this.lead_data.meta.tags_cloud
					: []

			var result = !(tags.indexOf(tag) < 0)

			return result
		},

		go_back_to_list: function () {
			this.visible = false
			this.$parent.show_list = true
		},

		mark_note_done: function (key, val, type) {
			type = 'undefined' !== typeof type ? type : 'enquery'

			if (type == 'enquery') {
				key = this.lead_data.meta.lead_notes.length - key - 1
				this.lead_data.meta.lead_notes[key].done = val
				this.save_lead_meta('lead_notes', 'lead_notes')
			}
			if (type == 'tco') {
				key = this.lead_data.meta.lead_notes_tco.length - key - 1
				this.lead_data.meta.lead_notes_tco[key].done = val
				this.save_lead_meta('lead_notes_tco', 'lead_notes_tco')
			}
		},

		price_to_value: function (ref) {
			var summ = !!this.lead_data.meta.treatment_value.value
				? this.lead_data.meta.treatment_value.value
				: 0

			switch (ref) {
				case 'price_input_field':
					var summ = !!this.lead_data.meta.treatment_value.value
						? this.lead_data.meta.treatment_value.value
						: 0
					break
				case 'input_billed':
					var summ = !!this.lead_data.meta.treatment_value.billed
						? this.lead_data.meta.treatment_value.billed
						: 0
					break
			}
			summ = get_sum_from_price(summ)
			this.$refs[ref].set_value(summ)
		},

		remove_specialist: function (user_id, type) {
			if (window.confirm('Confirm unassigning ' + name + ' from this lead')) {
				switch (type) {
					case 'tco':
						this.lead_data.meta.specialists_assigned_tco[user_id] = 'no'
						break
					default:
						this.lead_data.meta.specialists_assigned[user_id] = 'no'
						break
				}

				this.save_specialists_meta()
			}
		},

		save_specialists_meta: function () {
			var meta = {}
			var meta_tco = {}

			for (id in specialists_data) {
				meta[specialists_data[id].user_id] = this.lead_data.meta.specialists_assigned[
					specialists_data[id].user_id
				]
					? this.lead_data.meta.specialists_assigned[specialists_data[id].user_id]
					: 'no'
				meta_tco[specialists_data[id].user_id] = this.lead_data.meta.specialists_assigned_tco[
					specialists_data[id].user_id
				]
					? this.lead_data.meta.specialists_assigned_tco[specialists_data[id].user_id]
					: 'no'
			}

			var data = {
				meta: {
					lead_specialists: meta,
					lead_specialists_tco: meta_tco,
				},
				action: 'update_lead_specialist_meta',
				lead_data: this.lead_data,
				nonce: jQuery('[name=lead_data]').val(),
			}

			data.lead_data.lead_id = this.lead_data.ID

			var vm = this
			wait_block.show()

			this.save_parent_meta(this.lead_data.ID, meta, 'specialists_assigned', true)
			this.save_parent_meta(this.lead_data.ID, meta_tco, 'specialists_assigned_tco', true)

			var fmt = new DateFormatter()
			var today = new Date()

			this.save_parent_meta(
				this.lead_data.ID,
				fmt.formatDate(today, 'Y-m-d H:i:s'),
				'post_modified',
				false
			)

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: data,

				complete: function (xhr, textStatus) {
					wait_block.hide()
				},

				success: function (data, textStatus, xhr) {
					// console.log(data);
				},

				error: function (xhr, textStatus, errorThrown) {
					if (xhr.status === 418) {
						var response_text = JSON.parse(xhr.responseText)
						alert(response_text.data[0])
					} else {
						alert(xhr.status + ' ' + errorThrown)
					}
				},
			})
		},

		save_lead_meta: function (key_meta, key_this) {
			var vm = this

			if (vm.deleting_lead) {
				return
			}

			if (typeof key_meta !== 'string') {
				var meta = {
					patient_data: this.lead_data.meta.patient_data,
					treatment_data: this.lead_data.meta.treatment_data,
					treatment_value: this.lead_data.meta.treatment_value,
					treatment_coordinator: this.lead_data.meta.treatment_coordinator,
					lead_notes: this.lead_data.meta.lead_notes,
					lead_notes_tco: this.lead_data.meta.lead_notes_tco,
					reminder: this.lead_data.meta.reminder,
					text_messages: this.lead_data.meta.text_messages,
					tco_data: this.lead_data.meta.tco_data,
					lead_stage: this.lead_data.lead_stage,
					failed_reason: this.lead_data.meta.failed_reason,
					tags_cloud: this.lead_data.meta.tags_cloud,
				}

				if ('undefined' !== typeof this.lead_data.meta.online_journey) {
					meta.online_journey = this.lead_data.meta.online_journey
				}
			} else {
				var meta = {}
				meta[key_meta] = this.lead_data.meta[key_this]
			}

			var posted_data = {
				confirmed: 0,
				meta: meta,
				action: 'update_lead_meta',
				lead_data: { lead_id: this.lead_data.ID },
				nonce: jQuery('[name=lead_data]').val(),
			}

			var no_popup_keys = [
				'tco_data',
				'lead_notes',
				'lead_notes_tco',
				'text_messages',
				'tags_cloud',
				'failed_reason',
			]

			if (
				!this.lead_data.meta.patient_data.name ||
				!this.lead_data.meta.patient_data.phone ||
				!this.lead_data.meta.patient_data.email ||
				!this.lead_data.meta.patient_data.treatment
			) {
				if (!this.lead_data.meta.patient_data.phone) {
					alert('Please add phone')
					jQuery('input[name=phone]').addClass('error')
				}

				if (!this.lead_data.meta.patient_data.name) {
					alert('Please add patient fine')
					jQuery('input[name=name]').addClass('error')
				}

				if (!this.lead_data.meta.patient_data.email) {
					alert('Please add email')
					jQuery('input[name=email]').addClass('error')
				}

				if (!this.lead_data.meta.patient_data.treatment) {
					alert('Please add patient treatment')
					this.$refs.treatments_select.$el.classList.add('error')
				}

				return false
			}

			if (
				'undefined' != typeof this.lead_data.is_failed &&
				'yes' == this.lead_data.is_failed &&
				!this.lead_data.meta.failed_reason.reason
			) {
				if (!this.lead_data.meta.failed_reason.reason) {
					alert('Please select a failed lead reason')
					this.$refs.failed_reasons_select.$el.classList.add('error')
				}

				return false
			}

			var vm = this

			var no_block_keys = [
				'tco_data',
				'lead_notes',
				'lead_notes_tco',
				'text_messages',
				'failed_reason',
				'disable_sms',
			]

			if (no_block_keys.indexOf(key_meta) < 0) {
				wait_block.show()
			}

			for (var _id in meta) {
				if (_id != 'lead_stage') {
					this.save_parent_meta(this.lead_data.ID, meta[_id], _id, true)
				} else {
					this.save_parent_meta(this.lead_data.ID, meta[_id], _id, false)
				}
			}

			var filter_data = {
				clinics: [this.lead_data.meta.patient_data.clinic],
				treatments: this.lead_data.meta.patient_data.treatment,
				campaigns: [this.lead_data.meta.patient_data.campaign],
				sources: [this.lead_data.meta.patient_data.source],
				tags: this.lead_data.meta.tags_cloud,
			}

			for (var _filter_data in filter_data) {
				var value = filter_data[_filter_data]

				var index = vm.$parent.leads.findIndex(el => {
					return el.ID == vm.lead_data.ID
				})
				vm.$parent.$set(vm.$parent.leads[index].filter_data, _filter_data, value)
				vm.$parent.$set(vm.$parent.leads[index].filter_data2, _filter_data, value)
			}

			var fmt = new DateFormatter()
			var today = new Date()

			this.save_parent_meta(
				this.lead_data.ID,
				fmt.formatDate(today, 'Y-m-d H:i:s'),
				'post_modified',
				false
			)

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: posted_data,

				complete: function (xhr, textStatus) {
					wait_block.hide()
					// vm.requre_save = false;
					vm.requre_save = true
					vm.show_confirmation_popup = false
				},

				success: function (data, textStatus, xhr) {
					console.log(data)

					// if(data.reload){
					//   location.href = data.url;
					//   // wait_block.show();
					// }

					// jQuery('.button-create span').text('Save Changes');
				},

				error: function (xhr, textStatus, errorThrown) {
					if (xhr.status === 418) {
						var response_text = JSON.parse(xhr.responseText)

						if (response_text.data[0] === 'name was found') {
							var confirm = window.confirm(
								'Are you sure you want to add lead for ' +
									vm.patient_data.name +
									'? Lead for patient with this name already exists'
							)

							// console.log(confirm);

							if (confirm) {
								posted_data.confirmed = 1
								wait_block.show()
								vm.second_request(posted_data)
							}
						} else {
							alert(response_text.data[0])
						}
					} else {
						alert(xhr.status + ' ' + errorThrown)
					}
				},
			})
		},

		save_new_stage: function () {
			if (this.lead_data.lead_stage === this.lead_data.lead_stage_prev) {
				this.show_confirmation_popup = false
				return true
			}

			var list_id_prev = this.lead_data.lead_stage_prev
			var list_id = this.lead_data.lead_stage
			var user_name = this.lead_data.user_name
			var user_id = this.lead_data.user_id
			var post_id = this.lead_data.ID

			jQuery(document.body).trigger('update_lead_log', {
				post_id: post_id,
				list_id_prev: list_id_prev,
				list_id_new: list_id,
				user_name: user_name,
				user_id: user_id,
				event: 'stage_changed',
			})

			jQuery(document.body).trigger('save_dragged_item', {
				post_id: post_id,
				list_id: list_id,
			})

			this.show_confirmation_popup = false
		},

		second_request: function (posted_data) {
			var vm = this
			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: posted_data,

				complete: function (xhr, textStatus) {
					wait_block.hide()
				},

				success: function (data, textStatus, xhr) {
					// console.log(data);
					vm.$refs.lead_id_input.set_value(data.post_id)
					jQuery('.button-create span').text('Save Changes')
				},

				error: function (xhr, textStatus, errorThrown) {
					if (xhr.status === 418) {
						var response_text = JSON.parse(xhr.responseText)
						// console.log(xhr);
						alert(response_text.data[0])
					} else {
						alert(xhr.status + ' ' + errorThrown)
					}
				},
			})
		},

		/**
		 * show popup component
		 * popup contains options to select html email templates and address email to a person
		 */
		show_email_popup_template: function () {
			this.$set(
				this.$refs.email_popup_template,
				'email_to',
				this.lead_data.meta.patient_data.email
			)

			this.$set(this.$refs.email_popup_template, 'lead_id', this.lead_data.ID)

			this.$set(
				this.$refs.email_popup_template,
				'patient_name',
				this.lead_data.meta.patient_data.name
			)

			this.$set(this.$refs.email_popup_template, 'specialists_name', theme_user_name)

			this.$set(this.$refs.email_popup_template, 'show', true)
		},

		treatment_data_selects: function () {
			var vm = this
			var total = 0

			if (!vm.lead_data.meta.treatment_data) {
			}

			for (var id in vm.lead_data.meta.treatment_data) {
				var select_id = id
				var data = vm.lead_data.meta.treatment_data[id]

				var props = {
					isExpanded: '',
					isSelected: [],
					isHiddenSelect: true,
					isHiddenImitation: false,
					icon: icons_selects['human'],
					options: available_dentists,
					selected: data['dentist'],
				}

				for (var i in props) {
					vm.$refs['select_dentist'][select_id].set_value(i, props[i])
				}

				vue_select_components.push(vm.$refs['select_dentist'][select_id])

				var props = {
					icon: icons_selects['treatments'],
					isExpanded: '',
					isSelected: [],
					isHiddenSelect: true,
					isHiddenImitation: false,
					options: treatments,
					selected: data['treatment'],
				}

				for (var i in props) {
					vm.$refs['select_treatment'][select_id].set_value(i, props[i])
				}

				vue_select_components.push(vm.$refs['select_treatment'][select_id])

				var props = {
					icon: icons_selects['currency'],
					isExpanded: '',
					isSelected: [],
					isHiddenSelect: true,
					isHiddenImitation: false,
					options: payment_methods,
					selected: data['payment_method'] ? data['payment_method'] : 'Payment Method',
				}

				for (var i in props) {
					vm.$refs['select_payment_method'][select_id].set_value(i, props[i])
				}

				vue_select_components.push(vm.$refs['select_payment_method'][select_id])
				vm.$refs.select_billed[select_id].set_value(data['billed'])

				total += get_sum_from_price(data['billed'])
			}

			if (!vm.lead_data.meta.treatment_value) {
				vm.$set(vm.lead_data.meta, 'treatment_value', {})
			}
			vm.$set(vm.lead_data.meta.treatment_value, 'value', total)
		},

		toggle_sms_show: function () {
			var disable_sms =
				'undefined' != typeof this.lead_data.meta.disable_sms &&
				this.lead_data.meta.disable_sms == 1

			disable_sms = disable_sms ? 0 : 1

			this.$set(this.lead_data.meta, 'disable_sms', disable_sms)
			this.save_parent_meta(this.lead_data.ID, disable_sms, 'disable_sms', true)
			this.save_lead_meta('disable_sms', 'disable_sms')
		},

		update_treatment_data: function (e, key) {
			if (typeof e.val !== 'undefined') {
				this.lead_data.meta.treatment_data[key][e.name] = e.val

				var total = 0

				for (var id in this.lead_data.meta.treatment_data) {
					total += get_sum_from_price(this.lead_data.meta.treatment_data[id].billed)
				}

				this.$set(
					this.lead_data.meta.treatment_value,
					'value',
					'£' + formatMoney(total, 2, '.', ',')
				)

				this.requre_save = true
			}
		},

		update_dates: function () {
			// console.log(this);
		},

		update_lead: function (data, key, id) {
			if ('object' === typeof data) {
				if (key === 'treatment_coordinator' && data.name === 'specialist') {
					if ('undefined' === typeof this.lead_data.meta[key][data.name]) {
						this.lead_data.meta[key][data.name] = []
					}

					if (this.lead_data.meta[key][data.name].indexOf(data.val) < 0) {
						this.lead_data.meta[key][data.name].push(data.val)
					} else {
						var ind = this.lead_data.meta[key][data.name].indexOf(data.val)
						this.lead_data.meta[key][data.name].splice(ind, 1)
					}
				} else if (key === 'treatment_value' && data.name === 'treatment') {
					if ('undefined' === typeof this.lead_data.meta[key][data.name]) {
						this.lead_data.meta[key][data.name] = []
					}
					if (this.lead_data.meta[key][data.name].indexOf(data.val) < 0) {
						this.lead_data.meta[key][data.name].push(data.val)
					} else {
						var ind = this.lead_data.meta[key][data.name].indexOf(data.val)
						this.lead_data.meta[key][data.name].splice(ind, 1)
					}
				} else if (data.name === 'treatment') {
					// console.log(data);
					// console.log(key);
					// console.log(id);
					this.$set(this.lead_data.meta[key][data.name], id, data.val)
				} else {
					switch (typeof this.lead_data.meta[key]) {
						case 'object':
							this.$set(this.lead_data.meta[key], data.name, data.val)
							break
						default:
							this.$set(this.lead_data.meta, key, data.val)
							break
					}
				}

				this.requre_save = true
				var vm = this

				Vue.nextTick(function () {
					vm.$forceUpdate()
				})
			}
		},

		update_lead_stage: function (data, key) {
			this.lead_data.lead_stage_prev = this.lead_data.lead_stage
			this.lead_data.lead_stage = data.val

			var fmt = new DateFormatter()
			var today = new Date()

			var lead_stage_log2 = strip(this.lead_data.meta.lead_stage_log2)
			lead_stage_log2.push({
				stage: data.val,
				date: fmt.formatDate(today, 'Y-m-d H:i:s'),
				by: theme_user_name,
			})
			this.$set(this.lead_data.meta, 'lead_stage_log2', lead_stage_log2)
		},

		update_specialists: function (event, type) {
			if ('undefined' !== typeof event.val) {
				if (this.lead_data.ID < 0) {
					alert('Create lead before assigning it to a specialist, please')
					return false
				}

				var data = Object.values(specialists_data).filter(el => {
					return el.name == event.val
				})[0]
				var do_save = false

				switch (type) {
					case 'tco':
						if (!this.lead_data.meta.specialists_assigned_tco) {
							this.lead_data.meta.specialists_assigned_tco = {}
						}

						if (this.lead_data.meta.specialists_assigned_tco[data.user_id] !== 'yes') {
							this.$set(this.lead_data.meta.specialists_assigned_tco, data.user_id, 'yes')
							do_save = true
						}

						this.$refs.lead_specialissts_select_tco.selected = ''
						break

					default:
						if (!this.lead_data.meta.specialists_assigned) {
							this.lead_data.meta.specialists_assigned = {}
						}
						if (this.lead_data.meta.specialists_assigned[data.user_id] !== 'yes') {
							this.$set(this.lead_data.meta.specialists_assigned, data.user_id, 'yes')
							do_save = true
						}

						this.$refs.lead_specialissts_select.selected = ''
						break
				}

				if (do_save) {
					var values = Object.values(this.$parent.filter_data.team)

					if (values.indexOf(data.name) < 0) {
						values.push(data.name)
						this.$parent.$set(this.$parent.filter_data, 'team', values)
					}

					var lead_index = this.$parent.leads.findIndex(e => {
						return e.ID == this.lead_data.ID
					})
					var team_filter_data = Object.values(this.$parent.leads[lead_index].filter_data.team)
					var team_filter_data2 = Object.values(
						this.$parent.leads[lead_index].filter_data2.team
					)

					team_filter_data.push(data.name)
					team_filter_data2.push(data.name)

					this.$parent.$set(
						this.$parent.leads[lead_index]['filter_data2'],
						'team',
						team_filter_data2
					)
					this.$parent.$set(
						this.$parent.leads[lead_index]['filter_data'],
						'team',
						team_filter_data
					)

					this.save_specialists_meta()
				}
			}
		},

		upload_image_to_dropbox: function (file, path, name) {
			var vm = this

			var data = JSON.stringify({
				path: path,
				mode: 'add',
				autorename: true,
				mute: false,
				strict_conflict: false,
			})

			var xhr = new XMLHttpRequest()
			var vm = this

			wait_block.show()

			xhr.addEventListener('readystatechange', function () {
				if (this.readyState === 4) {
					wait_block.hide()
					var data = JSON.parse(this.responseText)
					vm.lead_data.meta.online_journey[name] = data.path_display
				}
			})

			xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload')
			xhr.setRequestHeader('authorization', 'Bearer ' + online_journey_settings.token)
			xhr.setRequestHeader('Dropbox-API-Arg', data)
			xhr.setRequestHeader('content-type', 'application/octet-stream')

			xhr.upload.onprogress = function (event) {
				// var progress = parseInt((parseInt(event.loaded) / parseInt(event.total) )* 100);
				// item.show_progress(progress);
			}

			xhr.send(file)
		},

		value_to_price: function (ref) {
			switch (ref) {
				case 'price_input_field':
					var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.value, 2, '.', ',')
					break
				case 'input_billed':
					var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.billed, 2, '.', ',')
					break
			}
			this.$refs[ref].set_value(summ)
		},

		load_file: function () {
			// console.log('load_file');

			wait_block.show()

			var file_pierces = this.$refs.file_input.value.split('\\')
			var file_name = file_pierces[file_pierces.length - 1]
			var file = jQuery(this.$refs.file_input).prop('files')[0]
			var fd = new FormData()

			var vm = this

			fd.append('file', file)
			fd.append('lead_id', this.lead_data.ID)
			fd.append('user_name', 'unknown')
			fd.append('action', 'upload_new_document')

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				processData: false,
				contentType: false,
				data: fd,

				complete: function (xhr, textStatus) {
					vm.new_file = ''
					wait_block.hide()
				},

				success: function (data, textStatus, xhr) {
					vm.lead_data.meta.lead_files.push(data.file_data)
					vm.save_parent_meta(
						vm.lead_data.ID,
						vm.lead_data.meta.lead_files,
						'lead_files',
						true
					)
				},

				error: function (xhr, textStatus, errorThrown) {
					if (xhr.status === 418) {
						var response_text = JSON.parse(xhr.responseText)
						alert(response_text.data[0])
					} else {
						alert(xhr.status + ' ' + errorThrown)
					}
				},
			})
		},

		remove_file: function (file_id) {
			var vm = this

			if (window.confirm('Confirm deleting file ' + this.files[file_id].name)) {
				var file_data = vm.files[file_id]

				vm.files.splice(file_id, 1)

				var data = {
					file_data: file_data,
					lead_id: vm.lead_data.lead_id,
					user_name: vm.lead_data.user_name,
					action: 'delete_file_from_lead',
				}

				jQuery.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					data: data,

					complete: function (xhr, textStatus) {},

					success: function (data, textStatus, xhr) {
						// console.log(data);
					},

					error: function (xhr, textStatus, errorThrown) {
						if (xhr.status === 418) {
							var response_text = JSON.parse(xhr.responseText)
							alert(response_text.data[0])
						} else {
							alert(xhr.status + ' ' + errorThrown)
						}
					},
				})
			}
		},

		do_file_changed: function () {
			var file_pierces = this.$refs.file_input.value.split('\\')
			var file_name = file_pierces[file_pierces.length - 1]
			this.new_file = file_name
		},

		change_phone: function (action) {
			var phone = this.lead_data.phone_count

			if (action === 'add') {
				phone++
			}

			if (action === 'remove') {
				phone--
			}

			phone = Math.max(0, phone)
			this.lead_data.phone_count = Math.min(3, phone)

			this.save_parent_meta(this.lead_data.ID, this.lead_data.phone_count, 'phone_count')

			var data = {
				lead_id: this.lead_data.ID,
				count: this.lead_data.phone_count,
				action: 'save_phones_count',
			}

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: data,

				success: function (data, textStatus, xhr) {
					// console.log(data);
				},
			})
		},

		change_message: function (action) {
			var messages = this.lead_data.message_count
			if (action === 'add') {
				messages++
			}

			if (action === 'remove') {
				messages--
			}

			messages = Math.max(0, messages)
			this.lead_data.message_count = Math.min(3, messages)

			this.save_parent_meta(this.lead_data.ID, this.lead_data.message_count, 'message_count')

			var data = {
				lead_id: this.lead_data.ID,
				count: this.lead_data.message_count,
				action: 'save_messages_count',
			}

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: data,

				success: function (data, textStatus, xhr) {
					// console.log(data);
				},
			})
		},

		save_parent_meta: function (item_id, value, param, meta) {
			var vm = this
			var index = vm.$parent.leads.findIndex(el => {
				return item_id == el.ID
			})
			if (meta) {
				vm.$parent.$set(vm.$parent.leads[index]['meta'], param, value)
			} else {
				vm.$parent.$set(vm.$parent.leads[index], param, value)
			}
		},

		change_phone_tco: function (action) {
			var vm = this
			switch (action) {
				case 'add':
					vm.lead_data.phone_count_tco = 1
					break
				case 'remove':
					vm.lead_data.phone_count_tco = 0
					break
			}

			this.save_parent_meta(this.lead_data.ID, this.lead_data.phone_count_tco, 'phone_count_tco')

			var data = {
				lead_id: vm.lead_data.ID,
				count: vm.lead_data.phones_tco,
				action: 'save_phones_count_tco',
			}

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: data,

				complete: function (xhr, textStatus) {},

				success: function (data, textStatus, xhr) {
					// console.log(data);
				},

				error: function (xhr, textStatus, errorThrown) {},
			})
		},

		change_message_tco: function (action) {
			var vm = this
			switch (action) {
				case 'add':
					vm.lead_data.message_count_tco = 1
					break
				case 'remove':
					vm.lead_data.message_count_tco = 0
					break
			}

			this.save_parent_meta(
				this.lead_data.ID,
				this.lead_data.message_count_tco,
				'message_count_tco'
			)

			var data = {
				lead_id: this.lead_data.ID,
				count: this.lead_data.message_count_tco,
				action: 'save_messages_count_tco',
			}

			jQuery.ajax({
				url: WP_URLS.wp_ajax_url,
				type: 'POST',
				data: data,

				complete: function (xhr, textStatus) {},
			})
		},

		clear_reminder: function () {
			this.lead_data.meta.reminder = ''
		},

		/**
		 * show single lead on click on a lead item on a list
		 */
		show_single_lead: function (id) {
			clog(id, 0, 1)
		},

		close_tab: function () {
			window.close()
		},

		send_text_message: function () {
			var phone = this.lead_data.meta.patient_data.phone
			var vm = this

			if (!phone || phone.length < 4) {
				alert('phone not set')
				return
			}

			if (!this.message_to_client) {
				alert('Type a message, please')
				return
			}

			if (!this.sms_data) {
				alert('Messaging center is not configured')
				return
			}

			var data = {
				sms_data: this.sms_data,
				phone: phone,
				text: this.message_to_client,
			}

			// vm.message_to_client = '';

			jQuery
				.ajax({
					url: WP_URLS.theme_url + '/messaging/twilio_send.php',
					type: 'POST',
					dataType: 'json',
					data: data,
				})

				.done(function (e) {
					if (e.error) {
						alert(e.error)
					} else {
						var date_sent = moment().format('MMM Do YY, h:mm:ss a')

						if (vm.text_messages) {
							vm.text_messages.push({
								body: vm.message_to_client,
								date_sent: date_sent,
								type: 'we',
								status: 'sent',
							})

							vm.save_lead_meta('text_messages', 'text_messages')
						}

						vm.message_to_client = ''

						Vue.nextTick(function () {
							jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight
						})
					}
				})

				.fail(function () {})

				.always(function (e) {
					console.log(e)
				})
		},

		update_text_messages: function () {
			if (this.deleting_lead) {
				return
			}

			var phone = this.patient_data.phone
			var vm = this

			var data = {
				sms_data: this.sms_data,
				phone: phone,
			}

			jQuery
				.ajax({
					url: WP_URLS.theme_url + '/messaging/twilio_update_msg.php',
					type: 'POST',
					dataType: 'json',
					data: data,
				})

				.done(function (e) {
					if (e.error) {
						alert(e.error)
					} else {
						if (vm.deleting_lead) {
							return
						}

						vm.text_messages = e.messages
						vm.save_lead_meta('text_messages', 'text_messages')
						vm.intial_load = false

						if (vm.text_messages.length < e.messages.length) {
							if (!vm.intial_load) {
								var message = e.messages[e.messages.length - 1]
							}
						}
					}
				})

				.fail(function () {})

				.always(function (e) {
					jQuery('._messages').removeClass('hidden')
					jQuery('.preloader-messages').addClass('hidden')
				})
		},

		update_failed_reasons: function (e) {
			this.$set(this.lead_data.meta.failed_reason, 'reason', e.val)
			this.save_lead_meta('failed_reason', 'failed_reason')
		},

		update_tags_cloud: function (tag) {
			var tags =
				'undefined' != typeof this.lead_data.meta.tags_cloud
					? this.lead_data.meta.tags_cloud
					: []

			var position = tags.indexOf(tag)

			if (position < 0) {
				tags.push(tag)
			} else {
				tags.splice(position, 1)
			}

			this.$set(this.lead_data.meta, 'tags_cloud', tags)
		},

		show_sent_email: function (data) {
			console.log(data)
			this.$refs.sent_email_view.show = true
			this.$refs.sent_email_view.log = data
		},

		submit_failed_note: function () {
			if (this.failed_reason_text) {
				var date = new Date()
				var fmt = new DateFormatter()
				this.$set(this.lead_data.meta.failed_reason, 'text', this.failed_reason_text)
				this.$set(this.lead_data.meta.failed_reason, 'author', theme_user_name)
				this.$set(
					this.lead_data.meta.failed_reason,
					'date',
					fmt.formatDate(date, 'd F Y') + ' at ' + fmt.formatDate(date, 'H:i')
				)
				this.save_lead_meta('failed_reason', 'failed_reason')
				var vm = this
				Vue.nextTick(function () {
					vm.failed_reason_text = ''
				})
			}
		},

		clear_failed_reason: function () {
			this.$set(this.lead_data.meta.failed_reason, 'text', '')
			this.$set(this.lead_data.meta.failed_reason, 'author', '')
			this.$set(this.lead_data.meta.failed_reason, 'date', '')
			this.save_lead_meta('failed_reason', 'failed_reason')
		},

		convert_date: function (date) {
			var date = new Date(date)
			var fmt = new DateFormatter()
			return fmt.formatDate(date, 'd F Y') + ' at ' + fmt.formatDate(date, 'H:i')
		},

		date_difference: function (key) {
			if ('undefined' == typeof this.lead_data.meta.lead_stage_log2) {
				return false
			}

			if (key + 1 < this.lead_data.meta.lead_stage_log2.length) {
				$start_date =
					key == -1 ? this.lead_data.post_date : this.lead_data.meta.lead_stage_log2[key].date

				$start_date = new Date($start_date)
				$end_date = new Date(this.lead_data.meta.lead_stage_log2[key + 1].date)

				var diff_minutes = DateDiff.inMinutes($start_date, $end_date)
				var diff_days = DateDiff.inDays($start_date, $end_date)
				var diff_hours = DateDiff.inHours($start_date, $end_date)

				return diff_days > 0
					? 'Passed ' + diff_days + 'd'
					: diff_hours > 0
					? 'Passed ' + diff_hours + 'h'
					: diff_minutes > 0
					? 'Passed ' + diff_minutes + 'min'
					: 'Less than a minute'
			} else {
				return false
			}
		},
	},

	template: '#lead-single-tmpl',
})
