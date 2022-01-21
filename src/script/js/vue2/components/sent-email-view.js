Vue.component('sent-email-view', {
  data: function(){
    return {
      show: false,
      template: '',
      log: {
        template_name: '',
      },

      template_data:{
        'Booked In':{
          to: '',
          subject: 'Your Ruhdental Book In',
          from: theme_user_email,
          template: 'booked-in',
          template_name: 'Booked In Template',
          price: 'price',
          patient_name: '',
          clinic: 'clinic',
          specialists_name: '',
          lead_id: '',
        },

        'Smile Trial': {
          to: '',
          template_name: 'Smile Trial Template',
          subject: 'Your Smile Trial Offer',
          from: theme_user_email,
          template: 'smile-trial',
          patient_name: '',
          specialists_name: '',
          lead_id: '',
        },

        'Teeth Whitening': {
          to: '',
          template_name: 'Teeth Whitening Template',
          subject: 'Your Teeth Whitening Offer',
          from: theme_user_email,
          template: 'smile-trial',
          patient_name: '',
          specialists_name: '',
          lead_id: '',
        },
      },

      errors:{
        template: 0,
        email_from: 0,
        'Booked In': {
          price: 0,
          clinic: 0,
        },
      },
    }
  },

  watch:{
    show:function(val){

      if(val){
        var vm = this;
        Vue.nextTick(function(){
          switch(vm.log.template_name ){
            case "Booked In":
             vm.$refs.clinics_select.set_value('selected',  vm.log.posted_data.clinic);
             vm.$refs.prices_select.set_value('selected',  vm.log.posted_data.price);
             break;
          }
        });
      };
    },
  },

  computed:{
    patient_name: function(){
      return this.log.posted_data.patient_name;
    },
    clinic: function(){
      return this.log.posted_data.clinic;
    },
    price: function(){
      return this.log.posted_data.price;
    },

    specialists_name: function(){
      return this.log.posted_data.specialists_name;
    },

    select_data: function(){
      return {
        templates : [
         'Booked In',
         'Smile Trial',
         'Teeth Whitening'
         ],

        prices: [
          '£50',
          '£100',
          '£150',
          '£200',
          '£250',
          '£300',
        ],

        clinics: [
          'London Fleet Street',
          'London Notting Hill',
          'Manchester',
        ],
      };
    },
  },

  methods:{
    update_template_data: function(event, name){
      this.$set(this.template_data[name], event.name, event.val);
    },
  },

  template: '#email-view-tmpl',

});