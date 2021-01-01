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
      <div class="alert"  v-bind:class="alarms.class">
        <svg class="icon svg-icon-bell green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{overdue_data.reminder}}</span>
        <span class="alert__tag overdue" v-bind:class="alarms.class_overdue">{{overdue_data.overdue}} Ovderdue</span>

        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only" v-model="show_overdue_only">
             <span class="checkbox-imitation__view"></span>
          </label>
        </div>
      </div>
      <!--********************
        alarms end
        ***************-->
      <span>&nbsp;</span>

      <div title="Not read messages" v-if="not_read_count > 0" class="alert"><i class="icon-message-phone"><svg width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g></svg></i> <span class="alert__count">{{not_read_count}}</span> <div class="checkbox-imitation inline"><label><input type="checkbox" name="show_not_read_only" v-model="show_not_read_only"> <span class="checkbox-imitation__view"></span></label></div></div>

      <span>&nbsp;</span>

      <daterangepicker
        v-on:daterange_changed = update_leads_by_dates
      ></daterangepicker>

      <span>&nbsp;</span>

      <div  v-for  = "filter_options, filter_name in filter_data">
        <select-imitation-icon-2
          :key          = '"filter_"+filter_name'
          :_select_name = "filter_name"
          :_selected    = "get_filter_value(filter_name)"
          :_options     = "filter_options"
          :_icon        = "icons_selects[filter_name]"
          :ref          =   "filter_name"
          v-on:update_list="run_filter_list($event)"
        >
        </select-imitation-icon-2>
        <span>&nbsp;</span>
      </div>
      <select-imitation-icon-2
         _select_name="sort"
          :_icon        = "icons_selects['sortby']"
         ref="sort_list"
         :_selected="'Sort By'"
         :_options = "sort_options"
         v-on:update_list="sort_leads($event)"

         ></select-imitation-icon-2>
      <span>&nbsp;</span>
      <span class="button-filter" v-on:click = "clear_filters()">Clear Filter</span>

    </div><!-- switchers -->
  </div><!-- filter-container -->

  <div class="spacer-h-30"  v-show="show_list"></div>

  <div class="leads-scroll visuallyhiddden"  v-show="show_list">
    <div class="horizontal-scroll horizontal-scroll-2">
      <div class="row no-gutters" ref="column_container">
        <list-column
         v-for="data, stage_id in stages_reception"
         :key = "'column_'+stage_id"
         :_info = "data"
         :_converted="get_convertion(data.name)"
         :_leads = "leads_by_column[data.name]"
         v-on:update_order_status_on_drag = update_order_status_on_drag_cb
         v-on:open_lead = "open_lead_cb"
        ></list-column>
      </div>
    </div>
  </div>

  <comp-single-lead
   ref = "single_lead"
  ></comp-single-lead>
</div><!-- list-app -->

