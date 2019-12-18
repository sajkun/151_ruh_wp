  var is_mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },

    any: function() {
        return (is_mobile.Android() || is_mobile.BlackBerry() || is_mobile.iOS() || is_mobile.Opera() || is_mobile.Windows());
    },

    anyphone: function(){
        return (is_mobile.any && (jQuery(window).width()<=768));
    }
  };
function formatMoney(number, decPlaces, decSep, thouSep) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}



/**
* replaces part of a string
*
* @param {needle} - object with pairs {search : replace }
* @param {highstack} - string
*
* @return String
*/
function str_replace(needle, highstack){
  var template = highstack;
    for(var key in needle){
    var exp = new RegExp("\\{" + key + "\\}", "gi");
      template = template.replace(exp, function(str){
        value = needle[key];
        return value;
      });
    }
    return template;
}


function goBack() {
  window.history.back();
}


function get_sum_from_price(sum){
  if(sum === 0){
    return 0;
  }

  if(typeof(sum) === 'undefined'){
    return 0;
  }

  if(typeof(sum) === 'string'){
    var exp = new RegExp("\\D", "gi");
    var pierces = sum.split('.');
    var summ = pierces[0].replace(exp, '');

    return parseInt(summ);
  }

  if(typeof(sum) === 'number'){
    return sum;
  }

  return 0;
}
jQuery('.search-open').click(function(){
  jQuery('.search__wrapper').toggleClass('shown');
});


jQuery('#login-form').on('submit',function(){
  console.log('login');
  var data = jQuery(this).serializeArray();

  var post_data = {};

  for(id in data){
    post_data[data[id].name] = data[id].value;

    if(!data[id].value){
      alert('No ' + data[id].name +' entered');
      return false;
    }

  }
  post_data.action = 'run_login';

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: post_data,

    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.group('leads updated by date');
      console.log(data);

      location.href= data.redirect;

      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      var resp = JSON.parse(xhr.responseText);

      message = '';
      for(id in resp.data){
        message += resp.data[id][0];
      }

      alert(message);

      console.log(resp);
     }
  });
})
jQuery(document).ready(function(){
    jQuery('.reminder input').datetimepicker({
      format:'M d Y H:i',
    });

    jQuery('.datepicker').datetimepicker({
      format:'M d Y H:i',
    });
});


jQuery('.reminder .icon').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})

jQuery('.reminder .label').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})

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
    },
    "alwaysShowCalendars": true,
    "startDate": last_30_str,
    "endDate": today_str
  }, function(start, end, label) {

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    jQuery(document.body).trigger('get_leads_by_dates', {from: start.format('MMM DD YYYY') , to: end.format('MMM DD YYYY'), label: label});
  });
}

jQuery(document.body).on('get_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  data.get_previous_data = typeof(is_dashboard) !== 'undefined';

  console.log(data);

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
      console.group('leads updated by date');
      console.log(data);
      dashboard_leads_data = data.leads;
      dashboard_leads_data_prev = data.leads_prev;
      team_perfomance      = data.team_perfomance;

      //dashboard
      update_filters(data.filter_data);
      update_dashboard_totals(data.days_count_prev);
      update_top_sources();
      update_team_perfomance();
      update_confertions(data.days_count_prev);

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
if('undefined' !== typeof(is_dashboard)){

  var chart = document.getElementById('gistogramm-year').getContext('2d');
  var current_year = '2019';
  var currency     = '£';


  months = [
    ['January','May','July', "October"],
    ['February','April', "August", 'November'],
    ['March','June', "September", 'December'],
  ];

  var options_chart= {
      options: {
          legend:{
             display: false,
          },

          title: {
             display: false,
          },

          gridLines: {
            display: false,
          },

           tooltips: {
              callbacks: {

                  title : function(tooltipItem, data) {
                    var row = tooltipItem[0].datasetIndex;
                    var col = tooltipItem[0].index;
                    return months[row][col] + ' '+ current_year;
                  },


                  beforeLabel: function(tooltipItem, data) {
                    return currency +  formatMoney(tooltipItem.value, 2, ".", ",") ;
                  },

                  label: function(tooltipItem, data) {
                       return false;
                  }
              }
          },

          layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },

          scales: {
              xAxes:[{
                  scaleLabel:{
                      display: false,
                  },
                  gridLines : {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      drawTicks: true
                  },
              }],
              yAxes: [{
                  gridLines : {
                      display: true,
                      drawBorder: false,
                      drawOnChartArea: true,
                      drawTicks: false
                  },
                  display: false,
                  id: 'left-y-axis',
                  // type: 'linear',
                  // position: 'left'
              }]
          }
      },

      type: 'bar',
      data: {
          datasets: [{
              backgroundColor: 'rgb(237, 240, 255)',
              data: [
                income_month_data['Jan']['sum'],
                income_month_data['May']['sum'],
                income_month_data['Jul']['sum'],
                income_month_data['Oct']['sum']
                ], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [
                income_month_data['Feb']['sum'],
                income_month_data['Apr']['sum'],
                income_month_data['Aug']['sum'],
                income_month_data['Nov']['sum']
                ], //february, april, august, november
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          },{
              data:  [
                income_month_data['Mar']['sum'],
                income_month_data['Jun']['sum'],
                income_month_data['Sep']['sum'],
                income_month_data['Dec']['sum']
                ], //march, june, september, december
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          }],
          labels: ['c1', 'c2', 'c3', 'c4']
      },
  }
  var options_chart_test = {
      options: {
          legend:{
             display: false,
          },

          title: {
             display: false,
          },

          gridLines: {
            display: false,
          },

           tooltips: {
              callbacks: {

                  title : function(tooltipItem, data) {
                    var row = tooltipItem[0].datasetIndex;
                    var col = tooltipItem[0].index;
                    return months[row][col] + ' '+ current_year;
                  },


                  beforeLabel: function(tooltipItem, data) {
                    return currency +  formatMoney(tooltipItem.value, 2, ".", ",") ;
                  },

                  label: function(tooltipItem, data) {
                       return false;
                  }
              }
          },

          layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },

          scales: {
              xAxes:[{
                  scaleLabel:{
                      display: false,
                  },
                  gridLines : {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      drawTicks: true
                  },
              }],
              yAxes: [{
                  gridLines : {
                      display: true,
                      drawBorder: false,
                      drawOnChartArea: true,
                      drawTicks: false
                  },
                  display: false,
                  id: 'left-y-axis',
                  // type: 'linear',
                  // position: 'left'
              }]
          }
      },

      type: 'bar',
      data: {
          datasets: [{
              backgroundColor: 'rgb(237, 240, 255)',
              data: [6000, 9000, 4000, 1500], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [9000, 7250, 1000, 4000], //february, april, august, november
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          },{
              data: [9000, 10000, 7500, 5000], //march, june, september, december
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          }],
          labels: ['c1', 'c2', 'c3', 'c4']
      },
  }

