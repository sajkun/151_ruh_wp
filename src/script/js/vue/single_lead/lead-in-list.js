// if(jQuery('#single-lead-in-list').length){

// var assigned_dentists = {};
// var assigned_treatments = {};
// var specialists_data    = specialists_data;
// var specialists         = specialists;
// var lead_notes  = {};
// var lead_notes_tco  = {};
// var lead_files   = {};
// var lead_logs    = {};
// var phone_count  = 0;
// var message_count  = 0;


// single_lead = new Vue({
//     el: '#single-lead-in-list',

//     data: {
//       run_update_lead: false,
//       base_lead : {},
//       text_save_del : 'delete',
//       text_save_btn : 'save',
//       patient_data: {
//         name: '',
//         phone: '',
//         clinic: '',
//         treatment: '',
//         source: '',
//       },

//       treatment_value: {
//         billed: 0,
//         value     : 0,
//         terms     : '',
//         mounthly  : '',
//         treatment : [] ,
//         date_end : '',
//       },

//       treatment_coordinator: {
//         specialist: [],
//         reason: '',
//         consultation_date: '',
//         follow: '',
//       },

//       treatment_data: [],

//       notes       : [],
//       notes_tco       : [],
//       files       : [],
//       enquery_notes_count: 1,
//       tco_notes_count: 1,
//       logs        : [],

//       lead_data   : {
//           lead_id : "",
//           lead_stage : "",
//           user_id : "",
//           user_name : "",
//       },

//       note_text   : '',
//       note_text_tco  : '',
//       reminder    : '',
//       new_file    : '',
//       phones      : 0,
//       messages    : 0,
//       requre_save : false,
//       save_text           : 'Save Changes',
//       specialists_data    : {},
//       selected_specialist : false,
//       lead_stage: '',
//       show_confirmation_popup: false,
//       balance: 0,
//       lead_class: '', // converted failed opened
//       lead_type: 'Opened Lead' // Failed Lead Converted Lead
//     },

//     computed:{

//       overdue: function(){
//         var overdue = false;

//         if(!this.reminder){
//           return overdue;
//         }
//         var date = new Date();
//         var date_reminder = new Date(this.reminder);
//         return date_reminder < date;
//       },

//       enquery_notes_c: function(){
//         var notes = this.notes;
//         var notes_c = [];
//         var counter = 0;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1 && counter < this.enquery_notes_count){
//               note.key =  notes.length -1 - id;
//               notes_c.push(note);
//               counter++;
//            }
//         }

//         return notes_c;
//       },

//       enquery_notes_count_c: function(){
//         var counter = 0;
//         var notes = this.notes;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1){
//               counter++;
//            }
//         }

//         return counter;
//       },

//       tco_notes_c: function(){
//         var notes = this.notes_tco;
//         var notes_c = [];
//         var counter = 0;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1 && counter < this.tco_notes_count){
//               note.key =  notes.length -1 - id;
//               notes_c.push(note);
//               counter++;
//            }
//         }

//         return notes_c;
//       },

//       tco_notes_count_c: function(){
//         var counter = 0;
//         var notes = this.notes_tco;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1){
//               counter++;
//            }
//         }

//         return counter;
//       },



//       messages_left : function(){
//         return Math.max(0, 3 - this.messages);
//       },

//       phones_left : function(){
//         return Math.max(0, 3 - parseInt(this.phones));
//       },

//       phones_count: function(){
//         return parseInt(this.phones);
//       },

//       messages_count: function(){
//         return parseInt(this.messages);
//       },

//       file_is_prepared: function(){
//         return this.new_file.length > 0
//       },

//       files_updated: function(){
//         return this.files;
//       },

//       is_requre_save: function(){
//         return this.requre_save;
//       },

//       get_logs: function(){
//         return this.logs;
//       },

//       show_add_specialist_button: function(){
//         return !!this.selected_specialist;
//       },

//       visible_specialists: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown;
//       },

//       visible_specialists_tco: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show_tco){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown;
//       },


//       visible_specialists_show_select: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown.length > 0 ? 'hidden': '';
//       },


//       visible_specialists_show_select_tco: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show_tco){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown.length > 0 ? 'hidden': '';
//       },


//       get_treatment_value: function(){
//         return this.treatment_value.value;
//       },

//       get_billed_value: function(){
//         return this.treatment_value.billed;
//       },

