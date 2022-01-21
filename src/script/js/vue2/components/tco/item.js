Vue.component('item-tco', {
	data: function () {
		return {
			info: {},
		}
	},

	props: ['_info'],

	watch: {
		_info: function (val) {
			this.info = val
		},
	},

	beforeMount: function () {
		this.info = this._info
		// console.log(strip(this.info));
	},

	computed: {
		name: function () {
			return this.info.meta.patient_data.name
		},

		is_online_journey: function () {
			return this.info?.meta?.online_journey
		},

		time_passed: function () {
			var now = new Date()
			var date_received = new Date(this.info.post_date)

			return date_difference.construct(date_received, now) + ' ago'
		},

		source_text: function () {
			if (this.info.meta.patient_data.treatment[0]) {
				return this.info.meta.patient_data.treatment[0]
			} else if (this.info.meta.patient_data.campaign) {
				return this.info.meta.patient_data.campaign
			} else if (this.info.meta.patient_data.source) {
				return this.info.meta.patient_data.source
			}
		},

		overdue: function () {
			var now = new Date()
			var reminder_date = new Date(this.info.meta.reminder)
			return this.info.meta.reminder !== '' && now > reminder_date ? 'yes' : 'no'
		},
	},

	methods: {
		open_lead: function (data) {
			this.$emit('open_lead', { lead_id: data })
		},
	},

	template: `
    <div class="lead-preview" v-on:click = 'open_lead(info.ID)'>
     <div class="clearfix">
      <div class="row justify-content-start">
        <div class="col-7">
         <span class="lead-preview__name" v-bind:title="name">{{name}}</span>
         <span class="lead-preview__icons">
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden" width="12" height="12" viewBox="0 0 12 12"><g><g><g><path fill="#2196f3" d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/></g><g><path fill="#fafafa" d="M8.85 4.803l-3.319 3.06a.532.532 0 0 1-.36.137.532.532 0 0 1-.362-.138l-1.66-1.53a.444.444 0 0 1 0-.665.541.541 0 0 1 .723 0L5.17 6.864l2.958-2.726a.541.541 0 0 1 .722 0c.2.184.2.481 0 .665z"/></g></g></g></svg>
         </span>
        </div>

        <div class="col-5">
         <span class="lead-preview__time" v-bind:title="time_passed">{{time_passed}}</span>
        </div>
      </div>
     </div>
       <div class="clearfix">
         <span class="lead-preview__sourse">{{source_text}}</span>
          <span class="list-counters">

            <svg v-if="is_online_journey"  class="icon svg-inline-camera" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.2 2.09L10 5.72V3c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V9.28l5.2 3.63c.33.23.8 0 .8-.41v-10c0-.41-.47-.64-.8-.41z"></path></svg>


            <svg class="icon svg-icon-bell" v-if="info.meta.reminder != '' && overdue == 'yes'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>


            <svg class="icon svg-icon-bell green" v-if="info.meta.reminder != '' && overdue == 'no'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

            <i class="icon-message-phone phone-na" v-if="info.phone_count_tco == 0"></i>
            <i class="icon-message-phone phone-ok" v-else="info.phone_count_tco > 0"></i>
            <i class="icon-message-phone message-na" v-if="info.message_count_tco == 0"></i>
            <i class="icon-message-phone message-ok" v-else="info.message_count_tco > 0"></i>

            <i class="icon-message-phone" v-if="info.show_message_alert && !info.meta.disable_sms">
                <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#3354f6" fill-opacity="1"></path></g></g></svg>
             </i>
             <i class="icon-message-phone" v-if="info.show_message_alert_him && !info.meta.disable_sms">
               <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g>
             </i>

             <i class="icon-message-phone" v-if="(info.show_message_alert_him || info.show_message_alert) && info.meta.disable_sms">
               <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#ccc" fill-opacity="1"></path></g></g>
             </i>
          </span>
       </div>
    </div>
  `,
})
