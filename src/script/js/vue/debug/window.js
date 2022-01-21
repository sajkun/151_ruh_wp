if(jQuery('#debug').length){
  debug_vue = new Vue({
    el: '#debug',
    data: {
      content: [],
    },

    computed: {},

    watch: {},

    mounted: function(){
      console.log('debug enabled');
      this.content.push('debug active');
       var vm = this;

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
    },

    methods:{
      log: function(content, label){
        if('undefined' !== typeof(content) || !content){
          return false;
        }

        if('undefined' !== typeof(label)){
          this.content.push(label +' : ');
        }

        this.content.push(content);
      },

      clear: function(){
        this.content = [];
      },
    }
  });
}