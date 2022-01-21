var animation_mixin = {
  methods:{
   beforeEnter: function (el) {
      el.style.opacity = 0
    },

    enter: function (el, done) {
      const width = getComputedStyle(el).width;

      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = 'auto';

      const height = getComputedStyle(el).height;

      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      el.style.height = 0;

      getComputedStyle(el).height;

      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: height },
          { complete: done }
        )
      }, delay)
    },

    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },

    enterAfter: function(el){
      el.style.height = 'auto';

      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    },

    leaveAfter: function(el){
      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    }
  }
}