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
jQuery('.search-open').click(function(){
  jQuery('.search__wrapper').toggleClass('shown');
});
jQuery(document).ready(function(){
    jQuery('.reminder input').datetimepicker({
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
  last_7.setDate(last_7.getDate() - 7);
  var last_90 = new Date();
  last_90.setDate(last_7.getDate() - 90);
  var now     = new Date();
  var today_str = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();


  var last_7_str = (last_7.getMonth() + 1) + '/' + last_7.getDate() + '/' + last_7.getFullYear();
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
        'Past 90 Days': [
          last_90_str,
          today_str
        ],
    },
    "alwaysShowCalendars": true,
    "startDate": month_first_day,
    "endDate": today_str
  }, function(start, end, label) {

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    jQuery(document.body).trigger('get_leads_by_dates', {from: start.format('MMM DD YYYY') , to: end.format('MMM DD YYYY')});
  });
}

jQuery(document.body).on('get_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.group('leads updated by date');
      console.log(data);
      dashboard_leads_data = data.leads;
      team_perfomance      = data.team_perfomance;

      //dashboard
      update_filters(data.filter_data);
      update_dashboard_totals();
      update_top_sourses();
      update_team_perfomance();

      //leads_list
      update_leads_filters(data.filter_data);
      update_leads_list();

      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
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
              data: [1000, 5000, 10000, 7500], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [15000, 10250, 12000, 4000], //february, april, august, november
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

    var randomScalingFactor = function() {
      return Math.round(Math.random() * 100);
    };

    var colors = [
            '#f6b82f',
            '#ee63d2',
            '#8933f6',
            '#3354f6',
            '#01c58d',
          ]

    var data =  [
            10,
            30,
            47,
            3,
            10
          ];

    var labels = [
          'Live Chat',
          'Instagram',
          'Google PPC',
          'Website',
          'Phone'
        ]

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

                              return {
                                  // Instead of `text: label,`
                                  // We add the value to the string
                                  text: label + "  " + value + '%' ,
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

  jQuery(document).ready(function(){
    var chart_income = new Chart(chart, options_chart);

    document.getElementById('convertions-canvas').height = jQuery(window).width() < 768 ? '300' : '250';
    var ctx = document.getElementById('convertions-canvas').getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
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
jQuery(document).on('update_app',function(){

})


// class to work with leads
var parse_leads = {
  leads: {},

  construct: function(){
    if('undefined' !== typeof(is_dashboard)){
      this.filter();
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
select_imitation = Vue.component('select-imitation', {
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
    this.$emit('update_list', this.selected);
  },

  mounted:function(){
  },

  methods: {
    change: function(){
      this.$emit('update_list', this.selected);
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

  template: '<div class="select-imitation" v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})
select_imitation_icon = Vue.component('select-imitation-icon', {
  data: function () {
    return {
      icon : this._icon,
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
    _icon: String,
  },

  created: function(){
    this.$emit('update_list', this.selected);
  },

  mounted:function(){
  },

  methods: {
    change: function($event){
      this.$emit('update_list', { val :this.selected, name: this.select_name});
    },

    // toggles state of expanded list initation
    expand_select: function(){
       discard_selects();
       collapse_filters('');
       collapse_top_lists('');
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
      if(key === 'selected'){
        this.$emit('update_list', { val :this.selected, name: this.select_name});
      }
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

  template: '<div class="select-imitation has-icon select-imitation_shift-bottom" v-bind:class="{ expanded: isExpanded}" > <span v-html="icon"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})

var vue_selects = {};
var vue_dashboard_totals;
var vue_top_items = {};


function init_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    for( select_name in dashboard_filter_data){
      vue_selects['vue_'+select_name+'_select'] = new Vue({
        el: '#'+select_name+'-select',

        data: {
          select_name : select_name,
          options: filter_data[select_name],
          selected:filter_data[select_name][0],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        },

        mounted: function(){
          this.update_selected_option();
          this.isHiddenSelect = jQuery(window).width()   > 768 ? true : false;
          this.isHiddenImitation = jQuery(window).width() > 768 ? false : true;
        },

        methods: {
          // toggles state of expanded list initation
          expand_select: function(){
            this.isExpanded = 'expanded';
            collapse_filters(this.select_name);
            collapse_top_lists('');
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
            vue_dashboard_totals.update();
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

          change: function(){
          },

          // sets value for a select
          set_value: function(value){
            this.selected = value;
          },

          // gets value of a select
          get_value: function(){
            return this.selected;
          },

          // gets name of a select
          get_name: function(){
            return this.select_name;
          }
        }
      });
    }
  }
}

function collapse_filters(select_name){
  if('undefined' !== typeof(is_dashboard)){
    for( _select_name in dashboard_filter_data){
      if(_select_name != select_name){
        vue_selects['vue_'+_select_name+'_select'].discard_select();
      }
    }
  }
}


function update_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    var values = {};
    for(select_name in filter_data){
       vue_selects['vue_'+select_name+'_select'].update_options(filter_data[select_name]);
       values['vue_'+select_name+'_select'] = filter_data[select_name];
    }

    jQuery('#dashboard').find('.select-imitation').find('span').remove();
    jQuery('#dashboard').find('.select-imitation').find('div').remove();
    jQuery('#dashboard').find('.select-imitation').find('select').removeClass('hidden');

    jQuery('#dashboard').find('select').each(function(ind, el){
      var id = jQuery(el).data('vue-id');
      jQuery(this).theme_select({
        values: values[id],
      });
    })
  }
}

jQuery('.site-inner').click(function(e){
  if(!jQuery(e.target).closest('.select-imitation').length){
   collapse_filters('');
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
      rev:  0,
      leads: 0,
      avg: 0,
      up_down: '',
      percent_change: '',
      percents: '',
      icon: '',
      change_type: '',
    },

    mounted: function(){
      this.update();
    },

    methods:{
      set_value: function(key, value){
        this[key] = value;
      },

      update: function(){
        var leads = parse_leads.construct();
        this.rev   = '£'+ formatMoney(leads.get_total_revenue(), 2, ".", ",");
        this.leads = leads.get_total_leads();
        this.avg   = '£'+ formatMoney(leads.get_average_leads(), 2, ".", ",");
      }
    },
  })
}

function update_dashboard_totals(){
  if('undefined' !== typeof(is_dashboard)){
    vue_dashboard_totals.update();
  }
}

if('undefined' !== typeof(is_dashboard)){
  var top_items = ['sourse', 'treatment', 'clinic', 'campaign'];

  for(top_type in top_items){
    vue_top_items[top_items[top_type]] = new Vue({
      el: '#top_'+top_items[top_type],

      mounted: function(){
      },

      data: {
        name              : 'Unavailable',
        item_name         :  top_items[top_type],
        leads             :  0,
        label             : 'leads',
        revenue           :  '£'+ formatMoney(00, 2, ".", ","), // up || down
        rate              :  0,
        isExpanded        : '',
        isHiddenSelect    : true,
        isHiddenImitation : false,
        isSelected        : [],
        selected          :  'Leads',
        options           : ['Leads', 'Revenue']
      },

      mounted: function(){
        this.update_selected_option();
        this.isHiddenSelect = jQuery(window).width()   > 768 ? true : false;
        this.isHiddenImitation = jQuery(window).width() > 768 ? false : true;
        this.change();
      },

      methods: {
        change: function(){
          var leads = parse_leads.construct();
          var data  = leads.get_leads_data_by(this.item_name, this.selected);

          this.leads = data.leads;
          this.rate  = data.rate;
          this.name  = data.name;
          this.revenue = '£'+ formatMoney(data.revenue, 2, ".", ",");
          this.label  = (this.leads === 1)? 'lead' : 'leads';
        },

        // toggles state of expanded list initation
        expand_select: function(){
          this.isExpanded = 'expanded';
           collapse_filters('');
           collapse_top_lists(this.item_name);
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
        set_value: function(value){
          this.selected = value;
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
    })
  }
}

function update_top_sourses(){
  if('undefined' !== typeof(is_dashboard)){
    for(top_type in top_items){
      vue_top_items[top_items[top_type]].change();
    }
  }
}

function collapse_top_lists(name){
  if('undefined' !== typeof(is_dashboard)){
    for(top_type in top_items){
      if(name !== top_items[top_type]){
        vue_top_items[top_items[top_type]].discard_select();
      }
    }
  }
}

if('undefined' !== typeof(is_dashboard)){
  var vue_team_perfomance = new Vue({
    el: '#team_perfomance',

    data:{
      team: team_perfomance.team,
    },

    mounted: function(){
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

      vue_select_components.push(this.$refs.posts_list);
    },

    methods:{
      run_update_list: function(val){
        if(val){
          if(val === 'all'){
            this.team = team_perfomance.team;
          }else{
            var new_team = {};
            for(id in team_perfomance.team){
              if(team_perfomance.team[id].user_position === val){
                new_team[id] = team_perfomance.team[id];
              }
            }
            this.team = new_team;
          }
        }
      },
    },
  })
}


function update_team_perfomance(){
  if('undefined' !== typeof(is_dashboard)){
    vue_team_perfomance.run_update_list('all');
  }
}


function discard_selects(){
  for(id in vue_select_components){
    vue_select_components[id].discard_select();
  }
}
var vue_leads_list;

var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sourses': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',
};

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
      height: 0,
      scroll_height: 0,

      overdue_checked: false,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sourses:    'All Sourses',
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
          var fields_search = ['clinic', 'name', 'treatment', 'sourse', 'team', 'campaign'];

          for(var id in this.leads[column_name]){
            var lead     = this.leads[column_name][id];
            var is_match = true;

            for(filter_id in filters){
              switch(typeof(lead.filter_data[filter_id])){
                case 'object':
                  is_match = (lead.filter_data[filter_id].indexOf(filters[filter_id]) < 0)? false : is_match;
                 break;

                default:
                  is_match = (filters[filter_id] !== lead.filter_data[filter_id])? false : is_match;
                 break;
              }
            }

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
        return show;
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

        return {total: alarms, overdue: overdue};
      },
    },

    watch:{
      overdue_checked: function(show){
        if(overdue_timeout){
          clearTimeout(overdue_timeout);
        }

        if(show){
          jQuery('.lead-preview[data-overdue=no]').css({'opacity': 0});
          overdue_timeout = setTimeout(function(){
            jQuery('.lead-preview[data-overdue=no]').slideUp();
          },300)
        }else{
          jQuery('.lead-preview[data-overdue=no]').slideDown();
          overdue_timeout = setTimeout(function(){
            // jQuery('.lead-preview[data-overdue=no]').slideUp();
            jQuery('.lead-preview').css({'opacity': 1});
          },300)
        }
      }
    },

    mounted: function(){
      console.groupCollapsed('vue inits list');
      window.addEventListener('resize', this.handleResize);
      this.handle_resize();
      this.init_filters();
      var leads = parse_leads.construct();
      _leads = leads.get_leads_for_list();
      this.update_leads(_leads);
      console.log(this.leads);
      console.groupEnd('---');
     },

    methods:{
      //fits horisontal scroll container to screen height
      handle_resize (event) {
        console.groupCollapsed('Leads list resize');
        //resert height of scroll content
        this.$refs.horizontal_scroll.setAttribute("style", "min-height:0");

        //calculate element height
        this.height = this.$el.clientHeight;

        //calculate scroll-block height
        this.scroll_height = this.height - this.$refs.spacer1.clientHeight - this.$refs.spacer2.clientHeight - this.$refs.container_filter.clientHeight;

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
          sourses:    'All Sourses',
          team:       'All Team',
        };

        for(select_name in this.filters){
          this.$refs[select_name].set_value('selected', this.filters[select_name]);
        }
      },

      //changes filters values
      run_filter_list: function(select_value){
        if(select_value){
          console.log('leads were filtered: ' + select_value.name + ' = '+select_value.val);
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
var search = new Vue({
  el: '#search-form',

  data: {
    search_value: '',
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

  mounted: function(){
  }
});