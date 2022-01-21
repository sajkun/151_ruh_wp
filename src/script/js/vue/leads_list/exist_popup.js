if(document.getElementById('exist-popup')){
  exist_popup = new Vue({
    'el' : '#exist-popup',

    data: {
      show: false,
      name: '',
      email: '',
      phone: '',
      posted_data: {},
      leads: [],
    },

    watch: {},

    mounted: function(){
      this.$el.classList.remove('visuallyhidden');
    },

    computed:{
      number: function(){
        return this.leads.length;
      }
    },

    methods: {
      cancel: function(){
        this.show = false;
      },

      create: function(){
        this.show = false;
        this.posted_data.confirmed= 1;
        wait_block.show();
        single_lead.second_request(this.posted_data)
      },

      time_passed:function(date){

        var now = new Date();
        var date_received = new Date(date);

        return date_difference.construct(date_received, now)  + ' ago';
      },

      marked: function(v){
        return v == this.name ||v == this.phone ||v == this.email;
      }
    },
  });
}