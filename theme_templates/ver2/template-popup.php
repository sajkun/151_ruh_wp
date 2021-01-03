<?php
echo '<script type="text/x-template" id="lead-single-popup-tmpl">';
?>
  <div class="s-popup-wrapper shown" v-show="show_confirmation_popup">
    <div class="s-popup">
      <i class="s-popup-icon">
        <svg id="SVGDoc-icon-1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 24 24"><path d="M10.92188,9.63779l-3.34497,-3.33968l-1.32587,1.32366l3.34497,3.33986h-2.42413v1.87214h5.625v-5.61641h-1.875zM9.19257,20.25h-1.88007v1.875c0,1.03546 0.84181,1.875 1.88007,1.875h1.83307v-1.875h-1.83307zM22.12503,18.46875h1.86503v-1.875h-1.86503zM22.12503,14.80254h1.86503v-1.86503h-1.86503zM22.12501,7.40625h-1.82813v1.875h1.82813v1.875h1.875v-1.875c0,-1.03546 -0.83954,-1.875 -1.875,-1.875zM16.5469,23.99005h1.86503v-1.86503h-1.86503zM12.7969,23.99005h1.86503v-1.86503h-1.86503zM22.12501,22.125h-1.82813v1.875h1.82813c1.03546,0 1.875,-0.83954 1.875,-1.875v-1.875h-1.875zM14.71875,13.78125c0,0.51691 -0.42059,0.9375 -0.9375,0.9375h-10.96875c-0.51691,0 -0.9375,-0.42059 -0.9375,-0.9375v-10.96875c0,-0.51691 0.42059,-0.9375 0.9375,-0.9375h10.96875c0.51691,0 0.9375,0.42059 0.9375,0.9375zM16.59375,2.8125c0,-1.5509 -1.2616,-2.8125 -2.8125,-2.8125h-10.96875c-1.5509,0 -2.8125,1.2616 -2.8125,2.8125v10.96875c0,1.5509 1.2616,2.8125 2.8125,2.8125h4.5v1.875h1.875v-1.875h4.59375c1.5509,0 2.8125,-1.2616 2.8125,-2.8125v-4.5h1.82813v-1.875h-1.82813z" fill="#3458ff" fill-opacity="1"></path></g></g></svg>
      </i>

      <h2 class="s-popup-title">Move Lead</h2>

      <p class="s-popup-text">Please select where you’d like this lead to be moved to</p>

      <select-imitation2
       v-bind:class="'fullwidth'"
       _name="lead_stage"
       _select_name="lead_stage"
       :_options="_stages"
       v-on:update_list="update_lead_stage($event, 'treatment_value')"
       ref="lead_stage_select2"
      ></select-imitation2>

      <a href="javascript:void(0)" class="s-popup-submit" v-on:click="save_new_stage()">Confirm</a>


      <a href="javascript:void(0)" v-on:click="{show_confirmation_popup = false}" class="s-popup-cancel">Cancel</a>

      <span class="s-popup-comment">
        Go back to lead
      </span>
    </div>
  </div>
<?php
echo '</script>';
?>