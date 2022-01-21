var get_set_props = {
  methods: {
    /**
    * update prop
    *
    * @param id - string, name of parameter from data object of this component
    * @param value  - mixed, value to store
    *
    * @return void;
    */
    update_prop: function(id, value){
      this[id] = value;
    },
    /**
    * update prop
    *
    * @param id - string, name of parameter from data object of this component
    * @param value  - mixed, value to store
    *
    * @return void;
    */
    set_prop: function(id, value){
      this[id] = value;
    },

    /**
    * get prop value
    *
    * @param id - string, name of parameter from data object of this component
    *
    * @return mixed - value of propery or 'not found';
    */
    get_prop: function(id){
      return typeof(this[id]) != 'undefined'? this[id] : 'not found';
    },
  },
}