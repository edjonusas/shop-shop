import Vue from "vue";

Vue.filter("dateFilter", function(value, format = "date") {
  const options = {};
  if (format.includes("date")) {
    options.year = "numeric";
    options.month = "long";
    options.day = "2-digit";
  }
  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    // options.second = "2-digit";
  }
  return new Intl.DateTimeFormat("en-EN", options).format(new Date(value));
});