//       get_terms_count: function(){
//         $return = 1;
//         switch(this.treatment_value.terms){
//           case '12 Months':
//              $return = 12;
//             break;
//           case '18 Months':
//              $return = 18;
//             break;
//           case '24 Months':
//              $return = 24;
//             break;
//           case '36 Months':
//              $return = 36;
//             break;
//           case '48 Months':
//              $return = 48;
//             break;
//           default:
//              $return = 1;
//             break;
//         }

//         return  $return;
//       },

//       monthly_payment: function(){
//         var billed = get_sum_from_price(this.get_billed_value);
//         var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
//         summ = summ.toFixed(2);
//         this.treatment_value.mounthly = summ;
//         return   '£'+ formatMoney(summ, 2, ".", ",");
//       },

//       c_dentists: function(){
//         var dentists = [];
//         for (s in this.treatment_coordinator.specialist){
//            if(this.treatment_coordinator.specialist[s])

//             dentists.push(this.treatment_coordinator.specialist[s]);
//         }

//         return dentists;
//       },

//       c_treatments: function(){
//         var treatments = [];
//         for (s in this.treatment_value.treatment){
//            if(this.treatment_value.treatment[s])

//             treatments.push(this.treatment_value.treatment[s]);
//         }

//         return treatments;
//       },
//     },


//     watch: {
//       treatment_data: function(val){
//       },

//       base_lead: function(){
//         var vm = this;

//         if(!vm.run_update_lead){
//           return;
//         }

//         var meta = [
//           'patient_data',
//           'treatment_value',
//           'treatment_coordinator',
//           // 'treatment_data',
//         ];

//         start_date = vm.base_lead.meta.start_date;

//         for(var id in meta) {
//           if('undefined' !== typeof(vm.base_lead) && 'undefined' !== typeof(vm.base_lead.meta[meta[id]]) && vm.base_lead.meta[meta[id]]){
//             vm[meta[id]] = vm.base_lead.meta[meta[id]];
//           }
//         }


//         vm.phones   = vm.base_lead.phone_count     || 0;
//         vm.messages = vm.base_lead.message_count   || 0;
//         vm.notes    = vm.base_lead.meta.lead_notes || [];
//         vm.notes_tco    = vm.base_lead.meta.lead_notes_tco || [];
//         vm.files    = vm.base_lead.meta.lead_files || [];
//         vm.reminder = vm.base_lead.meta.reminder   || '';
//         // specialists data

//         for(var id in this.specialists_data){
//           this.specialists_data[id].show  = vm.base_lead.meta['specialists_assigned'][this.specialists_data[id]['user_id']]
//           this.specialists_data[id].show_tco  = vm.base_lead.meta['specialists_assigned_tco'][this.specialists_data[id]['user_id']]
//         }

//         //lead type

//         if(vm.base_lead.is_converted === 'yes'){
//           this.lead_class = 'converted';
//           this.lead_type = 'Converted Lead';
//         }else if(vm.base_lead.is_failed === 'yes'){
//           this.lead_class = 'failed';
//           this.lead_type = 'Failed Lead';
//         }else{
//           this.lead_class = 'opened';
//           this.lead_type = 'Opened Lead';
//         }


//         this.lead_data = {
//           lead_id : vm.base_lead.ID,
//           lead_stage : vm.base_lead.meta.lead_stage,
//           user_id : theme_user_id,
//           user_name : theme_user_name,
//         };


//         var vm = this;

//        if(vm.base_lead.meta.treatment_data){
//           vm.treatment_data = vm.base_lead.meta.treatment_data;

//           Vue.nextTick(function(){

//             for(var num in vm.$refs['select_treatment']){
//                var props =  {
//                   icon: icons_selects['treatments'],
//                   isExpanded: '',
//                   isSelected: [],
//                   isHiddenSelect: true,
//                   isHiddenImitation: false,
//                   options: treatments,
//                   selected: vm.treatment_data[num].treatment
//                 };


//                 for( var t in props){
//                   vm.$refs['select_treatment'][num].set_value(t, props[t]);
//                 }
//                 vue_select_components.push(vm.$refs['select_treatment'][num]);
//             }


//             for(var num in vm.$refs['select_dentist']){
//                var props =  {
//                   icon: icons_selects['human'],
//                   isExpanded: '',
//                   isSelected: [],
//                   isHiddenSelect: true,
//                   isHiddenImitation: false,
//                   options: available_dentists,
//                   selected: vm.treatment_data[num].dentist
//                 };


