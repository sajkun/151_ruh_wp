Vue.component('select-imitation-icon-2', {
  mixins: [select_mixin2],

  data: function () {
    return {
      icon : this._icon,
    }
  },

  beforeMount:function(){
    this.options = this._options;
    this.icon = this._icon;
  },

  watch:{
    _icon: function(val){
      this.icon = val;
    },
  },

  props:{
    _icon: String,
  },

  template: '<div class="select-imitation has-icon select-imitation_shift-bottom"  v-click-outside="discard_select" v-bind:class="{ expanded: isExpanded}" > <span v-html="icon"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li class="select-imitation__item" v-for="data in options" v-if="data" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span class="element">{{data}}</span> </li> </ul> </div> </div>',
})