var _prefix;
var _suffix;

 function prepare_donnut_data(data, labels, suffix, prefix){
    var colors = [
            '#f6b82f',
            '#ee63d2',
            '#8933f6',
            '#3354f6',
            '#01c58d',
            '#eee',
            '#eee',
          ]
    _prefix = prefix;
    _suffix = suffix;

    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: data,
          backgroundColor: colors,
          label: 'Dataset 1'
        }],
        labels: labels
      },

      options: {
        responsive: true,


        legend: {
          position: 'right',
          fontColor: 'rgb(0,100, 0)',

          labels : {
            'boxWidth' : 14,
            'fullWidth': 'no',
             'width': 100,
            'padding' : 20,
            'fontFamily' : 'HelveticaFont_,sans-serif',
            'fontColor' : '#3b3f45',

             generateLabels: function(chart){
                      var data = chart.data;
                      if (data.labels.length && data.datasets.length) {
                          return data.labels.map(function(label, i) {
                              var meta = chart.getDatasetMeta(0);
                              var ds = data.datasets[0];
                              var arc = meta.data[i];
                              var custom = arc && arc.custom || {};
                              var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                              var arcOpts = chart.options.elements.arc;
                              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                              var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                // We get the value of the current label
                             var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];


                             var text = (typeof(_suffix) !== 'undefined' && _suffix!== false)? label + "  " + value + suffix : label + "  " + value;

                              text = (typeof(_prefix) !== 'undefined' && _prefix!== false)? label + "  " + _prefix + formatMoney(value, 2, ".", ",") : text;

                              return {
                                  // Instead of `text: label,`
                                  // We add the value to the string
                                  text: text,
                                  fillStyle: fill,
                                  strokeStyle: stroke,
                                  lineWidth: bw,
                                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                  index: i
                              };
                          });
                      } else {
                          return [];
                      }
                  }

          }
        },

        title: {
          display: false,
        },

        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    config.options.legend.position = jQuery(window).width() < 768 ? 'bottom' : 'right';

    return config
 }

  jQuery(document).ready(function(){
    var chart_income = new Chart(chart, options_chart);
  })
}

// sortrable actions
  jQuery( function() {


    // makes height of all lists on leads' page one and the same
    jQuery(document).ready(function(){
      equal_list_heights();
    })

    // init of sortable
    jQuery("ul.leads-list" ).sortable({
      connectWith: "ul",

      create:function(event, ui){},

      receive: function( event, ui ){},

      over: function( event, ui ){
      },


      stop : function( event, ui ){
        jQuery(document).trigger('update_leads_list');

        var leads_order_list = [];

        var items = jQuery(event.target).find('a');

        var orders = [];

        items.each(function(ind, el){
          var post_id = parseInt(el.dataset.post_id);
          orders.push({post_id: post_id, order: ind});

          for(id in dashboard_leads_data){
            if(post_id == dashboard_leads_data[id].ID){
              dashboard_leads_data[id].order = ind;
            }
          }
        });

        vue_leads_list.run_update_list();

        if(orders.length > 1){
          jQuery(document.body).trigger('update_items_order', {order: orders});
        }
      },
    });

    jQuery( ".leads-list" ).on( "sortover", function( event, ui ) {
      jQuery(this).css({'background': '#eee'});
    } );

    jQuery( ".leads-list" ).on( "sortout", function( event, ui ) {
      jQuery(this).css({'background': 'none'});

    } );

    jQuery( ".leads-list" ).on( "sortreceive", function( event, ui ) {

      console.groupCollapsed('Sort receive');

      var order = -1;
      var post_id = ui.item.find('a').data('post_id');
      var list_id =  ui.item.closest('ul').data('list');
      var list_id_prev = ui.item.children('a').data('list');
      var orders = [];

      // set order for all items in list
      var items = jQuery(event.target).find('a');


      items.each(function(ind, el){
        var post_id = parseInt(el.dataset.post_id);
        orders.push({post_id: post_id, order: ind});
        for(id in dashboard_leads_data){
          if(post_id == dashboard_leads_data[id].ID){
            dashboard_leads_data[id].order = ind;
          }
        }
      });


      if(orders.length > 1){
        jQuery(document.body).trigger('update_items_order', {order: orders});
      }


      console.log('Moved from: ' + list_id_prev + ' to: ' + list_id);
      console.log('Sorted id: ' + post_id);

      // search item in global items array and update value for list
      for(ind in dashboard_leads_data){
        if(post_id == dashboard_leads_data[ind].ID){

          list_id_prev = dashboard_leads_data[ind].lead_stage;
          dashboard_leads_data[ind].lead_stage      = list_id;
          dashboard_leads_data[ind].meta.lead_stage = list_id;
          order = dashboard_leads_data[ind].order

          console.log(dashboard_leads_data[ind].ID + '. patient: ' + dashboard_leads_data[ind].meta.patient_data.name + ' new col: '+ dashboard_leads_data[ind].lead_stage);
        }
      }

      // update changes in Vue object
      vue_leads_list.run_update_list();
      console.log(vue_leads_list.leads[list_id]);

      // change visual part of lists
      equal_list_heights();
      jQuery(this).css({'background': 'none'});


      // fire trigger to save changes in backend
      jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

      var user_name = jQuery('#user_name').val();
      var user_id = jQuery('#user_id').val();

      jQuery(document.body).trigger('update_lead_log', {
        post_id: post_id,
        list_id_prev: list_id_prev,
        list_id_new: list_id,
        user_name: user_name ,
        user_id:   user_id ,
        event: 'stage_changed'
      });

      console.groupEnd('---');
    });
  });