//                 for( var t in props){
//                   vm.$refs['select_dentist'][num].set_value(t, props[t]);
//                 }
//                 vue_select_components.push(vm.$refs['select_dentist'][num]);
//             }

//             for(var num in vm.$refs['select_billed']){

//               var _value = '£' + formatMoney(vm.treatment_data[num].billed,2, '.',',');
//               var _value = vm.treatment_data[num].billed;
//               vm.$refs['select_billed'][num].set_value(_value);
//             }

//           });
//         }
//       },


//       note_text: function(){
//         this.$refs.note_textarea.style.height = '';
//         this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
//       },

//       note_text_tco: function(){
//         this.$refs.note_textarea_tco.style.height = '';
//         this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
//       },



//       'treatment_value.billed': function(val){

//         var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


//         this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

//         this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
//         this.balance = formatMoney(balance,2, '.',',');
//       },


//       'treatment_value.value': function(val){

//         var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


//         this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

//         this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
//         this.balance = formatMoney(balance,2, '.',',');
//       },

//       'treatment_value.terms': function(val){

//         var count = 0;

//         switch(val){
//           case '12 Months' :
//             count = 12;
//             break;
//           case '18 Months' :
//             count = 18;
//             break;
//           case '24 Months' :
//             count = 24;
//             break;
//           case '36 Months' :
//             count = 36;
//             break;
//           case '48 Months' :
//             count = 48;
//             break;
//         }

//         if(count > 0){
//           var date = new Date(date_start);
//           date.setMonth(date.getMonth() + count);

//           var month = (date.getMonth() < 9)? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) ;

//           var _date = date.getDate() < 10? '0' + date.getDate() : date.getDate();

//           var hours =  date.getHours() < 10? '0' + date.getHours() : date.getHours();

//           var minutes =  date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes();

//           var date_end = date.getFullYear() + '-' + month  + '-' + _date + ' ' + hours + ':'+ minutes + ':'+ '00';

//           this.treatment_value.date_end = date_end;
//         }else{
//           this.treatment_value.date_end = date_start;
//         }

//         posted_data = {
//           date: this.treatment_value.date_end,
//           lead_id: this.lead_data.lead_id,
//           action: 'save_lead_end_date',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//           },

//           error: function(xhr, textStatus, errorThrown) {}
//         });
//       },

//       'patient_data.name': function(){
//         jQuery('input[name=name]').removeClass('error');
//       },

//       'patient_data.phone': function(){
//         jQuery('input[name=phone]').removeClass('error');
//       },

//       'patient_data.email': function(){
//         jQuery('input[name=email]').removeClass('error');
//       },

//       'patient_data.clinic': function(value){
//         if('undefined' !== this.$refs.clinic_select){
//           this.$refs.clinic_select.selected = value;
//         }
//       },

//       'patient_data.treatment': function(value){
//         if('undefined' !== this.$refs.treatments_select){
//           this.$refs.treatments_select.selected = value;
//         }
//       },

//       'patient_data.source': function(value){
//         if('undefined' !== this.$refs.source_select){
//           this.$refs.source_select.selected = value;
//         }
//       },

//       'patient_data.campaign': function(value){
//         if('undefined' !== this.$refs.campaign_select){
//           this.$refs.campaign_select.selected = value;
//         }
//       },

//       'lead_data.lead_stage': function(value){
//         if('undefined' !== this.$refs.lead_stage_select2){
//           this.$refs.lead_stage_select2.selected = value;
//         }
//       },
//     },

//     created: function(){},

//     mounted: function(){
//       // if(this.run_update_lead){
//         this.init();
//       // }
//     },

//     methods: {
//       init: function(){
//         this.phones            = phone_count;
//         this.messages          = message_count;
//         this.files             = lead_files;
//         this.logs              = lead_logs;
//         this.specialists_data  = specialists_data;
//         this.init_select();
//         this.treatment_data_selects();
//       },

//       update_treatment_data: function(e, key){
//         if(typeof(e.val)  !== 'undefined'){
//           this.treatment_data[key][e.name] = e.val;

//           var total = 0;

//           for(var id in this.treatment_data){
//             total += get_sum_from_price(this.treatment_data[id].billed);
//           }

