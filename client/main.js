import Vue from "vue";
import router from "../imports/ui/router";
import store from "../imports/ui/store";
import VueCookies from "vue-cookies";
import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

Vue.config.productionTip = false;

Vue.use(VueCookies, { expire: "7d" });

Meteor.startup(() => {
  new Vue({
    router,
    store,
    render: function (h) {
      return h(App);
    },
  }).$mount("#app");
})
