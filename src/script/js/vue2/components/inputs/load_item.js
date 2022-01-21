Vue.component('load-item', {

  data: function(){
    return {
      src: '',
      path: '',
    };
  },

  props: ['_path'],

  mounted: function(){
    var vm = this;
    vm.init_drop_area();
    this.path = this._path;
  },

  watch:{
    _path: function(val){
      this.path = val;
    },

    path: function(val){
      if(val){
        var vm = this;

        setTimeout(function(){
          vm.show_image_loaded(val);
        }, 100)
      }
    }
  },

  methods:{
      init_drop_area: function(){
        var dropArea = this.$refs.drop_area;

        if(this.is_old_order){
          return;
        }

        if(this.is_downloaded){
          return;
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          dropArea.addEventListener(eventName, this.prevent_defaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
          dropArea.addEventListener(eventName, this.highlight, false)
        })

        ;['dragleave', 'drop'].forEach(eventName => {
          dropArea.addEventListener(eventName, this.unhighlight, false)
        })

        dropArea.addEventListener('drop', this.handledrop, false);
      },


      prevent_defaults: function(e) {
        e.preventDefault()
        e.stopPropagation()
      },

      /**
      * adds highlight style for drag area
      */
      highlight: function(e) {
        this.$refs.drop_area.classList.add('highlight')
      },

      unhighlight: function(e) {
        this.$refs.drop_area.classList.remove('highlight')
      },

      /**
      * shows preview of a passed file
      *
      * @param file - file
      *
      * @return void;
      */
      preview_file: function(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        var vm = this;
        reader.onloadend = function() {
          let img = document.createElement('img')
          vm.src = reader.result
        }
      },

      /**
      * handles drop image in drag-n-drop area
      *
      * @param e - event
      */
      handledrop: function(e){
        let dt = e.dataTransfer;
        let files = dt.files;
        var items = dt.items;

        for(var file of files){
          if(file.type != 'image/jpeg' && file.type != "image/png"){
            continue;
          }

          this.preview_file(file);
          this.$emit('change_image_uploaded', {file: file});
        }
      },

      exec_file_change: function(e){
         this.$emit('change_image_uploaded', {file: e.target.files[0]});
         this.preview_file(e.target.files[0]);
      },

      show_image_loaded: function(path){
        var vm = this;
        var data = JSON.stringify({
          "path": path
        });

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            var data = JSON.parse(this.responseText)
            vm.src = data.link
          }
        });


        xhr.open("POST", "https://api.dropboxapi.com/2/files/get_temporary_link", false);
        xhr.setRequestHeader("authorization", "Bearer "+ online_journey_settings.token);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);

        // var response = JSON.parse(xhr.responseText);
        // var img = "<img src='"+response.link+"'>"
        // this.$emit('show_image',{img: img});
      },

    },


  template: `
    <label class="upload-image-item" ref="drop_area">
      <span class="braket-tl"></span>
      <span class="braket-tr"></span>
      <span class="braket-bl"></span>
      <span class="braket-br"></span>
      <svg class="icon svg-icon-upload"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-upload"></use></svg>
      <input type="file" v-on:change="exec_file_change($event)">
      <img  :src="src" v-if="src">
    </label><!-- upload-image-item -->
  `,

})