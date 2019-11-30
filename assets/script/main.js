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


// sortrable actions
  jQuery( function() {

    jQuery(document).ready(function(){
      equal_list_heights();
    })


    jQuery("ul.leads-list" ).sortable({
      connectWith: "ul",
      receive: function( event, ui ){
        // console.log('activate');
        // console.log(event);
        // console.log(ui);
      },
      over: function( event, ui ){
      },
      stop : function( event, ui ){
        jQuery(document).trigger('update_leads_list');

        var leads_order_list = [];

        jQuery('ul.leads-list li').each(function(ind, el){
          var _el = jQuery(el).find('div.lead-preview');
          var parent = _el.closest('ul');
          var data = {};
          data.id = _el.data('id');
          data.list  = parent.data('list');
          data.index = jQuery(el).index();
          leads_order_list.push(data);
        })
      },
    });

    jQuery( ".leads-list" ).on( "sortover", function( event, ui ) {
      jQuery(this).css({'background': '#eee'});
    } );

    jQuery( ".leads-list" ).on( "sortout", function( event, ui ) {
      jQuery(this).css({'background': 'none'});
    } );

    jQuery( ".leads-list" ).on( "sortreceive", function( event, ui ) {
      equal_list_heights();
      jQuery(this).css({'background': 'none'});
    } );
  } );


  function equal_list_heights(){
      var height = 0;

      jQuery('.leads-list').css({'min-height': 0 + 'px'});

      jQuery('.leads-list').each(function(ind, el){
        height = Math.max(height, jQuery(el).height());
      });


      jQuery('.leads-list').css({'min-height': height + 50 + 'px'});
  }



// filters actions

var overdue_timeout;

jQuery('[name=show_overdue_only]').on('change',function(e){
  var show = jQuery(this).prop('checked');

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
})
jQuery.fn.theme_select = function(options) {

  if( is_mobile.anyphone() ) { return; }

  var html_output = '', html_dropdown = '', search ={};

  var select_options = options;

  var $instance = this;
  if($instance.length > 1) return true;

  select_options.class = (select_options.class)? select_options.class + ' '+  $instance.attr('class') :  $instance.attr('class') ;


  var tmpl_select = '<input id="{select_id}" v-on:change="{change}" type="hidden" name="{select_name}" value="{select_value}" class="select-imitation__value  "/><span class="select-imitation__view {class}" onclick="imitate_select_expand(this)">{select_text}</span><span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span><div class="select-imitation__dropdown"><ul class="select-imitation__list">{html_dropdown}</ul></div>';

  var tmpl_select_row = '<li data-value="{data_value}" class="{is_selected}" onclick="imitate_select_option(this)"><span>{data_text}</span></li>';


  var $options = $instance.find('option');

  if($options.length === 0) return false;

  $options.each(function(ind_option , el_option){

    search = {
      data_value: jQuery(el_option).val(),
      data_text: jQuery(el_option).text(),
      is_selected: jQuery(el_option).prop('selected') === true? 'selected' : '',
    };

    html_dropdown += str_replace(search, tmpl_select_row);

  });

  search = {
    html_dropdown: html_dropdown,
    class        : options.class || '',
    select_id    : $instance.attr('id') || '',
    select_name  : $instance.attr('name') || '',
    select_text  : $instance.find(':selected').text() || '',
    select_value : $instance.val() || '',
    change       : $instance.data('action'),
  };

  html_output = str_replace(search, tmpl_select);

  this.after(html_output);
  this.addClass('hidden').addClass('trigger-click');
};


jQuery.fn.theme_select_ul = function(){
    var $instance = this;

    var tmpl_select =  '<div class="select-imitation" ><span class="select-imitation__view {class}" onclick="imitate_select_expand(this)">{select_text}</span><span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span><div class="select-imitation__dropdown"><ul class="select-imitation__list">{html_dropdown}</ul></div></div>';

    var dropdown = $instance;

    var text = '';
    $instance.find('li').each( function(index, el) {
      jQuery(el).attr({'onclick' : 'imitate_select_option_2(this)' });

      if(jQuery(el).find('input').prop('checked') === true){
         text = jQuery(el).find('label').text();
         jQuery(el).addClass('class_name');
      }
    });

    search = {
      html_dropdown: $instance.html(),
      select_text: text,
    };

     html_output = str_replace(search, tmpl_select);

     this.after(html_output);
     this.remove();
};

function imitate_select_expand(obj){
  var position_class = 'bottom';

  jQuery('.select-imitation').removeClass('expanded');

  var position = jQuery(obj).closest('.select-imitation').offset().top;

  var bottom_screen = jQuery(window).scrollTop() + 3 *(jQuery(window).height()/4);

  position_class = position > bottom_screen? 'top' : 'bottom';

  jQuery(obj).closest('.select-imitation').toggleClass('expanded');
  jQuery(obj).closest('.select-imitation').addClass(position_class).find('.select-imitation__dropdown').addClass(position_class);
}

function imitate_select_option(obj){
  var $instance = jQuery(obj);
  var $parent = jQuery(obj).closest('.select-imitation');
  var $text   = $parent.find('.select-imitation__view');
  var $value  = $parent.find('.select-imitation__value');
  var $select = $parent.find('select');
  var value   = $instance.data('value');
  var text    = $instance.text();

  $instance.addClass('selected').siblings('li').removeClass('selected');
  $text.text(text);
  $value.val(value);
  $parent.removeClass('expanded').removeClass('top').removeClass('bottom');
  $parent.find('.select-imitation__dropdown').removeClass('top').removeClass('bottom');

  $parent.find('select.trigger-click').val(value).trigger('change');

  var trigger = $select.data('action');

  if(trigger){
    jQuery(document.body).trigger(trigger);
  }

}

