
<div class="debug" id="debug">
  <p v-for="data, id in content">{{data}}</p>

  <div class="spacer-h-30"></div>
  <a href="javascript:void(0)" v-on:click="clear()">Clear</a>
</div>