//           this.treatment_value.value =  '£' + formatMoney(total,2, '.',',');
//         }
//       },

//       add_treatment_dentist: function(){

//         this.treatment_data.push({
//           'treatment': '',
//           'dentist': '',
//           'billed' : 0,
//         })

//         var vm = this;
//         Vue.nextTick(function(){

//          var select_id = vm.treatment_data.length - 1;

//          var props =  {
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             icon: icons_selects['human'],
//             options: available_dentists,
//           };

//           for( var id in props){
//             vm.$refs['select_dentist'][select_id].set_value(id, props[id]);
//           }


//           vue_select_components.push(vm.$refs['select_dentist'][select_id]);


//          var props =  {
//             icon: icons_selects['treatments'],
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             options: treatments,
//           };

//           for( var id in props){
//             vm.$refs['select_treatment'][select_id].set_value(id, props[id]);
//           }

//           vue_select_components.push(vm.$refs['select_treatment'][select_id]);
//         })
//       },

//       price_to_value: function(ref){
//         var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;

//         switch(ref){
//           case 'price_input_field':
//             var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;
//             break;
//           case 'input_billed':
//             var summ = (!!this.treatment_value.billed)? this.treatment_value.billed : 0;
//             break;
//         }
//         summ = get_sum_from_price(summ);
//         this.$refs[ref].set_value(summ);
//       },

//       update_dates: function(){
//         // console.log(this);
//       },

//       value_to_price: function(ref){
//         switch(ref){
//           case 'price_input_field':
//             var summ = '£' + formatMoney(this.treatment_value.value,2, '.',',');
//             break;
//           case 'input_billed':
//             var summ = '£' + formatMoney(this.treatment_value.billed,2, '.',',');
//             break;
//         }
//          this.$refs[ref].set_value(summ);
//       },


//       treatment_data_selects: function(){
//         var vm = this;

//         var total = 0;

//         for(var id in vm.treatment_data){

//          var select_id = id;

//          var props =  {
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             icon: icons_selects['human'],
//             options: available_dentists,
//           };

//           for( var i in props){
//             vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
//           }


//          var props =  {
//             icon: icons_selects['treatments'],
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             options: treatments,
//           };

//           for( var i in props){
//             vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
//           }

//           var data = vm.treatment_data[id];
//           vm.$refs.select_dentist[id].set_value('selected', data['dentist']);
//           vm.$refs.select_treatment[id].set_value('selected', data['treatment']);
//           vm.$refs.select_billed[id].set_value( data['billed']);

//           total += get_sum_from_price(data['billed']);
//         }

//         vm.treatment_value.value = total;
//       },


//       init_select: function(){

//        var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//         };

//         if(jQuery(window).width()< 768){
//           props.isHiddenSelect = false;
//           props.isHiddenImitation =  true;
//         }

//         props.options = [
//           'Live Chat',
//           'Instagram',
//           'Slaine Instagram',
//           'Riz Instagram',
//           'Andy Instagram',
//           'Pete Instagram',
//           'Sonnie Instagram',
//           'Google PPC',
//           'Website',
//           'Phone',
//           "Walk In",
//           "Other"
//         ];

//         for( id in props){
//           this.$refs['source_select'].set_value(id, props[id]);
//         }

//         props.options = specialists;

//         for( id in props){
//           this.$refs['lead_specialissts_select'].set_value(id, props[id]);
//           this.$refs['lead_specialissts_select_tco'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['source_select']);
//         vue_select_components.push(this.$refs['lead_specialissts_select']);
//         vue_select_components.push(this.$refs['lead_specialissts_select_tco']);


//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: treatments,
//         };

//         for( id in props){
//           this.$refs['treatments_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['treatments_select']);
//         vue_select_components.push(this.$refs['treatments_select2']);

//         this.$refs['treatments_select'].resert_width();

//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: clinics,
//         };

//         for( id in props){
//           this.$refs['clinic_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['clinic_select']);

//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: campaigns,
//         };

//         for( id in props){
//           this.$refs['campaign_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['campaign_select']);


//        var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: stages,
//         };

//         for( id in props){
//           this.$refs['lead_stage_select2'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['lead_stage_select2']);
//       },

//       save_lead_meta: function(key_meta, key_this){
//         var vm = this;

//         var show = {};
//         var show_tco = {};

