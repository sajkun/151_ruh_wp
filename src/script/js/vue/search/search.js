if(typeof(is_lead_list_2) !== 'undefined' || typeof(is_lead_list) !== 'undefined' || typeof(is_dashboard) !== 'undefined' || typeof(is_single_lead) !== 'undefined' ){

  var search_field_header = new Vue({
    el: '#search-form',

    data: {
      search_value: '',
    },

    computed:{
      isVisuallyHidden: function(){
        return typeof(is_lead_list) === 'undefined' &&  typeof(is_lead_list_2) === 'undefined';
      },

      classes: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list ?
        'order-2 order-md-0 col-md-2 col-lg-4' : 'search-single col-md-2 col-lg-4'
      },

      show_search: function(){
        return (typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list) || (typeof(is_lead_list_2)!== 'undefined') ? true: false;
      }
    },

    watch: {
      search_value: function(val){

        if(typeof(is_lead_list)!== 'undefined'){
          if(val.length >= 3){
            vue_leads_list.run_search(val);
          }else{
            vue_leads_list.run_search('');
          }
        }

        if(typeof(is_lead_list_2) !== 'undefined'){
          if(val.length >= 3){
            list_app.run_search(val);
          }else{
            list_app.run_search('');
          }
        }
      }
    },

    mounted:function(){
      this.$el.classList.remove('visuallyhidden')
    },

    methods:{
      run_search: function(search){
        this.search = search;
      },

      run_search_ajax: function(search){
        var vm = this;

        if(typeof(is_lead_list_2) == 'undefined'){
          return;
        }

        if(vm.search_value.length < 3){
          alert('please enter at least 3 characters ');
          return;
        }

        wait_block.show();

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          dataType: 'json',
          data: {search: vm.search_value, action: 'do_ajax_search'},
        })
        .done(function(data) {
          list_app.add_leads(data.leads);
        })
        .fail(function() {
        })
        .always(function(e) {
          wait_block.hide();
        });
      },

      close: function(){
        setTimeout(function(){
          window.close();
        },100);
      }
    }
  });
}