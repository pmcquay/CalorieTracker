var CalorieTracker = new Vue({
  el: "#CalorieTracker",
  data: {
    tab: 1,
    selectedDateStamp: Vue.DateTimeStampNow(),
    foods: { 
      saved: [], 
      eaten: {}, 
      settings: {
          calorieLimit: 0
      } 
    }
  },
  created: function() {
    var id = Vue.GetQueryString("id"),
        that = this;

    if(id === null) {
      window.location.href = window.location.href + "?id=" + Vue.GenerateRandomId();
      return;
    }
    
    if (location.protocol != "https:")
    {
      location.href = "https:" + window.location.href.substring(window.location.protocol.length);
      return;
    }
    
    request('GET', "https://slimy-carpenter.gomix.me/api/data/" + id).done(function (res) {
      if (res.statusCode >= 300) {
        alert(res.statusCode + ": " + res.body);
      }
      
      that.foods = JSON.parse(res.body);

      if (typeof that.foods.saved === "undefined") {
        Vue.set(that.foods, "saved", []);
      }

      if (typeof that.foods.eaten === "undefined") {
        Vue.set(that.foods, "eaten", {});
      }
      
      if (typeof that.foods.settings === "undefined") {
        Vue.set(that.foods, "settings", { calorieLimit: 0 });
      }
    });
  },
  methods: {
    removeEatenFood: function (foodIndexToRemove) {
      this.foods.eaten[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].foodsEatenToday.splice(foodIndexToRemove, 1);
    },
    addEatenFood: function (selectedFood) {
      if(this.foods.eaten[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)] === undefined) {
        Vue.set(this.foods.eaten, Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp), {
          calorieLimitToday: this.foods.settings.calorieLimit, 
          foodsEatenToday: []
        });
      }
      
      if(this.foods.eaten[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].calorieLimitToday === 0) {
        this.foods.eaten[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].calorieLimitToday = this.foods.settings.calorieLimit;
      }

      this.foods.eaten[Vue.GetDateStampFromDateTimeStamp(this.selectedDateStamp)].foodsEatenToday.push({name: selectedFood.name, calories: selectedFood.calories, amount: 1});
      this.tab = 1;
    },
    removeSavedFood: function (foodIndexToRemove) {
      this.foods.saved.splice(foodIndexToRemove, 1);
    },
    addSavedFood: function () {
      this.foods.saved.push({name: "", calories: 0});
    },
    sortSavedFoods: function () {
      this.foods.saved.sort(function (a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    }
  },
  watch: {
    foods: {
      handler: function (val, oldVal) {
        request("POST", "https://slimy-carpenter.gomix.me/api/data", {json: val}).done(function (res) {
          if (res.statusCode >= 300) {
            alert(res.statusCode + ": " + res.body);
          }
        });
      },
      deep: true
    }
  }
});
