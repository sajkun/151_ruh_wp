Vue.component('input-text-search-product', {
  data: function () {
    return {
      title: '',
      name: '',
      options: available_products,
      img_url: '',
      searching: false,
      found: false,
      show_dropdown: false,
      variations :     {
      },
      free_product_id: false,
    }
  },



  mixins: [get_set_props],

  props: ['_img_url', '_placeholder', '_name'],

  watch: {
    title: function(val){
      var vm = this;
      vm.searching = true;
      vm.show_dropdown = val.length > 0? true : false;

      if('undefined' == typeof(timeout)){
        var timeout;
      }

      if(!timeout){
        timeout = setTimeout(function(){
          vm.searching = false;
        },100)
      }else{
        clearTimeout(timeout);
      }
    },

    show_dropdown: function(val){
    },

    _img_url: function(val){
      this.img_url = this._img_url;
    },

    _name: function(name){
      this.name = name;
    },

    found: function(is_found){
      if(is_found){
        this.$emit('product_found', {'variations' : this.variations, free_product_id: this.free_product_id, recipe: this.title});
      }else{
        this.$emit('product_found', {'variations' : false, free_product_id: false});
      }
    }
  },

  computed: {
    found_options: function(){
      var options = [];
      var search = this.title.toLowerCase();

      if( this.options ){
        for(var opt in this.options){
          var tried_value = this.options[opt].name.toLowerCase();

          // check if input text is a part of possible values
          if(tried_value.indexOf(search) >= 0 && search){
            var temp = this.options[opt];
            temp.slug = opt;
            options.push(temp);
          }

          // search name is equal to imput value
          if (search === tried_value){
            var vm = this;
            var id = opt;
            Vue.nextTick(function(){
              vm.title = vm.options[id].name;
              vm.variations = vm.options[id].variations;
              vm.free_product_id = vm.options[id].free_product_id;
              vm.show_dropdown = false;
              vm.found = id;
              return [vm.options[id]];
            })
          }
        }
      }
      return options;
    },
  },

  beforeMount: function(){
    this.img_url = this._img_url;
    this.name =   this._name;
  },

  mounted: function(){
  },

  methods: {
    set_title: function(id){
      this.title = this.options[id].name;
      this.variations = this.options[id].variations;
      this.free_product_id = this.options[id].free_product_id;
      this.found = id;
      var vm = this;
      Vue.nextTick(function(){
        vm.show_dropdown = false;
      })
    },

    resert_values: function(){
      this.title = '';
      this.searching = false;
      this.found = false;
      this.show_dropdown = false;
      this.variations  = {};
      this.free_product_id = false;
    },

    restore_data: function(){
    },
  },

  template: `
    <div class="input-holder">
      <input type="text" id="product-name" class="popup-inner__field" v-model="title" autocomplete="off"
        v-bind:placeholder = "_placeholder"
      >
       <img :src="img_url" v-if="searching">

       <div class="input-holder__dropdown" v-if="found_options.length > 0 && show_dropdown">
          <ul class="input-holder__list">
            <li v-for="(prod, id) in found_options" v-on:click="set_title(prod.slug)">{{prod.name}}</li>
          </ul>
       </div>

       <div class="input-holder__dropdown" v-if="found_options.length == 0 && show_dropdown">
          <p> No products found </p>
       </div>
    </div>
  `,
});