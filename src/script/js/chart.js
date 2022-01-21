if('undefined' !== typeof(is_dashboard)){
  var date  = new Date();
  var chart = document.getElementById('gistogramm-year').getContext('2d');
  var currency     = '£';
  var current_year = date.getFullYear();

  months = [
    ['January', 'April',   'July',      "October" ],
    ['February','May', "August",    'November'],
    ['March',   'June',  "September", 'December'],
  ];

  var options_chart = {
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
                income_month_data['Apr']['sum'],
                income_month_data['Jul']['sum'],
                income_month_data['Oct']['sum']
                ], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [
                income_month_data['Feb']['sum'],
                income_month_data['May']['sum'],
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

