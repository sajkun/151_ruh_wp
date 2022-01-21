Vue.component('comp-new-lead', {
  data: function(){
    return {
      visible: false,
      lead_data: {
        phone_count: 0,
        message_count: 0,
        phone_count_tco: 0,
        message_count_tco: 0,
        meta: {
          treatment_value: {
            billed    : 0,
            value     : 0,
            terms     : '',
            mounthly  : '',
            date_end : '',
          },

          reminder: '',
          specialists_assigned: false,
          specialists_assigned_tco: false,
          tco_data: {
            'digital' : false,
            'tco' : false,
            'dentist' : false,
            'attended' : false,
            'fta_cancelled' : false,
            'tax' : false,
          },

          patient_data: {
            name: '',
            phone: '',
            email: '',
            source: '',
            treatment: [''],
            clinic: '',
            campaign: '',
          },
          treatment_data: [],
        },
      },
      balance: 0,
      enquery_notes_count: 1,
      tco_notes_count: 1,
      text_messages_to_show: 2,
      note_text: '',
      note_text_tco : '',
      file_changed   : '',
      new_file  : '',
      specialists_data: specialists_data,
      requre_save: false,
      show_confirmation_popup: false,
      text_messages: false,
      message_to_client: '',
    };
  },

  watch: {
    show_confirmation_popup: function(){
      this.$refs.popup._stage = this.lead_data.lead_stage;
      this.$refs.popup.show_confirmation_popup = true;
    },

    text_messages_to_show: function(val){
      if(val > 2){
        Vue.nextTick(function(){
          jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
        })
      }
    },
    'lead_data.meta.patient_data.name': function(){
      jQuery('input[name=name]').removeClass('error');
    },

    'lead_data.meta.patient_data.phone': function(){
      jQuery('input[name=phone]').removeClass('error');
    },

    'lead_data.meta.patient_data.email': function(){
      jQuery('input[name=email]').removeClass('error');
    },

    note_text: function(){
      this.$refs.note_textarea.style.height = '';
      this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    note_text_tco: function(){
      this.$refs.note_textarea_tco.style.height = '';
      this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    visible: function(show){
      var vm = this;

      console.log('visible')

      if(show){
        this.treatment_data_selects();
        this.requre_save  = false;
      }else{
        this.enquery_notes_count  = 1;
        this.tco_notes_count  = 1;
        this.note_text  = '';
        this.note_text_tco   = '';
        this.files_updated   = '';
        this.file_changed     = '';
        this.specialists_data  = specialists_data;
        this.requre_save  = false;
        this.show_confirmation_popup  = false;

        var lead_data = {
            phone_count: 0,
            message_count: 0,
            phone_count_tco: 0,
            message_count_tco: 0,
            meta: {
              treatment_value: {
                billed    : 0,
                value     : 0,
                terms     : '',
                mounthly  : '',
                date_end : '',
              },

              reminder: '',
              specialists_assigned: false,
              specialists_assigned_tco: false,
              tco_data: {
                'digital' : false,
                'tco' : false,
                'dentist' : false,
                'attended' : false,
                'fta_cancelled' : false,
                'tax' : false,
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
              treatment_data: [],
            },
          };

          this.$set(this, 'lead_data', lead_data);
      }
    },


      'lead_data.meta.treatment_value.billed': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);


        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },


      'lead_data.meta.treatment_value.value': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);

        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },
  },

  computed: {
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

      file_is_prepared: function(){
        return this.new_file.length > 0
      },

      files_updated: function(){
        return this.lead_data.meta.lead_files;
      },

      get_treatment_value: function(){
        return this.lead_data.meta.treatment_value.value;
      },

      get_billed_value: function(){
        return this.lead_data.meta.treatment_value.billed;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.lead_data.meta.treatment_value.terms){
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
        this.lead_data.meta.treatment_value.mounthly = summ;
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },

      select_data: function(){
        return {
          clinics: clinics,
          sources: theme_leads_sources,
          campaigns: campaigns,
          treatments: treatments,
          specialists: specialists,
          specialists_tco: specialists_tco,
          payment_methods: payment_methods,
          available_dentists: available_dentists,
        };
      },

      lead_status:function(){
        if(this.lead_data.is_converted == 'yes'){
          return {
            text: 'Converted Lead',
            class: 'converted',
          }

        }else if (this.lead_data.is_failed == 'yes'){
          return {
            text: 'Failed Lead',
            class: 'failed',
          }
        }else{
          return {
            text: 'Opened Lead',
            class: 'opened',
          }
        }
      },

      messages_left : function(){
        return Math.max(0, 3 - this.lead_data.message_count);
      },

      phones_left : function(){
        return Math.max(0, 3 - parseInt(this.lead_data.phone_count));
      },

      phones_count: function(){
        return parseInt(this.lead_data.phone_count);
      },

      messages_count: function(){
        return parseInt(this.lead_data.message_count);
      },

      visible_specialists: function(){
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){

          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
              id = parseInt(_id);
             }
          }
        }

        if(id < 0){
          return [];
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return el.user_id == id});

        return data;
      },

      visible_specialists_tco: function(){
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){

          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              id = parseInt(_id);
             }
          }
        }

        if(id < 0){
          return [];
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return el.user_id == id});

        return data;
      },

      treatment_data  : function(){
        return this.lead_data.meta.treatment_data? this.lead_data.meta.treatment_data : [];
      },

      balance   : function(){
        return '';
      },

      enquery_notes_c: function(){
        var notes = this.lead_data.meta.lead_notes;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

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

      tco_notes_c : function(){
        var notes = this.lead_data.meta.lead_notes_tco;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

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

      enquery_notes_count_c: function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes;

        if(!notes){
          return counter;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      tco_notes_count_c : function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes_tco;

        if(!notes){
          return counter;
        }
        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      phones_tco: function(){
        return parseInt(this.lead_data.phone_count_tco);
      },

      messages_tco: function(){
         return parseInt(this.lead_data.message_count_tco);
      },

      patient_data : function(){
        return 0;
      },

      visible_specialists_show_select: function(){
        if(!this.lead_data.meta.specialists_assigned){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){

          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
              id = _id;
             }
          }
        }

        var _class =  parseInt(id) > 0? false: true;

        return _class;

      },

      visible_specialists_show_select_tco: function(){
        if(!this.lead_data.meta.specialists_assigned_tco){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){

          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              id = _id;
             }
          }
        }
        var _class =  parseInt(id) > 0? false: true;
        return _class;
      },
  },

  mounted: function(){
    var vm = this;

    Vue.nextTick(function(){
      vm.$forceUpdate();
    })
  },

  methods: {
    go_back_to_list: function(){
      this.visible = false;
      this.$parent.show_list = true;
    },


    add_enquery:function(){
      var treatments = Object.values(this.lead_data.meta.patient_data.treatment);
      treatments.push(' ');

      this.$set(this.lead_data.meta.patient_data, 'treatment',treatments);
    },



    update_treatment_data: function(e, key){
      if(typeof(e.val)  !== 'undefined'){
        this.lead_data.meta.treatment_data[key][e.name] = e.val;

        var total = 0;

        for(var id in this.lead_data.meta.treatment_data){
          total += get_sum_from_price(this.lead_data.meta.treatment_data[id].billed);
        }

        this.$set(this.lead_data.meta.treatment_value, 'value', '£' + formatMoney(total,2, '.',','));

        this.requre_save = true;
      }
    },

    add_treatment_dentist: function(){
      this.lead_data.meta.treatment_data.push({
        'treatment': '',
        'dentist': '',
        'billed' : 0,
        'payment_method': ''
      });

      var vm = this;
      Vue.nextTick(function(){

       var select_id = vm.lead_data.meta.treatment_data.length - 1;

        if(is_dentist === 'yes'){
          vm.$refs['select_dentist'][select_id].set_value('selected', dentist_name);
        }
      })

      this.requre_save = true;
    },

    price_to_value: function(ref){
      var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;

      switch(ref){
        case 'price_input_field':
          var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;
          break;
        case 'input_billed':
          var summ = (!!this.lead_data.meta.treatment_value.billed)? this.lead_data.meta.treatment_value.billed : 0;
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
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.value,2, '.',',');
          break;
        case 'input_billed':
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.billed,2, '.',',');
          break;
      }
       this.$refs[ref].set_value(summ);
    },

    treatment_data_selects: function(){
      var vm = this;
      var total = 0;

      if(!vm.lead_data.meta.treatment_data){
      }

      for(var id in vm.lead_data.meta.treatment_data){
       var select_id = id;
       var data = vm.lead_data.meta.treatment_data[id];

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

      if(!vm.lead_data.meta.treatment_value){
        vm.$set(vm.lead_data.meta, 'treatment_value', {});
      }
       vm.$set(vm.lead_data.meta.treatment_value, 'value', total);
    },

    change_stage_popup_cb:function(data){
      this.lead_data.lead_stage = data.stage;
    },

    save_lead_meta: function(key_meta, key_this){
      var vm = this;

      var meta = {
        patient_data          : this.lead_data.meta.patient_data,
        treatment_data        : this.lead_data.meta.treatment_data,
        treatment_value       : this.lead_data.meta.treatment_value,
        treatment_coordinator : this.lead_data.meta.treatment_coordinator,
        lead_notes            : this.lead_data.meta.lead_notes,
        lead_notes_tco        : this.lead_data.meta.lead_notes_tco,
        reminder              : this.lead_data.meta.reminder,
        text_messages         : this.lead_data.meta.text_messages,
        tco_data              : this.lead_data.meta.tco_data,
      };


      var posted_data = {
        confirmed: 0,
        meta: meta,
        action                : 'update_lead_meta',
        lead_data             : { lead_id: -1 },
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      if( !this.lead_data.meta.patient_data.name || !this.lead_data.meta.patient_data.phone || !this.lead_data.meta.patient_data.email || !this.lead_data.meta.patient_data.treatment ){

        if(!this.lead_data.meta.patient_data.phone){
          jQuery('input[name=phone]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.name){
          jQuery('input[name=name]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.email){
          jQuery('input[name=email]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.treatment){
          this.$refs.treatments_select.$el.classList.add('error')
        }


        return false;
      }

      var vm = this;
      wait_block.show();
      var fmt = new DateFormatter();
      var today = new Date();

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
           vm.requre_save = false;
        },

        success: function(data, textStatus, xhr) {

          if(data.exist_leads){
            vm.$refs.exist_popup.name  = posted_data.meta.patient_data.name;
            vm.$refs.exist_popup.phone = posted_data.meta.patient_data.phone;
            vm.$refs.exist_popup.email = posted_data.meta.patient_data.email;
            vm.$refs.exist_popup.leads = data.leads;
            vm.$refs.exist_popup.leads = data.leads;
            vm.$refs.exist_popup.posted_data = posted_data;
            vm.$refs.exist_popup.show = true;

            for(var lead of data.leads){
              var lead_id = lead.ID;
              var index = vm.$parent.leads.findIndex(el =>{
                return lead_id == el.ID;
              })

              if(index < 0){
                vm.$parent.leads.push(lead)
              }

            }
            return;
          }

          if(data.post_id > 0){
            vm.$parent.add_leads(data.new_leads);
            vm.visible = false;
            Vue.nextTick(function(){
              vm.$parent.open_lead_cb({lead_id: data.post_id});
            });
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);

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

    open_lead_cb: function(data){
      var vm = this;
       vm.visible = false;
       Vue.nextTick(function(){
         vm.$parent.open_lead_cb(data);
       });
    },

    exec_second_request : function(data){
      var vm = this;
      var posted_data = strip(data.posted_data);
      posted_data.confirmed= 1;
      wait_block.show();
      vm.second_request(posted_data)
    },

    second_request: function(posted_data){
      var vm = this;
      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
           if(data.post_id > 0){
             vm.$parent.add_leads(data.new_leads);
             vm.visible = false;
             Vue.nextTick(function(){
               vm.$parent.open_lead_cb({lead_id: data.post_id});
             });
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

    update_lead: function(data, key, id){

      if('object' === typeof(data)){
        if(key === 'treatment_coordinator' && data.name === 'specialist' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }

          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }

        }else if(key === 'treatment_value' && data.name === 'treatment' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }
          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }
        }else if(data.name === 'treatment' ){
          this.$set(this.lead_data.meta[key][data.name], id, data.val);
        }else{
          if('object' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta[key], data.name, data.val);
          }
          if('string' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta, key, data.val);
          }
        }

        this.requre_save = true;
        var vm = this;

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
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
      var post_id       = this.lead_data.ID;

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
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(!this.note_text && type == 'enquery'){
        alert('Please enter some text');
        return false;
      }else  if(!this.note_text_tco && type == 'tco'){
        alert('Please enter some text');
        return false;
      }

      var date = new Date();
      var fmt  = new DateFormatter();
      var date_formatted =  fmt.formatDate(date, 'F d Y') + ' at ' + fmt.formatDate(date, 'H:i');

      var new_note = {
        'date'       : date_formatted,
        'user_name'  : this.lead_data.user_name,
        'user_id'    : this.lead_data.user_id,
        'text'       : (type== 'enquery')? this.note_text : this.note_text_tco,
        'is_manager' : is_manager,
        'done'       : 'no',
        'show'       : 1,
      };

      if(type == 'enquery'){

        if(!this.lead_data.meta.lead_notes){
          this.$set(this.lead_data.meta, 'lead_notes', []);
        }

        this.lead_data.meta.lead_notes.push(new_note);
        this.note_text = '';
        this.$refs.note_textarea.style.height = '';
      }else if (type =='tco'){

        if(!this.lead_data.meta.lead_notes_tco){
          this.$set(this.lead_data.meta, 'lead_notes_tco', []);
        }

        this.lead_data.meta.lead_notes_tco.push(new_note);
        this.note_text_tco = '';
        this.$refs.note_textarea_tco.style.height = '';
      }
    },

    delete_note: function(key , type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

     if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].show = 0;
      }
     if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].show = 0;
      }
    },

    mark_note_done: function(key, val, type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].done = val;
      }
      if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].done = val;
      }
    },

    update_specialists: function(event, type){
      if('undefined' !== typeof(event.val) ){
        if(this.lead_data.ID < 0){
          alert('Create lead before assigning it to a specialist, please');
          return false;
        };

        var data =  Object.values(specialists_data).filter(el =>{
          return el.name == event.val})[0];

        switch(type){
          case 'tco':
          this.lead_data.meta.specialists_assigned_tco[data.user_id] = 'yes';
            break;
          default:
            this.lead_data.meta.specialists_assigned[data.user_id] = 'yes';
            break;
        };
      };
    },

    assign_specialist: function(){
      // this.selected_specialist = false;
      // this.save_sepcialists_meta();
    },

    remove_specialist: function(name){
      if(window.confirm("Confirm unassigning " + name + " from this lead")){
          var ids = this.visible_specialists.map(el=>{return el.user_id});

          for( var id of ids){
            this.lead_data.meta.specialists_assigned[id] = 'no';
            this.lead_data.meta.specialists_assigned_tco[id] = 'no';
          }

        // this.specialists_data[name].show = 'no';
        // this.specialists_data[name].show_tco = 'no';
        // this.save_specialists_meta();

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

      for(id in specialists_data){
        meta[specialists_data[id].user_id] = specialists_data[id].show;
      }
      for(id in specialists_data){
        meta_tco[specialists_data[id].user_id] = specialists_data[id].show_tco;
      }

      var data = {
        meta: {
          lead_specialists: meta,
          lead_specialists_tco: meta_tco,
        },
        action                : 'update_lead_meta',
        lead_data             : this.lead_data,
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      var vm = this;
      wait_block.show();

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
          vm.$refs.lead_id_input.set_value(data.post_id);
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
      fd.append('lead_id',this.lead_data.ID);
      fd.append('user_name','unknown');
      fd.append('action', 'upload_new_document');

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        processData: false,
        contentType: false,
        data: fd,

        complete: function(xhr, textStatus) {
          vm.new_file = '';
          wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          vm.lead_data.meta.lead_files.push(data.file_data);
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

    do_file_changed: function(){
      var file_pierces = this.$refs.file_input.value.split('\\');
      var file_name = file_pierces[file_pierces.length-1];
      this.new_file = file_name;

      console.log(file_name)
    },

    change_phone: function(action){
      var phone = this.lead_data.phone_count;

      if(action === 'add'){
        phone++;
      }

      if(action === 'remove'){
        phone--;
      }

      phone = Math.max(0, phone);
      this.lead_data.phone_count = Math.min(3, phone);


      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.phone_count,
        action: 'save_phones_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
         },
      })
    },


    change_message: function(action){
      var messages = this.lead_data.message_count;
      if(action === 'add'){
        messages++;
      }

      if(action === 'remove'){
        messages--;
      }

      messages = Math.max(0, messages);
      this.lead_data.message_count = Math.min(3, messages);


      var data = {
        lead_id: this.lead_data.ID,
        count:   this.lead_data.message_count,
        action:  'save_messages_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
        },
      })
    },

    change_phone_tco: function(action){
      var vm= this;
      switch(action){
        case 'add':
         vm.lead_data.phone_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.phone_count_tco = 0;
         break;
      }

      var data = {
        lead_id: vm.lead_data.ID,
        count: vm.lead_data.phones_tco,
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
         vm.lead_data.message_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.message_count_tco = 0;
         break;
      }


      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.message_count_tco,
        action: 'save_messages_count_tco',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {

        },
      })
    },


    clear_reminder: function(){
      this.lead_data.meta.reminder = '';
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



  template: '#lead-new-tmpl',

})