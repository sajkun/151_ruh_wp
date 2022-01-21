
function update_leads_filters(filters){
  var saved_filter = JSON.parse(Cookie.get('lead_list_filter'));

  if('undefined' !== typeof(is_lead_list)){



    for(select_name in filters){
      vue_leads_list.$refs[select_name].set_value('options', filters[select_name]);

      // var selected = (saved_filter )

     var selected = (saved_filter && filters[select_name].indexOf(saved_filter[select_name]) >=0)? saved_filter[select_name]: filters[select_name][0];

      vue_leads_list.$refs[select_name].set_value('selected', selected);
    }
  }
}

function update_leads_list(){
  if('undefined' !== typeof(is_lead_list)){
    vue_leads_list.run_update_list();
    vue_leads_list.check_text_messages();
  }
}

function exists_in_object(obj, search){
  if(typeof(obj) === 'string'){
    search = search.toLowerCase();
    obj = obj.toLowerCase();
    return obj.search(search) >= 0;
  }

  var found = false;

  for(id in obj){
    var _found = exists_in_object(obj[id], search);
    found = (_found)? true : found;
  }

  return found;
}