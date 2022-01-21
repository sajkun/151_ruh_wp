if('undefined' !== typeof(is_dashboard)){
  perfomance = new Vue({
    el: '#statistic_data',

    data: {
      filter        : false,
      leads         : dashboard_leads_data,
      leads_prev    : dashboard_leads_data_prev,
      elements      : [],
      billed_posts  : billed_posts,
      billed_posts_prev  : billed_posts_prev,
    },

    computed: {
      rows: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'perfomance:', 'rows calculated');
        var rows = [];
        for(var id in this.elements){

          var item = this.elements[id];
          item.name = id;
          item.billed = this.get_billed_this_period(item.leads) + this.get_billed_value(item.leads_billed);

          item.billed_cha = 0;

          // billed change
          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.leads)){
            var billed_prev_c = ('undefined' == typeof(item.prev.leads))? this.get_billed_this_period(item.prev.leads) : 0;

            var billed_prev = billed_prev_c + this.get_billed_value(item.prev.leads_billed);

            item.billed_prev = billed_prev;

            item.billed_cha = ( get_sum_from_price(item.billed) !== 0 )? ((billed_prev * 100) / get_sum_from_price(item.billed)) : 0;

            item.billed_cha = ((get_sum_from_price(item.billed) - billed_prev )*100)/billed_prev;

            item.billed_prev = billed_prev;
          }

          item.billed_cha = item.billed_cha.toFixed(2);

          item.billed = '£'+ formatMoney(item.billed, 2, ".", ",");
          item.booked = this.calc_revenue_val(item.leads);
          item.booked = '£'+ formatMoney(item.booked, 2, ".", ",");

          item.width = (get_sum_from_price(item.billed) / get_sum_from_price(this.billed_value)) * 100 + '%';

          item.show = get_sum_from_price(item.billed) > 0;


          var converted =(item.converted/item.count)*100;

          item.converted_percents = converted;
          item.converted_percents = (isNaN(item.converted_percents))? "0.00%" :item.converted_percents.toFixed(2) + '%';

          item.converted_percents_cha  = 0;

          // booked changed

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.converted)){
            var converted_prev = (item.prev.converted/item.prev.count)*100;
            item.converted_percents_cha = (((converted - converted_prev )*100)/ converted_prev);
            item.converted_prev = converted_prev;
            item._converted = converted;
          }

          item.converted_percents_cha = item.converted_percents_cha.toFixed(2);

          item.leads_cha = 0;

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.count)){

            item.leads_cha = (( item.count - item.prev.count ) * 100) / item.prev.count;
          }

          item.leads_cha = item.leads_cha.toFixed(2);
          item.cha_booked = 0;

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.leads)){

            var revenue = this.calc_revenue_val(item.leads);
            var revenue_prev = this.calc_revenue_val(item.prev.leads);

            item.cha_booked = ((revenue - revenue_prev) * 100)/revenue_prev;
            item.revenue_val = revenue;
            item.revenue_prev = revenue_prev;
          }

          item.cha_booked = item.cha_booked.toFixed(2);
          rows.push(item);
        }
        //console.log(rows);
        //console.groupEnd();
        return rows;
      },

      revenue_val: function(){
        return this.calc_revenue_val(this.leads);
      },

      booked_value: function (){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      billed_value: function(){
         var total = this.get_billed_this_period(this.leads) + this.get_billed_value(this.billed_posts)

         return '£'+ formatMoney(total, 2, ".", ",");
      },
    },

    mounted: function(){
      //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'perfomance:', 'perfomance mounted');
      var props =  {
        options: ['clinics', "treatments", "campaigns", "sources", "team", 'dentists'],
        selected: 'campaigns',
        isExpanded: '',
        isSelected: [],
        isHiddenSelect: true,
        isHiddenImitation: false,
      };

      for( id in props){
        this.$refs.perfomance_type.set_value(id, props[id]);
      };

      this.elements = this.get_rows();

      var vm = this;

      Vue.nextTick(function(){
        vm.$forceUpdate();
      });

      //console.log('dashboard_leads_data');
      //console.log(dashboard_leads_data);
      //console.log('dashboard_leads_data_prev');
      //console.log(dashboard_leads_data_prev);
      //console.groupEnd();
    },

    methods: {
      calc_revenue_val: function(leads){
        var total = 0;

        for(var id in leads){
          if (leads[id].is_converted == 'yes' && 'undefined' != typeof(leads[id].meta.treatment_value.value) ){
            var value = leads[id].meta.treatment_value.value;
            if(value){
              total += get_sum_from_price(value);
            }
          }
        }
        return total;
      },

      get_billed_this_period: function(leads){
        var total = 0;

        for(var id in leads){
          if ('undefined' !== typeof(leads[id].meta.treatment_value.billed)){
            var value = leads[id].meta.treatment_value.billed

            if(value){
              total += get_sum_from_price(value);
            }
          }
        }
        return total;
      },

      get_billed_value: function(leads){
        var date_from = new Date(_from);
        var date_to   = new Date(_to);

        billed_total = 0

        for(id in leads){
          if('undefined' !== typeof(leads[id].meta.start_date)){

              var billed_start = new Date(leads[id].meta.start_date);

              var count =  count_billed_time(billed_start, date_from, date_to);

              if('undefined' !== typeof(leads[id].meta.treatment_value.mounthly) && !isNaN(leads[id].meta.treatment_value.mounthly)){
                  billed_total+= count * get_sum_from_price(leads[id].meta.treatment_value.mounthly);

              }
          }
        }
       return billed_total;
      },

      change_perfomance: function(event){
        this.filter = event.val;
        this.elements = this.get_rows();
      },

      get_rows: function(){
        var rows;
        switch(this.filter){
          case 'team':
            rows = this.get_rows_object();
            break;
          case 'dentists':
            rows = this.get_rows_object();
            break;
          case 'treatments':
            rows = this.get_rows_object();
            break;
          default:
            rows = this.get_rows_string();
            break;
        }

        return rows;
      },

      //gets rows' data if a target filter item is a string
      get_rows_string: function(){
        var rows = []
        var rows_prev = []


        if(this.filter){
          rows = this.get_rows_leads_data(this.leads, this.filter);

          rows_prev = this.get_rows_leads_data(this.leads_prev, this.filter);

          for(var k in rows){
            rows[k].prev = rows_prev[k]
          }

          for(var id in this.billed_posts){
            var billed_lead = this.billed_posts[id];
            var row_name = billed_lead.filter_data[this.filter];
            row_name = (!row_name)? 'Others' : row_name;
            row_name = (row_name == '--Select--')? 'Others' : row_name;

            if('undefined' == typeof(rows[row_name])){
              rows[row_name] = {
                'count': 0,
                'converted' : 0,
                'leads'     :    [],
                'leads_billed' : [],
              };
            }

            rows[row_name].leads_billed.push(billed_lead);
          }

          for(var id in this.billed_posts_prev){
            var billed_lead = this.billed_posts_prev[id];
            var row_name = billed_lead.filter_data[this.filter];
            row_name = (!row_name)? 'Others' : row_name;
            row_name = (row_name == '--Select--')? 'Others' : row_name;

            if('undefined' == typeof(rows[row_name])){
              rows[row_name] = {
                'count': 0,
                'converted' : 0,
                'leads'     :    [],
                'leads_billed' : [],
              };
            }

            if('undefined' == typeof(rows[row_name].prev)){
              rows[row_name].prev = {
                leads_billed: [],
              };
            }

            rows[row_name].prev.leads_billed.push(billed_lead);
          }
        }

        return rows;
      },

      get_rows_leads_data: function(leads, filter){
        var rows = [];

        for(var id in leads){
          var lead     = leads[id];
          var row_name = lead.filter_data[filter];
          row_name = (!row_name)? 'Others' : row_name;
          row_name = (row_name == '--Select--')? 'Others' : row_name;
          row_name = (row_name.length < 3)? 'Others' : row_name;

          if('undefined' == typeof(rows[row_name])){
            rows[row_name] = {
              'count': 0,
              'converted'  : 0,
              'leads'      : [],
              'leads_billed' : []
            };
          }

          rows[row_name].leads.push(lead);
          rows[row_name].converted = (lead.is_converted == 'yes')? rows[row_name].converted + 1: rows[row_name].converted;
          rows[row_name].count++;
        }

        return rows;
      },

      //gets rows' data if a target filter item is an object
      get_rows_object: function(){
        var rows = []
        var total = 0;

        if(this.filter){
          for(var id in this.leads){

            //get lead
            var lead = this.leads[id];

            //select a filter value object from a lead's data
            var row_names = this.leads[id].filter_data[this.filter];


            var row_name  = false;

            //create new rows if they don't exists and if object not empty
            for(var j in row_names){

              // defined an index of possible new row
              var row_name;

              row_name = (!row_names[j])? 'Others' : row_names[j];
              row_name = (row_name == '--Select--')? 'Others' : row_name;
              row_name = (row_name.length < 3)? 'Others' : row_name;

              //create a row if not exist
              if('undefined' == typeof(rows[row_name])){
                rows[row_name] = {
                  'count': 0,
                  'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
                };
              }
            }

            // if no data set or object is empty create others row
            if(!row_name &&  'undefined' == typeof(rows['Others']) ){
             var row_names = ['Others'];
              rows['Others'] = {
                'count': 0,
                'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
              }
            }

              if(!row_name || row_names.length <= 0){
               var row_names = ['Others'];
              }

            //add values for each name
            for(var k in row_names){
              var row_name = row_names[k];
              row_name = (row_name.length < 3)? 'Others' : row_name;

              rows[row_name].leads.push(lead);

              // calculate converted rows
              rows[row_name].converted = (this.leads[id].is_converted == 'yes')? rows[row_name].converted + 1: rows[row_name].converted;

              // calculate total number of rows
              rows[row_name].count++;
            }
          }

          // calculation of billed value from othe periods

          var date_from = new Date(_from);
          var date_to   = new Date(_to);


          // parse every billed lead
          for(var id in this.billed_posts){
            var billed_lead = this.billed_posts[id];
            var filtered_lead = this.billed_posts[id];
            var row_names = filtered_lead.filter_data[this.filter];
            var row_name  = false;

            //create new rows if they don't exists and if object not empty
            for(var j in row_names){
              row_name = (!row_names[j])? 'Others' : row_names[j];
              row_name = (row_name == '--Select--')? 'Others' : row_name;
              row_name = (row_name.length < 3)? 'Others' : row_name;

              if('undefined' == typeof(rows[row_name])){
                rows[row_name] = {
                  'count': 0,
                  'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
                };
              }

               rows[row_name].leads_billed.push(billed_lead);
            }

             // if no data set or object is empty create others row
            if(!row_name && 'undefined' == typeof(rows['Others'])){
              row_name = 'Others';
              rows['Others'] = {
                'count':    0,
                'converted' : 0,
                'leads'      : [],
                'leads_billed' : [],
               }

              rows[row_name].leads_billed.push(billed_lead);
            }
          }
        }

        return rows;
      },

      update: function(key, value){
        this[key] = value;
        var vm = this;

        Vue.nextTick(function(){
          vm.elements = vm.get_rows();
          vm.$forceUpdate();
        });
      },

      show_item: function(id){
        jQuery('.revenue-proportion > div').removeClass('shown');
        jQuery('.revenue-proportion').find('.color-'+id).addClass('shown');
      },

      hide_all: function(){
        jQuery('.revenue-proportion > div').removeClass('shown');
      },

      load_csv: function(){
        print_popup.show();
      }
    },
  });
}