<?php
// DASHBOARD TEMPLATE

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div class="spacer-h-40"></div>
<div class="container">
  <h1 class="page-title">Insights</h1>

  <div class="range-datepicker">
    <svg class="icon svg-icon-calendar"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use> </svg>

    <span class="range-datepicker__label">Past 30 days</span>
    <span class="range-datepicker__text"> <?php echo $daterange['from'] ?> → <?php echo $daterange['to'] ?></span>

    <span class="range-datepicker__arrow"></span>
  </div><!-- range-datepicker -->

</div><!-- container -->


<div class="spacer-h-10"></div>

<div class="container" >
  <div class="information-block information-block_summary">

    <?php
    /**
      * FILTERS SECTIONS
      */
    ?>
  <div class="row no-gutters justify-content-start" id="dashboard-filters">


    <div class="col-12 col-md-2">
      <h2 class="section-title">
        <svg class="icon svg-icon-dashboard"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dashboard"></use> </svg>
        <span>Overview</span>
      </h2>
    </div>

    <div class="col-12 col-md-10">
      <?php foreach ($filter_items as $item): ?>
        <select-imitation-icon _select_name="<?php echo $item?>" ref="<?php echo $item?>" v-on:update_list="run_filter_list($event)"></select-imitation-icon>
      <?php endforeach ?>

      <span class="button-filter" v-bind:class="show_filter_clear_btn" v-on:click="resert_filters">Clear Filter</span>
    </div>
  </div><!-- row -->

    <?php
    /**
      * statistic section
      */
    ?>
    <div class="row gutters-xl-30">
      <div class="col-12 col-md-8" id="dashboard_totals">
        <div class="row justify-content-between-lg">
          <div class="block" id="total_revenue">
            <div class="spacer-h-20 spacer-h-lg-50"></div>
            <i class="icon-holder">
              <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
            </i>
            <h4 class="block-title">Billed Revenue</h4>
            <p class="block-value preload hidden ">{{billed_value}}</p>
            <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>

            <div class="block-comment preload hidden " v-if="days_count > 0 && get_sum_from_price(this.billed_value) > 0">
              <span v-html="icon_billed" v-if="get_sum_from_price(percent_change_billed) > 0"></span>
              <span v-if="get_sum_from_price(percent_change_billed) > 0">
                Your revenue is {{up_down_billed}} <br>
                <span :class="change_type_billed">{{percent_change_billed}}%</span> from previous {{days_count}} days
              </span>
              <span v-else>
                Your revenue <br> for previous {{days_count}} days did not change
              </span>
            </div>
            <div class="block-comment preload hidden"  v-if="days_count < 0">
              <span>You revenue can't be compared <br>with previous period</span>
            </div>

          </div>

          <div class="block" id="total_leads">
          <div class="spacer-h-20 spacer-h-lg-50"></div>
            <i class="icon-holder">
              <svg class="icon svg-icon-leads-lines"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leads-lines"></use> </svg>
            </i>
            <h4 class="block-title">Leads</h4>
            <p class="block-value  preload hidden ">{{leads}}</p>
            <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>
            <div class="block-comment preload hidden ">
                <svg class="icon svg-icon-refresh"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-refresh"></use> </svg>
                <span> <span class="encr">{{leads_converted}}</span> Leads <br> converted </span>
             </div>
          </div>

          <div class="block" id="total_average">
            <div class="spacer-h-20  spacer-h-lg-50"></div>
            <i class="icon-holder">
              <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
            </i>
            <h4 class="block-title">Booked Value</h4>
            <p class="block-value  preload hidden ">{{booked_value}}</p>
            <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>

            <div class="block-comment preload hidden " v-if="days_count > 0 && this.revenue_val > 0">
              <span v-html="icon" v-if="get_sum_from_price(percent_change) > 0"></span>
              <span v-if="get_sum_from_price(percent_change) > 0">
                Your booked value is {{up_down}} <br>
                <span :class="change_type">{{percent_change}}%</span> from previous {{days_count}}  days
              </span>
              <span v-else>
                Your booked value <br> for previous {{days_count}} days did not change
              </span>
            </div>
            <div class="block-comment preload hidden"  v-if="days_count < 0">
              <span>You booked value can't be compared <br>with previous period</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col col-md-4  ">
        <div class="col-graphic preload hidden">
          <div class="spacer-h-20 spacer-h-lg-30"></div>
          <div class="graphic">
            <canvas id="gistogramm-year"></canvas>
          </div>
        </div>
      </div>
    </div><!-- row -->
  </div><!-- information-block -->

  <div class="spacer-h-30"></div>

  <div class="information-block  information-block_summary" id="statistic_data">

    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="section-title">
          <svg id="icon-perfomance" width="24" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 16"><defs></defs><g><g><title>Shape</title><path d="M2.4,9.6c0.44104,0 0.8,0.35896 0.8,0.8c0,0.44104 -0.35896,0.8 -0.8,0.8c-0.44104,0 -0.8,-0.35896 -0.8,-0.8c0,-0.44104 0.35896,-0.8 0.8,-0.8zM8.8,12.8c0.44104,0 0.8,0.35896 0.8,0.8c0,0.44104 -0.35896,0.8 -0.8,0.8c-0.44104,0 -0.8,-0.35896 -0.8,-0.8c0,-0.44104 0.35896,-0.8 0.8,-0.8zM15.2,6.4c0.44104,0 0.8,0.35896 0.8,0.8c0,0.44104 -0.35896,0.8 -0.8,0.8c-0.44104,0 -0.8,-0.35896 -0.8,-0.8c0,-0.44104 0.35896,-0.8 0.8,-0.8zM21.6,1.6c0.44104,0 0.8,0.35896 0.8,0.8c0,0.44104 -0.35896,0.8 -0.8,0.8c-0.44104,0 -0.8,-0.35896 -0.8,-0.8c0,-0.44104 0.35896,-0.8 0.8,-0.8zM2.4,12.8c0.64583,0 1.2325,-0.25687 1.66437,-0.67333l2.35459,1.17729c-0.01209,0.09708 -0.01896,0.19562 -0.01896,0.29604c0,1.32333 1.07667,2.4 2.4,2.4c1.32333,0 2.4,-1.07667 2.4,-2.4c0,-0.37 -0.08437,-0.72083 -0.23458,-1.03417l3.20041,-3.20041c0.31334,0.15021 0.66417,0.23458 1.03417,0.23458c1.32333,0 2.4,-1.07667 2.4,-2.4c0,-0.25 -0.03854,-0.49104 -0.10979,-0.71771l2.78042,-2.08521c0.38083,0.25438 0.83791,0.40292 1.32937,0.40292c1.32333,0 2.4,-1.07667 2.4,-2.4c0,-1.32333 -1.07667,-2.4 -2.4,-2.4c-1.32333,0 -2.4,1.07667 -2.4,2.4c0,0.25 0.03854,0.49104 0.10979,0.71771l-2.78042,2.08521c-0.38083,-0.25438 -0.83791,-0.40292 -1.32937,-0.40292c-1.32333,0 -2.4,1.07667 -2.4,2.4c0,0.37 0.08437,0.72083 0.23458,1.03417l-3.20041,3.20041c-0.31334,-0.15021 -0.66417,-0.23458 -1.03417,-0.23458c-0.64583,0 -1.2325,0.25687 -1.66437,0.67333l-2.35459,-1.17729c0.01209,-0.09708 0.01896,-0.19562 0.01896,-0.29604c0,-1.32333 -1.07667,-2.4 -2.4,-2.4c-1.32333,0 -2.4,1.07667 -2.4,2.4c0,1.32333 1.07667,2.4 2.4,2.4z" fill="#000000" fill-opacity="1"></path></g></g></svg>
          <span>Performance</span>
        </h2>

        <select-imitation _select_name="perfomance_type" ref="perfomance_type" v-on:update_list="change_perfomance($event)"></select-imitation>

        <div class="spacer-h-10 spacer-h-md-0"></div>
      </div>

      <div class="col-12 col-md-6 text-right-md">
        <span class="button-filter"  v-on:click="load_csv">
          <svg class="print-icon" width="13" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 13 13">
            <defs></defs><g><g><title>Shape</title><path d="M10.17677,5.50884h-1.10305c-0.2393,0 -0.43334,-0.19482 -0.43334,-0.43516c0,-0.24034 0.19401,-0.43516 0.43334,-0.43516h1.10305c0.2393,0 0.43334,0.19482 0.43334,0.43516c0,0.24034 -0.19401,0.43516 -0.43334,0.43516zM9.73336,11.26302h-6.47671c0,-0.08504 0,-3.45494 0,-3.56012h6.47673c-0.00002,0.10783 -0.00002,3.47835 -0.00002,3.56012zM3.25656,0.87032h6.47687v2.08332h-6.47687zM11.98889,2.95364h-1.37878v-2.51848c0,-0.24031 -0.19401,-0.43516 -0.43334,-0.43516h-7.35354c-0.2393,0 -0.43334,0.19482 -0.43334,0.43516v2.51848h-1.37878c-0.55753,0 -1.01111,0.45551 -1.01111,1.01538v4.37791c0,0.55987 0.45358,1.01535 1.01111,1.01535h1.37886v2.33589c0,0.24031 0.19401,0.43516 0.43334,0.43516h7.35338c0.23931,0 0.43334,-0.19482 0.43334,-0.43516v-2.33589h1.37886c0.55753,0 1.01111,-0.45548 1.01111,-1.01535v-4.37791c0,-0.55985 -0.45358,-1.01538 -1.01111,-1.01538z" fill="#838993" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.25708,8.67h-3.52082c-0.22435,0 -0.40626,0.19398 -0.40626,0.43327c0,0.2393 0.18188,0.43328 0.40626,0.43328h3.5208c0.22435,0 0.40625,-0.19398 0.40625,-0.43328c0,-0.23929 -0.18188,-0.43327 -0.40623,-0.43327z" fill="#838993" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.25708,9.53h-3.52082c-0.22435,0 -0.40626,0.19401 -0.40626,0.43333c0,0.23933 0.18188,0.43334 0.40626,0.43334h3.5208c0.22435,0 0.40625,-0.19401 0.40625,-0.43334c0,-0.23932 -0.18188,-0.43333 -0.40623,-0.43333z" fill="#838993" fill-opacity="1"></path></g><g><title>printing</title><g><title>Path</title><path d="M8.25708,9.53h-3.52082c-0.22435,0 -0.40626,0.19401 -0.40626,0.43333c0,0.23933 0.18188,0.43334 0.40626,0.43334h3.5208c0.22435,0 0.40625,-0.19401 0.40625,-0.43334c0,-0.23932 -0.18188,-0.43333 -0.40623,-0.43333z" fill="#838993" fill-opacity="1"></path></g><g><title>Path</title><path d="M8.25708,8.67h-3.52082c-0.22435,0 -0.40626,0.19398 -0.40626,0.43327c0,0.2393 0.18188,0.43328 0.40626,0.43328h3.5208c0.22435,0 0.40625,-0.19398 0.40625,-0.43328c0,-0.23929 -0.18188,-0.43327 -0.40623,-0.43327z" fill="#838993" fill-opacity="1"></path></g><g><title>Shape</title><path d="M10.17677,5.50884h-1.10305c-0.2393,0 -0.43334,-0.19482 -0.43334,-0.43516c0,-0.24034 0.19401,-0.43516 0.43334,-0.43516h1.10305c0.2393,0 0.43334,0.19482 0.43334,0.43516c0,0.24034 -0.19401,0.43516 -0.43334,0.43516zM9.73336,11.26302h-6.47671c0,-0.08504 0,-3.45494 0,-3.56012h6.47673c-0.00002,0.10783 -0.00002,3.47835 -0.00002,3.56012zM3.25656,0.87032h6.47687v2.08332h-6.47687zM11.98889,2.95364h-1.37878v-2.51848c0,-0.24031 -0.19401,-0.43516 -0.43334,-0.43516h-7.35354c-0.2393,0 -0.43334,0.19482 -0.43334,0.43516v2.51848h-1.37878c-0.55753,0 -1.01111,0.45551 -1.01111,1.01538v4.37791c0,0.55987 0.45358,1.01535 1.01111,1.01535h1.37886v2.33589c0,0.24031 0.19401,0.43516 0.43334,0.43516h7.35338c0.23931,0 0.43334,-0.19482 0.43334,-0.43516v-2.33589h1.37886c0.55753,0 1.01111,-0.45548 1.01111,-1.01535v-4.37791c0,-0.55985 -0.45358,-1.01538 -1.01111,-1.01538z" fill="#838993" fill-opacity="1"></path></g></g></g>
          </svg>
          Print Data
        </span>
      </div>
    </div><!-- row -->

    <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>
    <div class="spacer-h-30 preload hidden"></div>

    <div class="row no-gutters revenue-proportion preload hidden">
      <div class="revenue-proportion__item" ref="'color-'+id" v-for="item, id in rows" v-bind:style="'flex-basis:' + item.width" v-bind:class="'color-'+id" v-if="item.show" v-on:mouseover="hide_all()">
        <div class="revenue-proportion__item-popup">
          <span class="revenue-proportion__item-popup-title">{{item.name}}</span>
          <span class="revenue-proportion__item-popup-price">{{item.billed}}</span>
        </div>
      </div>
      <div class="revenue-proportion__item last"></div>
    </div>

    <div class="spacer-h-20 preload hidden"></div>
    <div class="">
      <table class="perfomance preload hidden">
        <tr>
          <th></th>
          <th><span class="perfomance__label">Leads</span></th>
          <th><span class="perfomance__label">Converted</span></th>
          <th><span class="perfomance__label">Booked</span></th>
          <th><span class="perfomance__label">Billed</span></th>
        </tr>
        <tr v-for="item, id in rows" v-on:mouseover="show_item(id)" v-bind:data-id="id">
          <td >
            <span class="perfomance__strong"></span>
            <span class="perfomance__color-marker" v-bind:class="'color-'+id"></span>
            <span class="perfomance__strong">{{item.name}}</span>
          </td>
          <td>
            <svg class="icon svg-icon-leads-lines"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leads-lines"></use></svg>
            <span class="perfomance__strong">{{item.count}}</span>

            <span class="perfomance__label" v-if=" item.leads_cha != 0" v-bind:class="item.leads_cha > 0? 'enc': 'dcr' "><span v-if="item.leads_cha > 0">+</span>{{item.leads_cha}}%</span>
          </td>

          <td>
            <svg class="icon svg-icon-convertions"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use></svg>
            <span class="perfomance__strong">{{item.converted_percents}}</span>

            <span class="perfomance__label" v-if="(item.converted_prev) !== 0 && item._converted !== 0 && get_sum_from_price(item.converted_percents_cha)  != 0" v-bind:class="item.converted_percents_cha > 0? 'enc': 'dcr' "><span v-if="item.converted_percents_cha > 0">+</span>{{item.converted_percents_cha}}%</span>
          </td>

          <td>
            <svg class="icon svg-icon-card"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use></svg>
            <span class="perfomance__strong">{{item.booked}}</span>

            <span class="perfomance__label" v-if="get_sum_from_price(item.cha_booked) != 0 && item.revenue_val != 0 && item.revenue_prev != 0" v-bind:class="item.cha_booked > 0? 'enc': 'dcr' "><span v-if="item.cha_booked > 0">+</span>{{item.cha_booked}}%</span>
          </td>

          <td>
            <svg class="icon svg-icon-card"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use></svg>
            <span class="perfomance__strong">{{item.billed}}</span>

            <span class="perfomance__label" v-if="item.billed_cha != 0 && get_sum_from_price(item.billed) !== 0 && item.billed_prev !== 0" v-bind:class="item.billed_cha > 0? 'enc': 'dcr' "><span v-if="item.billed_cha > 0">+</span>{{item.billed_cha}}%</span>
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><span class="converted-label">Total Converted </span><br>
            <span class="booked-value">{{booked_value}}</span>
          </td>
          <td><span class="converted-label">Total Billed </span><br>
            <span class="billed-value">{{billed_value}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div><!-- information-block -->
</div><!-- container -->

<div class="spacer-h-70"></div>