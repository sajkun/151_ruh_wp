
// sortrable actions
  jQuery( function() {


    // makes height of all lists on leads' page one and the same
    jQuery(document).ready(function(){
      equal_list_heights();
      do_sort();
    })

  });

function do_sort(){
    // init of sortable
    jQuery("#leads-list").find("ul.leads-list" ).sortable({
      connectWith: "ul",

      create:function(event, ui){},

      receive: function( event, ui ){
      },

      over: function( event, ui ){
      },

      stop : function( event, ui ){
        jQuery(document).trigger('update_leads_list');

        var leads_order_list = [];

        var items = jQuery(event.target).find('a');

        var orders = [];

        items.each(function(ind, el){
          var post_id = parseInt(el.dataset.post_id);
          orders.push({post_id: post_id, order: ind});

          for(id in dashboard_leads_data){
            if(post_id == dashboard_leads_data[id].ID){
              dashboard_leads_data[id].order = ind;
            }
          }
        });

        vue_leads_list.run_update_list();

        if(orders.length > 1){
          jQuery("#leads-list").trigger('update_items_order', {order: orders});
        }
      },
    });

    jQuery("#leads-list").find( ".leads-list" ).on( "sortover", function( event, ui ) {
      jQuery(this).css({'background': '#eee'});
    } );

    jQuery("#leads-list").find( ".leads-list" ).on( "sortout", function( event, ui ) {
      jQuery(this).css({'background': 'none'});
    } );

    jQuery("#leads-list").find( ".leads-list" ).on( "sortreceive", function( event, ui ) {


      var order = -1;
      var post_id = ui.item.find('a').data('post_id');
      var list_id =  ui.item.closest('ul').data('list');
      var list_id_prev = ui.item.children('a').data('list');
      var orders = [];

      var items = jQuery(event.target).find('a');


      items.each(function(ind, el){
        var post_id = parseInt(el.dataset.post_id);
        orders.push({post_id: post_id, order: ind});
        for(id in dashboard_leads_data){
          if(post_id == dashboard_leads_data[id].ID){
            dashboard_leads_data[id].order = ind;
          }
        }
      });


      if(orders.length > 1){
        jQuery(document.body).trigger('update_items_order', {order: orders});
      }


      clog('Moved from: ' + list_id_prev + ' to: ' + list_id);
      clog('Sorted id: ' + post_id);


      var index = dashboard_leads_data.findIndex(e=>{
        return e.ID == post_id;
      });

      // console.log(index);


      // // for(var id in dashboard_leads_data){
      //   // if(dashboard_leads_data[index].ID == post_id){
      //     dashboard_leads_data[index].lead_stage        = list_id;
      //     dashboard_leads_data[index].meta.lead_stage   = list_id;
      //      dashboard_leads_data[index].is_failed =  failed_stage_name.indexOf(list_id) >= 0? 'yes' : 'no';

      //      clog('failed: ' + dashboard_leads_data[index].is_failed);
      //      dashboard_leads_data[index].is_converted =  converted_stages.indexOf(list_id) >=0 ? 'yes' : 'no';

           // dashboard_leads_data[index].post_modified = moment().format();
           // vue_leads_list.init();

      //      console.log(dashboard_leads_data[index])
      //   // }
      // // }

      // // search item in global items array and update value for list
      // for(var ind in dashboard_leads_data){
      //   if(post_id == dashboard_leads_data[ind].ID){

      //     list_id_prev = dashboard_leads_data[ind].lead_stage;
      //     dashboard_leads_data[ind].lead_stage      = list_id;
      //     dashboard_leads_data[ind].meta.lead_stage = list_id;
      //     order = dashboard_leads_data[ind].order

      //     clog(dashboard_leads_data[ind].ID + '. patient: ' + dashboard_leads_data[ind].meta.patient_data.name + ' new col: '+ dashboard_leads_data[ind].lead_stage);
      //   }
      // }

      // // update changes in Vue object
      vue_leads_list.run_update_list();
      // clog(vue_leads_list.leads[list_id]);

      // change visual part of lists
      equal_list_heights();
      jQuery(this).css({'background': 'none'});


      // fire trigger to save changes in backend
      jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})


      // var user_name = jQuery('#user_name').val();
      // var user_id = jQuery('#user_id').val();

      // jQuery("#leads-list").trigger('update_lead_log', {
      //   post_id: post_id,
      //   list_id_prev: list_id_prev,
      //   list_id_new: list_id,
      //   user_name: user_name ,
      //   user_id:   user_id ,
      //   event: 'stage_changed'
      // });
    });
}


/**
* function that makes height of all lists on leads' page one and the same;
*/
function equal_list_heights(){
  var height = 0;

  jQuery('#leads-list .leads-list').css({'min-height': 0 + 'px'});

  jQuery('#leads-list .leads-list').each(function(ind, el){
    height = Math.max(height, jQuery(el).height());
  });


  jQuery('#leads-list .leads-list').css({'min-height': height + 50 + 'px'});
}


jQuery(document.body).on('update_items_order', function(e, data){
  //console.groupCollapsed('update_items_order');

  var data_post = {
    action : 'update_leads_order',
    order: data.order,
  };

  //console.log(data_post);

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      //console.log(data);
      //console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      //console.log('error');
      //console.log(errorThrown);
      //console.groupEnd();
     }
  });

})

jQuery(document.body).on('save_dragged_item', function(e, data){
  console.groupCollapsed('save_dragged_item');

  var data_post = {
    action : 'update_leads_list',
  };

  for(id in data){
    data_post[id] = data[id];
  };

  console.log('data_post:');
  console.log(data_post);

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.log(data);
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      //console.log('error');
      //console.log(errorThrown);
      //console.groupEnd('---');
     }
  });
})

jQuery("#leads-list").on('update_lead_log', function(e, data){
  //console.groupCollapsed('update lead log');

  //console.log(data);

  var data_post = {
    action : 'update_leads_log',
  };

  for(id in data){
    data_post[id] = data[id];
  };


  var date = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

  var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();

  data_post.date_formatted = date_formatted;

  var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

  data_post.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +date.getDate()+ ' ' + date.getHours() + ':' + minutes;


  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data_post,
    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      //console.log(data);

      if('object' === typeof(single_lead)){
        single_lead.logs = data.logs;
      }
      //console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      //console.log('error');
      //console.log(errorThrown);
      //console.groupEnd('---');
     }
  });
})

