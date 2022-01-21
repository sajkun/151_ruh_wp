jQuery(document).on('update_app', function(){

})

// class to work with leads
var parse_leads = {
  leads: {},

  /**
  **
  **/
  construct: function(){
    if('undefined' !== typeof(is_dashboard)){
      this.leads = dashboard_leads_data;
    }

    if('undefined' !== typeof(is_lead_list)){
       this.leads = dashboard_leads_data;
    }

    return this;
  },

  /**
  **
  **/
  filter: function(){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id])){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;

    this.leads = dashboard_leads_data_filtered_new;

    return dashboard_leads_data_filtered_new;
  },

  /**
  **
  **/
  filter_exec: function(filters){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id]), filters){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;

    this.leads = dashboard_leads_data_filtered_new;

    return this;
  },

  /**
  **
  **/
  filter_for_leads_list: function(filters){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id], filters)){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;
    this.leads = dashboard_leads_data_filtered_new;
    return dashboard_leads_data_filtered_new;
  },

  /**
  **
  **/
  //  check if passed lead mathces current filter values
  filter_lead: function(lead, filters){
    var filter_value = {};
    var lead_filter  = lead.filter_data;
    var is_match     = true;

    if('undefined' !== typeof(filters)){
      for(id in vue_selects){
       var value = vue_selects[id].get_value();

       if(value.search('All') !== 0){
          filter_value[vue_selects[id].get_name()] = value;
        }
      }
    }else{
      for(id in filters){
       var value = filters[id];

       if(value.search('All') !== 0){
          filter_value[id] = value;
        }
      }
    }

    for(filter_id in filter_value){
      switch(typeof(lead_filter[filter_id])){
        case 'object':
          is_match = (lead_filter[filter_id].indexOf(filter_value[filter_id]) < 0)? false : is_match;
         break;
        default:
          is_match = (lead_filter[filter_id] !== filter_value[filter_id])? false : is_match;
         break;
      }
    }

    return is_match;
  },

  /**
  **
  **/
  get_leads: function (){
    return this.leads;
  },

  /**
  **
  **/
  get_leads_for_list: function(){
    var leads = [];

    var now = new Date();

    for(id in this.leads){
      var data = {};
      var for_csv = {
        dentists:  this.leads[id].meta.treatment_coordinator.specialist,
        proposed:  get_sum_from_price(this.leads[id].meta.treatment_value.value),
        billed:    get_sum_from_price(this.leads[id].meta.treatment_value.billed),
        notes:     this.leads[id].meta.lead_notes,
        campaign:  this.leads[id].meta.patient_data.campaign,
      };

      var manager_noted = 'no';

      if(typeof(this.leads[id].meta.lead_notes) == 'object'){
        for(var k in this.leads[id].meta.lead_notes){
          if('undefined' !== typeof(this.leads[id].meta.lead_notes[k].is_manager)){
            manager_noted = ('yes' === this.leads[id].meta.lead_notes[k].is_manager  && 1  === this.leads[id].meta.lead_notes[k].show)? 'yes' : manager_noted;
          }
        }
      }

      if(typeof(this.leads[id].meta.lead_notes_tco) == 'object'){
        for(var k in this.leads[id].meta.lead_notes_tco){
          if('undefined' !== typeof(this.leads[id].meta.lead_notes_tco[k].is_manager)){
            manager_noted = ('yes' === this.leads[id].meta.lead_notes_tco[k].is_manager && 1  === this.leads[id].meta.lead_notes_tco[k].show  )? 'yes' : manager_noted;
          }
        }
      }

      var date_received = new Date(this.leads[id].post_date);
      var reminder_date = new Date(this.leads[id].meta.reminder);

      data.overdue = (this.leads[id].meta.reminder !== '' && now > reminder_date)? 'yes' : 'no';

      data.alarms      = (this.leads[id].meta.reminder)? 'yes' : 'no';
      data.post_id     = this.leads[id].ID;
      data.name        = this.leads[id].meta.patient_data.name;
      data.clinic      = this.leads[id].meta.patient_data.clinic;
      data.treatment   = this.leads[id].meta.patient_data.treatment;
      data.phone   = this.leads[id].meta.patient_data.phone;
      data.email   = this.leads[id].meta.patient_data.email;
      data.sourse      = this.leads[id].meta.patient_data.sourse;
      data.text_messages = this.leads[id].meta.text_messages ? this.leads[id].meta.text_messages.length : 0 ;
      data.show_message_alert = false;
      data.show_message_alert_him = false;
      data.team        = this.leads[id].meta.lead_specialists;
      data.lead_stage  = this.leads[id].lead_stage;
      data.reminder    = this.leads[id].meta.reminder;
      data.permalink   = this.leads[id].permalink;
      data.filter_data = this.leads[id].filter_data;
      data.phone_count = this.leads[id].phone_count;
      data.phone_count_tco = this.leads[id].phone_count_tco;
      data.message_count = this.leads[id].message_count;
      data.message_count_tco = this.leads[id].message_count_tco;
      data.sms_count_tco = this.leads[id].sms_count_tco;
      data.for_csv       = for_csv;
      data.manager_noted = manager_noted;
      data.post_modified = this.leads[id].post_modified;
      data.base_lead     = this.leads[id];
      data.isMarked     = false;

      if('undefined' !== typeof(this.leads[id].order)){
        data.order = this.leads[id].order;
      }else{
        data.order = 0;
      }

      data.time_passed = date_difference.construct(date_received, now)  + ' ago';
      leads.push(data);
    }

    return leads;
  },

  /**
  **
  **/
  get_total_revenue : function(){
    revenue = 0;

    for(id in this.leads){
      revenue += parseInt(this.leads[id].meta.treatment_value.value);
    }

    return revenue;
  },

  /**
  **
  **/
  get_total_leads: function(){
    return this.leads.length;
  },

  /**
  **
  **/
  get_average_leads: function(formatted){
    var revenue = this.get_total_revenue();
    var total   = this.get_total_leads();

    if(formatted){
      return formatMoney(revenue/total, 2, ".", ",") ;
    }else{
      return revenue/total;
    }
  },

  /**
  **
  **/
  prepare_sorted_data_by: function(get_by){
    var sorted = {};
    var index;
    switch(get_by){
      case 'sourse':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.sourse;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }

        break;
      case 'campaign':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.campaign;

          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
      case 'treatment':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.treatment;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
      case 'clinic':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.clinic;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
    }

    return sorted;
  },

  /**
  **
  **/
  get_leads_data_by: function(get_by, type){
    var sorted = this.prepare_sorted_data_by(get_by);


    if(Object.keys(sorted).length === 0){
      return {
        leads : 'no',
        revenue :  '-',
        rate :  '-',
        name: 'Unavailable',
      };
    }

    switch(type){
      case 'Leads':
        var max = 0;
        var index = '';

        for(id in sorted){
          if(sorted[id].leads > max){
            index = id;
            max = sorted[id].leads;
          }
        }

        return sorted[index];
        break;

      case 'Revenue':
        var max = 0;
        var index = '';

        for(id in sorted){
          if(sorted[id].revenue > max){
            index = id;
            max = sorted[id].revenue;
          }
        }

        return sorted[index];
        break;
    }
  }
}