/**
* function that makes height of all lists on leads' page one and the same;
*/
function equal_list_heights(){
  var height = 0;

  jQuery('.leads-list').css({'min-height': 0 + 'px'});

  jQuery('.leads-list').each(function(ind, el){
    height = Math.max(height, jQuery(el).height());
  });


  jQuery('.leads-list').css({'min-height': height + 50 + 'px'});
}


jQuery(document.body).on('update_items_order', function(e, data){
  console.groupCollapsed('update_items_order');

  var data_post = {
    action : 'update_leads_order',
    order: data.order,
  };

  console.log(data_post);

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.log(data);
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd();
     }
  });

})

jQuery(document.body).on('save_dragged_item', function(e, data){
  console.groupCollapsed('save_dragged_item');

  var data_post = {
    action : 'update_leads_list',
  };

  for(id in data){
    data_post[id] = data[id];
  };

  console.log('data_post:');
  console.log(data_post);

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.log(data);
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd('---');
     }
  });
})

jQuery(document.body).on('update_lead_log', function(e, data){
  console.groupCollapsed('update lead log');

  console.log(data);

  var data_post = {
    action : 'update_leads_log',
  };

  for(id in data){
    data_post[id] = data[id];
  };


  var date = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

  var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();

  data_post.date_formatted = date_formatted;

  var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

  data_post.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +date.getDate()+ ' ' + date.getHours() + ':' + minutes;


  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.log(data);

      if('object' === typeof(single_lead)){
        single_lead.logs = data.logs;
      }
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd('---');
     }
  });
})
jQuery(document).on('update_app',function(){

})


