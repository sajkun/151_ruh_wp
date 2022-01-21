
datepicker_field = Vue.component('reminder', {
  data: function () {
    return {
      name:  '',
      value : '',
      value_formatted : '',
      overdue: '',
    }
  },

  props:['_value', '_name', '_value_formatted', '_overdue'],


  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';
    this.value = this._value;
    this.overdue = is_boolean(this._overdue);
    this.value_formatted = this._value_formatted && this._value_formatted != 'No Due Date' ? this._value_formatted : '';
  },

  change: function(){},

  watch:{
    value_formatted:function(){
      this.$emit('input_value_changed', {value: this.value, value_formatted: this.value_formatted, overdue: this.overdue});
    },
  },

  mounted: function(){
    // this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).find('input').datetimepicker({
      format:'d M Y',
       timepicker:false,

      onClose:function(dp,$input){
        var now  = new Date();
        vm.overdue = now > dp? 1 : 0;

        var day      = dp.getDay();
        var month    = dp.getMonth();
        var hours    = dp.getHours();
        var minutes  = dp.getMinutes();

        day = day < 10? '0' + day: day;
        month = month + 1 < 10 ? '0' + month + 1: month + 1;
        hours = hours < 10? '0' + hours: hours;
        minutes = minutes < 10? '0' + minutes: minutes;
        vm.value_formatted = $input.val();
        vm.value = dp.getFullYear() + '-'+ month + '-' + day;
      }
    });
  },

  methods:{
    input: function(){
      // this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    clear: function(){
      this.value = '';
      this.value_formatted = '';
      this.overdue = false;
    }
  },

  template : '<div class="reminder"> <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg> <span class="label">Set Reminder</span> <input type="text" class="value" v-on:input="input" autocomplete="off" v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value_formatted" placeholder="Add" > <span href="javascript:void(0)" class="clear-reminder" v-if="value" v-on:click="clear">clear</span> </div>',
});
