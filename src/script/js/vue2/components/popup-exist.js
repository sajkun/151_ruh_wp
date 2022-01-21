Vue.component('exist-popup-spa', {

  data: function(){
    return {
      show: false,
      name: '',
      email: '',
      phone: '',
      posted_data: {},
      leads: [],
    };
  },

  props: [
  ],

  watch:{
  },

  mounted: function(){
    this.show = false;
    this.$el.classList.remove('visuallyhidden');
  },

  computed:{
    number: function(){
      return this.leads.length;
    }
  },


  methods:{
      cancel: function(){
        this.show = false;
      },

      create: function(){
        this.show = false;

        this.$emit('save_lead',{posted_data: this.posted_data});
      },

      time_passed:function(date){

        var now = new Date();
        var date_received = new Date(date);

        return date_difference.construct(date_received, now)  + ' ago';
      },

      open_lead: function(lead_id){
        this.show = false;
        this.$emit('open_lead', {lead_id: lead_id});
      },

      marked: function(v){
        return v == this.name ||v == this.phone ||v == this.email;
      }
  },

  template: '#exist-popup-spa',
});

console.log();