//         if(typeof(key_meta) !== 'string'){
//           var meta = {
//             patient_data          : this.patient_data,
//             treatment_data        : this.treatment_data,
//             treatment_value       : this.treatment_value,
//             treatment_coordinator : this.treatment_coordinator,
//             treatment_data        : this.treatment_data,
//             lead_notes            : this.notes,
//             lead_notes_tco        : this.notes_tco,
//             reminder              : this.reminder,
//           };
//         }else{
//           var  meta = {};
//           meta[key_meta] = this[key_this];
//         }

//         var posted_data = {
//           confirmed: 0,
//           meta: meta,
//           action                : 'update_lead_meta',
//           lead_data             : this.lead_data,
//           nonce                 : jQuery('[name=lead_data]').val(),
//         };

//         this.show_confirmation_popup = (this.lead_data.lead_id >=0 )? true : this.show_confirmation_popup ;


//         if(key_meta  === 'lead_notes' || key_meta  === 'lead_notes_tco' ){
//           this.show_confirmation_popup = false;
//         }

//         // console.log(this.lead_data);


//         if((!this.patient_data.name || !this.patient_data.phone || !this.patient_data.email) && this.lead_data.lead_id < 0){


//           if(!this.patient_data.phone){
//             jQuery('input[name=phone]').addClass('error');
//           }

//           if(!this.patient_data.name){
//             jQuery('input[name=name]').addClass('error');
//           }

//           if(!this.patient_data.email){
//             jQuery('input[name=email]').addClass('error');
//           }
//           return false;
//         }

//         var vm = this;

//         this.update_lead_in_list(editing_object);

//         wait_block.show();

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {

//             clog('saved');

//             if(data.reload){
//               location.href = data.url;
//               wait_block.show();
//             }
//             vm.$refs.lead_id_input.set_value(data.post_id);
//             jQuery('.button-create span').text('Save Changes');
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);

//               if(response_text.data[0] === 'name was found'){
//                 var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

//                 // console.log(confirm);

//                 if(confirm){
//                   posted_data.confirmed= 1;
//                   wait_block.show();
//                   vm.second_request(posted_data)
//                 }

//               }else{
//                 alert(response_text.data[0]);
//               }
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },


//       second_request: function(posted_data){
//         var vm = this;
//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//             vm.$refs.lead_id_input.set_value(data.post_id);
//             jQuery('.button-create span').text('Save Changes');
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               // console.log(xhr);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },

//       update_lead: function(data, key){


//         if('object' === typeof(data)){
//           if(key === 'treatment_coordinator' && data.name === 'specialist' ){
//             if('undefined' === typeof(this[key][data.name])){
//               this[key][data.name] = []
//             }

//             if(this[key][data.name].indexOf(data.val) < 0){
//               this[key][data.name].push(data.val);
//             }else{
//               var ind = this[key][data.name].indexOf(data.val);
//               this[key][data.name].splice(ind, 1);
//             }

//           }else if(key === 'treatment_value' && data.name === 'treatment' ){
//             if('undefined' === typeof(this[key][data.name])){
//               this[key][data.name] = []
//             }

//             if(this[key][data.name].indexOf(data.val) < 0){
//               this[key][data.name].push(data.val);
//             }else{
//               var ind = this[key][data.name].indexOf(data.val);
//               this[key][data.name].splice(ind, 1);
//             }
//           }else{
//             if('object' === typeof(this[key])){
//               var val = (data.name === 'value' && key == 'treatment_value')? (data.val) : data.val;
//               this[key][data.name] = val;
//             }
//             if('string' === typeof(this[key])){
//               this[key] = data.val;
//             }
//           }

//           this.requre_save = true;
//           var vm = this;

//           Vue.nextTick(function(){
//             vm.$forceUpdate();
//           });
//         }

//        // if(this.reminder){
//        //  jQuery('.clear-reminder').removeClass('hidden');
//        // }else{
//        //  jQuery('.clear-reminder').addClass('hidden');
//        // }
//       },

//       update_lead_stage: function(data, key){
//         this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
//         this.lead_data.lead_stage = data.val;
//       },

//       save_new_stage: function(){

//         if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
//           this.show_confirmation_popup = false;
//           return true;
//         }

