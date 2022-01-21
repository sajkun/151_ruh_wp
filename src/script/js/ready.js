jQuery(document).ready(function(){
    jQuery('.reminder input').datetimepicker({
      format:'M d Y H:i',
      allowTimes:[
          '08:00',
          '08:30',
          '09:00',
          '09:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
          '20:30',
          '21:00',
          '21:30',
          '22:00',
          '22:30',
      ]
    });

    jQuery('.datepicker').datetimepicker({
      format:'M d Y H:i',
    });

    if(jQuery('.horizontal-scroll').length){
      var height = jQuery('.site-inner').height() - jQuery('.filter-container').height() - 180;

      // jQuery('.horizontal-scroll').css({'max-height': height + 'px'});
    }


    // if(jQuery('.leads-column__head').length && jQuery(window).width() > 990){
    //   jQuery('.leads-column__head').each(function(ind, el){
    //     var opt = {
    //       left: jQuery(el).offset().left + 'px',
    //       top : jQuery(el).offset().top + 'px',
    //       position: 'fixed',
    //     }

    //     jQuery(el).css(opt);
    //   })
    // }
});




jQuery('.reminder .icon').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})

jQuery('.reminder .label').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})