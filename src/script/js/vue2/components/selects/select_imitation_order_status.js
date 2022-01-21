Vue.component('order-status-select', {
  mixins: [select_mixin],

  data: function () {
    return {
      color : '#eee',
    }
  },

  props: {
    _options: Object,
    '_current_status' : String
  },

  watch: {
    _current_status: function(val){
      this.selected = order_statuses[val].title;
      this.color    = order_statuses[val].color;
    }
  },

  beforeMount: function(){
    this.selected = ('undefined' != typeof(this._current_status) && this._current_status)?order_statuses[this._current_status].title : '';
    this.color = ('undefined' != typeof(this._current_status) && this._current_status)?order_statuses[this._current_status].color : '';
  },

  mounted: function(){
    this.change_width();
  },

  methods:{
    imitate_select: function(title, color){
      this.selected = title;
      this.color    = color;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    }
  },

  template: '<div class="select-imitation has-icon"  v-click-outside="discard_select" v-bind:class="{ expanded: isExpanded}" > <span class="marker-select" v-bind:style="{backgroundColor: color}"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="(data, key) in options" v-bind:value="key">{{data.title}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li class="select-imitation__item with-marker" v-for="(data, key) in options" v-bind:class="{selected: isSelected[data.title]}"  v-on:click="imitate_select(data.title, data.color)"> <span class="marker" v-bind:style="{backgroundColor: data.color}"></span> <span class="element">{{data.title}}</span> </li> </ul> </div> </div>',
})
