<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div id="single-lead">

<input-field _type="hidden" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="user_name" _value="<?php echo $user_name?>"></input-field>

<input-field _type="hidden" ref="lead_id_input" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="lead_id" _value="<?php echo $lead_id; ?>"></input-field>

<div class="spacer-h-40"></div>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8">
      <a href="<?php echo $return_url; ?>" class="button-back">
        <svg class="icon svg-icon-back"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-back"></use> </svg>
        <span> Back to Leads</span>
      </a>

      <a href="#" class="reminder">
        <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
        <span class="label">Set Reminder</span>

        <datepicker v-on:input_value_changed="update_lead($event, 'reminder')" v-bind:class="'value'" v-bind:placeholder="'MM dd YYYY hh:mm'" _name="reminder" _value="<?php echo $reminder; ?>"></datepicker>
      </a>

      <span class="lead-tag <?php echo $lead_type['class'] ?>"><?php echo $lead_type['text'] ?></span>


    </div>
    <div class="col-12 col-md-4 text-right-md">

      <a href="<?php echo $return_url; ?>" v-on:click.prevent v-on:click="do_delete_or_return('<?php echo $return_url; ?>')" class="button-cancel"><?php echo $text_save_del; ?></a>

      <?php wp_nonce_field('update_meta_nonce_id', 'lead_data', false); ?>

      <a href="javascript:void(0)" class="button-create" v-on:click="save_lead_meta()">
          <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
        <span><?php echo $text_save_btn; ?></span>
      </a>
    </div>
  </div>

</div><!-- container-fluid -->