// class to calculate date difference
var date_difference = {
  ms_to_minute : 60000,
  ms_to_hour   : 3600000,
  ms_to_day    : 86400000,


  construct: function(d1, d2){
    var date_diff = d2 - d1;
    var days_data = this.get_days_passed(date_diff);
    var hours_data = this.get_hours_passed(days_data.date_diff);
    var minutes_data = this.get_minutes_passed(hours_data.date_diff);
    var time_passed = '';
    var days_text     = (days_data.value > 1)? 'd ' : 'd ';
    var hours_text    = (hours_data.value > 1)? 'h ' : 'h ';
    var minutes_text  =  (minutes_data.value > 1)? 'm ' : 'm ';

    if(date_diff < this.ms_to_minute){
      return 'Just recieved';
    } else if(date_diff < this.ms_to_day && date_diff >= this.ms_to_minute){
      // how many days

      time_passed += (days_data.value > 0)?  days_data.value + days_text : '';
      time_passed += (hours_data.value > 0)? hours_data.value + hours_text : '';
      time_passed += (minutes_data.value > 0)?  minutes_data.value + minutes_text : '';

    } else if(date_diff > this.ms_to_day && date_diff < this.ms_to_day * 31 ){
        time_passed = (days_data.value > 0)?  days_data.value + days_text : '';
    } else if(date_diff >= this.ms_to_day * 31 ){
      var date1    = new Date(d1);
      var date2    = new Date(d2);

      var months;
      months = (date2.getFullYear() - date1.getFullYear()) * 12;
      months -= date1.getMonth();
      months += date2.getMonth();
      var month_text  =  (months > 1)? 'mos' : 'mo';

      time_passed = months+month_text;
    }

     return time_passed;
  },

  get_minutes_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_minute);
    var delta =  date_diff - value*this.ms_to_minute;

    return {value: value, date_diff: delta};
  },

  get_hours_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_hour);
    var delta =  date_diff - value*this.ms_to_hour;


    return {value: value, date_diff: delta};
  },

  get_days_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_day);
    var delta =  date_diff - value*this.ms_to_day;

    return {value: value, date_diff: delta};
  },
};
