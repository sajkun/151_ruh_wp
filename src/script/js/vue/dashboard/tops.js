// deprecated file
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
