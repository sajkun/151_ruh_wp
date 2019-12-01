console.log('admin script was loaded');


  var theme_actions ={
    load_image: function(obj, parent_selector, input_selector){

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

        jQuery(parent).find('.image-placeholder *').remove();
        jQuery(parent).find('.image-placeholder').append(html);
        jQuery(parent).find(input_selector).val(val);
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


  var months = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec'
  ];


  function upload_document(obj){
      var template = '<div class="document-block"> <svg class="icon svg-icon-doc"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-doc"></use> </svg> <p class="document-block__text"> <span class="name">{name}</span> <span class="date">{date}</span> </p> <p class="document-block__actions"> <a href="{url}" download style="text-decoration: none;"><svg class="icon svg-icon-download"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-download"></use> </svg> </a> <svg class="icon svg-icon-trash"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use> </svg> </p> <input type="hidden" name="lead_files[{number}][name]" value={name}> <input type="hidden" name="lead_files[{number}][date]" value="{date}"> <input type="hidden" name="lead_files[{number}][url]" value={url}> </div>';
      var number = jQuery('#files_count').val();

      // var send_attachment_bkp = wp.media.editor.send.attachment;

      wp.media.editor.send.attachment = function(props, attachment) {
        var val =attachment.id;

        var url = attachment.url;
        var date = new Date(attachment.date);
        var file_name = attachment.filename

        var date_formatted = date.getDate() + ' ' + months[date.getMonth() - 1 ]  + ' ' + date.getFullYear() + ' at ' + date.getHours()+':'+date.getMinutes();

        console.log(date_formatted)

        var search = {
          number: number,
          name: file_name,
          url : url,
          date: date_formatted
        };

        var html = theme_actions.string_replace(search, template);

        jQuery('.uploaded-documents').append(html);


        number++;
        jQuery('#files_count').val(number);
      };

      wp.media.editor.open();
  }


  jQuery(document).ready(function(){
      jQuery('.datetimepicker').datetimepicker({
        format:'M d Y H:i',
      });
  })

  function clear_input(obj){
    jQuery(obj).siblings('input').val('')
  }

function delete_file(obj){
  jQuery(obj).closest('.document-block').addClass('hidden').find('input').val('');
}

function remove_note(obj){
  jQuery(obj).closest('.note-block').addClass('hidden').find('input').val('');
}


function add_note(obj, user_id){
  var text = jQuery('#lead_note').val();

  if(!text){
    alert('Please enter some text');
    return;
  }
  var number = jQuery('#notes_count').val();
  var template = '<div class="note-block"> <div class="note-block__header clearfix"> <span class="name">{name}</span> <span class="date">{date}</span> </div> <div class="note-block__body"> {note} </div> <a href="javascript:void(0)" onclick="remove_note(this)"> Remove Note</a> <input type="hidden" name="lead_notes[{number}][user_id]" value="{user_id}"> <input type="hidden" name="lead_notes[{number}][note]" value="{note}"> <input type="hidden" name="lead_notes[{number}][date]" value="{date}"> </div><br>';

  var date = new Date();
  var user_id = user_id;
  var name  = jQuery('#user_nice_name').val();


  var date_formatted = date.getDate() + ' ' + months[date.getMonth() - 1 ]  + ' ' + date.getFullYear() + ' at ' + date.getHours()+':'+date.getMinutes();

    var search = {
      number: number,
      name: name,
      user_id : user_id,
      note : text,
      date: date_formatted
    };

  var html = theme_actions.string_replace(search, template);



  jQuery('.notes-block').append(html);

  jQuery('#lead_note').val('');


  number++;
  jQuery('#notes_count').val(number);
}