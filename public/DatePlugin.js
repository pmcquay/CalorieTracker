Vue.use({
  install: function (vue, options) {
    vue.DateTimeStampNow = function () {
      return moment().unix() + moment().utcOffset() * 60;
    };

    vue.DateTimeStampAdd = function (dateTimeStamp, number, unit) {
      return moment.unix(dateTimeStamp).add(number, unit).unix();
    };

    vue.DateTimeStampSubtract = function (dateTimeStamp, number, unit) {
      return moment.unix(dateTimeStamp).subtract(number, unit).unix();
    };

    vue.DateTimeStampFormat = function (dateTimeStamp, formatString) {
      return moment.unix(dateTimeStamp).format(formatString)
    };

    vue.GetDateStampFromDateTimeStamp = function (dateTimeStamp) {
      return Math.floor(dateTimeStamp / 86400);
    };
  }
});
