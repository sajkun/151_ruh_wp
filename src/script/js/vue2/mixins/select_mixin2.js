var select_mixin2 = {
  data: function () {
    return {
      select_name : this._select_name,
      options: '',
      selected:this._selected,
      isExpanded: this._isExpanded,
      isSelected: this._isSelected ? this._isSelected: [],
      isHiddenSelect: true,
      isHiddenImitation: false,
    }
  },

  props:{
    _select_name : String,
    _options: Array,
    _selected: String,
    _isExpanded: String,
    _isSelected: Array,
    _isHiddenSelect: Boolean,
    _isHiddenImitation: Boolean,
  },

  beforeMount:function(){
    this.options = this._options;

    if(this._options){
      var options = strip(this._options);
      switch(typeof(options)){
        case 'object':
          options = Object.values(options);
          this.options = options.filter(function(el){
            return !!el && el != '--Select--' ;
          });
          break
        case 'array':
          this.options = options.filter(function(el){
            return !!el && el != '--Select--';
          });
          break;
        default:
          this.options = options;
          break;
      }
    }
  },

  mounted: function(){
  },

  change: function(){
    this.$el.classList.remove('error');
    this.options = this._options;
  },

  watch:{
    selected: function(){
      this.$el.classList.remove('error');
    },

    _selected: function(val){
      this.selected = val;
    },

    _options: function(val){
      this.options = val;
    },
  },

  mounted:function(){
    this.change_width();
  },

  directives: {
    'click-outside': {
      bind (el,binding, vnode) {
        const outsideClickEventHandler = event => {
          if(!el.contains(event.target) && el !== event.target){
            binding.value(event);
          }
        }

        el.__outsideClickEventHandler__ = outsideClickEventHandler;
        document.addEventListener("click", outsideClickEventHandler);
      },

      unbind(el) {
        document.removeEventListener("click", el.__outsideClickEventHandler__);
      },
    }
  },

  methods: {
    change: function(){
      this.$emit('update_list', {val: this.selected, name: this.select_name});
    },

    // toggles state of expanded list initation
    expand_select: function(){
      this.isExpanded = 'expanded';
    },

    // toggles select in expanded dropdown
    update_selected_option: function(){
      for(var id in this.options){
        this.isSelected[this.options[id]] = false;
      }

      this.isSelected[this.selected] = true;
    },

    // changes data on option click
    imitate_select_option: function(value){
      this.selected = value;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    },

     // closes select
    discard_select:function(){
      this.isExpanded = '';
    },

     // updates options of a select
    update_options: function(options){
      this.options = options;
      this.selected = options[0];
      this.isExpanded = '';
      this.update_selected_option();
    },

    // sets value for a select
    set_value: function(key, value){
      this[key] = value;
      this.$emit('update_list', { val :this.selected, name: this.select_name});

      if(key === 'options'){
        this.change_width();
      }
    },

    change_width:function(){
      var vm = this;
      var select = vm.$el.getElementsByClassName( 'select-imitation__dropdown' )[0].getElementsByClassName( 'select-imitation__list' )[0];

      vm.$el.setAttribute("style", "width: auto");

      Vue.nextTick(function() {
        var width = 0;
        var options = select.getElementsByClassName('element');

        for( var option of options){
          width = Math.max(width, option.offsetWidth);
        }

        width += 90;
        width = Math.max(width, select.offsetWidth);

        var _width = (window.outerWidth < 768)? window.outerWidth - 30 : width;
        vm.$el.setAttribute("style", "width:" + (_width) + 'px');
      });
    },

    resert_width: function(){
      var vm = this;
      vm.$el.setAttribute("style", "width: auto");
    },

    // gets value of a select
    get_value: function(){
      return this.selected;
    },

    // gets name of a select
    get_name: function(){
      return this.select_name;
    },


  },
}