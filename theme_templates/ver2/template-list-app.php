<?php
?>

<div id="list-app">
  <div class="filter-container">
  <div class="spacer-h-30"></div>
    <div class="row no-gutters justify-content-start justify-content-center-lg switchers">

      <!--********************
        alarms
        ***************-->
      <div class="alert"  v-bind:class="alarms.class">
        <svg class="icon svg-icon-bell green"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">{{alarms.total}}</span>
        <span class="alert__tag overdue" v-bind:class="alarms.class_overdue">{{alarms.overdue}} Ovderdue</span>

        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only" v-model="overdue_checked">
             <span class="checkbox-imitation__view"></span>
          </label>
        </div>
      </div>
      <!--********************
        alarms end
        ***************-->

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
      <span class="button-filter" v-on:click = "clear_filters()">Clear Filter</span>

    </div><!-- switchers -->
  </div><!-- filter-container -->

  <div class="spacer-h-30"></div>

  <div class="leads-scroll">
    <div class="horizontal-scroll">
      <div class="row no-gutters" ref="column_container">
        <list-column
         v-for="data, stage_id in stages"
         :key = "'column_'+stage_id"
         :_data = "data"
         :_leads = "leads_by_column[data.name]"
        ></list-column>
      </div>
    </div>
  </div>

</div><!-- list-app -->

