<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div class="spacer-h-40"></div>
<div class="container">
  <h1 class="page-title">Insights</h1>
  <div class="row no-gutters justify-content-start" id="dashboard-filters">

    <div class="range-datepicker">
      <svg class="icon svg-icon-calendar"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use> </svg>

      <span class="range-datepicker__label">Past 30 days</span>
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
</div><!-- container -->

<div class="spacer-h-10"></div>

<div class="container" >
  <div class="information-block information-block_summary">
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
            <div class="block-comment preload_ hidden " v-if="days_count > 0">
              <span v-html="icon" v-if="revenue_val_prev > 0"></span>
              <span v-if="revenue_val_prev > 0">
                Your total revenue is {{up_down}} <br>
                <span :class="change_type">{{percent_change}}%</span> from previous {{days_count}}  days
              </span>
              <span v-else>
                Your total revenue <br> for previous {{days_count}} days is 0
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
</div><!-- container -->

<div class="spacer-h-20"></div>

<div class="container statistics">
  <div class="row gutters-md-10">
    <div class="col-12 col-md-6 col-lg-3">
      <div class="information-block" id="top_source">
        <div class="information-block__header">

          <h4 class="block-title">Top Source</h4>

           <select-imitation v-on:update_list="run_update_data($event)" ref="display_type"></select-imitation>

           <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>
        </div><!-- information-block__header -->


        <div class="information-block__body sourse preload visuallyhidden">
          <i class="sourse__icon grey">
            <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag grey">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer preload visuallyhidden">
          <table>
            <tr>
              <td>Revenue Generated</td>
              <td><span class="encr">{{revenue}}</span></td>
            </tr>
            <tr>
              <td> Conversion Rate</td>
              <td><b>{{rate}}%</b></td>
            </tr>
          </table>
        </div><!-- information-block__footer -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-3 -->

    <div class="col-12 col-md-6 col-lg-3">
      <div class="information-block" id="top_campaign">
        <div class="information-block__header">
          <h4 class="block-title">Top Campaign</h4>
          <select-imitation v-on:update_list="run_update_data($event)" ref="display_type"></select-imitation>
          <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>
        </div><!-- information-block__header -->

        <div class="information-block__body sourse preload visuallyhidden">
          <i class="sourse__icon pink">
            <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag pink">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer preload visuallyhidden">
          <table>
            <tr>
              <td>Revenue Generated</td>
              <td><span class="encr">{{revenue}}</span></td>
            </tr>
            <tr>
              <td> Conversion Rate</td>
              <td><b>{{rate}}%</b></td>
            </tr>
          </table>
        </div><!-- information-block__footer -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-3 -->

    <div class="col-12 col-md-6 col-lg-3">
      <div class="information-block" id="top_treatment">
        <div class="information-block__header">

          <h4 class="block-title">Top Treatment</h4>

           <select-imitation v-on:update_list="run_update_data($event)" ref="display_type"></select-imitation>
           <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>

        </div><!-- information-block__header -->

        <div class="information-block__body sourse preload visuallyhidden">
          <i class="sourse__icon blue">
            <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag blue">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer preload visuallyhidden">
          <table>
            <tr>
              <td>Revenue Generated</td>
              <td><span class="encr">{{revenue}}</span></td>
            </tr>
            <tr>
              <td> Conversion Rate</td>
              <td><b>{{rate}}%</b></td>
            </tr>
          </table>
        </div><!-- information-block__footer -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-3 -->

    <div class="col-12 col-md-6 col-lg-3">
      <div class="information-block" id="top_clinic">
        <div class="information-block__header">

          <h4 class="block-title">Top Clinic</h4>

           <select-imitation v-on:update_list="run_update_data($event)" ref="display_type"></select-imitation>

           <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>

        </div><!-- information-block__header -->

        <div class="information-block__body sourse preload visuallyhidden">
          <i class="sourse__icon red">
            <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag red">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer preload visuallyhidden">
          <table>
            <tr>
              <td>Revenue Generated</td>
              <td><span class="encr">{{revenue}}</span></td>
            </tr>
            <tr>
              <td> Conversion Rate</td>
              <td><b>{{rate}}%</b></td>
            </tr>
          </table>
        </div><!-- information-block__footer -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-3 -->

  </div><!-- row -->

  <div class="spacer-h-20"></div>

  <div class="row gutters-md-10">
    <div class="col-12 col-lg-6">
      <div class="information-block" id="dashboard-convertions">
        <div class="spacer-h-10"></div>
        <div class="information-block__header">
          <div class="valign-center">
            <svg class="icon svg-icon-convertions convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
            <h4 class="block-title">Convertions</h4>
          </div>

          <select-imitation v-on:update_list="run_update_convertions($event)" ref="display_type"></select-imitation>

          <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>

        </div><!-- information-block__header -->

        <div class="information-block__body preload visuallyhidden" >
          <div class="row">
            <div class="diagram col-12">
              <div class="convertion-val text-center"  v-show="total_leads > 0">
                Conversion Rate <br>
                <span>{{convertion_rate}}%</span>
              </div>
              <canvas  v-show="total_leads > 0" id="convertions-canvas"></canvas>

              <div  v-if="total_leads <= 0">
                <div class="spacer-h-50"></div>
                <h3 class="text-center">No conversetions for selected period</h3>
              </div>
            </div>
          </div>
        </div><!-- row -->

        <div class="spacer-h-50"></div>
        <div class="information-block__results preload visuallyhidden" v-if="total_leads > 0">
          <div class="row">
            <div class="col-12 col-md-6">
                <div class="block-comment" v-show="days_count > 0">
                <span v-html="icon"></span>
                 <span>Your conversion rate is {{up_down}}
                 <span v-bind:class='change_type'>{{delta}}%</span> from previous {{days_count}} days </span>
              </div>
                <div class="block-comment" v-show="days_count <= 0">
                 <span>Convertions rate can't be compared with previous period</span>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <p class="convertion-label">Avg. Conversion Time </p>
              <p class="convertion-time">{{average_time}}</p>
            </div>
          </div>
        </div>
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-6 -->

    <div class="col-12 col-lg-6">
     <div class="information-block" id="team_perfomance">
      <div class="spacer-h-10"></div>
        <div class="information-block__header information-block__header_padding-fix ">
          <div class="valign-center">
              <svg class="icon svg-icon-team team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>
            <h4 class="block-title">Team Performance</h4>
          </div>

          <div id="select-wrapper">
            <select-imitation v-on:update_list="run_update_list($event)" ref="posts_list"></select-imitation>

             <div class="center-text spinner-cont"><img src="<?php echo THEME_URL; ?>/assets/images/spinner.gif" alt=""></div>
          </div>
        </div><!-- information-block__header -->

        <div class="information-block__scroll preload visuallyhidden">
          <table class="team-perfomance">
            <tr v-for="(data, name, index) in team">
              <td></td>
              <td>{{index + 1 }}</td>
               <td><div class="team-perfomance__photo"><img v-bind:src="data.image" alt=""></div></td>
              <td colspan="2">
                <div class="clearfix">
                  <span class="team-perfomance__name">{{name}}</span>
                  <span class="team-perfomance__post">{{data.user_position}}</span>
                </div>
              </td>
              <td>
                <div class="cell-content">
                   <svg class="icon svg-icon-leads-lines"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leads-lines"></use> </svg>
                  {{data.total_leads}}
                </div>
              </td>
              <td>
                <div class="cell-content">
                   <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                  {{data.converted}}
                </div>
              </td>

              <td><div class="cell-content">&nbsp;&nbsp;&nbsp;</div></td>

              <?php /*
              <td>
                <div class="cell-content">
                   <svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>
                  <span class="encr">0</span>
                </div>
              </td> */ ?>
            </tr>
          </table>
        </div><!-- information-block__body -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-6 -->
  </div>
</div><!-- container -->

<div class="spacer-h-70"></div>