Vue.component('list-column-tco', {

  data: function(){
    return {
      info:  '',
      leads: [],
      trigger_scroll : false,
      counter: 20,
      moved_item_id: -1,
      target_stage: '',
      converted: '',
    };
  },

  props: [
    '_info',
    '_converted',
    '_leads',
  ],

  watch:{

    '_info': function(val){
      this.info = val;
    },

    '_leads': function(val){
      this.leads = val;
    },
    '_converted': function(val){
      this.converted = val;
    },

    trigger_scroll: function(trigger){
      if(trigger){
        this.counter += 50;
      }
    },
  },

  computed: {
    count: function(){
      return this._leads.length;
    },

    // converted: function(){
    //   return 0;
    // },

    leads_show: function(){
      var leads = this.leads.slice(0, this.counter);
      for(var id in leads){
        leads[id].lead_stage = this.info.name;
      }
      return leads;
    },
  },

  beforeMount: function(){
    this.info = this._info;
    this.leads = this._leads;
    this.converted = this._converted;
  },



  mounted: function(){
    var header = this.$el.getElementsByClassName('leads-column__tag')[0];
    header.style.backgroundColor = this.info.bg_color;
    header.style.color           = this.info.text_color;
  },

  methods: {

    checkMove: function(item){
      this.moved_item_id = item.draggedContext.element.ID;
    },

    end_drag: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    end_sort: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    load_csv: function(){
      this.$emit('open_lead', {"column": this.info.name});
    },

    open_lead_cb:function(data){
      this.$emit('load_csv_emit', data);
    },

    /**
    * replaces default scroll of column.
    * scrolls column by 1 elemnt hieght
    */
    scroll_items: function(){
      event.preventDefault()

      if( !this.trigger_scroll ){
        this.$refs.scroll.scrollTop  = (event.deltaY > 0)? this.$refs.scroll.scrollTop + 66 : this.$refs.scroll.scrollTop - 66;
      }
    },


    /**
    * emits scroll if end of scroll content reached
    */
    scroll_items_emit:function(slug){
      this.trigger_scroll = this.$refs.scroll.offsetHeight + this.$refs.scroll.scrollTop >= this.$refs.scroll.scrollHeight - this.$refs.scroll.scrollHeight  * 0.05;

      var vm = this;

      Vue.nextTick(function(){
        vm.trigger_scroll = false;
      })
    },
  },

  template: `
  <div class="leads-column leads-column-2">
    <div class="leads-column__head">
      <button type="button" class="leads-column__tag" v-on:click="load_csv">
        {{info.name}}
      </button>
      <span class="leads-column__count">{{count}}</span>
      <span class="leads-column__convertion" v-if="info.name != 'New' "><svg class="icon svg-icon-convertions"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use></svg>
         {{converted}}
       </span>
    </div>
    <div class="leads-column__body"
        ref="scroll"
        @wheel="scroll_items(info.name)"
        @scroll="scroll_items_emit(info.name)"
    >
      <div name="lead-list" class="leads-list" >
        <draggable
          v-bind:class="'scroll'"
          ref="scroll-inner"
          :move="checkMove"
          :list="leads"
          group="info.name"
          @end="end_sort"
        >
          <item-tco
            v-for="lead, key in leads_show"
            v-on:open_lead = 'open_lead_cb'
            :_info = "lead"
            :key = "'item_'+key"
          ></item-tco>
        </draggable>
      </div>
     </div>
   </div>
  `,
});