//         var list_id_prev  = this.lead_data.lead_stage_prev;
//         var list_id       = this.lead_data.lead_stage ;
//         var user_name     = this.lead_data.user_name;
//         var user_id       = this.lead_data.user_id;
//         var post_id       = this.lead_data.lead_id;

//         this.update_lead_in_list(editing_object);

//         jQuery(document.body).trigger('update_lead_log', {
//           post_id: post_id,
//           list_id_prev: list_id_prev,
//           list_id_new: list_id,
//           user_name: user_name ,
//           user_id:   user_id ,
//           event: 'stage_changed'
//         });

//         jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

//         this.show_confirmation_popup = false;
//       },

//       do_delete_or_return: function(url){


//         if(parseInt(this.lead_data.lead_id) < 0){
//           wait_block.hide();
//           location.href = url;
//         }else{
//           var data = {
//             action  : 'delete_lead',
//             lead_id : parseInt(this.lead_data.lead_id),
//             nonce   : jQuery('[name=lead_data]').val(),
//             url     : url,
//           };

//         var vm = this;

//         if(!confirm('Are you sure you want to delete this lead?')){
//           return;
//         }

//         wait_block.show();

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//               for(var id in dashboard_leads_data){
//                 if(dashboard_leads_data[id].ID == editing_object){
//                   var index = dashboard_leads_data.indexOf(dashboard_leads_data[id]);

//                   dashboard_leads_data.splice(index, 1);

//                   vue_leads_list.init();
//                   console.log('init finished');
//                   break;
//                 }
//               }
//              vm.return_to_list();
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//         }
//       },

//       add_note: function(type){
//         // console.log(is_manager);
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//         if(!this.note_text && type == 'enquery'){
//           alert('Please enter some text');
//           return false;
//         }else  if(!this.note_text_tco && type == 'tco'){
//           alert('Please enter some text');
//           return false;
//         }

//         this.requre_save = true;

//         var date = new Date();

//         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

//         var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

//         var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + minutes;

//         var new_note = {
//           'date'       : date_formatted,
//           'user_name'  : this.lead_data.user_name,
//           'user_id'    : this.lead_data.user_id,
//           'text'       : this.note_text,
//           'is_manager' : is_manager,
//           'done'       : 'no',
//           'show'       : 1,
//         };


//         if(type == 'enquery'){
//           this.notes.push(new_note);
//           this.note_text = '';
//           this.$refs.note_textarea.style.height = '';
//           this.save_lead_meta('lead_notes', 'notes');
//         }else if (type =='tco'){
//           new_note.text = this.note_text_tco;
//           this.notes_tco.push(new_note);
//           this.note_text_tco = '';
//           this.$refs.note_textarea_tco.style.height = '';
//           this.save_lead_meta('lead_notes_tco', 'notes_tco');
//         }


//       },

//       delete_note: function(key , type){
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//        if(type == 'enquery'){
//           key = this.notes.length - key - 1;
//           this.notes[key].show = 0;
//           this.save_lead_meta('lead_notes', 'notes');
//         }
//        if(type == 'tco'){
//           key = this.notes_tco.length - key - 1;
//           this.notes_tco[key].show = 0;
//           this.save_lead_meta('lead_notes_tco', 'notes_tco');
//         }
//       },

//       mark_note_done: function(key, val, type){
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//         if(type == 'enquery'){
//           key = this.notes.length - key - 1;
//           this.notes[key].done = val;
//           this.save_lead_meta('lead_notes', 'notes');
//         }
//       },

//       update_specialists: function(event, type){
//         if('undefined' !== typeof(event.val) ){

//           if(this.lead_data.lead_id < 0){
//             alert('Create lead before assigning it to a specialist, please');
//             return false;
//           };
//           type = 'undefined' !== typeof(type)? type : 'enquery';

//           if(type == 'enquery'){


//             if(this.specialists_data[event.val].show === 'yes')
//               {
//                  return false;
//               };

//             this.specialists_data[event.val].show = 'yes';
//             this.save_specialists_meta();
//           }

//           if(type == 'tco'){


//             if(this.specialists_data[event.val].show_tco === 'yes')
//               {
//                  return false;
//               };

//             this.specialists_data[event.val].show_tco = 'yes';

//                this.save_specialists_meta();
//           }
//         }
//       },

//       assign_specialist: function(){
//         // this.selected_specialist = false;
//         // this.save_sepcialists_meta();
//       },

