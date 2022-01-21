Vue.component('datepicker-styled', {
  data: function () {
    return {
      name:  '',
      value : '',
    }
  },

  props:['_value', '_name'],


  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';

    if(this._value){
      var date = new Date(this._value);
      var fmt  = new DateFormatter();
      this.value = fmt.formatDate(date, 'd F Y');


    }
  },

  watch:{
    _value: function(){
      var date = new Date(this._value);
      var fmt  = new DateFormatter();
      this.value = fmt.formatDate(date, 'd F Y');
    },
  },


  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'d F Y',
      timepicker:false,
      value: this.value,

      onClose:function(dp,$input){
        var fmt  = new DateFormatter();
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: fmt.formatDate(dp, 'Y-m-d H:i:s')});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : `
    <div class="datepicker-wrapper range-datepicker">
      <svg class="icon svg-icon-calendar"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use> </svg>
      <input type="text"
          autocomplete="off"
          placeholder="Add"
          v-on:input="input"
          v-on:change="input"
          v-on:blur="input"
          v-bind:name="name"
          v-model="value"
        >
    </div>`,
});
