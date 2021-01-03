<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}
echo '<script type="text/x-template" id="lead-new-tmpl">';
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
              v-bind:_value="lead_data.meta.reminder">
             </datepicker2>

            <span href="javascript:void(0)"
              v-show="lead_data.meta.reminder"
              v-on:click="clear_reminder()"
              class="clear-reminder">clear</span>
          </a>

          <span class="lead-tag" :class="lead_status.class">{{lead_status.text}}</span>
        </div><!-- row no-gutters justify-content-center justify-content-start-sm -->
      </div><!-- col-12 col-md-8 -->

      <div class="col-12 col-md-4 text-center text-right-md">

        <a href="" class="button-cancel">Cancel</a>

        <a href="javascript:void(0)" class="button-create"
          v-bind:class="{gray : !requre_save}"
          v-on:click.prevent = 'save_lead_meta()'
        >
            <svg class="icon svg-icon-ok"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-ok"></use> </svg>
          <span>Create Lead</span>
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

                 <select-imitation2
                  v-show="visible_specialists_show_select"
                  _select_name="lead_specialissts"
                  :_options="select_data.specialists"
                   v-on:update_list="update_specialists($event, 'enquery')"
                   v-bind:class="'fullwidth'"
                   ref="lead_specialissts_select"></select-imitation2 >

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

              </div>
            </div>

            <div class="hr"></div>

            <span class="leads-block__title">
              Patient Information
            </span>

            <div class="spacer-h-10"></div>

            <div class="leads-block__row">
                <div class="leads-block__name">

                  <input-field
                   _name="name"
                  v-model="lead_data.meta.patient_data.name"
                  v-on:input_value_changed = "update_lead($event, 'patient_data')"
                  v-bind:class="'leads-block__input lg'"></input-field>

                  <span class="leads-block__comment">  added... </span>
                </div>
                <table class="leads-block__data">
                  <tr>
                    <td>
                      <svg class="icon svg-icon-phone"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-phone"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Phone <span class="mark">*</span></p></td>
                    <td>
                      <input-field
                       _name="phone"
                       v-model="lead_data.meta.patient_data.phone"
                       v-on:input_value_changed = "update_lead($event, 'patient_data')"
                       ></input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-email"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-email"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">E-mail <span class="mark">*</span></p></td>
                    <td>
                      <input-field
                       _name="email"
                        v-model="lead_data.meta.patient_data.email"
                        v-on:input_value_changed = "update_lead($event, 'patient_data')"
                        >
                       </input-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Source <span class="mark">*</span></p></td>
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
                    <td>
                      <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
                    </td>
                    <td><p class="leads-block__label">Enquiry</p></td>
                    <td>

                      <div class="clearfix">
                        <select-imitation2
                        v-bind:class="'style-less'"
                        _name="treatment"
                        _select_name="treatment" v-on:update_list="update_lead($event, 'patient_data')"
                        ref="treatments_select"
                        :_options ="select_data.treatments"
                        :_selected = "lead_data.meta.patient_data.treatment"
                      ></select-imitation2>
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

          <form id="message-form-reception-new" v-on:submit.prevent  v-on:submit="add_note('enquery')" >
            <div class="leads-block__form">

            <textarea name="text-new" placeholder="Enter new note…" ref="note_textarea" v-model="note_text" @keyup.alt.enter="add_note('enquery')" @keyup.ctrl.enter="add_note('enquery')" title="use Enter for line breaks, use Alt+Enter to add note"></textarea>

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
              <div class="col-6 valign-center">
                <span class="leads-block__title">
                   <svg class="icon  svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>
                   Assigned<span class="mark">*</span>
                </span>
              </div>
              <div class="col-6 valign-center padding-r-30">

                 <select-imitation2
                 v-show="visible_specialists_show_select_tco"
                 _select_name="lead_specialissts_tco"
                  v-on:update_list="
                  update_specialists($event, 'tco')"
                   v-bind:class="'fullwidth'"
                   :_options="select_data.specialists_tco"
                   ref="lead_specialissts_select_tco"></select-imitation2>

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
                  <input-field v-on:input_value_changed="update_lead($event, 'treatment_value')" _name="billed" _value="" v-bind:class="'leads-block__input sm text-right'" @focus.native="price_to_value('input_billed')" @blur.native="value_to_price('input_billed')" ref="input_billed"></input-field>
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

            <form id="message-form-new" v-on:submit.prevent  v-on:submit="add_note('tco')" >
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
             <input type="file" name="file" class="hidden" id="new_file2" ref="file_input" v-on:change="do_file_changed">
             <div class="leads-block__form">
               <label class="add-documents" for="new_file"><span> Add New </span><svg class="icon svg-icon-dots"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dots"></use> </svg></label>

               <button type="submit" class="leads-block__form-submit" v-show="file_is_prepared">Upload</button>
             </div>
           </form>
        </div>
      </div><!-- col-12 col-lg-4 -->
    </div><!-- row -->
  </div><!-- container -->

  <div class="spacer-h-70"></div>
  <confirmation-popup
    ref="popup"
    v-on:change_stage_popup = change_stage_popup_cb
  ></confirmation-popup>
</div>
<?php
echo '</script>';
?>