//       remove_specialist: function(name){
//         if(window.confirm("Confirm unassigning " + name + " from this lead")){
//           this.specialists_data[name].show = 'no';
//           this.specialists_data[name].show_tco = 'no';
//           this.save_specialists_meta();
//         }
//       },

//       save_specialists_meta: function(){
//         var meta     = {};
//         var meta_tco = {};

//         for(id in specialists_data){
//           meta[specialists_data[id].user_id] = specialists_data[id].show;
//         }
//         for(id in specialists_data){
//           meta_tco[specialists_data[id].user_id] = specialists_data[id].show_tco;
//         }



//         var data = {
//           meta: {
//             lead_specialists: meta,
//             lead_specialists_tco: meta_tco,
//           },
//           action                : 'update_lead_meta',
//           lead_data             : this.lead_data,
//           nonce                 : jQuery('[name=lead_data]').val(),
//         };

//        wait_block.show();


//         var vm = this;

//         this.update_lead_in_list(editing_object);

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             console.log('saved');
//             vm.$refs.lead_id_input.set_value(data.post_id);
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },


//       load_file: function(){
//         // console.log('load_file');

//         wait_block.show();

//         var file_pierces = this.$refs.file_input.value.split('\\');
//         var file_name = file_pierces[file_pierces.length-1];
//         var file = jQuery(this.$refs.file_input).prop('files')[0];
//         var fd   = new FormData();

//         var vm = this;

//         fd.append('file',file);
//         fd.append('lead_id',this.lead_data.lead_id);
//         fd.append('user_name',this.lead_data.user_name);
//         fd.append('action', 'upload_new_document');
//         fd.append('file_nonce',jQuery('[name=file_nonce]').val());
//         fd.append('_wp_http_referer',jQuery('[name=_wp_http_referer]').val());

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           processData: false,
//           contentType: false,
//           data: fd,

//           complete: function(xhr, textStatus) {
//             single_lead.new_file = '';
//             wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//             vm.files.push(data.file_data);
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//            }
//         })
//       },


//       remove_file: function(file_id){
//         var vm = this;

//         if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

//           var file_data = vm.files[file_id];

//           vm.files.splice(file_id, 1);

//           var data = {
//             file_data: file_data,
//             lead_id: vm.lead_data.lead_id,
//             user_name: vm.lead_data.user_name,
//             action: 'delete_file_from_lead',
//           };

//           jQuery.ajax({
//             url: WP_URLS.wp_ajax_url,
//             type: 'POST',
//             data: data,

//             complete: function(xhr, textStatus) {

//             },

//             success: function(data, textStatus, xhr) {
//               // console.log(data);
//             },

//             error: function(xhr, textStatus, errorThrown) {
//               if(xhr.status === 418){
//                 var response_text = JSON.parse(xhr.responseText);
//                 alert(response_text.data[0]);
//               }else{
//                 alert(xhr.status + ' ' +errorThrown);
//               }
//             }
//           })
//         }
//       },

//       file_changed: function(){
//         var file_pierces = this.$refs.file_input.value.split('\\');
//         var file_name = file_pierces[file_pierces.length-1];
//         this.new_file = file_name;
//       },

//       change_phone: function(action){
//         var phone = this.phones;

//         if(action === 'add'){
//           phone++;
//         }

//         if(action === 'remove'){
//           phone--;
//         }

//         this.phones = Math.min(3, phone);

//         var data = {
//           lead_id: this.lead_data.lead_id,
//           count: this.phones,
//           action: 'save_phones_count',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {

//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//            },

//           error: function(xhr, textStatus, errorThrown) {

//           }
//         })

//         // console.log('change_phone');
//       },

//       clear_reminder: function(){
//         this.reminder = '';
//         jQuery('[name=reminder]').val('');
//         jQuery('.clear-reminder').addClass('hidden');
//       },

//       change_message: function(action){
//         var messages = this.messages;
//         if(action === 'add'){
//           messages++;
//         }

//         if(action === 'remove'){
//           messages--;
//         }

//         this.messages = Math.min(3, messages);

//         // console.log('change_message');

//         var data = {
//           lead_id: this.lead_data.lead_id,
//           count:   this.messages,
//           action:  'save_messages_count',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {

//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//           },

//           error: function(xhr, textStatus, errorThrown) {

//           }
//         })
//       },


