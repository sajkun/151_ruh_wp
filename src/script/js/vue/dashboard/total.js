if('undefined' !== typeof(is_dashboard)){
  var icon_encr = '<svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>';

  var icon_decr = '<svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>';

  vue_dashboard_totals = new Vue({
    el: '#dashboard_totals',

    data:{

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sourses',
        team:       'All Team',
        dentists:    'All Dentists',
      },

      days_count: 30,

      leads_obj      : dashboard_leads_data,
      leads_obj_prev : dashboard_leads_data_prev,
    },

    computed:{
      filtered_leads: function(){
        var leads = this.run_filtered_leads(this.leads_obj)
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'filtered_leads');
        //console.log(leads);
        //console.groupEnd();
        return leads;
      },

      filtered_leads_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'filtered_leads_prev');
        var leads  = this.leads_obj_prev;

        //console.log('\x1b[34m %s \x1b[0m' , 'Leads initial:');
        //console.log(leads);
        var leads_filtered = [];

        for(id in leads){
          var is_match = true;

          filter_value = leads[id]['filter_data'];

          for(filter_id in this.filters){
            if(this.filters[filter_id].search('All') === 0) continue;

            if(filter_value[filter_id] === null && this.filters[filter_id] !== null){
              is_match = false;
              continue;
            }

            switch(typeof(filter_value[filter_id])){
              case 'object':
                is_match = (filter_value[filter_id].indexOf(this.filters[filter_id]) < 0)? false : is_match;
               break;
              case 'string':
                is_match = (this.filters[filter_id] !== filter_value[filter_id])? false : is_match;
               break;
            }
          }

          if(is_match){
            leads_filtered.push(leads[id]);
          }
        }

        //console.log('\x1b[34m %s \x1b[0m' , 'Leads filtered:');
        //console.log(leads_filtered);
        //console.groupEnd();

        return leads_filtered;
      },

      leads: function(){
        return this.filtered_leads.length;
      },

      revenue_val_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'revenue_val_prev');

        if(!this.leads_obj_prev){
          return 0;
        }
        var total = 0;

        for(id in this.filtered_leads_prev){
          var value = this.filtered_leads_prev[id].meta.treatment_value.value;
          total += get_sum_from_price(value);
        }
        //console.log(total);
        //console.groupEnd();

        return total;
      },

      revenue_val: function(){
        var total = 0;
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'revenue_val');

        for(id in this.filtered_leads){
          if (this.filtered_leads[id].is_converted == 'yes'){
            var value = this.filtered_leads[id].meta.treatment_value.value;
            if(value){
              total += get_sum_from_price(value);
            }
          }
        }

        //console.log(total);
        //console.groupEnd();

        return total;
      },

      billed_this_period: function(){
        var total = this.get_billed_this_period(this.filtered_leads);
        return total;
      },

      billed_value: function(){
        var billed_total = this.get_billed_value(this.billed_filtered_leads);
        var total = billed_total + this.billed_this_period;
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'billed_value');
        //console.log(total);
        //console.groupEnd();
        return '£'+ formatMoney(total, 2, ".", ",");
      },

      billed_this_period_prev: function(){
        var total = this.get_billed_this_period(this.filtered_leads_prev);
        return total;
      },

      billed_value_prev: function(){
        var billed_total = this.get_billed_value(this.billed_filtered_leads_prev);
        var total = billed_total + this.billed_this_period_prev;

        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'billed_value_prev');
        //console.log(total);
        //console.groupEnd();
        return '£'+ formatMoney(total, 2, ".", ",");
      },

      _billed_value_prev: function(){
        //console.log(get_sum_from_price(this.billed_value_prev));
        return get_sum_from_price(this.billed_value_prev);
      },


      billed_filtered_leads: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'billed_filtered_leads');
        //console.log(billed_posts);
        //console.groupEnd();
         return this.run_filtered_leads(billed_posts);
      },

      billed_filtered_leads_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'billed_posts_prev');
        //console.log(billed_posts_prev);
        //console.groupEnd();
        return this.run_filtered_leads(billed_posts_prev);
      },

      revenue: function(){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      booked_value: function(){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      avg: function(){
        var avg =  this.revenue_val/this.leads;
        return  '£'+ formatMoney(avg, 2, ".", ",");
      },

      leads_converted: function(){

        var converted_count = 0;

        for(id in this.filtered_leads){
          converted_count = ('yes' === this.filtered_leads[id].is_converted)? converted_count+1 : converted_count;
        }
        return converted_count;
      },

      icon: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? icon_encr: icon_decr;
      },

      icon_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))? icon_encr: icon_decr;
      },

      up_down: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'up': 'down';
      },

      up_down_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))? 'up': 'down';
      },



      change_type: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'encr': 'decr';
      },

      change_type_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))?  'encr': 'decr';
      },

      percent_change: function(){

        var result = Math.abs((this.revenue_val_prev - this.revenue_val)*100/this.revenue_val).toFixed(2);
        return result;
      },

      percent_change_billed: function(){
        var billed_value = get_sum_from_price(this.billed_value);
        var billed_value_prev = get_sum_from_price(this.billed_value_prev);
        var result = Math.abs(((billed_value_prev - billed_value) * 100)/billed_value).toFixed(2);
        return result;
      }
    },

    mounted: function(){
      var vm = this;
      vm.$nextTick(function(){
        jQuery('.preload').removeClass('hidden')
        jQuery('.preload').removeClass('visuallyhidden')
        jQuery('.spinner-cont').remove();
      })
    },

    methods:{
      get_billed_this_period: function(leads){
        var total = 0;

        for(id in leads){
          if ('undefined' != typeof(leads[id].meta.treatment_value.billed)){
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

        for(var id in leads){
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

      set_value: function(key, value){
        //console.log('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'set value');
        this[key] = value;
        var vm = this;

        Vue.nextTick(function(){
          this.update_filters(this.filters);
        });
      },

      update: function(){
        //console.log('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'update totals');
        this.leads_obj      = dashboard_leads_data;
        this.leads_obj_prev = dashboard_leads_data_prev;

        var vm = this;
        Vue.nextTick(function(){
          vm.update_filters(this.filters);
        });
     },

      update_filters: function(filters){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'update_filters');
        //console.log(filters);
        this.filters = filters;
        //console.log(this.filters);

        //console.groupEnd();

        var vm = this;
        Vue.nextTick(function(){
          vm.$forceUpdate();
        })
      },

      run_filtered_leads: function(leads){
        var leads_filtered = [];
        for(id in leads){
          var is_match = true;

          filter_value = leads[id]['filter_data'];

          for(filter_id in this.filters){
            if(this.filters[filter_id].search('All') === 0) continue;

            if(filter_value[filter_id] === null && this.filters[filter_id] !== null){
              is_match = false;
              continue;
            }

            switch(typeof(filter_value[filter_id])){
              case 'object':
                is_match = (filter_value[filter_id].indexOf(this.filters[filter_id]) < 0)? false : is_match;
               break;
              case 'string':
                is_match = (this.filters[filter_id] !== filter_value[filter_id])? false : is_match;
               break;
            }
          }

          if(is_match){
            leads_filtered.push(leads[id]);
          }
        }

        return leads_filtered;
      },
    },
  })
}

function update_dashboard_totals(days_count){
  if('undefined' !== typeof(is_dashboard)){
    vue_dashboard_totals.update();
    vue_dashboard_totals.set_value('days_count', days_count);
  }
}


function count_billed_time(date, _from, _to, count){

  if(!count){
    var count = 0;
  }

  if(date <= _to && date >= _from) {
    count++;
    var new_date = new Date(date.setMonth(date.getMonth() + 1));
    count = count_billed_time(new_date, _from, _to, count);
  } else if( date < _from ){
    var new_date = new Date(date.setMonth(date.getMonth() + 1));
    count = count_billed_time(new_date, _from, _to, count);
  }

  return count;
}