

function init_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    filter_dashboard = new Vue({
      el: '#dashboard-filters',

      data:{
        filters:{
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
          dentists:   'All Dentists',
        },
      },

      mounted: function(){
        this.init_filters();
      },

      computed: {
        show_filter_clear_btn: function(){
          //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'show_filter_clear_btn');
          var show = false;
          for(var filter_name in this.filters){
            show = (this.filters[filter_name].search('All') !== 0)? true: show;

            //console.log(show);
          }

          //console.groupEnd();

          return show ? '' : 'visuallyhidden';
        },
      },

      methods: {
        //inits filters
        init_filters: function(){
          //console.log('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'init_filters');
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
             dentists:    'All Dentists',
          };

          for(select_name in this.filters){
            this.$refs[select_name].set_value('selected', this.filters[select_name]);
          }
        },

        run_filter_list: function(event){
          if('undefined' !== typeof(event.val)){
            //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'run_filter_list');

            //console.log(event);
            //console.groupEnd();
            this.filters[event.name] = event.val;

            if('undefined' !== typeof(vue_dashboard_totals)){

              var vm = this;

              Vue.nextTick(function(){
                vue_dashboard_totals.update_filters(vm.filters);
              })
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