Vue.component('comp-alert-alarm', {

  data: function(){
    return{
      reminder: '',
      show: false,
      ID: -1,
      index: -1,
    }
  },

  computed:{
    img_url:function(){
      return WP_URLS.theme_url + '/assets/images/svg/stop.svg';
    }
  },

  methods: {
    update_lead: function(event, name){
      this.reminder = event.val;
    },

    clear_reminder: function(){
      this.reminder = '';

      this.$refs.reminder.value = '';
    },

    close:function(){

      this.$emit('resert_reminder', { index: this.index, ID: this.ID});

      var vm = this;

      vm.show = false;
      vm.reminder = '';
      vm.ID = -1;
      vm.index = -1;
      vm.$refs.reminder.value = '';

      // this.$parent.$set(this.$parent.leads[this.index], 'lead_stage', 'New');

      // var data_post = {
      //   action : 'update_leads_list',
      //   post_id: this.ID,
      //   list_id: '',
      // };

      // jQuery.ajax({
      //   url: WP_URLS.wp_ajax_url,
      //   type: 'POST',
      //   dataType: 'json',
      //   data: data_post,

      //   complete: function(xhr, textStatus) {
      //     vm.show = false;
      //     vm.reminder = '';
      //     vm.ID = -1;
      //     vm.index = -1;
      //   },

      //   success: function(data, textStatus, xhr) {
      //     console.log(data);
      //     //console.groupEnd('---');
      //   },

      //   error: function(xhr, textStatus, errorThrown) {
      //     //console.log('error');
      //     //console.log(errorThrown);
      //     //console.groupEnd();
      //    }
      // });
    },

    save_reminder: function(){
      if(!this.reminder){
        return;
      }
       var vm = this;

      this.$emit('update_reminder', {'reminder': this.reminder, index: this.index});

      var meta = {
        reminder              : this.reminder,
      };

      var posted_data = {
        confirmed: 0,
        meta: {
          reminder              : this.reminder,
        },
        action                : 'update_lead_meta',
        lead_data             : { lead_id: this.ID },
      };

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
          vm.show = false;
          vm.reminder = '';
          vm.ID = -1;
          vm.index = -1;
          vm.$refs.reminder.value = '';
        },

        success: function(data, textStatus, xhr) {
           console.log(data);
        },

        error: function(xhr, textStatus, errorThrown) {
        },
      });



    },
  },


  template: `
    <div class="s-popup-wrapper" :class='{"shown": show}'>
      <div class="s-popup-large">
        <div class="s-popup-large__header">
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 16 15"><defs></defs><g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g clip-path="url(#clip-9A1E8388-719A-4D57-BE3B-1214B6B73F26)"><title>caution</title><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g></g></g></svg>

            Set Alarm
        </div>

        <div class="spacer-h-30"></div>

        <div class="text-center">
          <img :src="img_url">

          <div class="spacer-h-20"></div>

          <p class="s-popup-title">
          You haven’t set an <br> alarm for this lead.
          </p>

          <p class="s-popup-text">
           Alarms are mandatory when handling a lead. Please add an alarm so <br> you can stay on top of this enquiry.
          </p>

          <a href="#" class="reminder">
            <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
            <span class="label">Set Reminder</span>

            <datepicker2
              ref="reminder"
              v-on:input_value_changed="update_lead($event, 'reminder')"
              v-bind:class="'value'"
              v-bind:placeholder="'Mon d Y hh:mm'"
              _name="reminder"
               >
             </datepicker2>

            <span href="javascript:void(0)"
              v-if = "reminder"
              v-on:click="clear_reminder()"
              class="clear-reminder">clear</span>
          </a>
        </div>

        <div class="spacer-h-20"></div>

        <div class="s-popup-large__footer text-right">
           <a class="s-button-cancel" v-on:click="close">
             Cancel
           </a>
           <a class="s-button-save" :class="{'active' : reminder}"
            v-on:click="save_reminder"
           >
             Move Lead
           </a>
        </div>
      </div>
    </div>
  `
})