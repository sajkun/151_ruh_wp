Vue.component("select-filters-list", {
  mixins: [select_mixin2],

  data: function () {
    return {
      options2: {
        // 'date' : {
        //   title: 'Date',
        //   icon: icons_selects['calendar'],
        // },
        clinics: {
          title: "Clinics",
          icon: icons_selects["clinics"],
        },

        treatments: {
          title: "Treatments",
          icon: icons_selects["treatments"],
        },

        campaigns: {
          title: "Campaigns",
          icon: icons_selects["campaigns"],
        },

        sources: {
          title: "Sources",
          icon: icons_selects["sources"],
        },

        team: {
          title: "Team",
          icon: icons_selects["team"],
        },

        dentists: {
          title: "Dentists",
          icon: icons_selects["dentists"],
        },

        tags: {
          title: "Tags",
          icon: icons_selects["tags"],
        },
      },
    };
  },

  watch: {},

  mounted: function () {
    console.log("test");
  },

  methods: {
    change: function () {
      this.$emit("update_list", { val: this.selected, name: "select_list" });
    },
  },

  template: `
    <div class="select-imitation select-imitation_shift-bottom select-imitation_plus"
       v-click-outside="discard_select"
       v-bind:class="{ expanded: isExpanded}"
     >
      <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}">
         <option v-for="data in options" v-bind:value="data">{{data}}</option>
      </select>
      <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">Add Filter</span>

      <span class="select-imitation__plus " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}"> <svg class="icon svg-icon-plus"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-plus"></use> </svg></span>

      <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span>
      <div class="select-imitation__dropdown">
        <ul class="select-imitation__list">
          <li class="select-imitation__item" v-for="data, key in options2" v-if="data.title" v-bind:class="{selected: isSelected[data.title]}"  v-on:click="imitate_select_option(key)">
             <span class="select-imitation__row-icon" v-html="data.icon"></span>
             <span class="select-imitation__row-text element">{{data.title}}</span>
          </li>
        </ul>
      </div>
    </div>`,
});
