Vue.component('select-imitation2', {

  mixins: [select_mixin2],

  beforeMount:function(){
    this.options = this._options;
  },

  watch:{
    _options: function(val){
      this.options = val;
    },
  },

  template: '<div class="select-imitation" v-click-outside="discard_select"  v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span  class="element">{{data}}</span> </li> </ul> </div> </div>',
})
