<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
?>
<header class="site-header">
  <div class="container">
    <div class="row no-gutters">
      <div class="col-12 col-md-3 col-lg-2 text-center text-left-md">
        <a href="" class="logo"><img src="<?php echo THEME_URL;?>/assets/images/logo.svg" alt=""><span class="logo__text"> tracker</span></a>
      </div>
      <nav class="col-12 order-last order-md-0 col-md-4 col-lg-4 main-menu">
        <ul class="menu">
          <?php if ($is_admin): ?>

          <li class="menu-item <?php echo $dashboard_menu_class?>">
            <a href="<?php echo $dashboard_url?>">
              <svg class="icon svg-icon-dashboard"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-dashboard"></use> </svg>
                Dashboard
              </a>
          </li>
          <?php endif ?>
          <li class="menu-item <?php echo $leads_menu_class?>">
            <a href="<?php echo $lead_url?>">
               <svg class="icon svg-icon-leads"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-leads"></use> </svg>
            Leads</a>
          </li>
        </ul>
      </nav>
      <div class="search" v-bind:class="classes"  id="search-form">
        <div class="row no-gutters justify-content-between justify-content-around-md justify-content-between-lg">
          <div class="search-open"  v-if="show_search">
            <svg class="icon svg-icon-search"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-search"></use> </svg>
          </div>

          <div class="search__wrapper"  v-if="show_search">
            <form action="#" method="POST" class="search__form">

                <div class="row no-gutters">
                  <button type="submit">
                     <svg class="icon svg-icon-search"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-search"></use> </svg>
                  </button>
                  <input type="search" v-model="search_value" class="search__field" placeholder="Search Tracker…">
                </div>
            </form>
          </div>
          <a href="<?php echo $new_lead_url?>" class="button-add"></a>
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