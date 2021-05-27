<?php
?>
<div id="list-app">
  <div class="preload-timer">
    <span class="text-center">Fetching Leads</span>
    <img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt="">
  </div>

  <div class="filter-container" v-show ="show_list">
  <div class="spacer-h-30"></div>
    <div class="row no-gutters justify-content-start justify-content-center-lg switchers">

      <!--********************
        alarms
        ***************-->
      <div class="alert">
        <svg class="icon svg-icon-bell green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{overdue_data.not_overdue}}</span>
        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only" v-model="not_overdue_checked">
             <span class="checkbox-imitation__view"></span>
          </label>
        </div>
       <span class="alert__tag normal">
          Alarms
       </span>
      </div>

      <div class="alert">
        <svg class="icon svg-icon-bell red"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{overdue_data.overdue}}</span>
        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only" v-model="overdue_only_checked">
             <span class="checkbox-imitation__view"></span>
          </label>
        </div>
        <span class="alert__tag normal">Alarms Ovderdue</span>
      </div>

      <!--********************
        alarms end
        ***************-->
      <span>&nbsp;</span>

      <div title="Not read messages"  class="alert"><i class="icon-message-phone"><svg width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g></svg></i> <img v-if="!request_completed" src="<?php echo THEME_URL?>/assets/images/spinner.gif" <?php echo 'style=" height: 24px; vertical-align: -8px; width: auto; display:inline-block; margin: 0 5px"';?> alt=""> <span v-if="request_completed" class="alert__count">{{not_read_count}}</span> <div class="checkbox-imitation inline"><label><input type="checkbox" name="show_not_read_only" v-model="show_not_read_only"> <span class="checkbox-imitation__view"></span></label></div></div>

      <span>&nbsp;</span>

      <select-imitation-icon-2
       _select_name="sort"
        :_icon        = "icons_selects['sortby']"
       ref="sort_list"
       :_selected="sortby"
       :_options = "sort_options"
       v-on:update_list="sort_leads($event)"

       ></select-imitation-icon-2>
      <span>&nbsp;</span>

      <select-filters-list
       v-on:update_list = 'update_filters_selected'
      ></select-filters-list>
      <span>&nbsp;</span>

      <daterangepicker
        v-on:daterange_changed = update_leads_by_dates
      ></daterangepicker>

      <span>&nbsp;</span>

      <div  v-for  = "filter_name in filters_selected">
        <select-imitation-icon-2
          :key          = '"filter_"+filter_name'
          :_select_name = "filter_name"
          :_selected    = "get_filter_value(filter_name)"
          :_options     = "get_filter_options(filter_name)"
          :_icon        = "icons_selects[filter_name]"
          :ref          =   "filter_name"
          v-on:update_list="run_filter_list($event)"
        >
        </select-imitation-icon-2>
        <span>&nbsp;</span>
      </div>

      <span class="button-filter" v-if="filters_selected.length > 0" v-on:click = "clear_filters()">Clear Filter</span>

    </div><!-- switchers -->
  </div><!-- filter-container -->

  <div class="spacer-h-30"  v-show="show_list"></div>

  <div class="leads-scroll visuallyhiddden"  v-show="show_list">
    <div class="horizontal-scroll horizontal-scroll-2">
      <div class="row no-gutters" ref="column_container">

        <?php if ($current_id = $reception_id2): ?>
        <list-column
         v-for="data, stage_id in visible_stages"
         :key = "'column_'+stage_id"
         :_info = "data"
         :_converted="get_convertion(data.name)"
         :_leads = "leads_by_column[data.name]"
         v-on:update_order_status_on_drag = update_order_status_on_drag_cb
         v-on:open_lead = "open_lead_cb"
        ></list-column>

        <?php else: ?>
        <list-column-tco
         v-for="data, stage_id in visible_stages"
         :key = "'column_'+stage_id"
         :_info = "data"
         :_converted="get_convertion(data.name)"
         :_leads = "leads_by_column[data.name]"
         v-on:update_order_status_on_drag = update_order_status_on_drag_cb
         v-on:open_lead = "open_lead_cb"
        ></list-column-tco>
        <?php endif ?>
      </div>
    </div>
  </div>

  <comp-single-lead
   ref = "single_lead"
  ></comp-single-lead>

  <comp-new-lead
   ref = "new_lead"
  ></comp-new-lead>


  <comp-alert-alarm
   ref="alert_alarm"
   v-on:update_reminder='update_reminder_cb'
   v-on:resert_reminder='resert_reminder_cb'
  ></comp-alert-alarm>


</div><!-- list-app -->

