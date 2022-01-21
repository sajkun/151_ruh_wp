Vue.component('popup-journey-image-view', {
	data: function () {
		return {
			src: '',
			show: false,
		}
	},

	template: `
   <div class="journey-popup" v-show="show">
      <div class="journey-popup__inner">
         <button type="button" class="close" v-on:click="show=false">×</button>
         <img :src="src">
      </div>
   </div>
   `,
})
