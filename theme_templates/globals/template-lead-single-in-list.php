<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}


?>
<div id="single-lead-in-list">

  <div class="spacer-h-40"></div>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="row no-gutters justify-content-center justify-content-start-sm">
          <a href="javascript:void(0)" class="button-back">
            <svg class="icon svg-icon-back"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-back"></use> </svg>
            <span> Back to Leads</span>
          </a>

          <a href="#" class="reminder">
            <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
            <span class="label">Set Reminder</span>

            <datepicker v-on:input_value_changed="update_lead($event, 'reminder')" v-bind:class="'value'" v-bind:placeholder="'MM dd YYYY hh:mm'" _name="reminder"></datepicker>

            <span href="javascript:void(0)" v-on:click="clear_reminder()" class="clear-reminder">clear</span>
          </a>

          <span class="lead-tag">{{lead_type}}</span>
        </div><!-- row no-gutters justify-content-center justify-content-start-sm -->
      </div><!-- col-12 col-md-8 -->

      <div class="col-12 col-md-4 text-center text-right-md">

        <a href="" v-on:click.prevent v-on:click="do_delete_or_return('')" class="button-cancel"></a>

        <?php wp_nonce_field('update_meta_nonce_id', 'lead_data', false); ?>

        <a href="javascript:void(0)" class="button-create" v-on:click="save_lead_meta()">
            <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
          <span>{{text_save_btn}}</span>
        </a>
      </div><!-- col-12 col-md-4 text-center text-right-md -->
    </div><!-- row -->
  </div><!-- container -->

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
            <h2 class="leads-block__title">Patient Information

              <span class="icons">
                <span class="phones">
                  <i class="phone-ok icon" v-for="n in phones_count" v-on:click="change_phone('remove')"></i><i class="phone-na icon"  v-for="n in phones_left" v-on:click="change_phone('add')"></i>
                </span>

                <span class="messages">
                  <i class="message-ok icon" v-for="n in messages_count"  v-on:click="change_message('remove')"></i><i class="message-na icon"  v-for="n in messages_left"  v-on:click="change_message('add')"></i>
                </span>
              </span>
            </h2>

            <div class="leads-block__row">
              <form id="patient_data" method="POST">
                <div class="leads-block__name">

                  <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="name" v-model="patient_data.name" v-bind:class="'leads-block__input lg'"></input-field>

                  <span class="leads-block__comment"></span>
                </div>
                <table class="leads-block__data">
                  <tr>
                    <td>
                      <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Phone</p></td>
                    <td>
                      <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="phone" v-model="patient_data.phone"></input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">E-mail</p></td>
                    <td>
                      <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="email"  v-model="patient_data.email" ></input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Source</p></td>
                    <td>
                      <div id="select-imitation-sourses">
                        <select-imitation _select_name="source" v-on:update_list="update_lead($event, 'patient_data')" ref="source_select"  v-model="patient_data.source"
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

                      <div class="clearfix">
                        <select-imitation v-bind:class="'style-less'" _name="treatment"  _select_name="treatment" v-on:update_list="update_lead($event, 'patient_data')" ref="treatments_select" v-model="patient_data.treatment"
                      ></select-imitation>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Clinic</p></td>
                    <td>

                      <select-imitation v-bind:class="'style-less'" _name="clinic"  _select_name="clinic" v-on:update_list="update_lead($event, 'patient_data')" ref="clinic_select" v-model="patient_data.clinic"></select-imitation>

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Campaign</p></td>
                    <td>
                      <select-imitation
                      v-bind:class="'style-less'"
                      _select_name="campaign" v-on:update_list="update_lead($event, 'patient_data')" ref="campaign_select" v-model="patient_data.campaign"
                        ></select-imitation>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Date / Time</p></td>
                    <td>
                      <datepicker v-on:input_value_changed="update_lead($event, 'patient_data')" v-bind:class="'leads-block__input sm'" _name="date_time" _value=""></datepicker>
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

              <input-field
              v-on:input_value_changed="update_lead($event, 'treatment_value')"
              _name="value"
              v-model = "treatment_value.value"
              _placeholder="£00.00"
              v-bind:class="'leads-block__input xxl'"
              @focus.native="price_to_value('price_input_field')"
              @blur.native="value_to_price('price_input_field')"
              ref='price_input_field'
              >
              </input-field>
              </div>
            </div>

            <div class="leads-block__row">
              <table class="leads-block__data">
                <tr>
                  <td><svg class="icon svg-icon-card green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg></td>
                  <td><p class="leads-block__label">Billed</p></td>
                  <td>
                    <input-field
                    v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="billed"
                    v-model = "treatment_value.billed"
                    v-bind:class="'leads-block__input sm'"
                    @focus.native="price_to_value('input_billed')"
                    @blur.native="value_to_price('input_billed')"
                    ref="input_billed"></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-card green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Payment Method</p></td>
                  <td>
                  <div class="clearfix">
                    <select-imitation
                    v-bind:class="'style-less'"
                     _select_name="payment_method"
                      v-model = "treatment_value.payment_method"
                     v-on:update_list="update_lead($event, 'treatment_value')"
                     ref="payment_method_select"
                     _selected=""
                      ></select-imitation>
                  </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-clock green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clock"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Payment Terms</p></td>
                  <td>
                    <select-imitation
                    v-bind:class="'style-less'"
                    _name="terms"
                    _select_name="terms"
                    v-on:update_list="update_lead($event, 'treatment_value')"
                    ref="terms_select"
                     v-model = "treatment_value.terms"
                      ></select-imitation>

                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-monthly green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-monthly"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Monthly</p></td>
                  <td>
                    <input type="text" readonly class="leads-block__input leads-block__input sm" v-bind:value="monthly_payment">
                  </td>
                </tr>

                <tr>
                  <td <?php echo 'style="vertical-align: top;"'; ?>>
                    <svg class="icon svg-icon-tooth green" > <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                  </td>
                  <td <?php echo 'style="vertical-align: top;"'; ?>><p class="leads-block__label">Treatment</p></td>
                  <td>
                    <div class="dentist-name" v-for="treatment in c_treatments">{{treatment}}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                     <select-imitation
                       v-bind:class="'fullwidth'"
                       _name="treatment"
                       _select_name="treatment"
                       v-on:update_list="update_lead($event, 'treatment_value')"
                       ref="treatments_select2"
                      ></select-imitation>
                      <br>
                    <small><i>Select a treatment to add it. <br> Select treatment again to remove it</i></small>
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
                    <datepicker
                    v-on:input_value_changed="update_lead($event, 'treatment_coordinator')"
                    v-bind:class="'leads-block__input sm'"
                    _name="consultation_date"
                    _value=""
                    v-model="treatment_coordinator.consultation_date"
                    ></datepicker>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-lamp"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-lamp"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Reason for Appt.</p></td>
                  <td>
                    <input-field
                    v-on:input_value_changed="update_lead($event, 'treatment_coordinator')"
                     _name="reason"
                     _value=""
                     v-bind:class="'sm'"
                     v-model="treatment_coordinator.reason"
                     ></input-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-chat"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-chat"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Follow Up</p></td>
                  <td>
                    <input-field
                    v-on:input_value_changed="update_lead($event, 'treatment_coordinator')"
                    _name="follow"
                    _value=""
                    v-bind:class="'sm'"
                    v-model="treatment_coordinator.follow"
                    ></input-field>
                  </td>
                </tr>

                <tr>
                  <td <?php echo 'style="vertical-align: top"';  ?>>
                    <svg class="icon svg-icon-leaps" <?php echo'style="margin-top: 10px"';  ?>> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leaps"></use> </svg>
                  </td>
                  <td  <?php echo 'style="vertical-align: top"';  ?>><p class="leads-block__label">Dentist Seen</p></td>
                  <td>
                    <div class="dentist-name" v-for="dentist in c_dentists">{{dentist}}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                   <select-imitation
                   v-bind:class="'fullwidth'"
                   _name="specialist"
                   _select_name="specialist"
                   v-on:update_list="update_lead($event, 'treatment_coordinator')"
                   ref="specialist_select"
                   _selected=""
                    ></select-imitation>

                    <br>
                    <small><i>Select a name to add a dentist. <br> Select name again to remove a dentist</i></small>

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

           <form method="POST" action="" v-on:submit.prevent enctype="multipart/form-data" v-on:submit = "load_file">
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
            <div v-for="note,key in notes" class="note-block" v-if="note.show == 1">
              <div class="note-block__header clearfix">
                <span class="name">{{note.user_name}}</span>
                <span class="date">{{note.date}}</span>
              </div>

              <div class="note-block__body" v-bind:class="{'manager-note': note.is_manager == 'yes'}">
                {{note.text}}

                <i class="remove-note-icon" v-if=" lead_data.user_name === note.user_name" v-on:click="delete_note(key)">
                  <svg class="icon svg-icon-trash"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use></svg>
                </i>

                <i class="icon-manager-done" v-on:click="mark_note_done(key, 'no')" v-if="note.is_manager == 'yes' && note.done =='yes'"></i>

                <i class="icon-manager-done not" v-on:click="mark_note_done(key, 'yes')" v-if="note.is_manager == 'yes' && note.done !='yes'"></i>
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
        </div><!-- leads-block -->
      </div><!-- col-12 col-lg-4 -->

      <div class="col-12 col-lg-4">
        <div class="leads-block">
           <h2 class="leads-block__title">Team</h2>

            <table class="team-leads">
              <tbody><tr v-for="(sp, index) in visible_specialists">
                 <td><div class="team-leads__photo"><img v-bind:src="sp.photo" v-bind:alt="sp.name"></div></td>
                <td colspan="3">
                  <div class="clearfix">
                    <span class="team-leads__name">{{sp.name}}</span>
                    <span class="team-leads__post">{{sp.position}}</span>
                  </div>
                </td>
                <td class="text-right">  <svg class="icon svg-icon-trash" v-on:click="remove_specialist(sp.name)"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use> </svg></td>

              </tr>
            </tbody></table>
           <div class="leads-block__row">
           </div>
           <div class="leads-block__row">

            <select-imitation _select_name="lead_specialists" v-on:update_list="update_specialists($event)" v-bind:class="'fullwidth'" ref="lead_specialists_select"></select-imitation>

            <span class="button-assign" v-if="show_add_specialist_button" v-on:click="assign_specialist()">assign specialist</span>
           </div><!-- leads-block__row -->
        </div><!-- leads-block -->

        <div class="leads-block">
          <h2 class="leads-block__title">Activity</h2>
          <div class="leads-block__row">
            <ul class="leads-block__activity">
              <li>
                <i class="state-none icon-activity"></i>
                <span class="leads-block__activity-text">
                  <span class="action">Lead Created</span>
                  <span class="date"></span>
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
        </div><!-- leads-block -->
      </div><!-- col-12 col-lg-4 -->
    </div><!-- row -->
  </div><!-- container -->

  <div class="spacer-h-70"></div>

  <div class="s-popup-wrapper" id="single-lead-popup" v-bind:class="{'shown': show_confirmation_popup}">



    <div class="s-popup">
      <i class="s-popup-icon">
        <svg id="SVGDoc-icon-1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 24 24"><path d="M10.92188,9.63779l-3.34497,-3.33968l-1.32587,1.32366l3.34497,3.33986h-2.42413v1.87214h5.625v-5.61641h-1.875zM9.19257,20.25h-1.88007v1.875c0,1.03546 0.84181,1.875 1.88007,1.875h1.83307v-1.875h-1.83307zM22.12503,18.46875h1.86503v-1.875h-1.86503zM22.12503,14.80254h1.86503v-1.86503h-1.86503zM22.12501,7.40625h-1.82813v1.875h1.82813v1.875h1.875v-1.875c0,-1.03546 -0.83954,-1.875 -1.875,-1.875zM16.5469,23.99005h1.86503v-1.86503h-1.86503zM12.7969,23.99005h1.86503v-1.86503h-1.86503zM22.12501,22.125h-1.82813v1.875h1.82813c1.03546,0 1.875,-0.83954 1.875,-1.875v-1.875h-1.875zM14.71875,13.78125c0,0.51691 -0.42059,0.9375 -0.9375,0.9375h-10.96875c-0.51691,0 -0.9375,-0.42059 -0.9375,-0.9375v-10.96875c0,-0.51691 0.42059,-0.9375 0.9375,-0.9375h10.96875c0.51691,0 0.9375,0.42059 0.9375,0.9375zM16.59375,2.8125c0,-1.5509 -1.2616,-2.8125 -2.8125,-2.8125h-10.96875c-1.5509,0 -2.8125,1.2616 -2.8125,2.8125v10.96875c0,1.5509 1.2616,2.8125 2.8125,2.8125h4.5v1.875h1.875v-1.875h4.59375c1.5509,0 2.8125,-1.2616 2.8125,-2.8125v-4.5h1.82813v-1.875h-1.82813z" fill="#3458ff" fill-opacity="1"></path></g></g></svg>
      </i>

      <h2 class="s-popup-title">Move Lead</h2>

      <p class="s-popup-text">Please select where you’d like this lead to be moved to</p>

      <select-imitation
       v-bind:class="'fullwidth'"
       _name="lead_stage"
       _select_name="lead_stage"
       _selected =""
       v-on:update_list="update_lead_stage($event, 'treatment_value')"
       ref="lead_stage_select2"
      ></select-imitation>

      <a href="javascript:void(0)" class="s-popup-submit" v-on:click="save_new_stage()">Confirm</a>

      <a href="javascript:void(0)" v-on:click="{show_confirmation_popup = false}" class="s-popup-cancel">Cancel</a>

      <span class="s-popup-comment">
        Go back to lead
      </span>
    </div>
  </div>
</div>
