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

      <span class="range-datepicker__label">This Month</span>
      <span class="range-datepicker__text"> <?php echo $daterange['from'] ?> → <?php echo $daterange['to'] ?></span>

      <span class="range-datepicker__arrow"></span>
    </div><!-- range-datepicker -->

    <div class="select-imitation has-icon select-imitation_shift-bottom" v-bind:class="{ expanded: isExpanded}" id="clinics-select">
      <svg class="icon svg-icon-clinics">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>

      <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
        <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>

      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li v-for="data in options" v-bind:class="{selected: isSelected[data]}" v-on:click="imitate_select_option(data)">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
    </div><!-- select-imitation  -->

    <div class="select-imitation has-icon select-imitation_shift-bottom" id="treatments-select"  v-bind:class="{ expanded: isExpanded}" >
      <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
      <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
        <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>
      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
    </div><!-- select-imitation  -->

    <div class="select-imitation has-icon select-imitation_shift-bottom" id="campaigns-select"  v-bind:class="{ expanded: isExpanded}" >
      <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
      <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
        <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>
      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li v-for="data in options"  v-on:click="imitate_select_option(data)"  v-bind:class="{selected: isSelected[data]}" >
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
    </div><!-- select-imitation  -->

    <div class="select-imitation has-icon select-imitation_shift-bottom" id="sourses-select"  v-bind:class="{ expanded: isExpanded}" >
      <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
      <select v-model="selected" v-on:change="change"  v-bind:class="{ hidden: isHiddenSelect}">
        <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>
      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li v-for="data in options" v-bind:class="{selected: isSelected[data]}" v-on:click="imitate_select_option(data)">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
    </div><!-- select-imitation  -->

    <div class="select-imitation has-icon select-imitation_shift-bottom" id="team-select"  v-bind:class="{ expanded: isExpanded}" >
      <svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>

      <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
        <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>
      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li v-for="data in options"  v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
    </div><!-- select-imitation  -->
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
            <h4 class="block-title">Total Revenue</h4>
            <p class="block-value">{{rev}}</p>
            <div class="block-comment">
              <span v-html="icon"></span>
              <span>
                Your total revenue is {{up_down}} <br>
                <span :class="change_type">{{percent_change}}%</span> from previous 30 days
              </span>
            </div>
          </div>

          <div class="block" id="total_leads">
          <div class="spacer-h-20 spacer-h-lg-50"></div>
            <i class="icon-holder">
              <svg class="icon svg-icon-leads-lines"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leads-lines"></use> </svg>
            </i>
            <h4 class="block-title">Leads</h4>
            <p class="block-value">{{leads}}</p>
            <div class="block-comment">
                <svg class="icon svg-icon-refresh"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-refresh"></use> </svg>
                <span> <span class="encr">{{percents}}</span> Leads <br> converted </span>
             </div>
          </div>

          <div class="block" id="total_average">
            <div class="spacer-h-20  spacer-h-lg-50"></div>
            <i class="icon-holder">
              <svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>
            </i>
            <h4 class="block-title">Avg. Booking Value</h4>
            <p class="block-value">{{avg}}</p>
          </div>
        </div>
      </div>

      <div class="col col-md-4">
        <div class="col-graphic">
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
      <div class="information-block" id="top_sourse">
        <div class="information-block__header">

          <h4 class="block-title">Top Source</h4>

          <div class="select-imitation" v-bind:class="{ expanded: isExpanded}" >
            <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
              <option v-for="data in options" v-bind:value="data">{{data}}</option>
            </select>
            <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
            <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
            <div class="select-imitation__dropdown">
              <ul class="select-imitation__list">
                <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
                  <span>{{data}}</span>
                </li>
              </ul>
            </div>
          </div><!-- select-imitation  -->

        </div><!-- information-block__header -->

        <div class="information-block__body sourse">
          <i class="sourse__icon grey">
            <svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag grey">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer">
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

          <div class="select-imitation" v-bind:class="{ expanded: isExpanded}" >
            <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
              <option v-for="data in options" v-bind:value="data">{{data}}</option>
            </select>
            <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
            <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
            <div class="select-imitation__dropdown">
              <ul class="select-imitation__list">
                <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
                  <span>{{data}}</span>
                </li>
              </ul>
            </div>
          </div><!-- select-imitation  -->
        </div><!-- information-block__header -->

        <div class="information-block__body sourse">
          <i class="sourse__icon pink">
            <svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag pink">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer">
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


          <div class="select-imitation" v-bind:class="{ expanded: isExpanded}" >
            <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
              <option v-for="data in options" v-bind:value="data">{{data}}</option>
            </select>
            <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
            <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
            <div class="select-imitation__dropdown">
              <ul class="select-imitation__list">
                <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
                  <span>{{data}}</span>
                </li>
              </ul>
            </div>
          </div><!-- select-imitation  -->
        </div><!-- information-block__header -->

        <div class="information-block__body sourse">
          <i class="sourse__icon blue">
            <svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag blue">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer">
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


          <div class="select-imitation" v-bind:class="{ expanded: isExpanded}" >
            <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
              <option v-for="data in options" v-bind:value="data">{{data}}</option>
            </select>
            <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span>
            <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
            <div class="select-imitation__dropdown">
              <ul class="select-imitation__list">
                <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)">
                  <span>{{data}}</span>
                </li>
              </ul>
            </div>
          </div><!-- select-imitation  -->
        </div><!-- information-block__header -->

        <div class="information-block__body sourse">
          <i class="sourse__icon red">
            <svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>
          </i>
          <h3 class="sourse__title">{{name}}</h3>
          <p class="sourse__tag red">{{leads}} {{label}}</p>
        </div><!-- information-block__body -->

        <div class="information-block__footer">
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
      <div class="information-block">
        <div class="spacer-h-10"></div>
        <div class="information-block__header">
          <div class="valign-center">
            <svg class="icon svg-icon-convertions convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
            <h4 class="block-title">Convertions</h4>
          </div>

          <div class="select-imitation">
            <select name="" id="">
              <option value="1">value 1</option>
              <option value="2">value 2</option>
              <option value="3">value 3</option>
            </select>
          </div><!-- select-imitation -->
        </div><!-- information-block__header -->
        <div class="information-block__body ">
          <div class="row">
            <div class="diagram col-12">
              <canvas id="convertions-canvas"></canvas>
            </div>
          </div>
        </div><!-- row -->
        <div class="spacer-h-50"></div>
        <div class="information-block__results">
          <div class="row">
            <div class="col-12 col-md-6">
                <div class="block-comment">
                <svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>
                 <span>Your conversion rate is down
                 <span class=decr>24%</span>from previous 30 days </span>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <p class="convertion-label">Avg. Conversion Time </p>
              <p class="convertion-time">3d 2h 32m</p>
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
          </div>
        </div><!-- information-block__header -->

        <div class="information-block__scroll">
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
              <td>
                <div class="cell-content">
                   <svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>
                  <span class="encr">0</span>
                </div>
              </td>
            </tr>
          </table>
        </div><!-- information-block__body -->
      </div><!-- information-block -->
    </div><!-- col-12 col-lg-6 -->
  </div>
</div><!-- container -->

<div class="spacer-h-70"></div>