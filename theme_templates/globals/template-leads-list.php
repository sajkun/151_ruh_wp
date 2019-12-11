<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div id="leads-list" ref="parent">
  <div class="spacer-h-40" ref="spacer1"></div>
  <div class="container-fluid filter-container" ref="container_filter">
     <div class="row no-gutters justify-content-start justify-content-center-lg switchers" id="leads-filters">

      <div class="alert"  v-show="alarms.total>0">
        <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{alarms.total}}</span>
        <span class="alert__tag overdue" v-show="alarms.overdue>0">{{alarms.overdue}} Ovderdue</span>

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

      <select-imitation-icon _select_name="sourses" ref="sourses" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="team" ref="team" v-on:update_list="run_filter_list($event)"></select-imitation-icon>

      <span class="button-filter" v-if="show_filter_clear_btn" v-on:click="resert_filters">Clear Filter</span>
    </div><!-- row -->
  </div><!-- container-fluid -->

  <div class="spacer-h-40" ref="spacer2"></div>

  <div class="container-fluid leads-container" ref="container_leads">
    <div class="horizontal-scroll" v-min-height="scroll_height" ref="horizontal_scroll">
      <div class="row no-gutters justify-content-center-xxl">

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
                <ul class="leads-list"  data-list="<?php echo $st['name'] ?>">
                  <li v-for="data in leads_filtered['<?php echo $st['name'] ?>']" v-bind:key="data.post_id">
                    <a :href="data.permalink" class="lead-preview" :data-overdue="data.alarms" :data-post_id="data.post_id" data-list="<?php echo $st['name'] ?>">
                       <div class="clearfix">
                         <span class="lead-preview__name">{{data.name}}</span>
                         <span class="lead-preview__icons">

                          <svg xmlns="http://www.w3.org/2000/svg" class="hidden" width="12" height="12" viewBox="0 0 12 12"><g><g><g><path fill="#2196f3" d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/></g><g><path fill="#fafafa" d="M8.85 4.803l-3.319 3.06a.532.532 0 0 1-.36.137.532.532 0 0 1-.362-.138l-1.66-1.53a.444.444 0 0 1 0-.665.541.541 0 0 1 .723 0L5.17 6.864l2.958-2.726a.541.541 0 0 1 .722 0c.2.184.2.481 0 .665z"/></g></g></g></svg>

                          <svg class="icon svg-icon-bell" v-if="data.reminder != '' && data.overdue == 'yes'" v-bind:title="data.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

                          <svg class="icon svg-icon-bell green" v-if="data.reminder != '' && data.overdue == 'no'" v-bind:title="data.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
                         </span>
                         <span class="lead-preview__time">{{data.time_passed}}</span>
                       </div>

                       <div class="clearfix">
                         <span class="lead-preview__sourse">{{data.clinic}}</span>

                         <span class="lead-preview__photo" v-for="member in data.team">
                           <img :src="member.image" :alt="member.name" :title="member.name">
                         </span>
                       </div>
                    </a>
                  </li>
                </ul>
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