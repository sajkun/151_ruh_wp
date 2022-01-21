wait_block = new Vue({
  el: '#wait-block',

  data: {
    class: '',
    text: '',
  },

  computed:{
    show_class: function(){
      return this.class;
    },

    wait_text: function(){
      return this.text;
    },
  },

  mounted: function(){
  },

  methods: {
    show: function(){
      this.text = 'Please wait';
      this.class = 'shown';
    },

    hide: function(text){
      this.text = '';
       this.class = '';
    }
  }
});