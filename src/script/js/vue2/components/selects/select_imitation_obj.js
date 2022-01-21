Vue.component('select-imitation-obj', {

  props:{
    _options: Object,
  },

  computed:{
    is_selected: function(){
      if('undefined' != typeof(this.options[this.selected]) ){
        return this.options[this.selected].name;
      }else{
        return '';
      }
    },
  },

  methods:{
    change: function(){
      this.$emit('update_list', {val: this.options[this.selected], name: this.select_name});
    },


    update_selected_option: function(){
      for(var id in this.options){
        this.isSelected[id] = false;
      }

      this.isSelected[this.selected] = true;
    },
  },

  mixins: [select_mixin],

  template: '<div class="select-imitation" v-click-outside="discard_select"  v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="(data, key) in options" v-bind:value="key">{{data.name}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{is_selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="(data, key) in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(key)"> <span  class="element">{{data.name}}</span> </li> </ul> </div> </div>',
})
