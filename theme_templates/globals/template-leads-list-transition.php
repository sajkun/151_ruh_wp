<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div id="leads-list" ref="parent">

  <input type="hidden" id="user_name" name="user_name" value="<?php echo $user_name?>">
  <input type="hidden" id="user_id" name="user_id" value="<?php echo $user_id?>">

  <div class="spacer-h-40" ref="spacer1"></div>
  <div class="container-fluid filter-container" ref="container_filter">
     <div class="row no-gutters justify-content-start justify-content-center-lg switchers" id="leads-filters">

      <div class="alert"  v-bind:class="alarms.class">
        <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{alarms.total}}</span>
        <span class="alert__tag overdue" v-bind:class="alarms.class_overdue">{{alarms.overdue}} Ovderdue</span>

        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only" v-model="overdue_checked">
             <span class="checkbox-imitation__view"></span>
          </label>
        </div>
      </div>

      <div class="range-datepicker" id='picker'>
        <svg class="icon svg-icon-calendar"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use> </svg>

        <span class="range-datepicker__label">This Month</span>
        <span class="range-datepicker__text"> <?php echo $daterange['from'] ?> → <?php echo $daterange['to'] ?></span>

        <span class="range-datepicker__arrow"></span>
      </div><!-- range-datepicker -->

      <select-imitation-icon _select_name="clinics" ref="clinics" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="treatments" ref="treatments" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="campaigns" ref="campaigns" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="sources" ref="sources" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="team" ref="team" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <span class="button-filter" v-bind:class="show_filter_clear_btn" v-on:click="resert_filters">Clear Filter</span>
    </div><!-- row -->
  </div><!-- container-fluid -->

  <div class="spacer-h-40" ref="spacer2"></div>

  <div class="container-fluid leads-container" ref="container_leads">

    <div class="horizontal-scroll" v-min-height="get_scroll_height" ref="horizontal_scroll">
      <div class="row no-gutters">

        <?php
        // clog($stages);
        foreach ($stages as $key => $st) {
          ?>
          <div class="leads-column">
            <div class="leads-column__head">
              <span class="leads-column__tag" style="background-color: <?php echo $st['bg_color'] ?>;color: <?php echo $st['text_color'] ?>;"><?php echo $st['name'] ?></span>

              <span class="leads-column__count">{{ get_leads_total('<?php echo $st['name'] ?>') }}</span>

              <?php if ($key  > 0): ?>
              <span class="leads-column__convertion">
                 <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                  {{ get_convertion('<?php echo $st['name'] ?>') }}%
              <?php endif ?>
              </div><!-- leads-column__head -->

              <div class="leads-column__body">
                <transition-group
                  class="leads-list"
                  name="lead-list"
                  tag="ul"
                    data-list="<?php echo $st['name'] ?>"
                  v-bind:css="false"
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:leave="leave"
                  v-on:after-enter="enterAfter"
                  v-on:after-leave="leaveAfter"
                >
                  <li v-for="data in leads_filtered['<?php echo $st['name'] ?>']" v-bind:key="data.post_id">
                    <a :href="data.permalink" class="lead-preview" :data-overdue="data.alarms" :data-post_id="data.post_id" data-list="<?php echo $st['name'] ?>" >
                       <div class="clearfix">
                        <div class="row justify-content-start">
                          <div class="col-7">
                           <span class="lead-preview__name" v-bind:title="data.name">{{data.name}}</span>
                           <span class="lead-preview__icons">

                            <svg xmlns="http://www.w3.org/2000/svg" class="hidden" width="12" height="12" viewBox="0 0 12 12"><g><g><g><path fill="#2196f3" d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/></g><g><path fill="#fafafa" d="M8.85 4.803l-3.319 3.06a.532.532 0 0 1-.36.137.532.532 0 0 1-.362-.138l-1.66-1.53a.444.444 0 0 1 0-.665.541.541 0 0 1 .723 0L5.17 6.864l2.958-2.726a.541.541 0 0 1 .722 0c.2.184.2.481 0 .665z"/></g></g></g></svg>
                           </span>
                          </div>

                          <div class="col-5">
                           <span class="lead-preview__time" v-bind:title="data.time_passed">{{data.time_passed}}</span>
                          </div>
                        </div>
                       </div>

                       <div class="clearfix">
                         <span class="lead-preview__sourse">{{get_text_list(data)}}</span>
                          <span class="list-counters">
                            <svg class="icon svg-icon-bell" v-if="data.reminder != '' && data.overdue == 'yes'" v-bind:title="data.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

                            <svg class="icon svg-icon-bell green" v-if="data.reminder != '' && data.overdue == 'no'" v-bind:title="data.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

                            <i class="icon-message-phone phone-na" v-if="data.phone_count == 0"></i><i class="icon-message-phone phone-ok" v-else="data.phone_count > 0"><span class="counter">{{data.phone_count}}</span></i><i class="icon-message-phone message-na" v-if="data.message_count == 0"></i><i class="icon-message-phone message-ok" v-else="data.message_count > 0"><span class="counter">{{data.message_count}}</span></i>
                          </span>
                       </div>
                    </a>
                  </li>

              </div>
            </div><!-- leads-column -->
          <?php
        }
         ?>
      </div><!-- row -->

      <div class="spacer-h-70"></div>
    </div>
  </div><!-- container-fluid -->
</div>