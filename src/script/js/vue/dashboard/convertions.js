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