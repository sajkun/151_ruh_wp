<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<div id="leads-list" ref="parent">
  <div class="spacer-h-40" ref="spacer1"></div>
  <div class="container-fluid filter-container" ref="container_filter">
     <div class="row no-gutters justify-content-start justify-content-center-lg switchers" id="leads-filters">

      <div class="alert">
        <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

        <span class="alert__count">12</span>
        <span class="alert__tag overdue">2 Ovderdue</span>

        <div class="checkbox-imitation inline">
          <label>
             <input type="checkbox" name="show_overdue_only">
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

      <select-imitation-icon _select_name="clinics" ref="clinics" v-on:update_list="run_update_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="treatments" ref="treatments" v-on:update_list="run_update_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="campaigns" ref="campaigns" v-on:update_list="run_update_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="sourses" ref="sourses" v-on:update_list="run_update_list($event)"></select-imitation-icon>

      <select-imitation-icon _select_name="team" ref="team" v-on:update_list="run_update_list($event)"></select-imitation-icon>
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
              <span class="leads-column__count">34</span>

              <?php if ($key  > 0): ?>
              <span class="leads-column__convertion">
                 <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                  21%
              <?php endif ?>
              </div><!-- leads-column__head -->

              <div class="leads-column__body">
                <ul class="leads-list"  data-list="<?php echo $st['name'] ?>">
                </ul>
              </div>
            </div><!-- leads-column -->
          <?php
        }
         ?>
<?php /*
        <div class="leads-column">
          <div class="leads-column__head">
             <span class="leads-column__tag" style="color: #01c58d; background-color: #d9f7ef;">New</span>
             <span class="leads-column__count">174</span>
          </div><!-- leads-column__head -->

          <div class="leads-column__body">
            <ul class="leads-list" data-list="new">
              <li>
                <div class="lead-preview" data-overdue="yes" data-id="1" >
                   <div class="clearfix">
                     <span class="lead-preview__name">David Bloggs</span>
                     <span class="lead-preview__icons">
                      <svg class="icon svg-icon-confirm"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-confirm"></use> </svg>
                      <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
                     </span>
                     <span class="lead-preview__time">3 hrs ago</span>
                   </div>

                   <div class="clearfix">
                     <span class="lead-preview__sourse">Composite Bonding</span>

                     <span class="lead-preview__photo">
                       <img src="assets/images/c/team-ph.png" alt="" title="name">
                     </span>
                   </div>
                </div>
              </li>
              <li>
                <div class="lead-preview" data-overdue="yes" data-id="2">
                   <div class="clearfix">
                     <span class="lead-preview__name">David Bloggs</span>

                     <span class="lead-preview__icons">
                      <svg class="icon svg-icon-confirm"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-confirm"></use> </svg>
                      <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>
                     </span>

                     <span class="lead-preview__time">3 hrs ago</span>
                   </div>

                   <div class="clearfix">
                     <span class="lead-preview__sourse">Composite Bonding</span>

                     <span class="lead-preview__photo">
                       <img src="assets/images/c/team-ph.png" alt="" title="name">
                     </span>
                   </div>
                </div>
              </li>
              <li>
                <div class="lead-preview" data-overdue="no" data-id="3">
                   <div class="clearfix">
                     <span class="lead-preview__name">David Bloggs</span>

                     <span class="lead-preview__icons"></span>

                     <span class="lead-preview__time">3 hrs ago</span>
                   </div>

                   <div class="clearfix">
                     <span class="lead-preview__sourse">Composite Bonding</span>

                     <span class="lead-preview__photo">
                       <img src="assets/images/c/team-ph.png" alt="" title="name">
                     </span>
                   </div>
                </div>
              </li>
              <li>
                <div class="lead-preview" data-overdue="no" data-id="4">
                   <div class="clearfix">
                     <span class="lead-preview__name">David Bloggs</span>

                     <span class="lead-preview__icons">
                      <svg class="icon svg-icon-confirm"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-confirm"></use> </svg>
                     </span>

                     <span class="lead-preview__time">3 hrs ago</span>
                   </div>

                   <div class="clearfix">
                     <span class="lead-preview__sourse">Composite Bonding</span>

                     <span class="lead-preview__photo">
                       <img src="assets/images/c/team-ph.png" alt="" title="name">
                     </span>
                   </div>
                </div>
              </li>
            </ul>
          </div>
        </div><!-- leads-column -->

        <div class="leads-column">
          <div class="leads-column__head">
            <span class="leads-column__tag" style="background-color: #fce0f6;color: #ee63d2;">Contact #1</span>
            <span class="leads-column__count">86</span>

            <span class="leads-column__convertion">
               <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                49%
            </span>
          </div><!-- leads-column__head -->

          <div class="leads-column__body">
             <ul class="leads-list"  data-list="contact1">
            </ul>
          </div>
        </div><!-- leads-column -->

        <div class="leads-column">
          <div class="leads-column__head">
            <span class="leads-column__tag" style="background-color: #fcf4e7; color: #f4b326;">Contact #2</span>
            <span class="leads-column__count">34</span>

            <span class="leads-column__convertion">
               <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                21%
            </span>
          </div><!-- leads-column__head -->

          <div class="leads-column__body">
            <ul class="leads-list"  data-list="contact2">
              <li>
                <div class="lead-preview" data-overdue="no" data-id="5">
                   <div class="clearfix">
                     <span class="lead-preview__name">David Bloggs</span>

                     <span class="lead-preview__icons"></span>

                     <span class="lead-preview__time">3 hrs ago</span>
                   </div>

                   <div class="clearfix">
                     <span class="lead-preview__sourse">Composite Bonding</span>

                     <span class="lead-preview__photo">
                       <img src="assets/images/c/team-ph.png" alt="" title="name">
                     </span>
                   </div>
                </div>
              </li>
            </ul>
          </div>
        </div><!-- leads-column -->

        <div class="leads-column">
          <div class="leads-column__head">
            <span class="leads-column__tag" style="background-color: #e1f8fe;color: #3cc2e9; ">Booked</span>
            <span class="leads-column__count">34</span>

            <span class="leads-column__convertion">
               <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                21%
          </div><!-- leads-column__head -->

          <div class="leads-column__body"  data-list="booked">
            <ul class="leads-list">
            </ul>
          </div>
        </div><!-- leads-column -->

        <div class="leads-column">
          <div class="leads-column__head">
            <span class="leads-column__tag" style="background-color: #fbeee2;color: #c29265;">Converted</span>
            <span class="leads-column__count">34</span>

            <span class="leads-column__convertion">
               <svg class="icon svg-icon-convertions"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use> </svg>
                21%
          </div><!-- leads-column__head -->

          <div class="leads-column__body">
            <ul class="leads-list"  data-list="converted">
            </ul>
          </div>
        </div><!-- leads-column -->  */?>
      </div><!-- row -->

      <div class="spacer-h-70"></div>
    </div>
  </div><!-- container-fluid -->
</div>