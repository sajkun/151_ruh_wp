jQuery(document).ready(function(){
  init_date_range();
})

function init_date_range(){
  var now     = new Date();
  var last_7  = new Date();
  var last_30  = new Date();
  var last_90 = new Date();
  last_7.setDate(last_7.getDate() - 7);
  last_30.setDate(last_30.getDate() - 30);
  last_90.setDate(last_7.getDate() - 90);

  var now     = new Date();

  var today_str = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();


  var last_7_str = (last_7.getMonth() + 1) + '/' + last_7.getDate() + '/' + last_7.getFullYear();

  var last_30_str = (last_30.getMonth() + 1) + '/' + last_30.getDate() + '/' + last_30.getFullYear();

  var last_90_str = (last_90.getMonth() + 1) + '/' + last_90.getDate() + '/' + last_90.getFullYear();

  var for_last_day = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  var month_first_day = (now.getMonth() + 1) + '/' + 1 + '/' + now.getFullYear();

  var month_last_day = (now.getMonth() + 1) + '/' + for_last_day.getDate() + '/' + now.getFullYear();

  jQuery('.range-datepicker').daterangepicker({
    "autoApply": true,
    "ranges": {
        "Today": [
            today_str,
            today_str
        ],
        'This Month': [
          month_first_day,
          today_str
        ],

        'Past 7 Days': [
          last_7_str,
          today_str
        ],

        'Past 30 Days':[
          last_30_str,
          today_str
        ],

        'Past 90 Days': [
          last_90_str,
          today_str
        ],
        'All time':[
          '01/01/1999',
          today_str,
        ],
    },
    "alwaysShowCalendars": true,
    "startDate": last_30_str,
    "endDate": today_str
  }, function(start, end, label) {

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    var data = {from: start.format('MMM DD YYYY') , to: end.format('MMM DD YYYY'), label: label, _from: start.format('MM/DD/YYYY'), _to: end.format('MM/DD/YYYY'), }

    if(jQuery(this.element).data('action') == 'popup'){
      jQuery(document.body).trigger('get_popup_leads_by_dates', data);

    }else{
      jQuery(document.body).trigger('get_leads_by_dates', data);
    }

  });

}

jQuery(document.body).on('get_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  data.get_previous_data = typeof(is_dashboard) !== 'undefined';

  Cookie.set('list_data_settings', JSON.stringify(data));

  wait_block.show();

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data,

    complete: function(xhr, textStatus) {
      //called when complete
      wait_block.hide();
    },

    success: function(data, textStatus, xhr) {
      jQuery('.site-inner').find('.preload').removeClass('hidden').removeClass('visaullyhidden');
      console.group('leads updated by date');
      console.log(data);

      if('undefined' !== typeof(is_dashboard)){
        _to = data.to;
        _from = data.from;
        billed_posts = data.billed_posts;
        billed_posts_prev = data.billed_posts_prev;
        perfomance.update('leads', data.leads);
        perfomance.update('billed_posts', data.billed_posts);
      }

      dashboard_leads_data      = data.leads;
      dashboard_leads_data_prev = data.leads_prev;
      team_perfomance           = data.team_perfomance;

      //dashboard
      update_filters(data.filter_data);
      update_dashboard_totals(data.days_count_prev);

      //leads_list
      update_leads_filters(data.filter_data);
      update_leads_list();

      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.log(xhr);
     }
  });
})

jQuery(document.body).on('get_popup_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  data.get_previous_data = typeof(is_dashboard) !== 'undefined';

  Cookie.set('list_data_settings', JSON.stringify(data), 1);

  wait_block.show();

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data,

    complete: function(xhr, textStatus) {
      //called when complete
      wait_block.hide();
    },

    success: function(data, textStatus, xhr) {
      jQuery('.site-inner').find('.preload').removeClass('hidden').removeClass('visaullyhidden');
      clog(data);

      if('undefined' !== typeof(is_dashboard)){
        _to2 = data.to;
        _from2 = data.from;
        var filter = {
          clinics: [],
          treatments: [],
          campaigns: [],
          sources: [],
          team: [],
        };

        print_popup.update('leads_obj', data.leads);
        print_popup.update('filter_data_', data.filter_data_csv);
        print_popup.update('filter', filter);
      }

    },

    error: function(xhr, textStatus, errorThrown) {
      clog('error');
      clog(errorThrown);
      clog(xhr);
     }
  });
})

jQuery(document).ready(function(){
  var saved_dates = JSON.parse(Cookie.get('list_data_settings'));

  if(saved_dates && 'undefined' !== typeof(is_lead_list) && jQuery('.range-datepicker').length){
     var text = saved_dates.from + ' → ' + saved_dates.to;

    jQuery('.range-datepicker .range-datepicker__text').text(text);

    jQuery('.range-datepicker .range-datepicker__label').text(saved_dates.label);

    jQuery('.range-datepicker').data('daterangepicker').setStartDate(saved_dates._from);
    jQuery('.range-datepicker').data('daterangepicker').setEndDate(saved_dates._to);

    // jQuery(document.body).trigger('get_leads_by_dates',saved_dates);
  }
})