// class to work with leads
var parse_leads = {
  leads: {},

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
  *
  */
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

  // check if passed lead mathces current filter values
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

  get_leads: function (){
    return this.leads;
  },

  get_leads_for_list: function(){
    var leads = [];

    var now = new Date();

    for(id in this.leads){
      var data = {};
      var date_received = new Date(this.leads[id].post_date);
      var reminder_date = new Date(this.leads[id].meta.reminder);

      data.overdue = (this.leads[id].meta.reminder !== '' && now > reminder_date)? 'yes' : 'no';

      data.alarms      = (this.leads[id].meta.reminder)? 'yes' : 'no';
      data.post_id     = this.leads[id].ID;
      data.name        = this.leads[id].meta.patient_data.name;
      data.clinic      = this.leads[id].meta.patient_data.clinic;
      data.treatment   = this.leads[id].meta.patient_data.treatment;
      data.sourse      = this.leads[id].meta.patient_data.sourse;
      data.team        = this.leads[id].meta.lead_specialists;
      data.lead_stage  = this.leads[id].lead_stage;
      data.reminder    = this.leads[id].meta.reminder;
      data.permalink   = this.leads[id].permalink;
      data.filter_data = this.leads[id].filter_data;

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
  *
  */
  get_total_revenue : function(){
    revenue = 0;

    for(id in this.leads){
      revenue += parseInt(this.leads[id].meta.treatment_value.value);
    }

    return revenue;
  },

  get_total_leads: function(){
    return this.leads.length;
  },

  get_average_leads: function(formatted){
    var revenue = this.get_total_revenue();
    var total   = this.get_total_leads();

    if(formatted){
      return formatMoney(revenue/total, 2, ".", ",") ;
    }else{
      return revenue/total;
    }
  },

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

    if(date_diff < this.ms_to_minute){
      return 'Just recieved';
    }


    // how many days

    var days_data = this.get_days_passed(date_diff);


    var hours_data = this.get_hours_passed(days_data.date_diff);

    var minutes_data = this.get_minutes_passed(hours_data.date_diff);

    var time_passed = '';
    var days_text     = (days_data.value > 1)? 'd ' : 'd ';
    var hours_text    = (hours_data.value > 1)? 'h ' : 'h ';
    var minutes_text = (minutes_data.value > 1)? 'm ' : 'm ';

    time_passed += (days_data.value > 0)?  days_data.value + days_text : '';
    time_passed += (hours_data.value > 0)? hours_data.value + hours_text : '';
    time_passed += (minutes_data.value > 0)?  minutes_data.value + minutes_text : '';

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

  // component that displays total revenue on dahsboard page

  var icon_encr = '<svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>';

  var icon_decr = '<svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>';

  var blank_html = ''
var vue_select_components = [];
var select_imitation;
var select_imitation_icon;
var input_field;
var datepicker_field;
var wait_block;

var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sources': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',
};
var select_mixin = {
  data: function () {
    return {
      select_name : this._select_name,
      options: this._options,
      selected:this._selected,
      isExpanded: this._isExpanded,
      isSelected: this._isSelected,
      isHiddenSelect: this._isHiddenSelect,
      isHiddenImitation: this._isHiddenImitation,
    }
  },

  props:{
    _select_name : String,
    _options: Array,
    _selected: String,
    _isExpanded: String,
    _isSelected: Array,
    _isHiddenSelect: Boolean,
    _isHiddenImitation: Boolean,
  },

  created: function(){
  },

  mounted:function(){
  },

  methods: {
    change: function(){
      this.$emit('update_list', {val: this.selected, name: this.select_name});
    },

    // toggles state of expanded list initation
    expand_select: function(){
       discard_selects();
       collapse_filters('');
       collapse_top_lists();
      this.isExpanded = 'expanded';
    },

    // toggles select in expanded dropdown
    update_selected_option: function(){
      for(id in this.options){
        this.isSelected[this.options[id]] = false;
      }

      this.isSelected[this.selected] = true;
    },

    // changes data on option click
    imitate_select_option: function(value){
      this.selected = value;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    },

     // closes select
    discard_select:function(){
      this.isExpanded = '';
    },

     // updates options of a select
    update_options: function(options){
      this.options = options;
      this.selected = options[0];
      this.isExpanded = '';
      this.update_selected_option();
    },

    // sets value for a select
    set_value: function(key, value){
      this[key] = value;
      this.$emit('update_list', { val :this.selected, name: this.select_name});


      if(key === 'options'){
        var vm = this;
        var select = vm.$el.getElementsByClassName( 'select-imitation__dropdown' )[0].getElementsByClassName( 'select-imitation__list' )[0];
        vm.$el.setAttribute("style", "width: auto");

        Vue.nextTick(function() {
          var width = (window.outerWidth < 768)? window.outerWidth - 30 : select.clientWidth + 62;
          vm.$el.setAttribute("style", "width:" + (width) + 'px');
        });
      }
    },

    resert_width: function(){
      var vm = this;
      vm.$el.setAttribute("style", "width: auto");
    },

    // gets value of a select
    get_value: function(){
      return this.selected;
    },

    // gets name of a select
    get_name: function(){
      return this.select_name;
    }
  },
}
select_imitation = Vue.component('select-imitation', {

  mixins: [select_mixin],

  template: '<div class="select-imitation" v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})
select_imitation_icon = Vue.component('select-imitation-icon', {
  mixins: [select_mixin],

  data: function () {
    return {
      icon : this._icon,
    }
  },

  props:{
    _icon: String,
  },


  template: '<div class="select-imitation has-icon select-imitation_shift-bottom" v-bind:class="{ expanded: isExpanded}" > <span v-html="icon"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})

datepicker_field = Vue.component('datepicker', {
  data: function () {
    return {
      name:  this._name,
      value : this._value,
    }
  },

  props:['_value', '_name'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'M d Y H:i',

      onClose:function(dp,$input){
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: vm.value});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input type="text" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" >',
});
input_field = Vue.component('input-field', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="leads-block__input":readonly="readonly == 1">',

});

var vue_selects = {};
var vue_dashboard_totals;
var filter_dashboard;
var vue_team_perfomance;
var dashboard_convertions;
var vue_top_items = {};


function init_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    filter_dashboard = new Vue({
      el: '#dashboard-filters',

      data:{
        filters:{
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sourses:    'All Sources',
          team:       'All Team',
        },
      },

      mounted: function(){
        this.init_filters();
      },

      computed: {
        show_filter_clear_btn: function(){
          var show = false;
          for(var filter_name in this.filters){
            show = (this.filters[filter_name].search('All') !== 0)? true: show;
          }

          return show ? '' : 'visuallyhidden';
        },
      },

      methods: {
        //inits filters
        init_filters: function(){
          var props;
          for(select_name in dashboard_filter_data){
            props =  {
              icon: icons_selects[select_name],
              isExpanded: '',
              isSelected: [],
              isHiddenSelect: true,
              isHiddenImitation: false,
            };

            props.options = dashboard_filter_data[select_name];
            props.selected = dashboard_filter_data[select_name][0];

            vue_select_components.push(this.$refs[select_name]);

            for( id in props){
              this.$refs[select_name].set_value(id, props[id]);
            }
          }
        },

        // sets all filters' values to default value
        resert_filters: function(){
          this.filters = {
            clinics:    'All Clinics',
            treatments: 'All Treatments',
            campaigns:  'All Campaigns',
            sources:    'All Sources',
            team:       'All Team',
          };

          for(select_name in this.filters){
            this.$refs[select_name].set_value('selected', this.filters[select_name]);
          }
        },

        run_filter_list: function(event){
          if('undefined' !== typeof(event.val)){
            this.filters[event.name] = event.val;

            if('undefined' !== typeof(vue_dashboard_totals)){
              vue_dashboard_totals.update_filters(this.filters);
            }
          }
        }
      },
    });
  }
}

function collapse_filters(select_name){}


function update_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    for(select_name in filter_data){
       filter_dashboard.$refs[select_name].set_value('options', filter_data[select_name]);
       filter_dashboard.$refs[select_name].set_value('selected', filter_data[select_name][0]);
    }
  }
}

jQuery('.site-inner').click(function(e){
  if(!jQuery(e.target).closest('.select-imitation').length){
   collapse_top_lists('');
   discard_selects();
  }
})

if('undefined' !== typeof(is_dashboard)){
  init_filters(dashboard_filter_data);
}
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
        sourses:    'All Sourses',
        team:       'All Team',
      },

      days_count: 30,

      leads_obj      : dashboard_leads_data,
      leads_obj_prev : dashboard_leads_data_prev,
    },

    computed:{
      filtered_leads: function(){
        var leads  = this.leads_obj;
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

      filtered_leads_prev: function(){
        var leads  = this.leads_obj_prev;
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

      leads: function(){
        return this.filtered_leads.length;
      },

      revenue_val_prev: function(){

        if(!this.leads_obj_prev){
          return 0;
        }
        var total = 0;

        for(id in this.filtered_leads_prev){
          var value = this.filtered_leads_prev[id].meta.treatment_value.value;
          total += get_sum_from_price(value);
        }

        return total;
      },

      revenue_val: function(){
        var total = 0;

        for(id in this.filtered_leads){
          var value = this.filtered_leads[id].meta.treatment_value.value;
          total += get_sum_from_price(value);
        }

        return total;
      },

      revenue: function(){
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

      up_down: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'up': 'down';
      },

      change_type: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'encr': 'decr';
      },

      percent_change: function(){
        return Math.abs(100 - (this.revenue_val / this.revenue_val_prev)*100).toFixed(2);
      }
    },

    mounted: function(){},

    methods:{
      set_value: function(key, value){
        this[key] = value;
      },

      update: function(){
        this.leads_obj      = dashboard_leads_data;
        this.leads_obj_prev = dashboard_leads_data_prev;
     },

      update_filters: function(filters){
        this.filters = filters;
      }
    },
  })
}

