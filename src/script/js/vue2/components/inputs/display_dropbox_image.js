Vue.component('image-dropbox', {
	data: function () {
		return {
			src: '',
			path: '',
		}
	},

	props: ['_path'],

	mounted: function () {
		var vm = this
		this.path = this._path
	},

	watch: {
		_path: function (val) {
			this.path = val
		},

		path: function (val) {
			if (val) {
				var vm = this

				setTimeout(function () {
					vm.show_image_loaded(val)
				}, 100)
			}
		},
	},

	methods: {
		/**
		 * shows preview of a passed file
		 *
		 * @param file - file
		 *
		 * @return void;
		 */
		preview_file: function (file) {
			let reader = new FileReader()
			reader.readAsDataURL(file)
			var vm = this
			reader.onloadend = function () {
				let img = document.createElement('img')
				vm.src = reader.result
			}
		},

		/**
		 * handles drop image in drag-n-drop area
		 *
		 * @param e - event
		 */
		handledrop: function (e) {
			let dt = e.dataTransfer
			let files = dt.files
			var items = dt.items

			for (var file of files) {
				if (file.type != 'image/jpeg' && file.type != 'image/png') {
					continue
				}

				this.preview_file(file)
				this.$emit('change_image_uploaded', { file: file })
			}
		},

		show_image_loaded: function (path) {
			var vm = this
			var data = JSON.stringify({
				path: path,
			})

			var xhr = new XMLHttpRequest()

			xhr.addEventListener('readystatechange', function () {
				if (this.readyState === 4) {
					var data = JSON.parse(this.responseText)
					vm.src = data.link
				}
			})

			xhr.open('POST', 'https://api.dropboxapi.com/2/files/get_temporary_link', false)
			xhr.setRequestHeader('authorization', 'Bearer ' + online_journey_settings.token)
			xhr.setRequestHeader('content-type', 'application/json')
			xhr.setRequestHeader('cache-control', 'no-cache')
			xhr.send(data)

			// var response = JSON.parse(xhr.responseText);
			// var img = "<img src='"+response.link+"'>"
			// this.$emit('show_image',{img: img});
		},

		preview_image_large: function () {
			console.log(this.src)

			this.$parent.$refs.journey_img_view.src = this.src
			this.$parent.$refs.journey_img_view.show = true
		},
	},

	template: `
     <div class="upload-image-item preview-icon" v-on:click="preview_image_large">
       <img  :src="src" v-if="src">
     </div><!-- upload-image-item -->
   `,
})
