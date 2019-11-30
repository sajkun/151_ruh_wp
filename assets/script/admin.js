console.log('admin script was loaded');

jQuery( function( $ ) {

  var theme_actions ={
    load_image: function(obj, size, parent_selector, input_selector){

      var parent = obj.closest( parent_selector );
      // var send_attachment_bkp = wp.media.editor.send.attachment;

      wp.media.editor.send.attachment = function(props, attachment) {
        var val =attachment.id;
        var html;

        switch(attachment.type){
          case 'video':
            html = '<video width="280" controls> <source src="'+attachment.url+'" type="'+attachment.mime+'"></video>';
           break;
          default:
            html = '<img src="'+attachment.url+'" alt=""/>';
           break;
        }

        $(parent).find('.image-placeholder *').remove();
        $(parent).find('.image-placeholder').append(html);
        $(parent).find(input_selector).val(val);
      };

      wp.media.editor.open();
    },


   string_replace: function(needle, highstack){
    var template = highstack;
      for(key in needle){
      var exp = new RegExp("\\{" + key + "\\}", "gi");
        template = template.replace(exp, function(str){
          value = needle[key];
          return value;
        });
      }
      return template;
    }
  }
});