function update_dashboard_totals(days_count){
  if('undefined' !== typeof(is_dashboard)){
    vue_dashboard_totals.update();
      vue_dashboard_totals.set_value('days_count', days_count);
  }
}

if('undefined' !== typeof(is_dashboard)){
  var top_items = ['source', 'treatment', 'clinic', 'campaign'];

  for(top_type in top_items){
    vue_top_items[top_items[top_type]] = new Vue({
      el: '#top_'+top_items[top_type],

      data: {
        leads_obj         : dashboard_leads_data,
        label             : 'leads',
        type              : top_items[top_type],
        display_type      : 'Leads',
      },

      computed: {
        data_by_source: function(){
          var data = {};

          for(id in this.leads_obj){
            var meta         = this.leads_obj[id].meta;
            var patient_data = meta.patient_data;

            if(patient_data[this.type] === null || typeof(patient_data[this.type]) === 'undefined') continue;

            if(typeof(data[patient_data[this.type]]) === 'undefined'){

              data[patient_data[this.type]] = {items: [], total: 0, converted: 0, revenue: 0};
            }
            var revenue = get_sum_from_price(meta.treatment_value.value);

            data[patient_data[this.type]].items.push(this.leads_obj[id]);
            data[patient_data[this.type]].total++;
            data[patient_data[this.type]].converted = ('yes' == this.leads_obj[id].is_converted)?  data[patient_data[this.type]].converted + 1:  data[patient_data[this.type]].converted ;
            data[patient_data[this.type]].revenue += revenue;
          }
          return data;
        },

        name: function(){
          switch(this.display_type){
            case 'Leads':
              var result    = 'Unavailable';
              var max_leads = -1;
              var leads_converted = -1;
              for(id in this.data_by_source){
                result = (this.data_by_source[id].total >= max_leads && this.data_by_source[id].converted >= leads_converted)? id : result;
                max_leads = Math.max(max_leads, this.data_by_source[id].total);
                leads_converted = Math.max(leads_converted, this.data_by_source[id].converted);

              }
              return result;

              break;
            case 'Revenue':
              var result    = 'Unavailable';
              var max_revenue = -1;

              for(id in this.data_by_source){
                result = (this.data_by_source[id].revenue >= max_revenue)? id : result;
                max_revenue = Math.max(max_revenue, this.data_by_source[id].revenue);
              }

              return result;
              break;
          }
        },

        leads: function(){
          if(typeof(this.data_by_source[this.name]) === 'undefined'){
            return 'no';
          }
          return this.data_by_source[this.name].total;
        },

        leads_total: function(){
          return this.leads_obj.length;
        },

        revenue: function(){
          if(typeof(this.data_by_source[this.name]) === 'undefined'){
            return '-';
          }

          revenue = this.data_by_source[this.name].revenue;

          return '£'+ formatMoney(revenue, 2, ".", ",");
        },

        rate: function(){
          if(typeof(this.data_by_source[this.name]) === 'undefined'){
            return '-';
          };

          return (((this.data_by_source[this.name].converted * 100) / this.leads_total)).toFixed(2);
        },
      },

      mounted: function(){
        var vm = this;
        vm.init_select();

        Vue.nextTick(function() {
          vm.$refs.display_type.resert_width();
        });
      },

      methods: {
        update: function(){
          this.leads_obj = dashboard_leads_data;
        },

        run_update_data: function(event){
          if('undefined' !== event.val){
            this.display_type = event.val;
          }
        },

        init_select: function(){
          var props =  {
            select_name: 'select_'+top_items[top_type],
            options: ['Leads', "Revenue"],
            selected: 'Leads',
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          for( id in props){
            this.$refs.display_type.set_value(id, props[id]);
          }
        },
      },
    })
  }
}

function update_top_sources(){
  if('undefined' !== typeof(is_dashboard)){
    for(top_type in top_items){
      vue_top_items[top_items[top_type]].update();
    }
  }
}

function collapse_top_lists(name){
  if('undefined' !== typeof(is_dashboard)){
    for(top_type in top_items){
      if(name !== top_items[top_type]){
        vue_top_items[top_items[top_type]].$refs.display_type.discard_select();
      }
    }
  }
}

if('undefined' !== typeof(is_dashboard)){
  vue_team_perfomance = new Vue({
    el: '#team_perfomance',

    data:{
      team_data: team_perfomance.team,
    },

    computed: {
      team: function(){
        return this.team_data;
      }
    },

    mounted: function(){

      this.update_list();

      vue_select_components.push(this.$refs.posts_list);
    },

    methods:{
      run_update_list: function(event){
        if(typeof(event.val) !=='undefined'){
          if(event.val === 'all'){
            this.team_data = team_perfomance.team;
          }else{
            var new_team = {};
            for(id in team_perfomance.team){
              if(team_perfomance.team[id].user_position === event.val){
                new_team[id] = team_perfomance.team[id];
              }
            }
            this.team_data = new_team;
          }
        }
      },

      update_list: function(){
        var props =  {
          select_name: 'team_perfomance_list',
          options: team_perfomance.positions,
          selected: team_perfomance.positions[0],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        for( id in props){
          this.$refs.posts_list.set_value(id, props[id]);
        }
      },
    },
  })
}


function update_team_perfomance(){
  if('undefined' !== typeof(is_dashboard)){
    vue_team_perfomance.run_update_list({val: 'all'});
  }
}


function discard_selects(){
  for(id in vue_select_components){
    vue_select_components[id].discard_select();
  }
}
if('undefined' !== typeof(is_dashboard)){
  dashboard_convertions =new Vue({
    el: '#dashboard-convertions',

    data: {
      leads_obj: dashboard_leads_data,
      leads_obj_prev : dashboard_leads_data_prev,
      days_count: 30,
      display_type: 'Leads',
      doughnut: {},
    },

    computed: {
      convertions: function(){
        var convertions_by_type = {};

        for(id in this.leads_obj){
          var lead = this.leads_obj[id];
          var source = lead.meta.patient_data.source;
          // var exp = new RegExp("\\D", "gi");
          source = (source === null || source === '')? 'Other' : source;

          if(typeof(convertions_by_type[source]) === 'undefined'){
            convertions_by_type[source] = [];
          }

          if('yes' === lead.is_converted){

            summ = get_sum_from_price(lead.meta.treatment_value.value);

            convertions_by_type[source].push({
              time_converted : lead.converted_time,
              time_created   : lead.post_date,
              summ           : summ,
            });
          }
        }
        return convertions_by_type;
      },

      convertion_rate: function(){
        total = 0;

        for(id in this.leads_obj){
          var lead = this.leads_obj[id];
          if('yes' === lead.is_converted){
            total++;
          }
        }

        return Math.ceil((total/this.total_leads)*100);
      },

      convertion_rate_prev: function(){
        total = 0;

        if(!this.leads_obj_prev || this.leads_obj_prev.length==0){
          return 0;
        }

        for(id in this.leads_obj_prev){
          var lead = this.leads_obj_prev[id];
          if('yes' === lead.is_converted){
            total++;
          }
        }

        return Math.ceil((total/this.total_leads_prev)*100);
      },

      total_leads: function(){
        return this.leads_obj.length;
      },

      total_leads_prev: function(){
        return this.leads_obj_prev.length;
      },

      diagram_info: function(){
        var info = {
          labels : [],
          data: [],
        };

        if(this.display_type === 'Leads'){
          for(id in this.convertions){
            percents = (this.convertions[id].length / this.total_leads) * 100;
            info.labels.push(id);
            info.data.push(percents.toFixed(2));
          };
        }

        if(this.display_type === 'Revenue'){
          for(id in this.convertions){
            info.labels.push(id);
            var summ = 0;

            for(i in  this.convertions[id]){
              summ += this.convertions[id][i].summ;
            }

            // summ = formatMoney(summ, 2, ".", ",")
            info.data.push(summ);
          };
        }
        return info;
      },

      suffix: function(){
        return (this.display_type === 'Leads')? '%' : false
      },

      prefix: function(){
        return (this.display_type === 'Revenue')? '£' : false
      },

      average_time: function(){
        var total_time = 0;
        var counter =0;

        for(id in this.convertions){
          for(i in this.convertions[id]){
            var time_created = new Date(this.convertions[id][i].time_created);
            var time_converted = new Date(this.convertions[id][i].time_converted);
            counter++;

            total_time += time_converted - time_created;
          }
        }

        if(counter === 0){
          return 'Unavailable';
        }

        var average_time = Math.ceil(total_time/counter);

        var t = date_difference.construct(0,  average_time);

        return t;
      },

      icon: function(){
        return (this.convertion_rate > this.convertion_rate_prev)? icon_encr: icon_decr;
      },

      delta: function(){
        if(this.convertion_rate_prev <= 0){
          return 100;
        }

        return Math.abs(100 - ((this.convertion_rate /this.convertion_rate_prev) * 100)).toFixed(2);
      },

      up_down: function(){
        return (this.convertion_rate >= this.convertion_rate_prev)? 'up': 'down';
      },

      change_type: function(){
         return (this.convertion_rate >= this.convertion_rate_prev)? 'encr': 'decr';
      },
    },

    mounted: function(){
      var vm = this;
      vm.init_select();

      Vue.nextTick(function() {
        vm.draw_doughnut();
      });
    },

    methods: {
      update: function(days_count){
        var vm = this;
        vm.leads_obj      = dashboard_leads_data;
        vm.leads_obj_prev = dashboard_leads_data_prev;
        vm.days_count = days_count;
        vm.update_doughnut();
      },

      draw_doughnut: function(){
        var config = prepare_donnut_data(this.diagram_info.data, this.diagram_info.labels, this.suffix, this.prefix);

        document.getElementById('convertions-canvas').height = jQuery(window).width() < 768 ? '300' : '250';

        var ctx = document.getElementById('convertions-canvas').getContext('2d');
        this.doughnut = new Chart(ctx, config);
      },

      run_update_convertions: function(event){
        if('undefined' !== typeof(event.val)){
          var vm = this;
          vm.display_type = event.val;
          vm.update_doughnut();
        }
      },

      update_doughnut: function(){
        var vm = this;
        if('undefined' !== typeof(vm.doughnut.data)){
          _prefix = this.prefix;
          _suffix = this.suffix;
          vm.doughnut.data.datasets[0].data = vm.diagram_info.data;
          vm.doughnut.data.labels = vm.diagram_info.labels;
          vm.doughnut.update();
        }
      },

      init_select: function(){
        var props =  {
          select_name: 'team_perfomance_list',
          options: ['Leads', "Revenue"],
          selected: 'Leads',
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        for( id in props){
          this.$refs.display_type.set_value(id, props[id]);
        }
      },
    }
  });
}

function update_confertions(days_count){
  if('undefined' !== typeof(dashboard_convertions)){
    dashboard_convertions.update(days_count);
  }
}
var vue_leads_list;

var overdue_timeout;

Vue.directive('min-height', {

  componentUpdated: function (el, binding, vnode) {
    el.setAttribute("style", "min-height:" +binding.value + 'px');
  },
});

if('undefined' !== typeof(is_lead_list)){

  vue_leads_list = new Vue({
    el: '#leads-list',

    data:{
      height_value: 0,
      scroll_height: 0,

      overdue_checked: false,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sources',
        team:       'All Team',
      },

      search_value: '',

      leads:{},
    },

    computed:{
      get_convertion: function(){
        var vm = this;

        return function (col_id) {
          var leads_total = 0;
          var leads_column_total = 0;

          for(id in this.leads_filtered){
            leads_total += this.leads_filtered[id].length;
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

      leads_filtered: function(){
        var leads_filtered = {};
        var filters = {};

        for(var column_name in this.leads ){
          leads_filtered[column_name] = [];
        }

        for(var filter_name in this.filters){
         if(this.filters[filter_name].search('All') !== 0){
            filters[filter_name] = this.filters[filter_name];
          }
        }


        for(var column_name in this.leads){
          var fields_search = ['clinic', 'name', 'treatment', 'source', 'team', 'campaign'];

          for(var id in this.leads[column_name]){
            var lead     = this.leads[column_name][id];
            var is_match = true;

            // apply filter
            for(filter_id in filters){
              console.log(filter_id);
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
                 var value = lead[field];
                 var _found = exists_in_object(value, this.search_value);

                 search_match = (_found)? true : search_match;
              }

              is_match = search_match && is_match;
            }

            //apply overdue
            if(this.overdue_checked){
              is_match = is_match && lead.reminder;
            }


            if(is_match){
              leads_filtered[column_name].push(lead);
            }
          }
        }

        return leads_filtered;
      },

      show_filter_clear_btn: function(){
        var show = false;
        for(var filter_name in this.filters){
          show = (this.filters[filter_name].search('All') !== 0)? true: show;
        }

        return show ? '' : 'visuallyhidden';
      },

      alarms: function(){
        var alarms = 0;
        var overdue = 0;

        for(col_id in this.leads_filtered){
          for(id in this.leads_filtered[col_id]){
            var lead = this.leads_filtered[col_id][id];
            alarms = (lead.reminder)? alarms+1 : alarms;
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
      overdue_checked: function(show){
      }
    },

    mounted: function(){
      console.groupCollapsed('vue inits list');
      var vm = this;
      vm.init_filters();

      Vue.nextTick(function() {
        vm.handle_resize();
      });

      window.addEventListener('resize', this.handle_resize);

      var leads = parse_leads.construct();
      _leads = leads.get_leads_for_list();
      vm.update_leads(_leads);
      console.log(vm.leads);
      console.groupEnd('---');
     },

    methods:{
      //fits horisontal scroll container to screen height
      handle_resize (event) {
        console.groupCollapsed('Leads list resize');
        //resert height of scroll content
        this.$refs.horizontal_scroll.setAttribute("style", "min-height:0");

        //calculate element height
        this.height_value = this.$refs.parent.clientHeight;


        //calculate scroll-block height
        this.scroll_height = this.height_value - this.$refs.spacer1.clientHeight - this.$refs.spacer2.clientHeight - this.$refs.container_filter.clientHeight;

        this.$forceUpdate();

        console.log('Scroll area height:' + this.scroll_height);
        console.groupEnd('----');
      },

      init_datepicker: function(){
        init_date_range();
      },

      //inits filters
      init_filters: function(){
        var props;

        for(select_name in dashboard_filter_data){
          props =  {
            icon: icons_selects[select_name],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          props.options = dashboard_filter_data[select_name];
          props.selected = dashboard_filter_data[select_name][0];

          vue_select_components.push(this.$refs[select_name]);

          for( id in props){
            this.$refs[select_name].set_value(id, props[id]);
          }
        }
      },

      // sets all filters' values to default value
      resert_filters: function(){
        this.filters = {
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
        };

        for(select_name in this.filters){
          this.$refs[select_name].set_value('selected', this.filters[select_name]);
        }
      },

      //changes filters values
      run_filter_list: function(select_value){
        if(select_value){
          console.log('leads were filtered: ' + select_value.name + ' = ' +  select_value.val);
          this.filters[select_value.name] = select_value.val;
        }
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

      update_leads: function(leads){
        console.log('Update leads');
        var temp_leads = {};
        this.leads = {};

        for(id in leads){
          if('undefined'  === typeof(temp_leads[leads[id].lead_stage])){
            temp_leads[leads[id].lead_stage]  = [];
          }
          temp_leads[leads[id].lead_stage].push(leads[id]);
        }

        for(id in temp_leads){
          temp_leads[id].sort(this.sort_by_order);
        }

        this.leads = temp_leads;
      },

      set_data: function(key, value){
        this[key] = value;
      },

      run_search: function(search){
        console.log('run search');
        this.search_value = search;
      }
    },
  })

}

function update_leads_filters(filters){
  if('undefined' !== typeof(is_lead_list)){
    for(select_name in filters){
      vue_leads_list.$refs[select_name].set_value('options', filters[select_name]);
      vue_leads_list.$refs[select_name].set_value('selected', filters[select_name][0]);
    }
  }
}

function update_leads_list(){
  if('undefined' !== typeof(is_lead_list)){
    vue_leads_list.run_update_list();
  }
}

function exists_in_object(obj, search){
  if(typeof(obj) === 'string'){
    search = search.toLowerCase();
    obj = obj.toLowerCase();
    return obj.search(search) >= 0;
  }

  var found = false;

  for(id in obj){
    var _found = exists_in_object(obj[id], search);
    found = (_found)? true : found;
  }

  return found;
}
if('undefined' !== typeof(is_single_lead)){
  var single_lead = new Vue({
    el: '#single-lead',

    data: {
      patient_data: {},
      treatment_value: {
        value: 0,
        terms: '',
        mounthly: '',
        treatment: '',
      },
      treatment_coordinator: {},
      specialists_data: {},
      lead_data: {},
      notes: [],
      files: [],
      logs:  [],
      note_text: '',
      reminder: '',
      new_file: '',
      save_text: 'Save Changes',
      requre_save : false,
      selected_specialist: false,
    },

    computed:{
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

      get_treatment_value: function(){
        return this.treatment_value.value;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.treatment_value.terms){
          case '12 Months':
             $return = 12;
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
        var summ = get_sum_from_price(this.get_treatment_value)/this.get_terms_count;
        summ = summ.toFixed(2);
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },


    },

    watch: {
      note_text: function(){
        this.$refs.note_textarea.style.height = '';
        this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
      },

      'treatment_value.terms': function(val){
      },
    },

    created: function(){},

    mounted: function(){
      this.notes = lead_notes;
      this.files = lead_files;
      this.logs  = lead_logs;
      this.specialists_data  = specialists_data;
      this.init_select();
    },

    methods: {
      price_to_value: function(){
        var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;
        summ = get_sum_from_price(summ);
        this.$refs.price_input_field.set_value(summ);
      },


      value_to_price: function(){
        var summ = '£' + formatMoney(this.treatment_value.value,2, '.',',');
         this.$refs.price_input_field.set_value(summ);
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

        props.options = ['Live Chat', 'Instagram', 'Google PPC', 'Website', 'Phone', "Walk In", "Other"];

        for( id in props){
          this.$refs['source_select'].set_value(id, props[id]);
        }

        props.options = specialists;

        for( id in props){
          this.$refs['lead_specialissts_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['source_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select']);


        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
        };

        for( id in props){
          this.$refs['treatments_select'].set_value(id, props[id]);
          this.$refs['treatments_select2'].set_value(id, props[id]);
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
          options: ['Full Payment', '12 Months', '24 Months', '36 Months', '48 Months'],
        };

        for( id in props){
          this.$refs['terms_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['terms_select']);
      },

      save_lead_meta: function(key_meta, key_this){
        wait_block.show();
        var vm = this;

        if(typeof(key_meta) !== 'string'){
          var meta = {
            patient_data          : this.patient_data,
            treatment_value       : this.treatment_value,
            treatment_coordinator : this.treatment_coordinator,
            lead_notes            : this.notes,
            reminder              : this.reminder,
          };
        }else{
          var  meta = {};
          meta[key_meta] = this[key_this];
        }

        var data = {
          meta: meta,
          action                : 'update_lead_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
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

      update_lead: function(data, key){
        if('object' === typeof(data)){
          if('object' === typeof(this[key])){
            var val = (data.name === 'value' && key == 'treatment_value')? (data.val) : data.val;
            this[key][data.name] = val;
          }
          if('string' === typeof(this[key])){
            this[key] = data.val;
          }

          this.requre_save = true;
          var vm = this;

          Vue.nextTick(function(){
            vm.$forceUpdate();
          });
        }
      },

      do_delete_or_return: function(url){

        wait_block.show();

        if(parseInt(this.lead_data.lead_id) < 0){
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
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            if('undefined' != typeof(data.redirect)){
              location.href = data.redirect;
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
        }
      },

      add_note: function(){
        if(!this.note_text){
          alert('Please enter some text');
          return false;
        }

        this.requre_save = true;

        var date = new Date();

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

        var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

        var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + minutes;

        var new_note = {
          'date'      : date_formatted,
          'user_name' : this.lead_data.user_name,
          'text'      : this.note_text,
        };

        this.notes.push(new_note);
        this.note_text = '';
        this.$refs.note_textarea.style.height = '';

        this.save_lead_meta('lead_notes', 'notes');
      },

      update_specialists: function(event){
        if('undefined' !== typeof(event.val) ){

          if(this.lead_data.lead_id < 0){
            alert('Create lead before assigning it to a specialist, please');
            return false;
          };

          if(this.specialists_data[event.val].show === 'yes')
            {
               return false;
            };

          this.specialists_data[event.val].show = 'yes';
          this.save_sepcialists_meta();

          jQuery(document.body).trigger('update_lead_log', {
            post_id     : parseInt(this.lead_data.lead_id),
            nonce       : jQuery('[name=lead_data]').val(),
            user_name   : this.lead_data.user_name,
            user_id     : this.lead_data.user_id,
            event       : 'specialist_updated',
            text: 'Assined to ' +  event.val + ' by ' + this.lead_data.user_name,
          })
        }
      },

      assign_specialist: function(){
        // this.selected_specialist = false;
        // this.save_sepcialists_meta();
      },

      remove_specialist: function(name){
        if(window.confirm("Confirm unassigning " + name + " from this lead")){
          this.specialists_data[name].show = 'no';
          this.save_sepcialists_meta();

          jQuery(document.body).trigger('update_lead_log', {
            post_id     : parseInt(this.lead_data.lead_id),
            nonce       : jQuery('[name=lead_data]').val(),
            user_name   : this.lead_data.user_name,
            user_id     : this.lead_data.user_id,
            event       : 'specialist_updated',
            text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
          })
        }
      },

      save_sepcialists_meta: function(){
        var meta = {};
        for(id in specialists_data){
          meta[specialists_data[id].user_id] = specialists_data[id].show;
        }

        var data = {
          meta: {
            lead_specialists: meta,
          },
          action                : 'update_lead_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        var vm = this;

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
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
        console.log('load_file');

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
            console.log(data);
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
              console.log(data);
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
    },
  })
}
if(typeof(is_lead_list) !=='undefined' || typeof(is_dashboard) !=='undefined' || typeof(is_single_lead) !=='undefined' ){
  var search = new Vue({
    el: '#search-form',

    data: {
      search_value: '',
    },

    computed:{
      isVisuallyHidden: function(){
        return typeof(is_lead_list) === 'undefined';
      },

      classes: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list ?
        'order-2 order-md-0 col-md-2 col-lg-4' : 'search-single col-md-2 col-lg-4'
      },

      show_search: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list? true: false;
      }
    },

    watch: {
      search_value: function(val){

        if(is_lead_list){
          if(val.length >= 3){
            vue_leads_list.run_search(val);
          }else{
            vue_leads_list.run_search('');
          }
        }

      }
    },

    methods:{
      run_search: function(search){
        this.search = search;
      }
    }
  });
}
wait_block = new Vue({
  el: '#wait-block',

  data: {
    class: '',
    text: '',
  },

  computed:{
    show_class: function(){
      return this.class;
    },

    wait_text: function(){
      return this.text;
    },
  },

  methods: {
    show: function(){
      this.text = 'Please wait';
      this.class = 'shown';
    },

    hide: function(text){
      this.text = '';
       this.class = '';
    }
  }
});