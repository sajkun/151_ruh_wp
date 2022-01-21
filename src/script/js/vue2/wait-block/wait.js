wait_block2 = new Vue({
  el: '#wait-block2',

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

  methods: {
    show: function(){
      this.text = 'Please wait';
      this.class = 'shown';
      console.log(this.class)
    },

    hide: function(text){
      this.text = '';
      this.class = '';
    }
  }
});