Vue.component("saved-foods-list", {
  props: ["savedFoods"],
  data: function() {
    return { searchString: "" };
  },
  template:
    "<div>" +
      "<div class='plainContainer marginBottom'>" +
        "Search <input type='text' v-model='searchString'>" +
      "</div>" +
      "<table class='plainList'>" +
        "<thead>" +
          "<tr>" +
            "<th>Food Name <button v-on:click='triggerSort()'><i class='fa fa-sort-alpha-asc'></i></button></th>" +
            "<th>Cals</th>" +
            "<th>Actions</th>" +
          "</tr>" +
        "</thead>" +
        "<tbody>" +
          "<tr v-for='(food, index) in filteredFoodsList'>" +
            "<td><input type='text' v-model='food.name' class='extraLong'/></td>" +
            "<td><input type='number' v-model='food.calories' class='short'/></td>" +
            "<td><button v-on:click='selectFoodToAdd(food)' class='marginRight'><i class='fa fa-cutlery'></i> Eat</button>" +
            "<button v-on:click='selectFoodToRemove(index)'><i class='fa fa-remove'></i> Remove</button></td>" +
          "</tr>" +
        "</tbody>" +
      "</table>" +
    "</div>",
  methods: {
    selectFoodToAdd: function (foodToAdd) {
      this.$emit('food-selected', foodToAdd);
    },
    selectFoodToRemove: function (foodIndexToRemove) {
      this.$emit('food-remove', foodIndexToRemove);
    },
    triggerSort: function() {
      this.$emit("food-sort");
    }
  },
  computed: {
    filteredFoodsList: function() {
      var savedSearchString = this.searchString.toLowerCase();
      
      if (savedSearchString === "") {
        return this.savedFoods;
      } else {
        return this.savedFoods.filter(function(food) {
          return food.name.toLowerCase().indexOf(savedSearchString) >= 0;
        });
      }
    }
  }
});
