/**
* component to select date range
*/
Vue.component('daterangepicker', {
  data: function () {
    return {
      name:  '',
      label : '',
      from : '',
      to   : '',
    }
  },

  props: [
    '_name',
    '_label',
    '_from',
    '_to',
  ],

  beforeMount: function(){
    // get saved data
    var list_data_settings =Cookie.get('list_data_settings') ? JSON.parse(Cookie.get('list_data_settings')) : false;

    // prepare dates if no cookies stored
    var now = new Date();
    var fmt = new DateFormatter();

    this.label = list_data_settings? list_data_settings.label : 'This Month';

    this.from = list_data_settings ? list_data_settings.from : fmt.formatDate(now, 'M 01 Y');

    this.to = list_data_settings ? list_data_settings.to : fmt.formatDate(now, 'M d Y');

  },

  mounted: function(){
    var vm = this;
    var ranges_all     = vm.get_date_ranges();
    var ranges_current = [];
    var list_data_settings = Cookie.get('list_data_settings') ? JSON.parse(Cookie.get('list_data_settings')) : false;

    ranges_current = vm.label != 'Custom Range' ? ranges_all[vm.label] : [list_data_settings._from,list_data_settings._to];

    jQuery(vm.$el).daterangepicker({
      startDate: ranges_current[0],
      endDate  : ranges_current[1],
      ranges   : ranges_all,
      autoApply: true,
      alwaysShowCalendars : true,
    }, function(start, end, label) {

      var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

      vm.label = label;

      jQuery('.range-datepicker__text').text(text);

      var data = {
         label: label,
         from: start.format('MMM DD YYYY') ,
         to:   end.format('MMM DD YYYY'),
         _from: start.format('MM/DD/YYYY'),
         _to: end.format('MM/DD/YYYY'),
       };
       vm.$emit('daterange_changed', data);
    });
  },


  methods:{
    get_date_ranges: function(){
      var now     = new Date();
      var last_7  = new Date();
      var last_30 = new Date();
      var last_90 = new Date();
      var fmt  = new DateFormatter();

      last_7.setDate(last_7.getDate() - 7);
      last_30.setDate(last_30.getDate() - 30);
      last_90.setDate(last_7.getDate() - 90);

      return {
        "Today": [
          fmt.formatDate(now, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],
        'This Month': [
          fmt.formatDate(now, 'm/01/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 7 Days': [
          fmt.formatDate(last_7, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 30 Days':[
          fmt.formatDate(last_30, 'm/d/Y 00:00:00'),
           fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 90 Days': [
          fmt.formatDate(last_90, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],
        'All time':[
          '01/01/1999',
           fmt.formatDate(now, 'm/d/Y 23:59:59'),
        ],
      };
    },

  },

  template: `
    <div class="range-datepicker-component">
       <svg class="icon svg-icon-calendar"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use></svg>
         <span class="range-datepicker__label">{{label}}</span>
         <span class="range-datepicker__text">{{from}} → {{to}}</span> <span class="range-datepicker__arrow"></span>
    </div>
  `,
})