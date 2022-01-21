
var overdue_timeout;
var date_start;


Vue.directive('min-height', {

  componentUpdated: function (el, binding, vnode) {
    el.setAttribute("style", "min-height:" +binding.value + 'px');
  },
});

if('undefined' !== typeof(is_lead_list)){

  vue_leads_list = new Vue({
    el: '#leads-list',

    mixins: [animation_mixin],

    data:{
      height_value: 0,
      scroll_height: 0,
      show         : true,

      single_lead: {
        lead: false,
        new:  false,
      },

      overdue_checked: false,
      not_overdue_checked: false,
      overdue_only_checked: false,
      show_not_read_only: false,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sources',
        team:       'All Team',
        dentists:   'All Dentists',
      },

      filter_options:{
        clinics:    [],
        treatments: [],
        campaigns:  [],
        sources:    [],
        team:       [],
        dentists:   [],
      },

      by_phones : [],
      by_phones_data : {},

      search_value: '',

      unread_messages: 0,

      leads:{},

      sortby: 'Sort By',
    },

    computed:{
      get_convertion: function(){
        var vm = this;

        return function (col_id) {
          var leads_total = 0;
          var leads_column_total = 0;
          var column_number = stages.indexOf(col_id);

          if(col_id == failed_lead_name ){
            for(id in this.leads_filtered){
              leads_total += this.leads_filtered[id].length;
            }
          }else{
            for(var i = 0 ; i <= column_number; i++){
              var _col_id = stages[i];
              leads_total +=(_col_id != failed_lead_name && 'undefined' !== typeof(this.leads_filtered[_col_id]))? this.leads_filtered[_col_id].length : 0;
            }
          }

          if('undefined' !== typeof(this.leads_filtered[col_id]) && leads_total > 0){
              leads_column_total = this.leads_filtered[col_id].length;

              var val = (leads_column_total/leads_total)*100;
              return val.toFixed(2);

          }else{
            return 0;
          }
        }
      },

      get_scroll_height: function(){
        return this.scroll_height;
      },

      get_leads_total: function(){
        return function(col_id){
          if(col_id == 'all'){
            var leads_total = 0;

            for(id in this.leads_filtered){
              leads_total += this.leads_filtered[id].length;
            }

            return leads_total;
          }else{
            if('undefined' !== typeof(this.leads_filtered[col_id])){
              return this.leads_filtered[col_id].length;
            }else{
              return 0;
            }
          }
        }
      },

      /**
      * gets array of leads that matches current filter set
      *
      */
      leads_filtered: function(){

        var leads_filtered = {};
        var filters = {};
        var unread_messages = 0;

        for(var column_name in this.leads ){
          leads_filtered[column_name] = [];
        }

        for(var filter_name in this.filters){
         if(this.filters[filter_name].search('All') !== 0){
            filters[filter_name] = this.filters[filter_name];
          }
        }

        for(var column_name in this.leads){
          var fields_search = ['name', 'phone', 'email'];

          for(var id in this.leads[column_name]){
            var lead     = this.leads[column_name][id];
            var is_match = true;

            // apply filter
            for(filter_id in filters){
              //console.log(filter_id);
              switch(typeof(lead.filter_data[filter_id])){
                case 'object':
                  is_match = (lead.filter_data[filter_id].indexOf(filters[filter_id]) < 0)? false : is_match;
                 break;

                default:
                  is_match = (filters[filter_id] !== lead.filter_data[filter_id])? false : is_match;
                 break;
              }
            }

            // apply search
            if(this.search_value){
              var search_match = false;

              for(field in lead){

                if(fields_search.indexOf(field) < 0) continue;
                 var value  = lead[field];
                 var _found = exists_in_object(value, this.search_value);

                 search_match = (_found)? true : search_match;
              }

              is_match = search_match && is_match;
            }

            //apply overdue
            if(this.not_overdue_checked){
              is_match = is_match && (lead.reminder && lead.overdue != 'yes');
            }

            if(this.overdue_only_checked){
              is_match = is_match && (lead.reminder && lead.overdue == 'yes');
            }

            var phone = lead.base_lead.meta.patient_data.phone;

            if('undefined' != typeof(this.by_phones_data[phone])){
              var msgs =  this.by_phones_data[phone];
              var type = msgs[msgs.length - 1].type;

              lead.show_message_alert_him = type === 'him' ? true: false; // by him
              lead.show_message_alert = type === 'him' ? false: true; // by us
            }


            if(this.show_not_read_only){
              is_match = is_match && lead.show_message_alert_him;
            }

            if(is_match){
               unread_messages =  lead.show_message_alert_him ? unread_messages + 1: unread_messages;
            }

            if(is_match){
              leads_filtered[column_name].push(lead);
            }

            this.unread_messages = unread_messages;
          }
        }

       switch(this.sortby){
          case 'Recent Messages':
            for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_sms);
            }
            break;
          case 'Date Added':
           for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_date_added);
            }
            break;
          case 'Recently Updated':
           for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_date);
            }
            break;
        }

        return leads_filtered;
      },

      unread_messages_calc: function(){
        return this.unread_messages;
      },

      show_filter_clear_btn: function(){
        var show = false;
        for(var filter_name in this.filters){
          show = (this.filters[filter_name] !== dashboard_filter_data[filter_name][0])? true: show;
        }

        return show ? '' : 'visuallyhidden';
      },

      alarms: function(){
        var alarms = 0;
        var overdue = 0;

        for(col_id in this.leads_filtered){
          for(id in this.leads_filtered[col_id]){
            var lead = this.leads_filtered[col_id][id];
            alarms = (lead.reminder && 'yes' != lead.overdue)? alarms+1 : alarms;
            overdue = (lead.reminder && 'yes' === lead.overdue)? overdue+1 : overdue;
          }
        }

        if(alarms === 0){
          this.overdue_checked = false;
        }

        return {
           total: alarms,
           overdue: overdue,
           class: (alarms > 0)? '' : 'visuallyhidden',
           class_overdue: (overdue > 0)? '' : 'visuallyhidden',
         };
      },
    },

    watch:{
      sortby:function(data){
        Cookie.set('sort_lead_list', data);
        // this.run_update_list();
      },

      overdue_checked: function(show){
      },

      overdue_only_checked: function(show){
        if(show){
          this.not_overdue_checked = false;
        }

      },

      not_overdue_checked: function(show){
        if(show){
          this.overdue_only_checked = false;
        }
      },

      show: function(value){
        var vm = this;
        if(!value){
         vue_select_components = [];
        }else{
          strlog(value, 'display leads list' );
          vm.init();

          Vue.nextTick(function(){
             strlog('next tick equal_list_heights', 'red');
            equal_list_heights();
            do_sort();
          })
        }
      },

      'filters.clinics': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.treatments': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.campaigns': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.sources': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.team': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.dentists': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },
    },

    created: function(){
      strlog('Leads List Created', 'green');
    },

    beforeMount: function(){
      var vm = this;
      var leads = parse_leads.construct();
      _leads = leads.get_leads_for_list();
      vm.update_leads(_leads);
    },

    mounted: function(){
      var vm = this;
      vm.init();
      // vm.handle_resize();
      vm.check_text_messages();

      vm.$nextTick(function(){
        strlog('next tick', 'red');
        setInterval(function(){vm.check_text_messages()}, 60000);
      })

      window.addEventListener('resize', vm.handle_resize);

      strlog('mounted', 'purple')
     },

   updated: function(){
     strlog('updated', 'purple')
   },

    methods:{
      init: function(){
        var vm = this;
        vm.init_filters();

        vm.$nextTick(function(){
          jQuery('.preload-timer').addClass('hidden');
          jQuery('.leads-container').removeClass('visuallyhidden');
          jQuery('.filter-container').removeClass('visuallyhidden');
          strlog('Leads List Loaded', 'green');
        })
      },

      get_text_list: function(data){
        if(data.treatment){
          return data.treatment;
        } else if(data.campaign){
          return data.campaign;
        } else if(data.source){
          return data.source;
        }else if(data.sourse){
          return data.sourse;
        }
      },
      //fits horisontal scroll container to screen height
      handle_resize (event) {
        //console.groupCollapsed('Leads list resize');
        //resert height of scroll content
        this.$refs.horizontal_scroll.setAttribute("style", "min-height:0");

        //calculate element height
        this.height_value = this.$refs.parent.clientHeight;


        //calculate scroll-block height
        this.scroll_height = this.height_value - this.$refs.spacer1.clientHeight - this.$refs.spacer2.clientHeight - this.$refs.container_filter.clientHeight - 40;

        this.$forceUpdate();

        //console.log('Scroll area height:' + this.scroll_height);
        //console.groupEnd('----');
      },

      init_datepicker: function(){
        init_date_range();
      },

      //inits filters
      init_filters: function(){

        var vm = this;

        var saved_filter = JSON.parse(Cookie.get('lead_list_filter2'));

        var all_props = {};

        for(var select_name in dashboard_filter_data){

          var props =  {
            icon: icons_selects[select_name],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          props.options =  dashboard_filter_data[select_name];
          props.selected = (saved_filter)? saved_filter[select_name] : dashboard_filter_data[select_name][0];
          all_props[select_name] = props;
        }

        var sortby = Cookie.get('sort_lead_list')?  Cookie.get('sort_lead_list') : 'Sort By';

        var props_sort =  {
          icon: icons_selects.sortby,
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: ['Sort By','Recent Messages','Date Added', 'Recently Updated'],
          selected: sortby,
        };

        this.sortby = sortby;

        for(var  id in props_sort){
          if('undefined' !== typeof(vm.$refs['sort'])){
            vm.$refs['sort'].set_value(id, props_sort[id]);
          }
        }

        vue_select_components.push(vm.$refs['sort']);

        vm.$nextTick(function(){
           strlog('next tick selects', 'red');

          for(var select_name in all_props){
            vue_select_components.push(vm.$refs[select_name]);
            var props = all_props[select_name];

            for(var  id in props){
              if('undefined' !== typeof(vm.$refs[select_name])){
                vm.$refs[select_name].set_value(id, props[id]);
              }
            }
          }

          strlog('selects initalized', 'red');
        });
      },

      // sets all filters' values to default value
      resert_filters: function(){

        this.filters = {
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
          dentists:    dashboard_filter_data['dentists'][0],
        };

        for(select_name in this.filters){
          this.$refs[select_name].set_value('selected', this.filters[select_name]);
        }
      },

      //changes filters values
      run_filter_list: function(select_value){
        if(select_value){
          //console.log('leads were filtered: ' + select_value.name + ' = ' +  select_value.val);
          this.filters[select_value.name] = select_value.val;
        }
        // Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },

      // updates list value
      run_update_list: function(){
        if(this.filters){
          var leads = parse_leads.construct();
          leads.filter_for_leads_list(this.filters);
          var leads_filtered = leads.get_leads_for_list();
          this.update_leads(leads_filtered);
        }
      },

      // sort function forr manual drag and drop
      sort_by_order: function(a, b){
        if(a.order === b.order){
          return 0;
        }
        return (a.order > b.order)? 1 : -1;
      },

      sort_by_id: function(lead_a,lead_b){
        if(lead_a.post_id === lead_b.post_id){
          return 0;
        }
        return (lead_a.post_id > lead_b.post_id)? 1 : -1;
      },

      sort_by_date: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.post_modified);
        var date_lead_b = new Date(lead_b.post_modified);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },

      sort_by_date_added: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.base_lead.post_date);
        var date_lead_b = new Date(lead_b.base_lead.post_date);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },


      sort_by_sms: function(lead_a,lead_b){
        if((lead_a.show_message_alert_him && lead_b.show_message_alert_him && lead_b.show_message_alert && lead_a.show_message_alert) || (!lead_a.show_message_alert_him && !lead_b.show_message_alert_him  && !lead_b.show_message_alert && !lead_a.show_message_alert)){
          return 0;
        }
        if(lead_a.show_message_alert_him && !lead_b.show_message_alert_him){
          return -1;
        }
        if(!lead_a.show_message_alert_him && lead_b.show_message_alert_him){
          return 1;
        }
        if(lead_a.show_message_alert && !lead_b.show_message_alert){
          return -1;
        }
        if(!lead_a.show_message_alert && lead_b.show_message_alert){
          return 1;
        }
      },


      update_leads: function(leads){
        var temp_leads = {};
        this.leads = {};

        for(id in leads){
          if('undefined'  === typeof(temp_leads[leads[id].lead_stage])){
            temp_leads[leads[id].lead_stage]  = [];
          }
          temp_leads[leads[id].lead_stage].push(leads[id]);
        }

        switch(this.sortby){
          case 'Recent Messages':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_sms);
            }
            break;
          case 'Date Added':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_date_added);
            }
            break;
          case 'Recently Updated':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_date);
            }
            break;
        }

        this.leads = temp_leads;
      },

      set_data: function(key, value){
        this[key] = value;
      },

      run_search: function(search){
        //console.log('run search');
        this.search_value = search;
      },

      load_csv: function(){
        var formatted_data = [];

        var filters = [];

        for(var j in this.filters){
         if(this.filters[j].match('All')){
         }else{
            filters.push(this.filters[j]);
          }
        }

        filters = filters.length ==0 ? ['No filters']: filters;

        filename = jQuery('.range-datepicker__text').text() + '_' + filters.join('-')

        filename = filename.split(' ').join('_');

        if(jQuery('.search__field').val()){
          filename+='__searched_for%'+ jQuery('.search__field').val()
        }

        for(var column in this.leads_filtered){
          var column_data =  this.leads_filtered[column];
          // console.log(column_data);

          for(var lead_id in column_data){

            var temp = {
              name: column_data[lead_id].name,
              treatment: column_data[lead_id].treatment,
              clinic: column_data[lead_id].clinic,
              campaign: column_data[lead_id].for_csv.campaign,
              notes: '',
              proposed: '£' + formatMoney(column_data[lead_id].for_csv.proposed, 2, '.', ',') ,
              billed: '£' + formatMoney(column_data[lead_id].for_csv.billed, 2, '.', ',') ,
            };


            temp.dentists = typeof(column_data[lead_id].for_csv.dentists) === 'object'? column_data[lead_id].for_csv.dentists.join(';') : 'none';

            if(typeof(column_data[lead_id].for_csv.notes) === 'object'){
              var notes = [];
              for (var i in column_data[lead_id].for_csv.notes){
                  notes.push(column_data[lead_id].for_csv.notes[i].text);
              }
              temp.notes = notes.join(';');
            }else{
              temp.notes = 'none';
            }

            var temp_arr = [];

            for(var i in temp){
              var reg = new RegExp("[\n|,|\"]");
              if(temp[i] && temp[i].match("/\r\n|\n|\r|,/gm")){
              }

               var _t = temp[i]? '"' + temp[i].split("\n").join(' ').split('"').join(' ').split('#').join(' ') + '"': 'none';

               temp_arr.push(_t);
            }

            formatted_data.push(temp_arr);
          }
        }

          var csvContent = "data:text/csv;charset=utf-8,name,treatment,clinic,campaign,notes,proposed,billed,dentists" + "\r\n"
              + formatted_data.map(e => e.join(",")).join("\r\n");

          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", filename + ".csv");
          document.body.appendChild(link); // Required for FF

          link.click();
      },


      /**
      * show single lead on click on a lead item on a list
      *
      * @param {post_id} - integer WP_Post id,
      */
      show_single_lead: function(post_id, lead){
        editing_object = post_id;
        var vm = this;
        date_start = lead.base_lead.post_date;

        single_lead.run_update_lead = true;
        single_lead.init();
        single_lead.base_lead = lead.base_lead;
        vue_leads_list.show = false;
      },

      update_dashboard_lead_data: function(lead_id ){

      },

      check_text_messages: function(){
        var vm = this;

        if('undefined' == typeof(sms_data)){
          return;
        }

        var data = {
          sms_data: sms_data,
          phone: 'all',
        };

        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(!e.error){
            vm.by_phones = e.by_phones;
            vm.by_phones_data = e.by_phones_data;
            console.log(e);
          }
        })

        .fail(function() {
        })

        .always(function(e) {
          // console.log(e);
        });
      },

      sort_leads: function(data){
        if(data.val){
          this.sortby = data.val;
        }
      },
    },
  })

}


function get_theme_users(){

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: {action: 'theme_get_users'},
  })
  .done(function() {
    clog("success");
  })
  .fail(function() {
    clog("error");
  })
  .always(function(e) {
    clog(e);
  });

}