//       /**
//       * show single lead on click on a lead item on a list
//       */
//       show_single_lead: function(id){
//         console.log('cliked');
//         clog(id, 0 , 1);
//       },

//       return_to_list: function(){
//         var data =  {
//           base_lead : {},
//           text_save_del : 'delete',
//           text_save_btn : 'save',
//           patient_data: {
//             name: '',
//             phone: '',
//             clinic: '',
//             treatment: '',
//             source: '',
//           },

//           treatment_value: {
//             billed: 0,
//             value     : 0,
//             terms     : '',
//             mounthly  : '',
//             treatment : [] ,
//             date_end : '',
//           },

//           treatment_coordinator: {
//             specialist: [],
//             reason: '',
//             consultation_date: '',
//             follow: '',
//           },

//           treatment_data: [],

//           notes       : [],
//           notes_tco       : [],
//           files       : [],
//           enquery_notes_count: 1,
//           tco_notes_count: 1,
//           logs        : [],

//           lead_data   : {
//               lead_id : "",
//               lead_stage : "",
//               user_id : "",
//               user_name : "",
//           },

//           note_text   : '',
//           note_text_tco  : '',
//           reminder    : '',
//           new_file    : '',
//           phones      : 0,
//           messages    : 0,
//           requre_save : false,
//           save_text           : 'Save Changes',
//           specialists_data    : {},
//           selected_specialist : false,
//           lead_stage: '',
//           show_confirmation_popup: false,
//           balance: 0,
//           lead_class: '', // converted failed opened
//           lead_type: 'Opened Lead' // Failed Lead Converted Lead
//         };

//         for(var j in data){
//           this[j] = data[j];
//         }

//         this.run_update_lead = false;
//         vue_leads_list.show = true;
//       },

//       update_lead_in_list: function(lead_id){

//         for(var id in dashboard_leads_data){
//           if(dashboard_leads_data[id].ID == lead_id){
//             console.log(dashboard_leads_data[id]);

//             dashboard_leads_data[id].meta.patient_data = this.patient_data;
//             dashboard_leads_data[id].meta.treatment_coordinator = this.treatment_coordinator;
//             dashboard_leads_data[id].meta.treatment_coordinator = this.treatment_coordinator;
//             dashboard_leads_data[id].meta.treatment_data = this.treatment_data;
//             dashboard_leads_data[id].meta.treatment_value = this.treatment_value;
//             dashboard_leads_data[id].message_count         = this.messages;
//             dashboard_leads_data[id].phone_count           = this.phones;
//             dashboard_leads_data[id].meta.lead_files       = this.files;
//             dashboard_leads_data[id].meta.lead_notes       = this.notes;
//             dashboard_leads_data[id].meta.lead_notes_tco   = this.notes_tco;
//             dashboard_leads_data[id].meta.reminder       = this.reminder;



//             dashboard_leads_data[id].lead_stage        = this.lead_data.lead_stage;
//             dashboard_leads_data[id].meta.lead_stage       = this.lead_data.lead_stage;

//              dashboard_leads_data[id].is_failed =  dashboard_leads_data[id].meta.lead_stage === failed_stage_name? 'yes' : 'no';

//              dashboard_leads_data[id].is_converted =  converted_stages.indexOf(dashboard_leads_data[id].meta.lead_stage) >=0 ? 'yes' : 'no';



//             var date = new Date();
//             var month = (date.getMonth() + 1) < 10? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

//             var day = date.getDate() < 10? '0' + date.getDate() : date.getDate();
//             dashboard_leads_data[id].post_modified =
//               date.getFullYear() + '-' +
//               month + '-' +
//               day+ ' ' +
//               date.getHours() + ':' +
//               date.getMinutes() + ':' +
//               date.getSeconds();


//               var show = {};
//               var show_tco = {};

//               for (var j in  this.specialists_data){
//                 show[this.specialists_data[j].user_id ] = 'yes' === this.specialists_data[j].show ? 'yes' : 'no';
//                 show_tco[this.specialists_data[j].user_id ] = 'yes' === this.specialists_data[j].show_tco ? 'yes' : 'no';
//               }

//               dashboard_leads_data[id].meta.specialists_assigned = show;
//               dashboard_leads_data[id].meta.specialists_assigned_tco = show_tco;
//               break;
//           }
//         }


//         vue_leads_list.init();
//       },
//     },

// });

// }