Vue.component('datepicker2', {
  data: function () {
    return {
      name:  '',
      value : '',
    }
  },

  props:['_value', '_name'],

  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';
    this.value = this._value ? this._value : '';
  },

  watch: {
    _value: function(val){
      if(val && val != 'false'){

        this.value = val;
      }else{
        this.value= '';
      }
    },
  },

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'M d Y H:i',

      onClose:function(dp,$input){
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: vm.value});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input type="text" v-on:input="input" autocomplete="off" v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" >',
});
