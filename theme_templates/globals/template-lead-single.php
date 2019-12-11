<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

clog($patient_data);
?>
<script>
function goBack() {
  window.history.back();
}
</script>
<div class="spacer-h-40"></div>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8">
      <a href="javascript:void(0)"  onclick="goBack()" class="button-back">
        <svg class="icon svg-icon-back"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-back"></use> </svg>
        <span> Back to Leads</span>
      </a>

      <a href="#" class="reminder">
        <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
        <span class="label">Set Reminder</span>
        <input type="text" name="_reminder" placeholder="MM dd YYYY hh:mm" value="<?php echo $reminder? $reminder: '' ; ?>" class="value"></input>
      </a>

      <span class="lead-tag opened">Open Lead</span>
    </div>
    <div class="col-12 col-md-4 text-right-md">
      <a href="#" class="button-cancel">Delete</a>

      <a href="#" class="button-create">
          <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
        <span>Save Changes</span>
      </a>
    </div>
  </div>

</div><!-- container-fluid -->

<div class="spacer-h-30"></div>
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-4">
      <div class="leads-block">
        <form action="" id="patient_data">
          <h2 class="leads-block__title">Patient Information</h2>

          <div class="leads-block__row">
            <form id="patient_data" method="POST">
              <div class="leads-block__name">
                <input type="text" name="name" placeholder="Enter Name" class="leads-block__input lg" value="<?php echo $patient_data['name']?>">
                <span class="leads-block__comment">Added <?php echo $patient_data['date_time']?></span>
              </div>
              <table class="leads-block__data">
                <tr>
                  <td>
                    <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Phone</p></td>
                  <td>
                    <input type="text" name="phone" value="<?php echo $patient_data['phone']?>" placeholder="Add" class="leads-block__input">
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">E-mail</p></td>
                  <td>
                    <input type="text" name="email" value="<?php echo $patient_data['email']?>" placeholder="Add" class="leads-block__input">
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Source</p></td>
                  <td>
                    <div id="select-imitation-sourses">
                      <select-imitation ref="sourse_select" _select_name="sourse_select"></select-imitation>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Treatment</p></td>
                  <td>
                    <input type="text" name="treatment" value="<?php echo $patient_data['treatment']?>" placeholder="Add" class="leads-block__input">
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Clinic</p></td>
                  <td>
                    <input type="text" name="clinic" placeholder="Add" value="<?php echo $patient_data['clinic']?>" class="leads-block__input">
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Date / Time</p></td>
                  <td>
                    <input type="text" name="date_time" placeholder="Add" value="<?php echo $patient_data['date_time']?>" readonly class="leads-block__input">
                  </td>
                </tr>
              </table>
            </form>
          </div><!-- leads-block__row -->
        </form>
      </div><!-- leads-block -->

      <div class="leads-block">
        <h2 class="leads-block__title">Message Centre</h2>


        <div class="leads-block__row">
          <span class="message-sent-to">Sent to <span class="marked">07741426253</span> via Ruh Tracker</span>

          <div class="message-block we">
            <div class="message-block__header clearfix">
              <span class="name">Ruh Dental</span>
              <span class="date">Oct 23 12:15pm</span>
            </div>

            <div class="message-block__body">
              Hi David, would you prefer a morning or afternoon appointment?
            </div>
          </div>

          <div class="message-block him">
            <div class="message-block__header clearfix">
              <span class="name">David Bloggs</span>
              <span class="date">Oct 23 12:29pm</span>
            </div>

            <div class="message-block__body">
              Morning would be great!
            </div>
          </div>

        </div>

          <form action="message-form" id="">
            <div class="leads-block__form">
                <textarea name="text" placeholder="Start typing new message…"></textarea>
                <button type="submit">
                  <svg class="icon svg-icon-send"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-send"></use> </svg>
                </button>
            </div>
          </form>
      </div><!-- leads-block -->
    </div><!-- col-12 col-lg-4 -->

    <div class="col-12 col-lg-4">
      <div class="leads-block">
        <div class="leads-block__row">
        <i class="icon-holder">
          <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
        </i>
        </div>

        <h2 class="leads-block__title">Proposed Treatment Value</h2>
        <div class="leads-block__row">
         <div class="leads-block__price">
            <input type="text" name="proposed_price" placeholder="£00.00" class="leads-block__input xxl" value="£3,500.00">
          </div>
        </div>

        <div class="leads-block__row">
          <table class="leads-block__data">
            <tr>
              <td>
                <svg class="icon svg-icon-clock green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clock"></use> </svg>
              </td>
              <td><p class="leads-block__label">Payment Terms</p></td>
              <td>
                <input type="text" name="phone" placeholder="Add" value="48 Months" class="leads-block__input sm">
              </td>
            </tr>
            <tr>
              <td>
                <svg class="icon svg-icon-monthly green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-monthly"></use> </svg>
              </td>
              <td><p class="leads-block__label">Monthly</p></td>
              <td>
                <input type="text" name="email" placeholder="Add" value="£175.00" class="leads-block__input sm">
              </td>
            </tr
            <tr>
              <td>
                <svg class="icon svg-icon-card green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
              </td>
              <td><p class="leads-block__label">Payment Method</p></td>
              <td>
                <input type="text" name="phone" placeholder="Add" value="Credit Card" class="leads-block__input sm">
              </td>
            </tr>
            <tr>
              <td>
                <svg class="icon svg-icon-tooth green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
              </td>
              <td><p class="leads-block__label">Treatment</p></td>
              <td>
                <input type="text" name="email" placeholder="Add" value="Composite Bonding" class="leads-block__input sm">
              </td>
            </tr>
          </table>
        </div>
      </div><!-- leads-block -->

      <div class="leads-block">
        <h2 class="leads-block__title">Treatment Co-Ordinator</h2>

        <div class="leads-block__row">
          <table class="leads-block__data">
            <tr>
              <td>
                <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
              </td>
              <td><p class="leads-block__label">Consultation Date</p></td>
              <td>
                <input type="text" name="consultation_date" placeholder="Add" value="5th Nov 2019  12:30pm" class="leads-block__input sm">
              </td>
            </tr>
            <tr>
              <td>
                <svg class="icon svg-icon-lamp"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-lamp"></use> </svg>
              </td>
              <td><p class="leads-block__label">Reason for Appt.</p></td>
              <td>
                <input type="text" name="reason" placeholder="Add" value="Walked In" class="leads-block__input sm">
              </td>
            </tr>
            <tr>
              <td>
                <svg class="icon svg-icon-leaps"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leaps"></use> </svg>
              </td>
              <td><p class="leads-block__label">Dentist Seen</p></td>
              <td>
                <input type="text" name="phone" placeholder="Add" value="Steffen Decker" class="leads-block__input sm">
              </td>
            </tr>
            <tr>
              <td>
                <svg class="icon svg-icon-chat"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-chat"></use> </svg>
              </td>
              <td><p class="leads-block__label">Follow Up</p></td>
              <td>
                <input type="text" name="phone" placeholder="Add" class="leads-block__input sm">
              </td>
            </tr>

          </table>
        </div>
      </div><!-- leads-block -->

      <div class="leads-block">
         <h2 class="leads-block__title">Documents</h2>

         <div class="leads-block__row">
           <div class="document-block">
             <svg class="icon svg-icon-doc"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-doc"></use> </svg>

             <p class="document-block__text">
               <span class="name">Patient_ClincCheck.mp4 </span>
               <span class="date">23 October 2019 at 12:15pm</span>
             </p>
             <p class="document-block__actions">
               <svg class="icon svg-icon-download"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-download"></use> </svg> <svg class="icon svg-icon-trash"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use> </svg>
             </p>
           </div>
         </div>
         <div class="leads-block__form">
           <a href="" class="add-documents"><span>Add New </span><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></a>
         </div>
      </div>

      <div class="leads-block">
         <h2 class="leads-block__title">Notes</h2>

         <div class="leads-block__row">
            <div class="note-block">
              <div class="note-block__header clearfix">
                <span class="name">Lindsey Gough</span>
                <span class="date">Oct 23 12:29pm</span>
              </div>

              <div class="note-block__body">
                I spoke to patient today to move their appointment to earlier in the day.
              </div>
            </div>
          </div>

          <form id="message-form" action="">
            <div class="leads-block__form">

            <textarea name="text" placeholder="Add new note…"></textarea>
            <button type="submit">
              <svg class="icon svg-icon-plus"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-plus"></use> </svg>
            </button>
            </div>
          </form>
      </div>


    </div><!-- col-12 col-lg-4 -->

    <div class="col-12 col-lg-4">
      <div class="leads-block">
         <h2 class="leads-block__title">Team</h2>

          <table class="team-leads">
            <tbody><tr>
               <td><div class="team-leads__photo"><img src="assets/images/c/team-ph.png" alt=""></div></td>
              <td colspan="3">
                <div class="clearfix">
                  <span class="team-leads__name">Kerry-Lee Sharpe</span>
                  <span class="team-leads__post">Patient Care Manager</span>
                </div>
              </td>


              <td><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></td>

            </tr>
            <tr>
               <td><div class="team-leads__photo"><img src="assets/images/c/team-ph.png" alt=""></div></td>
              <td colspan="3">
                <div class="clearfix">
                  <span class="team-leads__name">Kerry-Lee Sharpe</span>
                  <span class="team-leads__post">Patient Care Manager</span>
                </div>
              </td>
               <td><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></td>

                  </tr>
          </tbody></table>
         <div class="leads-block__row">
        </div>
         <div class="leads-block__row">

          <div class="select-imitation fullwidth">
            <select name="team" id="">
              <option value="1">User 1</option>
              <option value="2">User 2</option>
            </select>
          </div>
        </div>
      </div>

      <div class="leads-block">
         <h2 class="leads-block__title">Activity</h2>

        <div class="leads-block__row">
          <ul class="leads-block__activity">
            <li>
              <i class="state-none icon-activity"></i>
              <span class="leads-block__activity-text">
                <span class="action">Lead Created</span>
                <span class="date">23 October 2019 at 12:15pm</span>
              </span>

              <span class="length">0d 0h 0m</span>
            </li>
            <li>
              <i class="state-none icon-activity"></i>
              <span class="leads-block__activity-text">
                <span class="action">Assigned to Kerry-Lee Sharpe</span>
                <span class="date">23 October 2019 at 12:15pm</span>
              </span>
              <span class="length">1d 2h 3m</span>
            </li>
            <li>
              <i class="state-none icon-activity"></i>
              <span class="leads-block__activity-text">
                <span class="action">Moved to Contact #1</span>
                <span class="date">23 October 2019 at 12:15pm</span>
              </span>
              <span class="length">4d 5h 6m</span>
            </li>
          </ul>
        </div>
    </div><!-- col-12 col-lg-4 -->
  </div><!-- row -->
</div><!-- container -->

<div class="spacer-h-70"></div>
<script>
  jQuery(document).ready(function(){
    var select = new Vue({
      el: '#select-imitation-sourses',

      data:{
      },

      mounted: function(){
         props =  {
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          props.options = ['--Select--', 'Live Chat', 'Instagram', 'Google PPC', 'Website', 'Phone', "Walk In", "Other"];
          props.selected = "<?php

          $sourses = array(
              'live-chat'  => 'Live Chat',
              'instagram'  => 'Instagram',
              'google-ppc' => 'Google PPC',
              'website'    => 'Website',
              'phone'      => 'Phone',
              'walk-in'    => 'Walk In',
              'other'      => 'Other',
            );
          echo $sourses[$patient_data['sourse']];
          ?>";


          for( id in props){
            this.$refs['sourse_select'].set_value(id, props[id]);
          }
      },
    })
  })
</script>