Vue.component("eaten-foods-list", {
  props: ["foods", "selectedDateStamp"],
  template:
    "<div>" +
      "<table class='plainList'>" +
        "<thead>" +
          "<tr>" +
            "<th>Food Name</th>" +
            "<th>Cals</th>" +
            "<th>Amount</th>" +
            "<th>Total</th>" +
            "<th>Actions</th>" +
          "</tr>" +
        "</thead>" +
        "<tbody>" +
          "<tr v-for='(food, index) in filteredFoodsList'></td>" +
            "<td>{{food.name}}</td>" +
            "<td>{{food.calories}}</td>" +
            "<td><input type='number' v-model='food.amount' class='short'/></td>" +
            "<td>{{food.amount * food.calories}}</td>" +
            "<td><button v-on:click='selectFoodToRemove(index)'><i class='fa fa-remove'></i> Remove</button></td>" +
          "</tr>" +
        "</tbody>" +
        "<tfoot v-if='filteredFoodsList.length > 0'>" +
          "<tr>" +
            "<td colspan='5'>" +
              "Total Calories Today: {{filteredFoodsTotal}} out of {{calorieLimitTodayCalculated}}" +
            "</td>" +
          "</tr>" +
        "</tfoot>" +
      "</table>" +
    "</div>",
  computed: {
    filteredFoodsList: function() {
      //blech. but it works.
      if (typeof this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)] === "undefined" || 
          typeof this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].foodsEatenToday === "undefined") {
        return [];
      } else {
        return this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].foodsEatenToday;
      }
    },
    filteredFoodsTotal: function() {
      return this.filteredFoodsList.map(function(a) {return a.amount * a.calories; }).reduce(function(a, b) { return a + b; }, 0);
    },
    calorieLimitTodayCalculated: function() {
      if (typeof this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)] !== "undefined" && 
          typeof this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].calorieLimitToday !== "undefined") {
        return this.foods[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].calorieLimitToday;
      }
    }
  },
  methods: {
    selectFoodToRemove: function (foodIndexToRemove) {
      this.$emit('food-remove', foodIndexToRemove);
    }
  }
});
