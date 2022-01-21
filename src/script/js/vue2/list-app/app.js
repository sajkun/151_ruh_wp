if (document.getElementById('list-app') && 'undefined' != typeof is_lead_list_2) {
	list_app = new Vue({
		el: '#list-app',

		data: {
			filter_data: dashboard_filter_data,

			filters: {
				clinics: 'All Clinics',
				treatments: 'All Treatments',
				campaigns: 'All Campaigns',
				sources: 'All Sources',
				team: 'All Team',
				dentists: 'All Dentists',
				tags: 'All Tags',
			},

			filters_selected: [],

			leads: dashboard_leads_data,
			stages: stages,
			by_phones: [],
			by_phones_data: false,
			request_completed: false,
			// sortby: false,
			sortby: 'Recently Updated',

			overdue_checked: false,
			not_overdue_checked: false,
			overdue_only_checked: false,
			show_overdue_only: false,
			show_not_read_only: false,
			online_journey_filter: false,
			show_list: true,
			search_value: '',
		},

		watch: {
			by_phones_data: function (val) {
				var vm = this
				if (vm.$refs.single_lead.visible) {
					var phone = vm.$refs.single_lead.lead_data.meta.patient_data.phone

					if (phone) {
						phone = phone.replace('+44', '0')
						vm.$refs.single_lead.text_messages =
							val && 'undefined' !== typeof val[phone] ? val[phone] : []
					}
				}
			},

			'filters.clinics': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			'filters.treatments': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			'filters.campaigns': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			'filters.sources': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			'filters.team': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			'filters.dentists': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},

			sortby: function (val) {
				console.log(val)
			},

			'filters.tags': function (val) {
				Cookie.set('lead_list_filter2', JSON.stringify(this.filters))
			},
		},

		beforeMount: function () {
			this.update_filter_from_cookies()
		},

		mounted: function () {
			var vm = this

			vm.check_text_messages()

			var filters_selected = Cookie.get('filters_selected')

			if (filters_selected) {
				this.filters_selected = JSON.parse(filters_selected)
			}

			vm.$nextTick(function () {
				setInterval(function () {
					vm.check_text_messages()
				}, 60000)
				vm.adjust_sizes()
				vm.$el.classList.add('init')
				window.addEventListener(
					'resize',
					function () {
						vm.adjust_sizes()
					},
					true
				)

				vm.$forceUpdate()
			})
		},

		computed: {
			not_read_count: function () {
				var count = 0

				if (!this.leads_by_column) {
					return 0
				}

				for (var id in this.leads_by_column) {
					count += this.leads_by_column[id].filter(e => {
						return e.show_message_alert_him && e.meta.disable_sms == 0
					}).length
				}

				return count
			},

			alarms: function () {
				return {
					class: '',
					class_overdue: '',
					total: 0,
					overdue: 0,
				}
			},

			online_journey_count: function () {
				const leads = this.leads_filtered.filter(lead => {
					return lead.meta?.online_journey
				})
				return leads.length
			},

			get_convertion: function () {
				var vm = this

				return function (col_id) {
					var leads_total = 0
					var leads_column_total = 0

					var column_number = this.visible_stages.findIndex(e => {
						return e.name == col_id
					})

					if (col_id == failed_lead_name) {
						for (id in this.leads_by_column) {
							leads_total += this.leads_by_column[id].length
						}
					} else {
						for (var i = 0; i <= column_number; i++) {
							var _col_id = this.visible_stages[i].name
							leads_total +=
								_col_id != failed_lead_name &&
								'undefined' !== typeof this.leads_by_column[_col_id]
									? this.leads_by_column[_col_id].length
									: 0
						}
					}

					if ('undefined' !== typeof this.leads_by_column[col_id] && leads_total > 0) {
						leads_column_total = this.leads_by_column[col_id].length

						var val = (leads_column_total / leads_total) * 100
						return val.toFixed(2)
					} else {
						return 0
					}
				}
			},

			leads_by_column: function () {
				var vm = this

				var stages = 'object' == typeof vm.stages ? Object.values(vm.stages) : vm.stages

				var leads = Object.fromEntries(
					stages.map(function (el) {
						return [el.name, []]
					})
				)

				for (var lead_stage in leads) {
					var stage_data = stages.filter(el => {
						return el.name == lead_stage
					})

					leads[lead_stage] = vm.leads_filtered.filter(function (el) {
						return el.lead_stage == lead_stage
					})

					switch (vm.sortby) {
						case 'Recent Messages':
							leads[lead_stage].sort(vm.sort_by_sms)
							break
						case 'Date Added':
							leads[lead_stage].sort(vm.sort_by_date_added)
							break
						case 'Recently Updated':
							leads[lead_stage].sort(vm.sort_by_date)
							break
					}
				}

				return leads
			},

			/**
			 * select visible leads according to filters, overdue and only messages parameters
			 *
			 */
			leads_filtered: function () {
				return this.get_leads_filtered()
			},

			overdue_data: function () {
				var visible_stage_names = this.visible_stages.map(el => {
					return el.name
				})

				var leads = this.leads_filtered.filter(el => {
					return visible_stage_names.indexOf(el.lead_stage) >= 0
				})

				var leads_reminder = leads.filter(el => {
					return !!el.meta.reminder
				})

				var now = new Date()

				var leads_overdue = leads_reminder.filter(el => {
					return now > new Date(el.meta.reminder)
				})

				var leads_not_overdue = leads_reminder.filter(el => {
					return now < new Date(el.meta.reminder)
				})

				return {
					reminder: leads_reminder.length,
					overdue: leads_overdue.length,
					not_overdue: leads_not_overdue.length,
				}
			},

			sort_options: function () {
				return ['Recent Messages', 'Date Added', 'Recently Updated']
			},

			stages_reception: function () {
				var stages = 'object' == typeof this.stages ? Object.values(this.stages) : this.stages

				return stages.filter(el => {
					return el.reception == 1
				})
			},

			stages_tco: function () {
				var stages = 'object' == typeof this.stages ? Object.values(this.stages) : this.stages

				return stages.filter(el => {
					return el.tco == 1
				})
			},

			visible_stages: function () {
				var stages = 'object' == typeof this.stages ? Object.values(this.stages) : this.stages

				switch (list_type) {
					case 'reception':
						return stages.filter(el => {
							return el.reception == 1
						})
						break
					case 'tco':
						return stages.filter(el => {
							return el.tco == 1
						})
						break
					default:
						return stages
						break
				}
			},
		},

		methods: {
			add_leads: function (leads) {
				var current_leads_ids = this.leads.map(e => {
					return e.ID
				})

				leads = leads.filter(el => {
					return current_leads_ids.indexOf(el.ID) < 0
				})

				this.leads = this.leads.concat(leads)
			},

			adjust_sizes: function () {
				var vm = this
				jQuery(vm.$refs.column_container).removeAttr('style')

				jQuery('.horizontal-scroll').removeAttr('style')
				jQuery('.horizontal-scroll > .row').removeAttr('style')
				jQuery('.horizontal-scroll .leads-column').removeAttr('style')
				jQuery('.horizontal-scroll .leads-column__body').removeAttr('style')

				var heigth = jQuery('.site-inner').height() - jQuery('.filter-container').height() - 28

				var width = vm.visible_stages.length * 300

				// set width of columns' container to avoid line breaks
				jQuery(vm.$refs.column_container).css({
					'min-width': width + 'px',
				})

				if (width < jQuery(window).width()) {
					var margin = (jQuery(window).width() - width) / 2
					jQuery(vm.$refs.column_container).css({
						'margin-left': margin + 'px',
					})
				}

				// set height of s scroll block to fit it to the page size
				jQuery('.horizontal-scroll').css({
					'min-height': heigth + 'px',
					'max-height': heigth + 'px',
				})
				jQuery('.horizontal-scroll > .row').css({
					'min-height': heigth + 'px',
					'max-height': heigth + 'px',
				})
				jQuery('.horizontal-scroll .leads-column').css({
					'min-height': heigth + 'px',
					'max-height': heigth + 'px',
				})
				jQuery('.horizontal-scroll .leads-column__body').css({
					height: heigth - 68 + 'px',
					'max-height': heigth - 68 + 'px',
				})
			},
			/**
			 * discards all changes of filters;
			 */
			clear_filters: function () {
				var filters = {
					clinics: 'All Clinics',
					treatments: 'All Treatments',
					campaigns: 'All Campaigns',
					sources: 'All Sources',
					team: 'All Team',
					dentists: 'All Dentists',
					tags: 'All Tags',
				}

				for (var filter_name of this.filters_selected) {
					console.log(filter_name)
					this.$refs[filter_name][0].set_value('selected', filters[filter_name])
				}
			},

			/**
			 * gets smss data from twilio
			 */
			check_text_messages: function () {
				var vm = this

				if ('undefined' == typeof sms_data) {
					return
				}

				var data = {
					sms_data: sms_data,
					phone: 'all',
				}

				jQuery
					.ajax({
						url: WP_URLS.theme_url + '/messaging/twilio_update_msg.php',
						type: 'POST',
						dataType: 'json',
						data: data,
					})

					.done(function (e) {
						console.log(e)
						if (!e.error) {
							vm.by_phones = e.by_phones
							vm.by_phones_data = e.by_phones_data
							console.log(e)
							Vue.nextTick(function () {
								vm.$forceUpdate()
							})
						}
					})

					.fail(function () {})

					.always(function (e) {
						vm.request_completed = true

						clog('check_msg')
						clog(e)
					})
			},

			/**
			 * gets filter value by filter name.
			 * gets data from cookie.
			 */
			get_filter_value: function (filter_name) {
				var lead_list_filter = Cookie.get('lead_list_filter2')

				if (lead_list_filter) {
					lead_list_filter = JSON.parse(lead_list_filter)
					return lead_list_filter[filter_name]
				} else {
					return this.filter_data[filter_name][0]
				}
			},

			get_filter_options: function (filter_name) {
				return this.filter_data[filter_name]
			},

			get_leads_filtered: function () {
				var vm = this

				// add message data
				var leads = vm.leads.map(el => {
					if (!el.meta.patient_data.phone) {
						return el
					}

					var phone = el.meta.patient_data.phone.replace('+44', '0')

					if ('undefined' != typeof vm.by_phones_data[phone]) {
						var msgs = vm.by_phones_data[phone]
						var type = msgs[msgs.length - 1].type

						el.show_message_alert_him = type === 'him' ? true : false // by him
						el.show_message_alert = type === 'him' ? false : true // by us
						// console.group(phone)
						// console.log(strip(el.meta.patient_data.name))
						// console.log(strip(msgs))
						// console.log(strip(type))
						// console.log(strip(el.show_message_alert))
						// console.log(strip(el.show_message_alert_him))
						// console.log(strip(el))
						// console.groupEnd()
					}

					return el
				})

				var now = new Date()

				leads = leads.filter(function (el) {
					var validated = true
					var filter_data = strip(el.filter_data2)
					var now = new Date()

					// filter by search name

					if (!el.meta.patient_data.name && !el.meta.patient_data.email) {
						return false
					}

					if (el.meta.patient_data.name) {
						validated =
							vm.search_value.length > 2 &&
							el.meta.patient_data.name.toLowerCase().indexOf(vm.search_value) < 0
								? false
								: validated
					}

					// show reminders only

					if (vm.show_overdue_only && !el.meta.reminder) {
						validated = false
					}

					var overdue_date = new Date(el.meta.reminder)

					if (
						vm.not_overdue_checked &&
						(!el.meta.reminder || el.meta.reminder == 'false' || overdue_date < now)
					) {
						validated = false
					}

					if (
						vm.overdue_only_checked &&
						(!el.meta.reminder || el.meta.reminder == 'false' || overdue_date > now)
					) {
						validated = false
					}

					// show only with latest sms from clients
					if (
						vm.show_not_read_only &&
						(!el.show_message_alert_him || parseInt(el.meta.disable_sms) == 1)
					) {
						validated = false
					}

					if (vm.online_journey_filter && !el.meta?.online_journey) {
						validated = false
					}

					// show only filter's matches
					for (var filter_id in vm.filters) {
						if (vm.filters[filter_id].toLowerCase().indexOf('all ') == 0) {
							continue
						}

						if (!filter_data[filter_id].length) {
							return false
						}

						validated =
							filter_data[filter_id].indexOf(vm.filters[filter_id]) < 0 ? false : validated
					}
					return validated
				})

				return leads
			},

			open_lead_cb: function (data) {
				var vm = this
				var lead = strip(
					this.leads.filter(el => {
						return el.ID == data.lead_id
					})[0]
				)

				vm.show_list = false
				vm.$refs.single_lead.lead_data = lead

				Vue.nextTick(function () {
					vm.$refs.single_lead.visible = true
					var phone = lead.meta.patient_data.phone
					if (phone) {
						phone = phone.replace('+44', '0')

						if (!vm.by_phones_data) {
							vm.$refs.single_lead.text_messages = false
						} else {
							vm.$refs.single_lead.text_messages =
								'undefined' !== typeof vm.by_phones_data[phone]
									? vm.by_phones_data[phone]
									: []
						}
					}
					console.log(lead)
				})
			},

			get_billed_this_period: function (lead) {
				var total = 0

				if ('undefined' !== typeof lead.meta.treatment_value.billed) {
					var value = lead.meta.treatment_value.billed

					if (value) {
						total += get_sum_from_price(value)
					}
				}
				return total
			},

			get_billed_value: function (lead) {
				var date_from = new Date(_from2)
				var date_to = new Date(_to2)

				// console.log(date_to);

				billed_total = 0

				if ('undefined' !== typeof lead.meta.start_date) {
					var billed_start = new Date(lead.meta.start_date)

					var count = count_billed_time(billed_start, date_from, date_to)

					if (
						'undefined' !== typeof lead.meta.treatment_value.mounthly &&
						!isNaN(lead.meta.treatment_value.mounthly)
					) {
						billed_total += count * get_sum_from_price(lead.meta.treatment_value.mounthly)
					}
				}
				return billed_total
			},

			load_csv: function (data) {
				var formatted_data = []

				var filters = []

				for (var j in this.filters) {
					if (this.filters[j].match('All')) {
					} else {
						filters.push(this.filters[j])
					}
				}

				filters = filters.length == 0 ? ['No filters'] : filters

				filename = jQuery('.range-datepicker__text').text() + '_' + filters.join('-')

				filename = filename.split(' ').join('_')

				if (jQuery('.search__field').val()) {
					filename += '__searched_for%' + jQuery('.search__field').val()
				}

				var column_data = strip(this.leads_by_column[data.column])

				for (var lead_id in column_data) {
					var billed =
						this.get_billed_this_period(column_data[lead_id]) +
						this.get_billed_value(column_data[lead_id])

					var dentists = column_data[lead_id].meta.treatment_data
						? column_data[lead_id].meta.treatment_data
								.map(_data_map => {
									return _data_map['dentist']
								})
								.filter(_data_filter => {
									return _data_filter
								})
								.join('; ')
						: ''

					var notes_reception = ''
					var notes_tco = ''

					if (typeof column_data[lead_id].meta.lead_notes == 'object') {
						notes_reception = column_data[lead_id].meta.lead_notes
							.filter(_notes => {
								return _notes['show'] == 1
							})
							.map(_notes => {
								return _notes['text']
							})
						notes_reception = JSON.stringify(notes_reception)
					}

					if (typeof column_data[lead_id].meta.lead_notes_tco == 'object') {
						notes_tco = column_data[lead_id].meta.lead_notes_tco
							.filter(_notes => {
								return _notes['show'] == 1
							})
							.map(_notes => {
								return _notes['text']
							})
						notes_tco = JSON.stringify(notes_tco)
					}

					var temp = {
						name: column_data[lead_id].meta.patient_data.name,
						phone: column_data[lead_id].meta.patient_data.phone,
						email: column_data[lead_id].meta.patient_data.email,
						treatment: column_data[lead_id].meta.patient_data.treatment,
						clinic: column_data[lead_id].meta.patient_data.clinic,
						campaign: column_data[lead_id].meta.patient_data.campaign
							? column_data[lead_id].meta.patient_data.campaign
							: '',
						dentists: dentists,
						notes_reception: notes_reception,
						notes_tco: notes_tco,
						proposed:
							'£' +
							formatMoney(column_data[lead_id].meta.treatment_value.value, 2, '.', ','),
						billed: '£' + formatMoney(billed, 2, '.', ','),
					}

					var temp_arr = []

					for (var i in temp) {
						var _temp = temp[i]

						if (typeof _temp == 'array') {
							_temp = _temp.join('; ')
						} else if (typeof _temp == 'object') {
							_temp = Object.values(_temp).join('; ')
						}

						var reg = new RegExp('[\n|,|"]')

						if (_temp && _temp.match('/\r\n|\n|\r|,/gm')) {
						}

						var _t = _temp
							? '"' +
							  _temp.split('\n').join(' ').split('"').join(' ').split('#').join(' ') +
							  '"'
							: 'none'

						temp_arr.push(_t)
					}

					formatted_data.push(temp_arr)
				}

				var csvContent =
					'data:text/csv;charset=utf-8,name,phone,email,treatment,clinic,campaign,dentists,notes_reception,notes_tco,proposed,billed' +
					'\r\n' +
					formatted_data.map(e => e.join(',')).join('\r\n')

				var encodedUri = encodeURI(csvContent)
				var link = document.createElement('a')
				link.setAttribute('href', encodedUri)
				link.setAttribute('download', filename + '.csv')
				document.body.appendChild(link) // Required for FF

				link.click()
			},

			// fires when filter select changes
			run_filter_list: function (data) {
				this.filters[data.name] = data.val
			},

			run_search: function (search) {
				//console.log('run search');
				this.search_value = search.toLowerCase()
			},

			sort_by_date: function (lead_a, lead_b) {
				var date_lead_a = new Date(lead_a.post_modified)
				var date_lead_b = new Date(lead_b.post_modified)

				if (date_lead_a === date_lead_b) {
					return 0
				}
				return date_lead_a > date_lead_b ? -1 : 1
			},

			sort_by_date_added: function (lead_a, lead_b) {
				var date_lead_a = new Date(lead_a.post_date)
				var date_lead_b = new Date(lead_b.post_date)

				if (date_lead_a === date_lead_b) {
					return 0
				}
				return date_lead_a > date_lead_b ? -1 : 1
			},

			sort_by_sms: function (lead_a, lead_b) {
				if (
					(lead_a.show_message_alert_him &&
						lead_b.show_message_alert_him &&
						lead_b.show_message_alert &&
						lead_a.show_message_alert) ||
					(!lead_a.show_message_alert_him &&
						!lead_b.show_message_alert_him &&
						!lead_b.show_message_alert &&
						!lead_a.show_message_alert)
				) {
					return 0
				}
				if (lead_a.show_message_alert_him && !lead_b.show_message_alert_him) {
					return -1
				}
				if (!lead_a.show_message_alert_him && lead_b.show_message_alert_him) {
					return 1
				}
				if (lead_a.show_message_alert && !lead_b.show_message_alert) {
					return -1
				}
				if (!lead_a.show_message_alert && lead_b.show_message_alert) {
					return 1
				}
			},

			/**
			 * get filter data from cookies if exists
			 */
			update_filter_from_cookies: function () {
				var lead_list_filter = Cookie.get('lead_list_filter2')
				if (lead_list_filter) {
					this.filters = JSON.parse(lead_list_filter)
				}
			},

			// fires update action when daterange is changed
			update_leads_by_dates: function (data) {
				console.log(data)

				this.show_not_read_only = false
				this.show_overdue_only = false
				var vm = this
				data.get_previous_data = 0

				Cookie.set('list_data_settings', JSON.stringify(data))

				data.action = 'get_leads_by_dates'

				wait_block.show()

				jQuery.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					dataType: 'json',
					data: data,

					complete: function (xhr, textStatus) {
						//called when complete
						wait_block.hide()
					},

					success: function (data, textStatus, xhr) {
						console.log(data)

						vm.clear_filters()
						vm.leads = data.leads
						vm.filter = data.filter_data
					},

					error: function (xhr, textStatus, errorThrown) {
						console.log('error')
						console.log(errorThrown)
						console.log(xhr)
					},
				})
			},

			update_order_status_on_drag_cb: function (data) {
				console.log(data)

				var vm = this

				var index = this.leads.findIndex(el => {
					return data.item_id == el.ID
				})

				if (index < 0) {
					return
				}

				if (failed_stage_name.indexOf(this.leads[index].lead_stage) >= 0) {
					this.$set(this.leads[index], 'is_failed', 'yes')
				} else {
					this.$set(this.leads[index], 'is_failed', 'no')
				}

				if (converted_stages.indexOf(this.leads[index].lead_stage) >= 0) {
					this.$set(this.leads[index], 'is_converted', 'yes')
				} else {
					this.$set(this.leads[index], 'is_converted', 'no')
				}

				var fmt = new DateFormatter()
				var today = new Date()

				this.leads[index].post_modified = fmt.formatDate(today, 'Y-m-d H:i:s')

				var lead_stage_log2 = strip(this.leads[index].meta.lead_stage_log2)

				lead_stage_log2.push({
					stage: this.leads[index].lead_stage,
					date: fmt.formatDate(today, 'Y-m-d H:i:s'),
					by: theme_user_name,
				})

				this.$set(this.leads[index]['meta'], 'lead_stage_log2', lead_stage_log2)

				var data_post = {
					action: 'update_leads_list',
					post_id: this.leads[index].ID,
					list_id: this.leads[index].lead_stage,
				}

				if (!vm.leads[index]['meta'].reminder) {
					vm.$refs.alert_alarm.show = true
					vm.$refs.alert_alarm.index = index
					vm.$refs.alert_alarm.ID = vm.leads[index].ID
				}

				jQuery.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					dataType: 'json',
					data: data_post,
					complete: function (xhr, textStatus) {
						//called when complete
					},

					success: function (data, textStatus, xhr) {
						console.log(data)
						//console.groupEnd('---');
					},

					error: function (xhr, textStatus, errorThrown) {
						//console.log('error');
						//console.log(errorThrown);
						//console.groupEnd();
					},
				})
			},

			update_filters_selected: function (event) {
				console.log(event)

				var filters = Object.values(this.filters_selected)

				var index = filters.indexOf(event.val)

				if (index < 0) {
					filters.push(event.val)
				} else {
					filters.splice(index, 1)
				}

				this.$set(this, 'filters_selected', filters)

				Cookie.set('filters_selected', JSON.stringify(filters))
			},

			sort_leads: function (data) {
				if (data.val) {
					this.sortby = data.val
				}
			},

			update_reminder_cb: function (event) {
				this.$set(this.leads[event.index].meta, 'reminder', event.reminder)
			},

			resert_reminder_cb: function (event) {
				console.log(event)

				var vm = this
				this.$set(this.leads[event.index], 'lead_stage', 'New')

				var data_post = {
					action: 'update_leads_list',
					post_id: event.ID,
					list_id: '',
				}

				jQuery.ajax({
					url: WP_URLS.wp_ajax_url,
					type: 'POST',
					dataType: 'json',
					data: data_post,

					complete: function (xhr, textStatus) {},

					success: function (data, textStatus, xhr) {
						console.log(data)
						//console.groupEnd('---');
					},

					error: function (xhr, textStatus, errorThrown) {
						//console.log('error');
						//console.log(errorThrown);
						//console.groupEnd();
					},
				})
			},
		},
	})
}