function imitate_select_option_2(obj){
  var $instance = jQuery(obj);
  var $parent = jQuery(obj).closest('.select-imitation');
  var $text   = $parent.find('.select-imitation__view');
  var text    = $instance.find('label').text();

  $instance.addClass('selected').siblings('li').removeClass('selected');
  $text.text(text);
  $parent.removeClass('expanded');
  $parent.removeClass('expanded').removeClass('top').removeClass('bottom');
  $parent.find('.select-imitation__dropdown').removeClass('top').removeClass('bottom');

  $parent.siblings('select.trigger-click').val(value).trigger('change');
}

jQuery('.site-inner').click(function(e){
  if(!jQuery(e.target).closest('.select-imitation').length){
    jQuery('.select-imitation').removeClass('expanded')
  }
})
jQuery('.search-open').click(function(){
  jQuery('.search__wrapper').toggleClass('shown');
});
// jQuery(document).ready(function(){
//   jQuery('.select-imitation').theme_select({});
// })

jQuery(document).ready(function(){
  jQuery('.select-imitation select').each(function(ind, el){
    jQuery(el).theme_select({});
  })
})

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

  // component that displays total revenue on dahsboard page

  var icon_encr = '<svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>';

  var icon_decr = '<svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>';

  var blank_html = ''
  var total_revenue = new Vue({
    el: '#total_revenue',

    mounted: function(){
    },

    data: {
      rev            : '£0.00',
      change_type    : 'encr', // decr || encr
      icon           :  icon_encr,
      up_down        : 'up', // up || down
      percent_change :  25,
    },

    methods: {
      change : function(value, percent_change, shange_type){
        this.rev = value;
        this.percent_change = percent_change;

        if(shange_type === 'encr'){
          this.icon = icon_encr;
          this.change_type = 'encr';
          this.up_down = 'up';
        }

        if(shange_type === 'decr'){
          this.icon = icon_decr;
          this.change_type = 'decr';
          this.up_down = 'down';
        }
      }
    }
  })
var total_leads =  new Vue({
    el: '#total_leads',

    mounted: function(){
    },

    data: {
      leads            : 168,
      percents         : 94, // decr || encr
    },

    methods: {
      change : function(leads, percents){
        this.leads = leads;
        this.percents = percents;
      }
    }
  })

var total_average =  new Vue({
  el: '#total_average',

  mounted: function(){
  },

  data: {
    avg            : '£0.00',
  },

  methods: {
    change : function(avg){
      this.avg = avg;
    }
  }
})
  var top_clinic = new Vue({
    el: '#top_clinic',

    mounted: function(){
    },

    data: {
      name      : 'Notting Hill Gate',
      val       :  7, // decr || encr
      label     : 'leads',
      revenue   :  '£'+ formatMoney(1154, 2, ".", ","), // up || down
      rate      :  3,
    },

    methods: {
      change : function(name, val, label, revenue, rate){
        this.name    = name;
        this.val     = val;
        this.label   = label;
        this.revenue = revenue;
        this.revenue = revenue;
        this.rate    = rate;
      },
    },
  })
  var top_source = new Vue({
    el: '#top_source',

    mounted: function(){
    },

    data: {
      name      : 'Instagramm',
      val       : 77, // decr || encr
      label     : 'leads',
      revenue   :  '£'+ formatMoney(11254, 2, ".", ","), // up || down
      rate      :  34,
    },

    methods: {
      change : function(name, val, label, revenue, rate){
        this.name    = name;
        this.val     = val;
        this.label   = label;
        this.revenue = revenue;
        this.revenue = revenue;
        this.rate    = rate;
      },
    },
  })
  var top_treatment = new Vue({
    el: '#top_treatment',

    mounted: function(){
    },

    data: {
      name      : 'Composite Bonding',
      val       :  7, // decr || encr
      label     : 'leads',
      revenue   :  '£'+ formatMoney(1154, 2, ".", ","), // up || down
      rate      :  34,
    },

    methods: {
      change : function(name, val, label, revenue, rate){
        this.name    = name;
        this.val     = val;
        this.label   = label;
        this.revenue = revenue;
        this.revenue = revenue;
        this.rate    = rate;
      },
    },
  })
  var top_campaign = new Vue({
    el: '#top_campaign',

    mounted: function(){
    },

    data: {
      name      : 'Free Smile Trial',
      val       :  122, // decr || encr
      label     : 'leads',
      revenue   :  '£'+ formatMoney(1154, 2, ".", ","), // up || down
      rate      :  34,
    },

    methods: {
      change : function(name, val, label, revenue, rate){
        this.name    = name;
        this.val     = val;
        this.label   = label;
        this.revenue = revenue;
        this.revenue = revenue;
        this.rate    = rate;
      },
    },
  })

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
  jQuery(document).ready(function(){
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
    console.log('New date range selected: ' + start.format('YYYY-MMM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    jQuery(document.body).trigger('update_app');
  });
})
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

jQuery(document).on('update_app',function(){
  total_revenue.change('£'+ formatMoney(100, 2, ".", ","), 44, 'encr');
  total_leads.change(11, 14);
  total_average.change('£'+ formatMoney(14, 2, ".", ","));
  chart_income = new Chart(chart, options_chart_test);
})