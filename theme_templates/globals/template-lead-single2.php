<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}


?>
<div id="single-lead">

  <input-field _type="hidden" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="user_id" _value="<?php echo $user_id?>" ref="current_user_id"></input-field>

  <input-field _type="hidden" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="user_name" _value="<?php echo $user_name?>"></input-field>

  <input-field _type="hidden" ref="lead_id_input" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="lead_id" _value="<?php echo $lead_id; ?>"></input-field>

  <input-field _type="hidden" ref="lead_stage" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="lead_stage" _value="<?php echo $lead_stage; ?>"></input-field>

  <input-field _type="hidden" ref="lead_stage_prev" v-on:input_value_changed="update_lead($event, 'lead_data')" _name="lead_stage_prev" _value="<?php echo $lead_stage; ?>"></input-field>

  <div class="spacer-h-40"></div>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="row no-gutters justify-content-center justify-content-start-sm">
          <a href="#" class="button-back trigger-close" v-on:click="close_tab()">
             <svg class="icon svg-icon-back"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-back"></use> </svg>
            <span>Back</span>
          </a>

          <a href="#" class="reminder">
            <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
            <span class="label">Set Reminder</span>

            <datepicker v-on:input_value_changed="update_lead($event, 'reminder')" v-bind:class="'value'" v-bind:placeholder="'MM dd YYYY hh:mm'" _name="reminder" _value="<?php echo $reminder; ?>"></datepicker>

            <span href="javascript:void(0)" v-on:click="clear_reminder()" class="clear-reminder <?php echo ( empty($reminder) ) ? 'hidden' : '';?>">clear</span>
          </a>

          <span class="lead-tag <?php echo $lead_type['class'] ?>"><?php echo $lead_type['text'] ?></span>
        </div><!-- row no-gutters justify-content-center justify-content-start-sm -->
      </div><!-- col-12 col-md-8 -->

      <div class="col-12 col-md-4 text-center text-right-md">


        <?php if ($can_delete && $lead_id >=0 ): ?>
          <a href="<?php echo $return_url; ?>" v-on:click.prevent v-on:click="do_delete_or_return('<?php echo $return_url; ?>')" class="button-cancel"><?php echo $text_save_del; ?></a>
        <?php endif ?>

        <?php wp_nonce_field('update_meta_nonce_id', 'lead_data', false); ?>

        <a href="javascript:void(0)" class="button-create" v-on:click="save_lead_meta()">
            <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
          <span><?php echo $text_save_btn; ?></span>
        </a>

        <div class="dots-container">
          <svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg>

          <div class="dots-dropdown">
            <ul>
              <li>
                <svg class="icon svg-icon-turnoff"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-turnoff"></use> </svg>
                Deactivate
              </li>
              <li>
                <svg class="icon svg-icon-delete"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-delete"></use> </svg>
                Delete
              </li>
            </ul>
          </div>
        </div>
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
            <h2 class="leads-block__title"><i class="icon-blue"></i> Reception Team

              <span class="icons">
                <span class="phones">
                  <i class="phone-ok icon" v-for="n in phones_count" v-on:click="change_phone('remove')"></i><i class="phone-na icon"  v-for="n in phones_left" v-on:click="change_phone('add')"></i>
                </span>

                <span class="messages">
                  <i class="message-ok icon" v-for="n in messages_count"  v-on:click="change_message('remove')"></i><i class="message-na icon"  v-for="n in messages_left"  v-on:click="change_message('add')"></i>
                </span>
              </span>
            </h2>

            <div class="hr"></div>

              <div class="row no-gutters">
                <div class="col-6 valign-top">
                  <div class="spacer-h-10"></div>
                  <span class="leads-block__title">
                     <svg class="icon svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>&nbsp;Assigned
                  </span>
                </div>
                <div class="col-6 valign-center padding-r-30">


                    <table class="team-leads" v-if="visible_specialists.length > 0">
                      <tbody><tr v-for="(sp, index) in visible_specialists">
                        <td><div class="team-leads__photo"><img v-bind:src="sp.photo" v-bind:alt="sp.name" v-on:click="remove_specialist(sp.name)"></div></td>
                        <td colspan="3">
                          <div class="clearfix">
                            <span class="team-leads__name" v-on:click="remove_specialist(sp.name)">{{sp.name}}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody></table>

                     <select-imitation <?php // v-bind:class="visible_specialists_show_select" ?> _select_name="lead_specialissts" v-on:update_list="update_specialists($event)" v-bind:class="'fullwidth'" ref="lead_specialissts_select"></select-imitation>
                </div>
              </div>

            <div class="hr"></div>

            <span class="leads-block__title">
              Patient Information
            </span>

            <div class="spacer-h-10"></div>

            <div class="leads-block__row">
              <form id="patient_data" method="POST">
                <div class="leads-block__name">

                  <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="name" _value="<?php echo (isset($patient_data['name']))?$patient_data['name']: ""?>" v-bind:class="'leads-block__input lg'"></input-field>

                  <span class="leads-block__comment"> <?php echo isset($patient_data['date_time'])? 'Added '.$patient_data['date_time']: ''?></span>
                </div>
                <table class="leads-block__data">
                  <tr>
                    <td>
                      <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Phone <span class="mark">*</span></p></td>
                    <td>
                      <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="phone" _value="<?php echo isset($patient_data['phone'])? $patient_data['phone'] : ''?>"></input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">E-mail <span class="mark">*</span></p></td>
                    <td>
                      <input-field v-on:input_value_changed="update_lead($event, 'patient_data')" _name="email" _value="<?php echo isset($patient_data['email'])? $patient_data['email'] : ''?>"></input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Source <span class="mark">*</span></p></td>
                    <td>
                      <div id="select-imitation-sourses">
                        <select-imitation _select_name="source" v-on:update_list="update_lead($event, 'patient_data')" ref="source_select" _selected="<?php
                            echo isset($patient_data['source']) ? $patient_data['source'] : '';
                            ?>"
                          ></select-imitation>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Enquiry</p></td>
                    <td>

                      <div class="clearfix">
                        <select-imitation v-bind:class="'style-less'" _name="treatment"  _select_name="treatment" v-on:update_list="update_lead($event, 'patient_data')" ref="treatments_select" _selected="<?php echo isset($patient_data['treatment'])? $patient_data['treatment'] : ''?>"
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

                      <select-imitation v-bind:class="'style-less'" _name="clinic"  _select_name="clinic" v-on:update_list="update_lead($event, 'patient_data')" ref="clinic_select" _selected="<?php echo isset($patient_data['clinic'])? $patient_data['clinic'] : ''?>"></select-imitation>

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
                      _select_name="campaign" v-on:update_list="update_lead($event, 'patient_data')" ref="campaign_select" _selected="<?php
                          echo isset($patient_data['campaign']) ? $patient_data['campaign'] : '';
                          ?>"
                        ></select-imitation>
                    </td>
                  </tr>
                </table>
              </form>
            </div><!-- leads-block__row -->
          </form>

          <div class="spacer-h-30"></div>

          <h2 class="leads-block__title">Enquiry Notes</h2>

           <div class="spacer-h-20"></div>

          <div class="leads-block__row">
            <div v-for="note,key in enquery_notes_c" class="note-block">
              <div class="note-block__header clearfix">
                <span class="name">{{note.user_name}}</span>
                <span class="date">{{note.date}}</span>

                <i class="remove-note-icon" v-if=" lead_data.user_name === note.user_name" v-on:click="delete_note(note.key, 'enquery')">
                  <svg class="icon svg-icon-trash"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use></svg>
                </i>
              </div>

              <div class="note-block__body" v-bind:class="{'manager-note': note.is_manager == 'yes'}">
               <span class="inner">{{note.text}}</span>
               <i class="icon-manager-done" v-on:click="mark_note_done(note.key, 'no')" v-if="note.is_manager == 'yes' && note.done =='yes'"></i>

                <i class="icon-manager-done not" v-on:click="mark_note_done(note.key, 'yes')" v-if="note.is_manager == 'yes' && note.done !='yes'"></i>
              </div>
            </div>

            <span class="note-block__show-more" v-on:click="enquery_notes_count = notes.length" v-if="enquery_notes_count < enquery_notes_count_c"> <i class="icon"></i> Show {{enquery_notes_count_c - 1}} more</span>
            <div class="spacer-h-15"></div>
          </div>

          <form id="message-form-reception" v-on:submit.prevent  v-on:submit="add_note('enquery')" >
            <div class="leads-block__form">

            <textarea name="text" placeholder="Enter new note…" ref="note_textarea" v-model="note_text" @keyup.alt.enter="add_note('enquery')" @keyup.ctrl.enter="add_note('enquery')" title="use Enter for line breaks, use Alt+Enter to add note"></textarea>

            <button type="submit" class="button-submit">
              <svg class="icon svg-icon-send"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-send"></use> </svg>
            </button>

            </div>
          </form>
        </div>


     </div><!-- col-12 col-lg-4 -->

      <div class="col-12 col-lg-4">

       <?php /************************************/
             /************************************
             /*********** TREATMENT BLOCK ********/
             /************************************/
             /************************************/?>

        <div class="leads-block">
          <h2 class="leads-block__title"><i class="icon-red"></i> TCO Team

          <span class="icons">
            <span class="phones">
              <i class="phone-ok icon"  v-if="phones_tco > 0" v-on:click="change_phone_tco('remove')"></i>
              <i class="phone-na icon"  v-if="phones_tco == 0" v-on:click="change_phone_tco('add')"></i>
              <i class="message-ok icon" v-if="messages_tco > 0" v-on:click="change_message_tco('remove')"></i>
              <i class="message-na icon" v-if="messages_tco == 0" v-on:click="change_message_tco('add')"></i>
            </span>
          </span>
          </h2>

          <div class="hr"></div>

          <div class="row no-gutters">
              <div class="col-6 valign-top">
                <div class="spacer-h-10"></div>
                <span class="leads-block__title">
                   <svg class="icon  svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>
                   Assigned<span class="mark">*</span>
                </span>
              </div>
              <div class="col-6 valign-center padding-r-30">


                  <table class="team-leads" v-if="visible_specialists_tco.length > 0">
                    <tbody><tr v-for="(sp, index) in visible_specialists_tco">
                      <td><div class="team-leads__photo"><img v-bind:src="sp.photo" v-bind:alt="sp.name" v-on:click="remove_specialist(sp.name)"></div></td>
                      <td colspan="3">
                        <div class="clearfix">
                          <span class="team-leads__name" v-on:click="remove_specialist(sp.name)">{{sp.name}}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody></table>

                 <select-imitation <?php // v-bind:class="visible_specialists_show_select_tco"  ?>_select_name="lead_specialissts_tco" v-on:update_list="update_specialists($event, 'tco')" v-bind:class="'fullwidth'" ref="lead_specialissts_select_tco"></select-imitation>
              </div>
          </div>
          <div class="hr"></div>
          <?php
          /* first time appointment book

           <span class="leads-block__title">First Appointment</span>

          <div class="leads-block__row">
            <table class="leads-block__data">
              <tr>
                <td>
                  <svg class="icon svg-icon-date"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-date"></use> </svg>
                </td>
                <td><p class="leads-block__label">Date / Time</p></td>
                <td>
                  <datepicker v-on:input_value_changed="update_lead($event, 'patient_data')" v-bind:class="'leads-block__input sm datepicker-style'" _name="date_time" _value="<?php echo isset($patient_data['date_time'])?$patient_data['date_time']: ''; ?>"></datepicker>
                </td>
              </tr>
            </table>
          </div>

          */ ?>

            <div class="chekbox-cont">
              <div class="spacer-h-30"></div>
              <div class="row text-center no-gutters">
                <?php
                $data = array(
                  'digital' => 'Digital',
                  'tco' => 'TCO',
                  'dentist' => 'Dentist',
                  'attended' => 'Attended',
                  'fta_cancelled' => 'FTA’d / Cancelled',
                  'tax' => 'Tx Plan Given',
                );
                 ?>
                 <?php foreach ($data as $key => $label): ?>
                  <div class="col-4">
                    <label class="check-imitation">
                      <input type="checkbox" name="<?php echo $key ?>" v-model="tco_data.<?php echo $key ?>" v-on:change="save_lead_meta('tco_data','tco_data')">
                      <span class="text"><?php echo $label ?></span>
                      <span class="view"></span>
                    </label>
                  </div>
                 <?php endforeach ?>
                </div>
            </div>

          <div class="hr"></div>

          <div class="spacer-h-15"></div>
              <span class="leads-block__title">Dentist & Treatment <span class="submit-button to-right" v-on:click="add_treatment_dentist()"><svg class="icon svg-icon-plus"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-plus"></use> </svg></span></span>

              <div class="spacer-h-15"></div>

              <div class="leads-block__row">
                <div class="div clearfix" v-for = '(data, key) in treatment_data' >

                  <select-imitation-icon v-bind:class="'fullwidth'"  _select_name="dentist" v-on:update_list="update_treatment_data($event, key)" :ref="'select_dentist'"
                  ></select-imitation-icon>

                  <select-imitation-icon v-bind:class="'fullwidth'"  _select_name="treatment" v-on:update_list="update_treatment_data($event, key)" :ref="'select_treatment'"
                  ></select-imitation-icon>

                  <input-decorated v-on:input_value_changed="update_treatment_data($event, key)" :_icon="icons_selects['card']" _name="billed" v-bind:class="'leads-block__input sm styled text-left'" @focus.native="price_to_value('input_billed')" @blur.native="value_to_price('input_billed')" :ref="'select_billed'"></input-decorated>

                  <div class="spacer-h-10"></div>

                  <select-imitation-icon v-bind:class="'fullwidth'"  _select_name="payment_method" v-on:update_list="update_treatment_data($event, key)" :ref="'select_payment_method'"
                  ></select-imitation-icon>

                  <div class="spacer-h-15"></div>
                  <div class="hr"></div>
                  <div class="spacer-h-15"></div>
                </div>
              </div>

           <div class="leads-block__row">
            <table class="leads-block__data">
              <tr>
                <td colspan="2">
                  <p class="leads-block__label no-margin">Total Treatment Value</p>
                </td>
                <td class="text-right">
                  <p class="leads-block__label no-margin">{{treatment_value.value}}</p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p class="leads-block__label no-margin">Money Taken</p>
                </td>
                <td class="text-right">
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="billed" _value="<?php echo isset($treatment_value['billed'])? $treatment_value['billed'] : ""?>" v-bind:class="'leads-block__input sm text-right'" @focus.native="price_to_value('input_billed')" @blur.native="value_to_price('input_billed')" ref="input_billed"></input-field>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="icon-holder">
                    <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
                  </i>
                </td>
                <td>
                  <p class="leads-block__label no-margin">Balance remaining</p>
                </td>
                <td class="text-right">
                 <span class="leads-block__total red"><span class="currency">£</span> {{balance}}</span>
                </td>
              </tr>
            </table>
          </div>

          <div class="spacer-h-20"></div>

            <h2 class="leads-block__title">TCO Notes </h2>
            <div class="leads-block__row">
              <div v-for="note,key in tco_notes_c" class="note-block">
                <div class="note-block__header clearfix">
                  <span class="name">{{note.user_name}}</span>
                  <span class="date">{{note.date}}</span>

                  <i class="remove-note-icon" v-if=" lead_data.user_name === note.user_name" v-on:click="delete_note(key, 'tco')">
                    <svg class="icon svg-icon-trash"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use></svg>
                  </i>
                </div>

                <div class="note-block__body" v-bind:class="{'manager-note': note.is_manager == 'yes'}">
                 <span class="inner">{{note.text}}</span>

                  <i class="icon-manager-done" v-on:click="mark_note_done(key, 'no')" v-if="note.is_manager == 'yes' && note.done =='yes'"></i>

                  <i class="icon-manager-done not" v-on:click="mark_note_done(key, 'yes')" v-if="note.is_manager == 'yes' && note.done !='yes'"></i>
                </div>
              </div>
            </div>
            <div class="leads-block__row">
              <span class="note-block__show-more" v-on:click="tco_notes_count = notes_tco.length" v-if="tco_notes_count < tco_notes_count_c"> <i class="icon"></i> Show {{tco_notes_count_c - 1}} more</span>
              <div class="spacer-h-15"></div>
            </div>

            <form id="message-form" v-on:submit.prevent  v-on:submit="add_note('tco')" >
              <div class="leads-block__form">

              <textarea name="text" placeholder="Add new note…" ref="note_textarea_tco" v-model="note_text_tco" @keyup.alt.enter="add_note('tco')" @keyup.ctrl.enter="add_note('tco')" title="use Enter for line breaks, use Alt+Enter to add note"></textarea>

              <button type="submit" class="button-submit">
                <svg class="icon svg-icon-send"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-send"></use> </svg>
              </button>

              </div>
            </form>
        </div><!-- leads-block -->

      </div><!-- col-12 col-lg-4 -->

      <div class="col-12 col-lg-4">

            <div class="leads-block" v-if="patient_data.phone && lead_data.lead_id >= 0">
              <div class="leads-block__warning"> <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 16 15"><defs></defs><g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g clip-path="url(#clip-9A1E8388-719A-4D57-BE3B-1214B6B73F26)"><title>caution</title><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g></g></g></svg> Warning! Any message sent here goes to the patient</div>
              <h2 class="leads-block__title">Message Centre</h2>
              <div class="spacer-h-15"></div>


              <div class="preloader-messages text-center">
                <img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt="">
              </div>

              <div class="leads-block__row _messages hidden">
                <span class="message-sent-to">Sent to <span class="marked">{{patient_data.phone}}</span> via Ruh Tracker</span>

                      <span class="note-block__show-more" v-on:click="text_messages_to_show = 99" v-if="text_messages_to_show == 2 && text_messages.length > 2"> <i class="icon"></i> Show {{text_messages.length - 2}} more</span>

                      <div v-if="text_messages_to_show == 2 && text_messages.length > 2"><br></div>

                        <div class="message-block" v-bind:class="msg.type" v-for="msg in text_messages_shown" v-bind:key="msg">
                          <div class="message-block__header clearfix">
                             <span class="name" v-if="msg.type=='we'">&nbsp; Ruh Dental </span>
                             <span class="name" v-if="msg.type=='him'">&nbsp; {{patient_data.name}} </span>
                            <span class="date">  {{msg.date_sent}} </span>
                          </div>

                          <div class="message-block__body">
                            {{msg.body}}
                          </div>
                          <i class="message-status">{{msg.status}}</i>
                        </div>

                        <div class="" v-if="text_messages.length == 0">
                          <br>
                          <b class="text-center">There are no messages there yet</b>
                          <br>
                          <br>
                        </div>
                      </div>


                <form  method="POST" v-on:submit.prevent="send_text_message" >
                  <div class="leads-block__form">
                      <textarea name="text" v-model="message_to_client" placeholder="Start typing new message…"></textarea>
                      <button type="submit" class="submit-button">
                        <svg class="icon svg-icon-send"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-send"></use> </svg>
                      </button>
                  </div>
                </form>
            </div>

        <div class="leads-block">
           <h2 class="leads-block__title">Documents</h2>
           <div class="spacer-h-15"></div>
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
       _selected ="<?php echo $lead_stage; ?>"
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


<div class="exist-popup visuallyhidden" id="exist-popup" v-show="show" v-on:click="close">
  <div class="exist-popup__inner" v-on:click.stop>
     <div class="exist-popup__header">
       <img src="<?php echo THEME_URL?>/assets/images/svg/alarm.svg" alt=""> Existing Leads
     </div>
     <div class="spacer-h-20"></div>

     <div class="text-center">
       <img src="<?php echo THEME_URL?>/assets/images/svg/stop.svg" alt="">
       <h3 class="exist-popup__title"><b>{{number}} Existing Leads for</b> <br> {{name}} <br>{{email}} <br>{{phone}}</h3>
       <p class="exist-popup__text">It looks like there are already previous leads with the same name. Find the existing leads below or if you still wish to create this as a new lead, click <b>‘Create’</b></p>
     </div>

     <div class="spacer-h-40"></div>

     <div class="exist-popup-scroll">
        <a
         v-for ="lead, key in leads"
         :key ="'exist_lead_'+key"
         target="_blank"
         :href="lead.permalink"
          class="lead-preview">
          <div class="clearfix">
            <div class="row justify-content-start">
              <div class="col-7"><span title=" Edvige Bordone" class="lead-preview__name"><span :class="{marked: marked(lead.meta.patient_data.name)}">{{lead.meta.patient_data.name}}</span></span> </div>
              <div class="col-5"><span title="" class="lead-preview__time">{{time_passed(lead.post_date)}}</span></div>
            </div>
          </div>
          <div class="clearfix"> <span class="lead-preview__name">
            <span :class="{marked: marked(lead.meta.patient_data.email)}">{{lead.meta.patient_data.email}}</span>
            <span :class="{marked: marked(lead.meta.patient_data.phone)}">{{lead.meta.patient_data.phone}} </span>
            </span>
          </div>
          <div class="clearfix"><span class="lead-preview__sourse">{{lead.meta.patient_data.treatment}}</span></div></a>
     </div>

     <div class="spacer-h-40"></div>
     <div class="exist-popup__footer">
       <a href="#" v-on:click.prevent="cancel" class="button-back"><span>Cancel</span></a>
       <a href="#" v-on:click.prevent="create" class="button-create"><span>Create Lead</span></a>
    </div><!-- exist-popup__footer -->
  </div><!-- exist-popup__inner -->
</div><!-- exist-popup -->