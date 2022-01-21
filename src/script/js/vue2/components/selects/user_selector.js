Vue.component('user-select', {
  data: function () {
    return {
      names: '',
      current_user: '',
      gravatar: '',
      user_names: [],
      editing: false,
      all_creators: all_creators,
      all_users: all_users,
    }
  },

  props:['_current_user', '_select_name'],

  beforeMount: function(){

    var vm = this;
    vm.current_user = vm._current_user;
    vm.gravatar = this.get_gravatar();

    switch(this._select_name){
      case 'creator':
        for( var user of this.all_creators){
          this.user_names.push(user.name);
        }
        break;
      default:
        for( var user of this.all_users){
          this.user_names.push(user.name);
        }
        break;
    }
  },

  change:function(){
    var vm = this;
    vm.current_user = vm._current_user;
    vm.gravatar = this.get_gravatar();
  },

  watch: {
    current_user: function(val){
      this.$emit('user_select_change',{name: this._select_name,val: val});
    }
  },

  computed: {
    is_editing: function(){
      return this.editing || !this.current_user;
    }
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

  methods:{
    get_gravatar: function(){
      var vm = this

      if( vm._current_user){

        switch(this._select_name){
          case 'creator':
          var user_data = vm.all_creators.filter(
            obj => {
              return obj.name === vm.current_user ;
            }
          );

          return typeof(user_data[0]) != 'undefined'? user_data[0].gravatar : '';

          default:
            var user_data = vm.all_users.filter(
              obj => {
                return obj.name === vm.current_user ;
              }
            );
            return typeof(user_data[0]) != 'undefined'? user_data[0].gravatar : '';
            break;
        }
      }

      return false;
    },

    collapse: function(){
      this.editing = false;
    },

    expand: function(){
      this.editing = true;
    },

    update_user_data: function(data){
      this.current_user = data.val;
      this.gravatar = this.get_gravatar();
      this.editing = false;
    },
  },

  template: `<div class="edit-team text-left" v-click-outside="collapse">
     <table class="team-leads"  v-on:click.stop="expand" v-if="!is_editing"><tbody><tr><td><div class="team-leads__photo"><img v-bind:src="gravatar"  v-if="gravatar" :alt="current_user"></div></td> <td colspan="3"><div class="clearfix"><span class="team-leads__name">{{current_user}}</span></div></td></tr></tbody></table>

    <select-imitation
      v-if="is_editing"
      v-bind:class="'fullwidth'"
      _select_name="user_select"
      v-bind:_options="user_names"
      v-bind:_selected="current_user"
      v-on:update_list = "update_user_data"
      ref="select"
      ></select-imitation>
  </div>`,
});
