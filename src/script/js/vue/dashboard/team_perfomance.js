
// deprecated file
if('undefined' !== typeof(is_dashboard)){
  vue_team_perfomance = new Vue({
    el: '#team_perfomance',

    data:{
      team_data: team_perfomance.team,
    },

    computed: {
      team: function(){
        return this.team_data;
      }
    },

    mounted: function(){

      this.update_list();

      vue_select_components.push(this.$refs.posts_list);
    },

    methods:{
      run_update_list: function(event){
        if(typeof(event.val) !=='undefined'){
          if(event.val === 'all'){
            this.team_data = team_perfomance.team;
          }else{
            var new_team = {};
            for(id in team_perfomance.team){
              if(team_perfomance.team[id].user_position === event.val){
                new_team[id] = team_perfomance.team[id];
              }
            }
            this.team_data = new_team;
          }
        }
      },

      update_list: function(){
        var props =  {
          select_name: 'team_perfomance_list',
          options: team_perfomance.positions,
          selected: team_perfomance.positions[0],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        for( id in props){
          this.$refs.posts_list.set_value(id, props[id]);
        }
      },
    },
  })
}


