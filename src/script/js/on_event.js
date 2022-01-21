jQuery('.search-open').click(function(){
  jQuery('.search__wrapper').toggleClass('shown');
});


jQuery('#login-form').on('submit',function(){
  console.log('login');
  var data = jQuery(this).serializeArray();

  var post_data = {};

  for(id in data){
    post_data[data[id].name] = data[id].value;

    if(!data[id].value){
      alert('No ' + data[id].name +' entered');
      return false;
    }
  }

  post_data.action = 'run_login';

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: post_data,

    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      location.href= data.redirect;
    },

    error: function(xhr, textStatus, errorThrown) {
      var resp = JSON.parse(xhr.responseText);

      message = '';
      for(id in resp.data){
        message += resp.data[id];
      }

      alert(message);

      console.log(resp);
     }
  });
})


// jQuery('.trigger-color').hover(function(){
//   var id = jQuery(this).data('id');
//   console.log(id);
// },function(){

// })



jQuery('.button-add').click(function(e) {
  e.preventDefault();
  console.log(1);
});


