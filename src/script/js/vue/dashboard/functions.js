/**
**
**/
function update_team_perfomance(){
  if('undefined' !== typeof(is_dashboard)){
    vue_team_perfomance.run_update_list({val: 'all'});
  }
}

/**
**
**/
function discard_selects(){
  for(id in vue_select_components){
    if('undefined' !== typeof(vue_select_components[id])){
      vue_select_components[id].discard_select();
    }
  }

  if('undefined' !== typeof(is_dashboard)){
    perfomance.$refs.perfomance_type.discard_select();
  }
}

//deprecated
function update_top_sources(){
  if('undefined' !== typeof(is_dashboard)){
  }
}

//deprecated
function collapse_top_lists(name){
  if('undefined' !== typeof(is_dashboard)){
  }
}