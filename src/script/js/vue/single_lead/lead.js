if('undefined' !== typeof(is_single_lead)){
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var default_sources = [
          'Live Chat',
          'Instagram',
          'Slaine Instagram',
          'Riz Instagram',
          'Andy Instagram',
          'Pete Instagram',
          'Sonnie Instagram',
          'Google PPC',
          'Website',
          'Phone',
          "Walk In",
          "Other"
        ];

  single_lead = new Vue({
    el: '#single-lead',

    mixins: [animation_mixin],

    data: {
      patient_data: {
        name: '',
        phone: '',
        email: '',
      },

      tco_data: tco_data,

      treatment_value: {
        billed    : 0,
        value     : 0,
        terms     : '',
        mounthly  : '',
        date_end : date_start,
      },

      treatment_coordinator: {
        specialist: Object.values(assigned_dentists),
      },

      treatment_data: treatment_data,

      notes       : [],
      notes_tco   : [],
      enquery_notes_count: 1,
      tco_notes_count: 1,
      files       : [],
      logs        : [],
      lead_data   : {},
      note_text   : '',
      note_text_tco    : '',
      reminder    : '',
      new_file    : '',
      phones      : 0,
      phones_tco  : 0,
      sms_tco     : 0,
      messages    : 0,
      messages_tco    : 0,
      requre_save : false,
      save_text           : 'Save Changes',
      specialists_data    : {},
      selected_specialist : false,
      lead_stage: '',
      show_confirmation_popup: false,
      balance: 0,
      message_to_client: '',
      sms_data: sms_data,
      text_messages: [],
      text_messages_to_show: 2,
      intial_load : true,
      deleting_lead : false,
    },

    computed:{
      text_messages_shown: function(){

        if(this.text_messages_to_show  == 2 && this.text_messages.length > 2){
          var messages = [];
          for(var i = 2; i > 0 ; i--){
          messages.push(this.text_messages[this.text_messages.length - i]);
          }
          return messages;
        }else{
          return this.text_messages;
        }
      },

      enquery_notes_c: function(){
        var notes = this.notes;
        var notes_c = [];
        var counter = 0;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.enquery_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      enquery_notes_count_c: function(){
        var counter = 0;
        var notes = this.notes;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      tco_notes_c: function(){
        var notes = this.notes_tco;
        var notes_c = [];
        var counter = 0;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.tco_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      tco_notes_count_c: function(){
        var counter = 0;
        var notes = this.notes_tco;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },


      messages_left : function(){
        return Math.max(0, 3 - this.messages);
      },

      phones_left : function(){
        return Math.max(0, 3 - parseInt(this.phones));
      },

      phones_count: function(){
        return parseInt(this.phones);
      },

      messages_count: function(){
        return parseInt(this.messages);
      },

      file_is_prepared: function(){
        return this.new_file.length > 0
      },

      files_updated: function(){
        return this.files;
      },

      is_requre_save: function(){
        return this.requre_save;
      },

      get_logs: function(){
        return this.logs;
      },

      show_add_specialist_button: function(){
        return !!this.selected_specialist;
      },

      visible_specialists: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show){
            shown.push(this.specialists_data[id]);
          }
        }

        return shown;
      },

      visible_specialists_tco: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show_tco){
            shown.push(this.specialists_data[id]);
          }
        }

        return shown;
      },


      visible_specialists_show_select: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show){
            shown.push(this.specialists_data[id]);
          }
        }
        return shown.length > 0 ? 'hidden': '';
      },

      visible_specialists_show_select_tco: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show_tco){
            shown.push(this.specialists_data[id]);
          }
        }
        return shown.length > 0 ? 'hidden': '';
      },


      get_treatment_value: function(){
        return this.treatment_value.value;
      },

      get_billed_value: function(){
        return this.treatment_value.billed;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.treatment_value.terms){
          case '12 Months':
             $return = 12;
            break;
          case '18 Months':
             $return = 18;
            break;
          case '24 Months':
             $return = 24;
            break;
          case '36 Months':
             $return = 36;
            break;
          case '48 Months':
             $return = 48;
            break;
          default:
             $return = 1;
            break;
        }

        return  $return;
      },

      monthly_payment: function(){
        var billed = get_sum_from_price(this.get_billed_value);
        var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
        summ = summ.toFixed(2);
        this.treatment_value.mounthly = summ;
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },

      c_dentists: function(){
        var dentists = [];
        for (s in this.treatment_coordinator.specialist){
           if(this.treatment_coordinator.specialist[s])

            dentists.push(this.treatment_coordinator.specialist[s]);
        }

        return dentists;
      },

      c_treatments: function(){
        var treatments = [];
        for (s in this.treatment_value.treatment){
           if(this.treatment_value.treatment[s])

            treatments.push(this.treatment_value.treatment[s]);
        }

        return treatments;
      },
    },

    watch: {
      text_messages_to_show: function(val){
        if(val > 2){
          Vue.nextTick(function(){
            jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
          })
        }
      },

      note_text: function(){
        this.$refs.note_textarea.style.height = '';
        this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
      },

      note_text_tco: function(){
        this.$refs.note_textarea_tco.style.height = '';
        this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
      },


      'treatment_value.billed': function(val){

        var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


        this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },


      'treatment_value.value': function(val){

        var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


        this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },

      'treatment_value.terms': function(val){

        var count = 0;

        switch(val){
          case '12 Months' :
            count = 12;
            break;
          case '18 Months' :
            count = 18;
            break;
          case '24 Months' :
            count = 24;
            break;
          case '36 Months' :
            count = 36;
            break;
          case '48 Months' :
            count = 48;
            break;
        }

        if(count > 0){
          var date = new Date(date_start);
          date.setMonth(date.getMonth() + count);

          var month = (date.getMonth() < 9)? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) ;

          var _date = date.getDate() < 10? '0' + date.getDate() : date.getDate();

          var hours =  date.getHours() < 10? '0' + date.getHours() : date.getHours();

          var minutes =  date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes();

          var date_end = date.getFullYear() + '-' + month  + '-' + _date + ' ' + hours + ':'+ minutes + ':'+ '00';

          this.treatment_value.date_end = date_end;
        }else{
          this.treatment_value.date_end = date_start;
        }

        posted_data = {
          date: this.treatment_value.date_end,
          lead_id: this.lead_data.lead_id,
          action: 'save_lead_end_date',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {}
        });
      },

      'patient_data.name': function(){
        jQuery('input[name=name]').removeClass('error');
      },

      'patient_data.phone': function(){
        jQuery('input[name=phone]').removeClass('error');
      },

      'patient_data.email': function(){
        jQuery('input[name=email]').removeClass('error');
      },
    },

    created: function(){},

    mounted: function(){
      this.phones = phone_count;
      this.phones_tco = parseInt(phone_count_tco);
      this.sms_tco = parseInt(sms_count_tco);
      this.messages = message_count;
      this.messages_tco = parseInt(message_count_tco);
      this.notes = lead_notes;
      this.notes_tco = lead_notes_tco;
      this.files = lead_files;
      this.logs  = lead_logs;
      this.specialists_data  = specialists_data;
      this.init_select();
      this.treatment_data_selects();
      var vm = this;

      if(vm.lead_data.lead_id >=0){
        vm.update_text_messages();
        setInterval(function(){
          console.log('check messages');
          vm.update_text_messages();
        },30000)
      }
    },

    methods: {
      update_treatment_data: function(e, key){
        if(typeof(e.val)  !== 'undefined'){
          this.treatment_data[key][e.name] = e.val;

          var total = 0;

          for(var id in this.treatment_data){
            total += get_sum_from_price(this.treatment_data[id].billed);
          }

          this.treatment_value.value =  '£' + formatMoney(total,2, '.',',');
        }
      },

      add_treatment_dentist: function(){

        this.treatment_data.push({
          'treatment': '',
          'dentist': '',
          'billed' : 0,
          'payment_method': ''
        });

        var vm = this;
        Vue.nextTick(function(){

         var select_id = vm.treatment_data.length - 1;


         // init dentists list
         var props =  {
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            icon: icons_selects['human'],
            options: available_dentists,
          };

          if(is_dentist === 'yes'){
            props['selected'] = dentist_name;
          }

          for( var id in props){
            vm.$refs['select_dentist'][select_id].set_value(id, props[id]);
          }


         // init treatments list
         var props =  {
            icon: icons_selects['treatments'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: treatments,
          };

          for( var id in props){
            vm.$refs['select_treatment'][select_id].set_value(id, props[id]);
          }

         var props =  {
            icon: icons_selects['currency'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: payment_methods,
          };

          for( var i in props){
            vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
          }



          vue_select_components.push(vm.$refs['select_dentist'][select_id]);
          vue_select_components.push(vm.$refs['select_treatment'][select_id]);
          vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
        })
      },

      price_to_value: function(ref){
        var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;

        switch(ref){
          case 'price_input_field':
            var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;
            break;
          case 'input_billed':
            var summ = (!!this.treatment_value.billed)? this.treatment_value.billed : 0;
            break;
        }
        summ = get_sum_from_price(summ);
        this.$refs[ref].set_value(summ);
      },

      update_dates: function(){
        // console.log(this);
      },

      value_to_price: function(ref){
        switch(ref){
          case 'price_input_field':
            var summ = '£' + formatMoney(this.treatment_value.value,2, '.',',');
            break;
          case 'input_billed':
            var summ = '£' + formatMoney(this.treatment_value.billed,2, '.',',');
            break;
        }
         this.$refs[ref].set_value(summ);
      },

      treatment_data_selects: function(){
        var vm = this;
        var total = 0;

        for(var id in vm.treatment_data){
         var select_id = id;
         var data = vm.treatment_data[id];

         var props =  {
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            icon: icons_selects['human'],
            options: available_dentists,
            selected: data['dentist'],
          };

          for( var i in props){
            vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
          }


          vue_select_components.push(vm.$refs['select_dentist'][select_id]);

         var props =  {
            icon: icons_selects['treatments'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: treatments,
            selected: data['treatment']
          };

          for( var i in props){
            vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
          }

          vue_select_components.push(vm.$refs['select_treatment'][select_id]);

         var props =  {
            icon: icons_selects['currency'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: payment_methods,
            selected: data['payment_method']? data['payment_method']: 'Payment Method',
          };

          for( var i in props){
            vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
          }


          vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
          vm.$refs.select_billed[select_id].set_value( data['billed']);


          total += get_sum_from_price(data['billed']);
        }

        vm.treatment_value.value = total;
      },


      init_select: function(){

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        if(jQuery(window).width()< 768){
          props.isHiddenSelect = false;
          props.isHiddenImitation =  true;
        }

        props.options = typeof(theme_leads_sources)!== 'undefined'? theme_leads_sources: default_sources;



        for( id in props){
          this.$refs['source_select'].set_value(id, props[id]);
        }

        props.options = specialists;

        for( id in props){
          this.$refs['lead_specialissts_select'].set_value(id, props[id]);
        }

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        props.options = specialists_tco;

        for( id in props){
          this.$refs['lead_specialissts_select_tco'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['source_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select_tco']);


        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
        };

        for( id in props){
          this.$refs['treatments_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['treatments_select']);
        vue_select_components.push(this.$refs['treatments_select2']);

        this.$refs['treatments_select'].resert_width();

        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: clinics,
        };

        for( id in props){
          this.$refs['clinic_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['clinic_select']);

        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: campaigns,
        };

        for( id in props){
          this.$refs['campaign_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['campaign_select']);


       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: stages,
        };

        for( id in props){
          this.$refs['lead_stage_select2'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['lead_stage_select2']);
      },

      save_lead_meta: function(key_meta, key_this){
        console.log('save_lead_meta');
        var vm = this;

        if (vm.deleting_lead){
          return;
        }

        if(typeof(key_meta) !== 'string'){
          var meta = {
            patient_data          : this.patient_data,
            treatment_data        : this.treatment_data,
            treatment_value       : this.treatment_value,
            treatment_coordinator : this.treatment_coordinator,
            lead_notes            : this.notes,
            lead_notes_tco        : this.notes_tco,
            reminder              : this.reminder,
            text_messages         : this.text_messages,
            tco_data              : this.tco_data,
          };
        }else{
          var  meta = {};
          meta[key_meta] = this[key_this];
        }

        var posted_data = {
          confirmed: 0,
          meta: meta,
          action                : 'update_lead_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        this.show_confirmation_popup = (this.lead_data.lead_id >=0 )? true : this.show_confirmation_popup ;

        var no_popup_keys = [
          'tco_data',
          'lead_notes',
          'lead_notes_tco',
          'text_messages',
        ];

        if(no_popup_keys.indexOf(key_meta) >=0 ){
          this.show_confirmation_popup = false;
        }


        if((!this.patient_data.name || !this.patient_data.phone || !this.patient_data.email) && this.lead_data.lead_id < 0){


          if(!this.patient_data.phone){
            jQuery('input[name=phone]').addClass('error');
          }

          if(!this.patient_data.name){
            jQuery('input[name=name]').addClass('error');
          }

          if(!this.patient_data.email){
            jQuery('input[name=email]').addClass('error');
          }
          return false;
        }

        var vm = this;

        var no_block_keys = [
          'text_messages',
          'tco_data',
        ];

       if( no_block_keys.indexOf(key_meta) < 0){
          wait_block.show();
        }

        console.log(posted_data);

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
             console.log(xhr);
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(posted_data);
            console.log(data);

            if(data.confirm){
               var confirm = window.confirm(data.confirm);

               if(!confirm){
                return;
               }
            }

            if(data.exist_leads){
              exist_popup.name  = posted_data.meta.patient_data.name;
              exist_popup.phone = posted_data.meta.patient_data.phone;
              exist_popup.email = posted_data.meta.patient_data.email;
              exist_popup.leads = data.leads;
              exist_popup.leads = data.leads;
              exist_popup.posted_data = posted_data;
              exist_popup.show = true;
              return;
            }

            if(data.reload){
              location.href = data.url;
              // wait_block.show();
            }

            if(data.post_id){

              vm.$refs.lead_id_input.set_value(data.post_id);
            }
            jQuery('.button-create span').text('Save Changes');
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);

              console.log(response_text);

              if(response_text.data[0] === 'name was found'){
                var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

                // console.log(confirm);

                if(confirm){
                  posted_data.confirmed= 1;
                  wait_block.show();
                  vm.second_request(posted_data)
                }

              }else{
                alert(response_text.data[0]);
              }
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },


      second_request: function(posted_data){
        console.log(posted_data);
        var vm = this;
        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            if(data.post_id){
              vm.$refs.lead_id_input.set_value(data.post_id);
            }
            jQuery('.button-create span').text('Save Changes');

            if(data.reload){
              location.href = data.url;
              // wait_block.show();
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              // console.log(xhr);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },

      update_lead: function(data, key){

        if('object' === typeof(data)){
          if(key === 'treatment_coordinator' && data.name === 'specialist' ){
            if('undefined' === typeof(this[key][data.name])){
              this[key][data.name] = []
            }

            if(this[key][data.name].indexOf(data.val) < 0){
              this[key][data.name].push(data.val);
            }else{
              var ind = this[key][data.name].indexOf(data.val);
              this[key][data.name].splice(ind, 1);
            }

          }else if(key === 'treatment_value' && data.name === 'treatment' ){
            if('undefined' === typeof(this[key][data.name])){
              this[key][data.name] = []
            }

            if(this[key][data.name].indexOf(data.val) < 0){
              this[key][data.name].push(data.val);
            }else{
              var ind = this[key][data.name].indexOf(data.val);
              this[key][data.name].splice(ind, 1);
            }
          }else{
            if('object' === typeof(this[key])){
              var val = (data.name === 'value' && key == 'treatment_value')? (data.val) : data.val;
              this[key][data.name] = val;
            }
            if('string' === typeof(this[key])){
              this[key] = data.val;
            }
          }

          this.requre_save = true;
          var vm = this;

          Vue.nextTick(function(){
            vm.$forceUpdate();
          });
        }

       if(this.reminder){
        jQuery('.clear-reminder').removeClass('hidden');
       }else{
        jQuery('.clear-reminder').addClass('hidden');
       }
      },

      update_lead_stage: function(data, key){
        this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
        this.lead_data.lead_stage = data.val;
      },

      save_new_stage: function(){

        if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
          this.show_confirmation_popup = false;
          return true;
        }

        var list_id_prev  = this.lead_data.lead_stage_prev;
        var list_id       = this.lead_data.lead_stage ;
        var user_name     = this.lead_data.user_name;
        var user_id       = this.lead_data.user_id;
        var post_id       = this.lead_data.lead_id;

        jQuery(document.body).trigger('update_lead_log', {
          post_id: post_id,
          list_id_prev: list_id_prev,
          list_id_new: list_id,
          user_name: user_name ,
          user_id:   user_id ,
          event: 'stage_changed'
        });

        jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

        this.show_confirmation_popup = false;
      },

      do_delete_or_return: function(url){
        this.deleting_lead = true;
        wait_block.show();

        if(parseInt(this.lead_data.lead_id) === -1){
          wait_block.hide();
          location.href = url;
        }else{
          var data = {
            action  : 'delete_lead',
            lead_id : parseInt(this.lead_data.lead_id),
            nonce   : jQuery('[name=lead_data]').val(),
            url     : url,
          };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
             clog(xhr)
          },

          success: function(data, textStatus, xhr) {
            if('undefined' != typeof(data.redirect)){
              window.close();
              // location.href = data.redirect;
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            clog(xhr);
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
        }
      },

      add_note: function(type){
        // console.log(is_manager);
        type = 'undefined' !== typeof(type)? type : 'enquery';

        if(!this.note_text && type == 'enquery'){
          alert('Please enter some text');
          return false;
        }else  if(!this.note_text_tco && type == 'tco'){
          alert('Please enter some text');
          return false;
        }

        this.requre_save = true;

        var date = new Date();

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

        var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

        var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + minutes;

        var new_note = {
          'date'       : date_formatted,
          'user_name'  : this.lead_data.user_name,
          'user_id'    : this.lead_data.user_id,
          'text'       : this.note_text,
          'is_manager' : is_manager,
          'done'       : 'no',
          'show'       : 1,
        };


        if(type == 'enquery'){
          this.notes.push(new_note);
          this.note_text = '';
          this.$refs.note_textarea.style.height = '';
          this.save_lead_meta('lead_notes', 'notes');
        }else if (type =='tco'){
          new_note.text = this.note_text_tco;
          this.notes_tco.push(new_note);
          this.note_text_tco = '';
          this.$refs.note_textarea_tco.style.height = '';
           this.save_lead_meta('lead_notes_tco', 'notes_tco');
        }


      },

      delete_note: function(key , type){
        type = 'undefined' !== typeof(type)? type : 'enquery';

       if(type == 'enquery'){
          key = this.notes.length - key - 1;
          this.notes[key].show = 0;
          this.save_lead_meta('lead_notes', 'notes');
        }
       if(type == 'tco'){
          key = this.notes_tco.length - key - 1;
          this.notes_tco[key].show = 0;
          this.save_lead_meta('lead_notes_tco', 'notes_tco');
        }
      },

      mark_note_done: function(key, val, type){
        type = 'undefined' !== typeof(type)? type : 'enquery';

        if(type == 'enquery'){
          key = this.notes.length - key - 1;
          this.notes[key].done = val;
          this.save_lead_meta('lead_notes', 'notes');
        }
      },

      update_specialists: function(event, type){
        if('undefined' !== typeof(event.val) ){

          if(this.lead_data.lead_id < 0){
            alert('Create lead before assigning it to a specialist, please');
            return false;
          };
          type = 'undefined' !== typeof(type)? type : 'enquery';

          if(type == 'enquery'){

            if(this.specialists_data[event.val].show === 'yes')
              {
                 return false;
              };

            this.specialists_data[event.val].show = 'yes';
            this.save_specialists_meta();
          }

          if(type == 'tco'){


            if(this.specialists_data[event.val].show_tco === 'yes')
              {
                 return false;
              };

            this.specialists_data[event.val].show_tco = 'yes';

               this.save_specialists_meta();
          }
        }
      },

      assign_specialist: function(){
        // this.selected_specialist = false;
        // this.save_sepcialists_meta();
      },

      remove_specialist: function(name){
        if(window.confirm("Confirm unassigning " + name + " from this lead")){
          this.specialists_data[name].show = 'no';
          this.specialists_data[name].show_tco = 'no';
          this.save_specialists_meta();

          // jQuery(document.body).trigger('update_lead_log', {
          //   post_id     : parseInt(this.lead_data.lead_id),
          //   nonce       : jQuery('[name=lead_data]').val(),
          //   user_name   : this.lead_data.user_name,
          //   user_id     : this.lead_data.user_id,
          //   event       : 'specialist_updated',
          //   text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
          // })
        }
      },

      save_specialists_meta: function(){
        var meta     = {};
        var meta_tco = {};

        for(id in this.specialists_data){
          meta[this.specialists_data[id].user_id] = this.specialists_data[id].show;
        }
        for(id in this.specialists_data){
          meta_tco[this.specialists_data[id].user_id] = this.specialists_data[id].show_tco;
        }

        var data = {
          meta: {
            lead_specialists: meta,
            lead_specialists_tco: meta_tco,
          },
          action                : 'update_lead_specialist_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        console.log(data);

        if(this.lead_data.lead_id < 0){
          alert(" Please save a lead before adding a specialist")
          return;
        }


        var vm = this;
        wait_block.show();

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();

             vm.$refs.lead_specialissts_select.set_value('selected', '')
          },

          success: function(data, textStatus, xhr) {
            console.log(data);

            if(data.post_id){
              vm.$refs.lead_id_input.set_value(data.post_id);
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },


      load_file: function(){
        // console.log('load_file');

        wait_block.show();

        var file_pierces = this.$refs.file_input.value.split('\\');
        var file_name = file_pierces[file_pierces.length-1];
        var file = jQuery(this.$refs.file_input).prop('files')[0];
        var fd   = new FormData();

        var vm = this;

        fd.append('file',file);
        fd.append('lead_id',this.lead_data.lead_id);
        fd.append('user_name',this.lead_data.user_name);
        fd.append('action', 'upload_new_document');
        fd.append('file_nonce',jQuery('[name=file_nonce]').val());
        fd.append('_wp_http_referer',jQuery('[name=_wp_http_referer]').val());

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          processData: false,
          contentType: false,
          data: fd,

          complete: function(xhr, textStatus) {
            single_lead.new_file = '';
            wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
            vm.files.push(data.file_data);
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
           }
        })
      },


      remove_file: function(file_id){
        var vm = this;

        if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

          var file_data = vm.files[file_id];

          vm.files.splice(file_id, 1);

          var data = {
            file_data: file_data,
            lead_id: vm.lead_data.lead_id,
            user_name: vm.lead_data.user_name,
            action: 'delete_file_from_lead',
          };

          jQuery.ajax({
            url: WP_URLS.wp_ajax_url,
            type: 'POST',
            data: data,

            complete: function(xhr, textStatus) {

            },

            success: function(data, textStatus, xhr) {
              // console.log(data);
            },

            error: function(xhr, textStatus, errorThrown) {
              if(xhr.status === 418){
                var response_text = JSON.parse(xhr.responseText);
                alert(response_text.data[0]);
              }else{
                alert(xhr.status + ' ' +errorThrown);
              }
            }
          })
        }
      },

      file_changed: function(){
        var file_pierces = this.$refs.file_input.value.split('\\');
        var file_name = file_pierces[file_pierces.length-1];
        this.new_file = file_name;
      },

      change_phone: function(action){
        var phone = this.phones;

        if(action === 'add'){
          phone++;
        }

        if(action === 'remove'){
          phone--;
        }

        this.phones = Math.min(3, phone);

        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.phones,
          action: 'save_phones_count',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      change_phone_tco: function(action){
        var vm= this;
        switch(action){
          case 'add':
           vm.phones_tco = 1;
           break;
          case 'remove':
           vm.phones_tco = 0;
           break;
        }

        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.phones_tco,
          action: 'save_phones_count_tco',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },

      change_message_tco: function(action){
        var vm= this;
        switch(action){
          case 'add':
           vm.messages_tco = 1;
           break;
          case 'remove':
           vm.messages_tco = 0;
           break;
        }


        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.messages_tco,
          action: 'save_messages_count_tco',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      clear_reminder: function(){
        this.reminder = '';
        jQuery('[name=reminder]').val('');
        jQuery('.clear-reminder').addClass('hidden');
      },

      change_message: function(action){
        var messages = this.messages;
        if(action === 'add'){
          messages++;
        }

        if(action === 'remove'){
          messages--;
        }

        this.messages = Math.min(3, messages);

        // console.log('change_message');

        var data = {
          lead_id: this.lead_data.lead_id,
          count:   this.messages,
          action:  'save_messages_count',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      /**
      * show single lead on click on a lead item on a list
      */
      show_single_lead: function(id){
        clog(id, 0 , 1);
      },

      close_tab: function(){
        window.close();
      },

      send_text_message: function(){
        var phone = this.patient_data.phone;
        var vm = this;



        if(!phone || phone.length < 4){
          alert('phone not set');
          return;
        }

        if(!this.message_to_client ){
          alert('Type a message, please');
          return;
        }

        if(!this.sms_data ){
          alert('Messaging center is not configured');
          return;
        }

        var data = {
          sms_data: this.sms_data,
          phone: phone,
          text: this.message_to_client,
        };


        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_send.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(e.error){
            alert(e.error);
          }else{
            var date = new Date();
            var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() ;

            var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

            var ant = date.getHours() > 12 ? 'pm' : 'am';

            var date_sent = months[date.getMonth()] + ' ' + day+ ' '+date.getFullYear() + ' '+ hours+':' + date.getMinutes() + ant;


            vm.text_messages.push({
              'body'      :  vm.message_to_client,
              'date_sent' : date_sent,
              'type'      : 'we',
              'status'    : 'sent',
            });

            vm.save_lead_meta('text_messages', 'text_messages');

            vm.message_to_client = '';

            Vue.nextTick(function(){
              jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
            })
          }
        })

        .fail(function() {
        })

        .always(function(e) {
          console.log(e);
        });
      },


      update_text_messages: function(){
        if (this.deleting_lead){
          return;
        }
        var phone = this.patient_data.phone;
        var vm = this;

        var data = {
          sms_data: this.sms_data,
          phone: phone,
        };

        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(e.error){
            alert(e.error);
          }else{

            if (vm.deleting_lead){
              return;
            }

            vm.text_messages = e.messages;
            vm.save_lead_meta('text_messages', 'text_messages');
            vm.intial_load = false;

            if(vm.text_messages.length < e.messages.length){
              if(! vm.intial_load ){
                var message = e.messages[e.messages.length-1];
              }
            }

          }
        })

        .fail(function() {
        })

        .always(function(e) {
          jQuery('._messages').removeClass('hidden');
          jQuery('.preloader-messages').addClass('hidden');
        });
      }
    },
  })
}

