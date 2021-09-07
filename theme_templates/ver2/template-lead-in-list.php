<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
echo '<script type="text/x-template" id="lead-single-tmpl">';
?>
<div v-show="visible">
  <div class="spacer-h-40"></div>

  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="row no-gutters justify-content-center justify-content-start-sm">
          <a href="#" class="button-back trigger-close" v-on:click="go_back_to_list">
             <svg class="icon svg-icon-back"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-back"></use> </svg>
            <span>Back</span>
          </a>

          <a href="#" class="reminder">
            <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
            <span class="label">Set Reminder</span>

            <datepicker2
              v-on:input_value_changed="update_lead($event, 'reminder')"  v-bind:class="'value'"
              v-bind:placeholder="'Mon d Y hh:mm'"
              _name="reminder"
              ref="reminder"
              v-bind:_value="lead_data.meta.reminder">
             </datepicker2>

            <span href="javascript:void(0)"
              v-show="show_clear_reminder"
              v-on:click="clear_reminder()"
              class="clear-reminder">clear</span>
          </a>

          <span class="lead-tag" :class="lead_status.class">{{lead_status.text}}</span>
        </div><!-- row no-gutters justify-content-center justify-content-start-sm -->
      </div><!-- col-12 col-md-8 -->

      <div class="col-12 col-md-4 text-center text-right-md">

        <a href="javascript:void(0)" class="button-create"
          v-bind:class="{gray : !requre_save}"
          v-on:click.prevent = 'exec_save'
        >
            <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
          <span>Save</span>
        </a>


        <div class="dots-container">
            <svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg>

            <div class="dots-dropdown">
              <div class="spacer-h-15"></div>
              <div class="dots-dropdown__inner">
              <ul>
                <li  v-on:click.prevent="deactivate_lead">
                  <svg class="icon svg-icon-turnoff"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-turnoff"></use> </svg>
                  {{deactivate_text}}
                </li>
                <li v-on:click.prevent="do_delete_or_return">
                  <svg class="icon svg-icon-delete"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-delete"></use> </svg>
                  Delete
                </li>
              </ul>
            </div>
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
            <div class="col-6 valign-center">
              <span class="leads-block__title">
                 <svg class="icon svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>&nbsp;Assigned
              </span>
            </div>
            <div class="col-6 valign-center padding-r-30">


                <table class="team-leads" v-if="visible_specialists.length > 0">
                  <tbody><tr v-for="(sp, index) in visible_specialists">
                    <td><div class="team-leads__photo"><img v-bind:src="sp.photo" v-bind:alt="sp.name" v-on:click="remove_specialist(sp.user_id, '')"></div></td>
                    <td colspan="3">
                      <div class="clearfix">
                        <span class="team-leads__name" v-on:click="remove_specialist(sp.user_id, '')">{{sp.name}}</span>
                      </div>
                    </td>
                  </tr>
                </tbody></table>

               <select-imitation2
                v-show="visible_specialists_show_select"
                _select_name="lead_specialissts"
                :_options="select_data.specialists"
                 v-on:update_list="update_specialists($event, 'enquery')"
                 v-bind:class="'fullwidth'"
                 ref="lead_specialissts_select"></select-imitation2 >
            </div>
          </div>

          <div class="hr"></div>

          <span class="leads-block__title">
            Patient Information
          </span>

          <div class="spacer-h-10"></div>

          <div class="leads-block__row">
              <div class="leads-block__name">

                <input-field2
                 _name="name"
                :_value="lead_data.meta.patient_data.name"
                v-on:input_value_changed = "update_lead($event, 'patient_data')"
                v-bind:class="'leads-block__input lg'"></input-field2>

                <span class="leads-block__comment">  added... </span>
              </div>
              <table class="leads-block__data">
                <tr>
                  <td>
                    <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Phone <span class="mark">*</span></p></td>
                  <td>
                    <input-field2
                     _name="phone"
                     :_value="lead_data.meta.patient_data.phone"
                     v-on:input_value_changed = "update_lead($event, 'patient_data')"
                     ></input-field2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">E-mail <span class="mark">*</span></p></td>
                  <td>
                    <input-field2
                     _name="email"
                      :_value="lead_data.meta.patient_data.email"
                      v-on:input_value_changed = "update_lead($event, 'patient_data')"
                      >
                     </input-field2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Source </p></td>
                  <td>
                    <div id="select-imitation-sourses">
                      <select-imitation2
                        _select_name="source"
                        v-on:update_list="update_lead($event, 'patient_data')"
                        ref="source_select"
                       :_options ="select_data.sources"
                       :_selected ="lead_data.meta.patient_data.source"
                        ></select-imitation2>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td  <?php echo' style="vertical-align:top"';?>>
                     <div class="spacer-h-15"></div>
                    <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                  </td>
                   <td <?php echo' style="vertical-align:top"';?>>
                    <div  <?php echo' style="height:5px"';?>></div>
                    <p class="leads-block__label">Enquiry  <span class="mark">*</span></p></td>
                  <td>

                    <div class="cont">
                      <div class="clearfix" v-for="treatment, key in lead_data.meta.patient_data.treatment">
                        <select-imitation2
                        v-bind:class="'style-less'"
                        id="treatment_list_holder"
                        :_select_name="'treatment'" v-on:update_list="update_lead($event, 'patient_data', key)"
                        ref="treatments_select"
                        :_options ="select_data.treatments"
                        :_selected = "treatment"
                      ></select-imitation2>
                      </div>

                      <div class="add-enquery" v-on:click="add_enquery()">
                        <svg class="icon svg-icon-plus"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-plus"></use> </svg>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Clinic</p></td>
                  <td>

                    <select-imitation2
                     v-bind:class="'style-less'"
                      _name="clinic"
                      _select_name="clinic"
                      v-on:update_list="update_lead($event, 'patient_data')"
                      ref="clinic_select"
                      :_options = "select_data.clinics"
                      :_selected="lead_data.meta.patient_data.clinic">
                      </select-imitation2>

                  </td>
                </tr>
                <tr>
                  <td>
                    <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
                  </td>
                  <td><p class="leads-block__label">Campaign</p></td>
                  <td>
                    <select-imitation2
                    v-bind:class="'style-less'"
                    _select_name="campaign"
                    v-on:update_list="update_lead($event, 'patient_data')"
                    ref="campaign_select"
                    :_options = "select_data.campaigns"
                    :_selected="lead_data.meta.patient_data.campaign"
                      ></select-imitation2>
                  </td>
                </tr>
              </table>
          </div><!-- leads-block__row -->

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

            <span class="note-block__show-more" v-on:click="enquery_notes_count = 9999" v-if="enquery_notes_count < enquery_notes_count_c"> <i class="icon"></i> Show {{enquery_notes_count_c - 1}} more</span>
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
        </div><!-- leads-block -->


        <div class="leads-block online-journey" v-if="lead_data.meta.online_journey">
          <div class="leads-block__header dark">
            <img src="<?php echo THEME_URL?>/assets/images/svg/ruh.svg" alt="">
            <i class="logo-icon">
              +
            </i>
            <span>Online Visit</span>
          </div>

          <div class="leads-block__row online-journey__goal" v-if="lead_data.meta.online_journey.look_to_archive">
            <i class="online-journey__goal-icon">
              <span v-html="journey_data[lead_data.meta.online_journey.look_to_archive].icon"></span>
            </i>

            <h4 class="online-journey__goal-title">{{lead_data.meta.online_journey.look_to_archive}}</h4>
            <p class="online-journey__goal-text">{{journey_data[lead_data.meta.online_journey.look_to_archive].text}}</p>
          </div>

          <div class="leads-block__row">
            <div class="spacer-h-10"></div>
            <div class="row justify-content-between no-gutters">
              <load-item
                :_path='lead_data.meta.online_journey.photo_1'
                v-on:change_image_uploaded = 'change_image_uploaded_cb($event, "photo_1")'
              ></load-item>
              <load-item
                :_path='lead_data.meta.online_journey.photo_2'
                v-on:change_image_uploaded = 'change_image_uploaded_cb($event, "photo_2")'
              ></load-item>
              <load-item
               v-on:change_image_uploaded = 'change_image_uploaded_cb($event, "photo_3")'
               :_path='lead_data.meta.online_journey.photo_3'
              ></load-item>
            </div><!-- row justify-content-between -->
            <div class="spacer-h-10"></div>
          </div><!-- leads-block__row -->

          <h2 class="leads-block__title">Additional Information </h2>
          <div class="spacer-h-20"></div>
          <div class="leads-block__row">
            <table class="leads-block__data">
              <tr>
                <td><p class="leads-block__text"> Does your current smile
                  affect your confidence? </p></td>
                <td>
                  <select-imitation2
                    _name="confidence"
                    _select_name="confidence"
                    v-on:update_list="update_lead($event, 'online_journey')"

                    :_options = "select_data.confidence"
                    :_selected="lead_data.meta.online_journey.confidence">
                    </select-imitation2>
                </td>
              </tr>
              <tr>
                <td><p class="leads-block__text"> Do you visit the dentist
                  for regular check-ups? </p></td>
                <td>
                  <select-imitation2
                    _name="checkup"
                    _select_name="checkup"
                    v-on:update_list="update_lead($event, 'online_journey')"
                    :_options = "select_data.checkup"
                    :_selected="lead_data.meta.online_journey.checkup">
                    </select-imitation2>
                </td>
              </tr>
              <tr>
                <td><p class="leads-block__text"> Have you ever
                  had orthodontic treatment? </p></td>
                <td>
                  <select-imitation2
                    _name="how_ever"
                    :class="'top'"
                    _select_name="how_ever"
                    v-on:update_list="update_lead($event, 'online_journey')"
                    :_options = "select_data.how_ever"
                    :_selected="lead_data.meta.online_journey.how_ever">
                    </select-imitation2>
                </td>
              </tr>
              <tr>
                <td><p class="leads-block__text"> Have you ever had
                 dental cosmetic treatment? </p></td>
                <td>
                  <select-imitation2
                    _name="had_cosmetic"
                    _select_name="had_cosmetic"
                    :class="'top'"
                    v-on:update_list="update_lead($event, 'online_journey')"
                    :_options = "select_data.had_cosmetic"
                    :_selected="lead_data.meta.online_journey.had_cosmetic">
                    </select-imitation2>
                </td>
              </tr>
            </table>
          </div>




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
              <div class="col-6 valign-center">
                <span class="leads-block__title">
                   <svg class="icon  svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>
                   Assigned<span class="mark">*</span>
                </span>
              </div>
              <div class="col-6 valign-center padding-r-30">


                  <table class="team-leads" v-if="visible_specialists_tco.length > 0">
                    <tbody><tr v-for="(sp, index) in visible_specialists_tco">
                      <td><div class="team-leads__photo"><img v-bind:src="sp.photo" v-bind:alt="sp.name" v-on:click="remove_specialist(sp.user_id,'tco')"></div></td>
                      <td colspan="3">
                        <div class="clearfix">
                          <span class="team-leads__name" v-on:click="remove_specialist(sp.user_id, 'tco')">{{sp.name}}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody></table>

                 <select-imitation2
                 v-show="visible_specialists_show_select_tco"
                 _select_name="lead_specialissts_tco"
                  v-on:update_list="
                  update_specialists($event, 'tco')"
                   v-bind:class="'fullwidth'"
                   :_options="select_data.specialists_tco"
                   ref="lead_specialissts_select_tco"></select-imitation2>
              </div>
          </div>
          <div class="hr"></div>
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
                      <input type="checkbox" name="<?php echo $key ?>" v-model="lead_data.meta.tco_data.<?php echo $key ?>" v-on:change="save_lead_meta('tco_data','tco_data')">
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
                <div class="div clearfix" v-for = '(data, key) in lead_data.meta.treatment_data' >

                  <select-imitation-icon-2
                  v-bind:class="'fullwidth'"
                  _select_name="dentist"
                  v-on:update_list="update_treatment_data($event, key)"
                  :ref="'select_dentist'"
                  :_options = "select_data.available_dentists"
                  :_icon = "icons_selects['human']"
                  ></select-imitation-icon-2>

                  <select-imitation-icon-2
                    v-bind:class="'fullwidth'"
                    _select_name="treatment"
                    v-on:update_list="update_treatment_data($event, key)"
                    :ref="'select_treatment'"
                    :_options = "select_data.treatments"
                    :_icon = "icons_selects['treatments']"
                  ></select-imitation-icon-2>

                  <input-decorated
                  v-on:input_value_changed="update_treatment_data($event, key)" :_icon="icons_selects['card']"
                  _name="billed"
                  v-bind:class="'leads-block__input sm styled text-left'"
                   @focus.native="price_to_value('input_billed')"
                   @blur.native="value_to_price('input_billed')"
                   :ref="'select_billed'"></input-decorated>

                  <div class="spacer-h-10"></div>

                  <select-imitation-icon-2
                    v-bind:class="'fullwidth'"
                    _select_name="payment_method"
                    v-on:update_list="update_treatment_data($event, key)"
                    :ref="'select_payment_method'"
                    :_options = "select_data.payment_methods"
                    :_icon = "icons_selects['currency']"
                  ></select-imitation-icon-2>

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
                  <p class="leads-block__label no-margin">{{lead_data.meta.treatment_value.value}}</p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p class="leads-block__label no-margin">Money Taken</p>
                </td>
                <td class="text-right">
                  <input-field
                  v-on:input_value_changed="update_lead($event, 'treatment_value')"
                  _name="billed" _value=""
                  v-bind:class="'leads-block__input sm text-right'"
                  @focus.native="price_to_value('input_billed')"
                  @blur.native="value_to_price('input_billed')"
                  v-model="lead_data.meta.treatment_value.billed"
                  ref="input_billed"></input-field>
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
              <span class="note-block__show-more" v-on:click="tco_notes_count = 9999" v-if="tco_notes_count < tco_notes_count_c"> <i class="icon"></i> Show {{tco_notes_count_c - 1}} more</span>
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

        <div class="leads-block" v-if="lead_data.meta.patient_data.phone && lead_data.ID >= 0">
          <div class="leads-block__warning"> <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 16 15"><defs></defs><g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g clip-path="url(#clip-9A1E8388-719A-4D57-BE3B-1214B6B73F26)"><title>caution</title><g><title>Path</title><path d="M14.61514,15h-13.23032c-0.49961,0 -0.94748,-0.25533 -1.19803,-0.68298c-0.24541,-0.41895 -0.24916,-0.9131 -0.01031,-1.35587l6.61522,-12.26002c0.23688,-0.43902 0.6886,-0.70113 1.20828,-0.70113c0.51972,0 0.9714,0.26211 1.20831,0.70113v0v0l6.6152,12.25999c0.23891,0.44274 0.23512,0.93698 -0.01032,1.3559c-0.25051,0.42765 -0.69835,0.68298 -1.19803,0.68298z" fill="#ffa300" fill-opacity="1"></path></g><g><title>Path</title><path d="M8,13c-0.5514,0 -1,-0.44858 -1,-0.99999c0,-0.5514 0.4486,-1.00001 1,-1.00001c0.5514,0 1,0.44861 1,1.00001c0,0.55141 -0.4486,0.99999 -1,0.99999z" fill="#fff3f3" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.00003,9c-0.55143,0 -1.00003,-0.53886 -1.00003,-1.2012v-2.5976c0,-0.66234 0.4486,-1.2012 1,-1.2012c0.5514,0 1,0.53886 1,1.2012v2.5976c0,0.66234 -0.44857,1.2012 -0.99997,1.2012z" fill="#fff3f3" fill-opacity="1"></path></g></g></g></svg> Warning! Any message sent here goes to the patient</div>
          <h2 class="leads-block__title">Message Centre
           <div class="switcher" :class="{'active': !disable_sms}" v-on:click="toggle_sms_show"><div class="inner"></div></div>

          <svg v-if="!!disable_sms" <?php echo "style='float: right; margin: 3px 5px 0 0'"; ?>  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#999" fill-opacity="1"></path></g></g></svg>

          <svg v-if="!disable_sms" <?php echo "style='float: right; margin: 3px 5px 0 0'"; ?>  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g></svg>
         </h2>
          <div class="spacer-h-15"></div>


          <div class="preloader-messages text-center" v-show="!text_messages">
            <img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt="">
          </div>

          <div class="leads-block__row _messages" v-show="text_messages">
            <span class="message-sent-to">Sent to <span class="marked">{{lead_data.meta.patient_data.phone}}</span> via Ruh Tracker</span>

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

        <div class="leads-block" v-if="select_data.tags_cloud.length > 0">
          <div class="text-center">
            <img src="<?php echo THEME_URL; ?>/assets/images/svg/tag.svg" alt="">
            <div class="spacer-h-20"></div>
            <h2 class="leads-block__title">Assign Tags</h2>
            <div class="spacer-h-10"></div>
            <div class="leads-block__comment">Tags are a simple way to label this patient so you can discover them easily when searching.</div>
          </div>

          <div class="spacer-h-10"></div>

          <div class="leads-block__row">
            <div class="tag-cloud">

              <div class="tag-cloud__item"
               v-for="tag, key in select_data.tags_cloud"
               :class="{active: get_tag_match(tag)}"
               v-on:click.prevent = 'update_tags_cloud(tag)'
               >
                {{tag}}

                <div class="tag-cloud__item-action">
                  <svg class="icon svg-icon-delete"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-delete"></use> </svg>
                </div>
              </div>
            </div><!-- tag-cloud -->
          </div><!-- leads-block__row -->

        </div><!-- leads-block -->

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

           <form method="POST" action="#"  enctype="multipart/form-data" v-on:submit.prevent = "load_file">
             <input type="file" name="file" class="hidden" id="new_file" ref="file_input" v-on:change="do_file_changed">
             <div class="leads-block__form">
               <label class="add-documents" for="new_file"><span> Add New </span><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></label>

               <button type="submit" class="leads-block__form-submit" v-show="file_is_prepared">Upload</button>
             </div>
           </form>
        </div>

        <!-- ***************************************** -->
        <!-- ***************************************** -->
        <!-- *********** emails block  *************** -->
        <!-- ***************************************** -->
        <!-- ***************************************** -->

        <div class="leads-block">
           <h2 class="leads-block__title">E-mail Log</h2>
           <div class="spacer-h-15"></div>
           <div class="leads-block__row">

             <div class="document-block" v-for="log, key in email_log">
               <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>

               <p class="document-block__text">
                 <span class="name">{{log.template_name}} Template</span>
                 <span class="date"> Sent by {{log.specialists_name}} · {{log.date_formatted}}</span>
               </p>
               <p class="document-block__actions">
                  <svg class="eye-svg"
                   v-on:click="show_sent_email(log)"
                   width="15" height="11" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 11"><defs></defs><desc>Generated with Avocode.</desc><g><g><title>Shape</title><path d="M7.48439,8.53062c-1.87639,0 -3.39927,-1.52512 -3.39927,-3.40427c0,-1.87914 1.52288,-3.40423 3.39927,-3.40423c1.87638,0 3.39926,1.52512 3.39926,3.40427c0,1.87914 -1.52288,3.40423 -3.39926,3.40423zM7.48937,0.02c-3.40426,0 -6.31149,2.11743 -7.48937,5.10638c1.17788,2.98893 4.08511,5.10639 7.48937,5.10639c3.40765,0 6.31149,-2.11746 7.48937,-5.10639c-1.17788,-2.98895 -4.08172,-5.10638 -7.48937,-5.10638z" fill="#5c6a92" fill-opacity="1"></path></g><g><title>Path</title><path d="M7.49254,3.09c-1.12681,0 -2.04254,0.91572 -2.04254,2.04254c0,1.12681 0.91572,2.04255 2.04254,2.04255c1.12681,0 2.04255,-0.91573 2.04255,-2.04255c0,-1.12681 -0.91576,-2.04254 -2.04255,-2.04254z" fill="#5c6a92" fill-opacity="1"></path></g><g><title>visibility</title><g><title>Path</title><path d="M7.49254,3.09c-1.12681,0 -2.04254,0.91572 -2.04254,2.04254c0,1.12681 0.91572,2.04255 2.04254,2.04255c1.12681,0 2.04255,-0.91573 2.04255,-2.04255c0,-1.12681 -0.91576,-2.04254 -2.04255,-2.04254z" fill="#5c6a92" fill-opacity="1"></path></g><g><title>Shape</title><path d="M7.48439,8.53062c-1.87639,0 -3.39927,-1.52512 -3.39927,-3.40427c0,-1.87914 1.52288,-3.40423 3.39927,-3.40423c1.87638,0 3.39926,1.52512 3.39926,3.40427c0,1.87914 -1.52288,3.40423 -3.39926,3.40423zM7.48937,0.02c-3.40426,0 -6.31149,2.11743 -7.48937,5.10638c1.17788,2.98893 4.08511,5.10639 7.48937,5.10639c3.40765,0 6.31149,-2.11746 7.48937,-5.10639c-1.17788,-2.98895 -4.08172,-5.10638 -7.48937,-5.10638z" fill="#5c6a92" fill-opacity="1"></path></g></g></g></svg>

               </p>
             </div>
           </div>

           <div v-if="!email_log">No emails sent yet</div>

           <div class="leads-block__form">
             <label class="add-documents" v-on:click="show_email_popup_template"><span> Add New </span><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></label>
          </div>
        </div>

        <div class="leads-block no-overflow" v-if="lead_data.is_failed == 'yes'">
          <h2 class="leads-block__title">Failed Lead Information</h2>
          <div class="leads-block__row">
            <table class="leads-block__data no-margin">
              <tr>
                <td colspan="2">
                  <p class="leads-block__label no-margin">Select Reason</p>
                </td>
                <td>
                   <select-imitation2
                  _select_name="failed_reasons"
                  :_options="failed_reasons"
                   v-on:update_list="update_failed_reasons"
                   v-bind:class="'fullwidth'"
                   :_selected="lead_data.meta.failed_reason.reason"
                   ref="failed_reasons_select"></select-imitation2 >
                </td>
              </tr>
            </table>
          </div>

          <div class="leads-block__row" v-if="lead_data.meta.failed_reason.text" >
            <div class="note-block">
              <div class="note-block__header clearfix">
               <span class="name">{{lead_data.meta.failed_reason.author}}</span>
               <span class="date">{{lead_data.meta.failed_reason.date}}</span>
               <i class="remove-note-icon" v-on:click="clear_failed_reason"> <svg class="icon svg-icon-trash"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-trash"></use></svg></i>
              </div>
              <div class="note-block__body">
                <span class="inner"> {{lead_data.meta.failed_reason.text}} </span>
              </div>
            </div>
          </div>

          <form  method="POST" v-on:submit.prevent="submit_failed_note" >
            <div class="leads-block__form">
                <textarea name="text" v-model="failed_reason_text" placeholder="Add additional note"></textarea>
                <button type="submit" class="submit-button">
                  <svg class="icon svg-icon-send"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-send"></use> </svg>
                </button>
            </div>
          </form>
        </div>

        <div class="leads-block">
           <h2 class="leads-block__title">Stages' Log</h2>
           <div class="spacer-h-30"></div>

          <div class="leads-block__row">
            <ul class="leads-block__activity">
              <li>
                <i class="state-none icon-activity"></i>
                <span class="leads-block__activity-text">
                  <span class="action">Lead Created</span>
                  <span class="date">{{convert_date(lead_data.post_date)}}</span>
                  <span class="length" v-if="date_difference(-1)">{{date_difference(-1)}}</span>
                </span>
              </li>
              <li v-for="log, key in lead_data.meta.lead_stage_log2" :key="'lead_log'+key">
                <i class="state-none icon-activity"></i>
                <span class="leads-block__activity-text">
                  <span class="action">Moved to {{log.stage}} <span v-if="log.by"> by {{log.by}}</span></span>
                  <span class="date">{{convert_date(log.date)}}</span>
                  <span class="length" v-if="date_difference(key)">{{date_difference(key)}}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div><!-- col-12 col-lg-4 -->
    </div><!-- row -->
  </div><!-- container -->

  <div class="spacer-h-70"></div>
  <confirmation-popup
    ref="popup"
    v-on:change_stage_popup = change_stage_popup_cb
  ></confirmation-popup>

  <comp-alert-alarm
   ref="alert_alarm"
   v-on:update_reminder='update_reminder_cb'
  ></comp-alert-alarm>

  <email-popup-template
  ref="email_popup_template"
  ></email-popup-template>

  <sent-email-view
  ref="sent_email_view"
  ></sent-email-view>
</div>
<?php
echo '</script>';

?>