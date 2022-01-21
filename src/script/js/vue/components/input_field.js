input_field = Vue.component('input-field', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      if(typeof(this.value) == 'undefined') {
        this.value = jQuery(this.$el).val();
      }

      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="leads-block__input":readonly="readonly == 1" autocomplete="off">',

});


input_field_decorated = Vue.component('input-decorated', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      icon : this._icon,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type', '_icon'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<div class="wrapper-input"><span v-html="icon"></span><input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="":readonly="readonly == 1" autocomplete="off"></div>',

});

