<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<header class="site-header">
  <div class="container">
    <div class="row no-gutters justify-content-between">
      <div class="col-12 col-md-3 col-lg-2 text-center text-left-md">
        <a href="" class="logo"><img src="<?php echo THEME_URL;?>/assets/images/logo.svg" alt=""><span class="logo__text"> tracker</span></a>
      </div>
      <nav class="col-12 order-last order-md-0 col-md-4 col-lg-4 main-menu">
        <ul class="menu">
          <?php if ($is_admin): ?>
          <li class="menu-item <?php echo $dashboard_menu_class?>">
            <a href="<?php echo $dashboard_url?>"> Dashboard </a>
          </li>
           <?php endif ?>
          <?php if ($is_admin || $is_staff): ?>
          <li class="menu-item <?php echo $reception_id == get_queried_object_id() ? 'active' : '' ?>">
            <a href="<?php echo $reception_url?>"> Reception</a>
          </li>
          <li class="menu-item <?php echo $tco_id == get_queried_object_id() ? 'active' : '' ?>">
            <a href="<?php echo $tco_url?>"> TCO</a>
          </li>
          <?php else: ?>
          <li class="menu-item <?php echo $leads_menu_class?>">
            <a href="<?php echo $lead_url?>">
            Leads</a>
          </li>
          <?php endif ?>
        </ul>
      </nav>
      <div class="search visuallyhidden" v-bind:class="classes"  id="search-form">
        <div class="row no-gutters justify-content-between justify-content-around-md justify-content-between-lg">
          <div class="search-open"  v-if="show_search">
            <svg class="icon svg-icon-search"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-search"></use> </svg>
          </div>
          <div class="search__wrapper"  v-if="show_search">
            <form action="#" method="POST" class="search__form" v-on:submit.prevent="run_search_ajax">
              <div class="row no-gutters" >
                <button type="submit">
                   <svg class="icon svg-icon-search"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-search"></use> </svg>
                </button>
                <input type="search" v-model="search_value" class="search__field" placeholder="Search Tracker…">
              </div>
            </form>
          </div>
          <?php if ($show_add): ?>
          <a href="javascript:void(0)<?php // echo $new_lead_url?>"  class="button-add" onclick="open_new_lead()"></a>
          <?php endif ?>
        </div><!-- row -->
      </div><!-- search -->

      <div class="col-12 order-md-0 col-md-3 col-lg-2 user">
        <div class="user__photo"><img src="<?php echo $photo_url?>" alt=""></div>
        <span class="user__text">Hi, <?php echo $name?></span><br>
        <a  class="user__logout" href="<?php echo wp_logout_url(HOME_URL);?>">Log out</a>
      </div>
    </div>
  </div>
  </header>