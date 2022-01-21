
if('undefined' != typeof(is_dashboard)){
  var _from2 = _from;
  var _to2   = _to;
  print_popup = new Vue({
    el: '#popup-print-options',

    data: {
      filter:{
        clinics: [],
        treatments: [],
        campaigns: [],
        sources: [],
        team: [],
        dentists: [],
        lead_stage: [],
      },

      is_shown: false,

      filter_data_ : dashboard_filter_data_csv,

      leads_obj   : dashboard_leads_data,

      max_items : false,

      filename: 'Leads data',

      leads_found: false,
    },

    watch:{
      "filter.clinics": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 0})
        }

         if(this.filter_data['clinics'].length - 1 === this.filter['clinics'].length){

          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 0})

         }
      },

      "filter.treatments": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 0})
        }

         if(this.filter_data['treatments'].length - 1 === this.filter['treatments'].length){

          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 0})
         }
      },

      "filter.campaigns": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.campaigns_all']).prop({'checked': 0})
        }


         if(this.filter_data['campaigns'].length - 1 === this.filter['campaigns'].length){
          jQuery(this.$refs['filter.campaigns_all' ]).prop({'checked': 1})
         }else{

          jQuery(this.$refs['filter.campaigns_all']).prop({'checked': 0})
         }
      },

      "filter.sources": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.sources_all']).prop({'checked': 0})
        }

         if(this.filter_data['sources'].length - 1 === this.filter['sources'].length){
          jQuery(this.$refs['filter.sources_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.sources_all']).prop({'checked': 0})

         }
      },

      "filter.team": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.team_all']).prop({'checked': 0})
        }

         if(this.filter_data['team'].length - 1 === this.filter['team'].length){
          jQuery(this.$refs['filter.team_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.team_all']).prop({'checked': 0})

         }
      },

      "filter.dentists": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.dentists_all']).prop({'checked': 0})
        }

         if(this.filter_data['dentists'].length - 1 === this.filter['dentists'].length){
          jQuery(this.$refs['filter.dentists_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.dentists_all']).prop({'checked': 0})

         }
      },

      "filter.lead_stage": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.lead_stage_all']).prop({'checked': 0})
        }

         if(this.filter_data['lead_stage'].length - 1 === this.filter['lead_stage'].length){
          jQuery(this.$refs['filter.lead_stage_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.lead_stage_all']).prop({'checked': 0})

         }
      },
    },

    computed: {
      found: function(){
        var leads = this.filter_leads(this.leads_obj)
        return leads.length;
      },

      filter_data: function(){
        var max_items = 0;

        if(this.filter_data_){
          for(var id in this.filter_data_){
            max_items = Math.max(max_items, this.filter_data_[id].length);
          }
        }

       this.max_items = max_items;
        return this.filter_data_;
      },

      show_this: function(){
        jQuery('.popup-print-options').removeClass('visuallyhidden')
        return this.is_shown ? '' : 'hidden';
      }
    },

    mounted: function(){
      var max_items = 0;

      jQuery('.popup-print-options').removeClass('visuallyhidden')

      if(this.filter_data){
        for(var id in this.filter_data){
          max_items = Math.max(max_items, this.filter_data[id].length);
        }
      }

      this.max_items = max_items;
    },

    methods: {
      show: function(){
        this.is_shown = true;
        Vue.nextTick(function(){
          jQuery('.popup-print-options').removeClass('visuallyhidden')
        })
      },
      hide: function(){
        this.is_shown = false;
      },

      do_filter: function(filter, value){
        var id = this.filter[filter].indexOf(value);

        if(id < 0){
          this.filter[filter].push(value);
        }else{
          this.filter[filter].splice(id, 1);
        }
      },

      do_filter_all: function(filter){
        if(this.filter_data[filter].length - 1 === this.filter[filter].length){
          for(var id in this.$refs['filter.'+filter]){
            var item = jQuery(this.$refs['filter.'+filter][id]);

            if(item.prop('checked')){
              item.trigger('click');
            }
          }

        }else{

          for(var id in this.$refs['filter.'+filter]){
            var item = jQuery(this.$refs['filter.'+filter][id]);

            if(!item.prop('checked')){
              item.trigger('click');
            }
          }
        }
      },

      // create a document file
      // by default prints patients name, billed and booked values
      gen_csv_file: function(leads){
        var formatted_data = [];

        for(var id in leads){
          // prepare initial data
          var lead = leads[id];

          var billed = this.get_billed_this_period(lead) + this.get_billed_value(lead);

          var for_csv = {
            name:      lead.meta.patient_data.name,
            email:     lead.meta.patient_data.email,
            phone:     lead.meta.patient_data.phone,
            source:    lead.meta.patient_data.source,
            treatment: lead.meta.patient_data.treatment,
            clinic:    lead.meta.patient_data.clinic,
            campaign:  lead.meta.patient_data.campaign,
            lead_stage: lead.lead_stage,
            booked:    get_sum_from_price(lead.meta.treatment_value.value).toString(),
            billed:    get_sum_from_price(billed).toString(),
            dentists:  lead.meta.treatment_coordinator.specialist,
            notes:     "",
          };


          // check and modify data about dentists
          // format it to string
          for_csv.dentists = typeof(for_csv.dentists) === 'object'? for_csv.dentists.join(';') : 'none';

          // format notes content
            if(typeof(for_csv.notes) === 'object'){
              var notes = [];
              for (var i in for_csv.notes){
                  notes.push(for_csv.notes[i].text);
              }
              for_csv.notes = notes.join(';');
            }else{
              for_csv.notes = 'none';
            }

           //check and fix all symbols that can break csv markup
            var temp_arr = [];
            for(var i in for_csv){
              var reg = new RegExp("[\n|,|\"]");

                if(for_csv[i] && for_csv[i].match("/\r\n|\n|\r|,/gm")){
              }

               var _t = for_csv[i]? '"' + for_csv[i].split("\n").join(' ').split('"').join(' ').split('#').join(' ') + '"': 'none';

               temp_arr.push(_t);
            }

           formatted_data.push(temp_arr);
        }

        return formatted_data;
      },


      // run print function
      print_data: function(){
        var leads = this.filter_leads(this.leads_obj);
        var formatted_data = this.gen_csv_file(leads);

        var csvContent = "data:text/csv;charset=utf-8,name,email,phone,source,treatment,clinic,campaign,stage,proposed,billed,dentists,notes" + "\r\n"
            + formatted_data.map(e => e.join(",")).join("\r\n");

        var filename = this.filename;
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click();
      },

      filter_leads: function(leads_obj){
        var leads = [];

        // for every lead check if meets current filter values
        // i.e. if each item among lead.filter_data exists and matches selected filter add this lead to a result array
        for(var id in leads_obj){
          // define lead var and consider, that it matches all selected filters
          var lead  = leads_obj[id];
          var add_it = true;

          // for every lead.filter_data check if it matches current filters
          for (var filter_id in lead.filter_data){
            var val    = lead.filter_data[filter_id];
            var filter = this.filter[filter_id];

            // if current'x filter item with id equl filter_id is empty skip check and consider that filter matches all conditioas
            if(filter.length === 0){
              continue;
            }

            // detect type of filter, sting or object
            var type_of_variable = typeof(val);

            // detect if filter is empty
            // if empty consider that it doesn't matches filter set
            // if not empty run test
            switch(type_of_variable){

              // only team members filter is object
              // if filter has values run check
              // other way consider that lead doesn't macth filters
              case 'object':
                if(Object.keys(val).length > 0){
                  //  run check
                  add_it = (Intersec(filter, val).length == 0)? false: add_it;
                }else{
                  // consider, that lead doesn't match filters
                  add_it = false;
                }

                break;
              case 'string':
                // run chek if filter item of lead exists
                // other way consider that lead doesn't match
                if(val){
                  add_it = filter.indexOf(val) < 0 ? false : add_it;
                }else{
                  add_it = false;
                }
                break;
            }

            // if a lead should not be added to a list stop loop and go on proceed  to the next lead


          }

            if(add_it){
              leads.push(lead);
            }


        }

        return leads;
      },

      get_billed_this_period: function(lead){
        var total = 0;

        if ('undefined' !== typeof(lead.meta.treatment_value.billed)){
          var value = lead.meta.treatment_value.billed

          if(value){
            total += get_sum_from_price(value);
          }
        }
        return total;
      },

      get_billed_value: function(lead){
        var date_from = new Date(_from2);
        var date_to   = new Date(_to2);

        // console.log(date_to);

        billed_total = 0

        if('undefined' !== typeof(lead.meta.start_date)){

            var billed_start = new Date(lead.meta.start_date);


            var count =  count_billed_time(billed_start, date_from, date_to);

            if('undefined' !== typeof(lead.meta.treatment_value.mounthly) && !isNaN(lead.meta.treatment_value.mounthly)){

                billed_total+= count * get_sum_from_price(lead.meta.treatment_value.mounthly);

            }
        }
       return billed_total;
      },

      update: function(key, value){
        var vm = this;
        vm[key] = value;

        jQuery(vm.$el).find('[type=checkbox]').prop({'checked': 0})

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
      }
    }
  });
}

function Intersec(arr1,arr2){

 var idx = 0, arr3 = [];

 for (var i = 0; i < arr2.length; i++)
     {
     idx = arr1.indexOf(arr2[i]);
       if (idx >= 0) arr3.push(arr2[i]);
     }

 return arr3;
}