<div class="spacer-h-30"></div>
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-4">

     <?php /************************************/
           /************************************
           /*********** PARIENT DATA   ********/
           /************************************/
           /************************************/?>
      <div class="leads-block">
        <form action="" id="patient_data">
          <h2 class="leads-block__title">Patient Information</h2>

          <div class="leads-block__row">
            <form id="patient_data" method="POST">
              <div class="leads-block__name">

                <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="name" _value="<?php echo $patient_data['name']?>" v-bind:class="'leads-block__input lg'"></input-field>

                <span class="leads-block__comment">Added <?php echo $patient_data['date_time']?></span>
              </div>
              <table class="leads-block__data">
                <tr>
                  <td>
                    <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Phone</p></td>
                  <td>
                    <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="phone" _value="<?php echo $patient_data['phone']?>"></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">E-mail</p></td>
                  <td>
                     <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="email" _value="<?php echo $patient_data['email']?>"></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Source</p></td>
                  <td>
                    <div id="select-imitation-sourses">
                      <select-imitation _select_name="sourse" v-on:update_list="update_lead($event, 'patient_data')" ref="sourse_select" _selected="<?php
                          $sourses = array(
                              'live-chat'  => 'Live Chat',
                              'instagram'  => 'Instagram',
                              'google-ppc' => 'Google PPC',
                              'website'    => 'Website',
                              'phone'      => 'Phone',
                              'walk-in'    => 'Walk In',
                              'other'      => 'Other',
                            );
                          echo (isset($sourses[$patient_data['sourse']]) ? $sourses[$patient_data['sourse']] : '--Select--');
                          ?>"
                        ></select-imitation>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Treatment</p></td>
                  <td>
                     <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="treatment" _value="<?php echo $patient_data['treatment']?>"></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Clinic</p></td>
                  <td>
                    <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="clinic" _value="<?php echo $patient_data['clinic']?>"></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Date / Time</p></td>
                  <td>
                     <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="date_time" _readonly="1" _value="<?php echo $patient_data['date_time']?>"></input-field>
                  </td>
                </tr>
              </table>
            </form>
          </div><!-- leads-block__row -->
        </form>
      </div><!-- leads-block -->

     <?php /************************************/
           /************************************
           /*********** MESSage CENTER  ********/
           /************************************/
           /************************************/?>
      <div class="leads-block hidden">
        <h2 class="leads-block__title">Message Center</h2>


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

     <?php /************************************/
           /************************************
           /*********** TREATMENT BLOCK ********/
           /************************************/
           /************************************/?>

      <div class="leads-block">
        <div class="leads-block__row">
          <i class="icon-holder">
            <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
          </i>
        </div>

        <h2 class="leads-block__title">Proposed Treatment Value</h2>

        <form id="treatment_value" method="POST">
          <div class="leads-block__row">
           <div class="leads-block__price">

            <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="value" _value="<?php echo (isset($treatment_value['value']))? format_price($treatment_value['value']): ''?>" _placeholder="£00.00" v-bind:class="'leads-block__input xxl'"></input-field>
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
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="terms" _value="<?php echo $treatment_value['terms']?>" v-bind:class="'leads-block__input sm'"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-monthly green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-monthly"></use> </svg>
                </td>
                <td><p class="leads-block__label">Monthly</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="mounthly" _value="<?php echo $treatment_value['mounthly']?>" v-bind:class="'leads-block__input sm'"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-card green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
                </td>
                <td><p class="leads-block__label">Payment Method</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="payment_method" _value="<?php echo $treatment_value['payment_method']?>" v-bind:class="'leads-block__input sm'"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-tooth green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                </td>
                <td><p class="leads-block__label">Treatment</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="treatment" _value="<?php echo $treatment_value['treatment']?>" v-bind:class="'leads-block__input sm'"></input-field>
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div><!-- leads-block -->


     <?php /************************************/
           /************************************/
           /******* TREATMENT Co-Ordinator *****/
           /************************************/
           /************************************/?>

      <div class="leads-block">
        <h2 class="leads-block__title">Treatment Co-Ordinator</h2>

        <div class="leads-block__row">
          <form action="POST" id="treatment_coordinator">
            <table class="leads-block__data">
              <tr>
                <td>
                  <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
                </td>
                <td><p class="leads-block__label">Consultation Date</p></td>
                <td>
                  <datepicker v-on:input_value_changed="update_lead($event, 'treatment_coordinator')" v-bind:class="'leads-block__input sm'" _name="consultation_date" _value="<?php echo $treatment_coordinator['consultation_date']; ?>"></datepicker>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-lamp"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-lamp"></use> </svg>
                </td>
                <td><p class="leads-block__label">Reason for Appt.</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_coordinator')" _name="reason" _value="<?php echo $treatment_coordinator['reason']?>" v-bind:class="'sm'"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-leaps"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leaps"></use> </svg>
                </td>
                <td><p class="leads-block__label">Dentist Seen</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_coordinator')" _name="specialist" _value="<?php echo $treatment_coordinator['specialist']?>" v-bind:class="'sm'"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <svg class="icon svg-icon-chat"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-chat"></use> </svg>
                </td>
                <td><p class="leads-block__label">Follow Up</p></td>
                <td>
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_coordinator')" _name="follow" _value="<?php echo $treatment_coordinator['follow']?>" v-bind:class="'sm'"></input-field>
                </td>
              </tr>

            </table>
          </form>
        </div>
      </div><!-- leads-block -->



      <div class="leads-block">
         <h2 class="leads-block__title">Documents</h2>
         <div class="leads-block__row">

           <div class="document-block" v-for="(file , file_id ) in files_updated" >
             <svg class="icon svg-icon-doc"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-doc"></use> </svg>

             <p class="document-block__text">
               <span class="name">{{file.name}}</span>
               <span class="date">{{file.date}}</span>
             </p>
             <p class="document-block__actions">
              <a v-bind:href="file.url" download class="document-block__actions-load">
               <svg class="icon svg-icon-download"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-download"></use> </svg>
              </a>

               <svg class="icon svg-icon-trash" v-on:click="remove_file(file_id)"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use> </svg>
             </p>
           </div>
         </div>

         <form method="POST" action="<?php echo $url; ?>" v-on:submit.prevent enctype="multipart/form-data" v-on:submit = "load_file">
           <input type="file" name="file" class="hidden" id="new_file" ref="file_input" v-on:change="file_changed">
           <div class="leads-block__form">
             <label class="add-documents" for="new_file"><span> Add New </span><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></label>

             <?php wp_nonce_field('upload_file_nonce_id', 'file_nonce') ?>

             <button type="submit" class="leads-block__form-submit" v-show="file_is_prepared">Upload</button>
           </div>
         </form>
      </div>

      <div class="leads-block">
         <h2 class="leads-block__title">Notes <span class="info-helper" title="use Enter for line breaks, use Alt+Enter to add note">?</span>
        </h2>
         <div class="leads-block__row">
            <div v-for="note in notes" class="note-block">
              <div class="note-block__header clearfix">
                <span class="name">{{note.user_name}}</span>
                <span class="date">{{note.date}}</span>
              </div>

              <div class="note-block__body">
                <pre>{{note.text}}</pre>
              </div>
            </div>
          </div>

          <form id="message-form" v-on:submit.prevent  v-on:submit="add_note()" >
            <div class="leads-block__form">

            <textarea name="text" placeholder="Add new note…" ref="note_textarea" v-model="note_text" @keyup.alt.enter="add_note()" @keyup.ctrl.enter="add_note()" title="use Enter for line breaks, use Alt+Enter to add note"></textarea>

            <button type="submit" >
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
                <span class="date"><?php echo $time_lead_created ?></span>
              </span>

              <span class="length">0d 0h 0m</span>
            </li>
            <li v-for="(log, ind) in logs">
              <i class="state-none icon-activity"></i>
              <span class="leads-block__activity-text">
                <span class="action">{{log.text}}</span>
                <span class="date">{{log.date_formatted}}</span>
              </span>
              <span class="length">{{log.time_passed}}</span>
            </li>
          </ul>
        </div>
    </div><!-- col-12 col-lg-4 -->
  </div><!-- row -->
</div><!-- container -->

<div class="spacer-h-70"></div>
</div>