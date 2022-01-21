Vue.component('confirmation-popup', {
  data: function(){
    return {
      stage: '',
      show_confirmation_popup: false,
      stages: stages_all,
    };
  },

  props:['_stage'],

  watch:{
    show_confirmation_popup: function(show){
      if(show){
      }

      if(!show){
        this.$parent.show_confirmation_popup = false;
      }
    },

    _stage:function(val){
      this.stage = val;
      this.$refs.lead_stage_select2.set_value('selected', val);
    },
  },

  computed:{
    _stages: function(){
      return Object.values(this.stages).map(e=>{return e.name});
    }
  },

  mounted:function(){
    // this.$refs.lead_stage_select2.set_value('options', this._stages);
  },

  methods:{
    update_lead_stage: function(data){
      this.$parent.show_confirmation_popup = false;
      this.stage = data.val;
    },

    save_new_stage: function(){
      this.show_confirmation_popup = false;
      this.$emit('change_stage_popup',{stage: this.stage});
    },
  },

  template: '#lead-single-popup-tmpl',
});