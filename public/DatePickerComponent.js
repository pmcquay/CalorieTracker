Vue.component("date-picker", {
  props: ["value"], //prop must be called value because v-model is syntax sugar and uses this name.
  data: function() {
    return { selectedDateStamp: this.value }; //cant mutate a prop, so internally we make it a data attribute, and then mutate that.
  },
  template:
    "<div class='plainContainer'>" +
      "<button v-on:click='decrement'><i class='fa fa-arrow-left'></i></button>" +
      " {{formattedSelectedDate}} " +
      "<button v-on:click='increment'><i class='fa fa-arrow-right'></i></button>" +
    "</div>",
  methods: {
    increment: function () {
      this.selectedDateStamp = Vue.DateTimeStampAdd(this.selectedDateStamp, 1, "days");
      this.$emit('input', this.selectedDateStamp); //v-model requires us to emit input events to update the parent object
    },
    decrement: function () {
      this.selectedDateStamp = Vue.DateTimeStampSubtract(this.selectedDateStamp, 1, "days");
      this.$emit('input', this.selectedDateStamp);
    }
  },
  computed: {
    formattedSelectedDate: function() {
      return Vue.DateTimeStampFormat(this.selectedDateStamp, "YYYY-MM-DD");
    }
  }
});
