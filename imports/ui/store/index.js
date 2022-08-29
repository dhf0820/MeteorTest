import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    response: null,
    allowHeader: false,
    allowCookies: false,
    headerChoice: 0,
    headers: {},
  },
  getters: {},
  mutations: {
    SET_RESPONSE(state, res) {
      state.response = res;
    },
    TOGGLE_HEADERS(state) {
      let switchedValue = !state.allowHeader;
      state.allowHeader = switchedValue;
      if (switchedValue) {
        Vue.prototype.$axios.defaults.headers.common = { ...state.headers };
      } else {
        Vue.prototype.$axios.defaults.headers.common = null;
      }
    },
    TOGGLE_COOKIES(state) {
      let switchedValue = !state.allowCookies;
      state.allowCookies = switchedValue;
      if (switchedValue) {
        Vue.prototype.$axios.defaults.withCredentials = true;
      } else {
        Vue.prototype.$axios.defaults.withCredentials = false;
      }
    },
    async SET_HEADER(state, header) {
      state.headers[header.head] = header.value;
      state.allowHeader = false;
      setTimeout(() => null, 50);
      handleAxiosHeader(state.headerChoice, state.headers);
    },
    SET_HEADER_CHOICE(state, value) {
      state.headerChoice = value;
      setTimeout(() => null, 50);
      handleAxiosHeader(state.headerChoice, state.headers);
    },
  },
  actions: {
    setResponse({ commit }, data) {
      commit("SET_RESPONSE", data);
    },
    setHeader({ commit }, data) {
      console.log("set header", data);
      commit("SET_HEADER", data);
    },
    toggleHeaders({ commit }) {
      commit("TOGGLE_HEADERS");
    },
    toggleCookies({ commit }) {
      commit("TOGGLE_COOKIES");
    },
    setHeaderChoice({ commit }, value) {
      commit("SET_HEADER_CHOICE", value);
    },
    checkHeaders() {
      handleAxiosHeader();
    },
  },
  modules: {},
});

const handleAxiosHeader = async (choice, headers) => {
  console.table({
    choice,
    headers,
  });
  switch (choice) {
    case 0:
      Vue.prototype.$axios.defaults.headers.common = {};
      break;
    // case 1:
    //   Vue.prototype.$axios.defaults.headers.common = {};
    //   console.log("auth value", headers["Authorization"]);
    //   Vue.prototype.$axios.defaults.headers.common["Authorization"] =
    //     headers["Authorization", "PatientId"];
    //   break;
    case 1:
      Vue.prototype.$axios.defaults.headers.common = {};
      console.log("auth value", headers["Authorization"]);
      Vue.prototype.$axios.defaults.headers.common["Authorization"] =
        headers["Authorization"];
      Vue.prototype.$axios.defaults.headers.common["PatientId"] =
        headers["PatientId"];
      // Vue.prototype.$axios.defaults.headers.common["Authentication"] =
      //   headers["Authentication"];
      break;
    case 2:
      Vue.prototype.$axios.defaults.headers.common = { ...headers };
      // Vue.prototype.$axios.defaults.headers.common["Authorization"] = null;
      delete Vue.prototype.$axios.defaults.headers.common["Authorization"];
      break;
    case 3:
      console.log("all headers", headers);
      Vue.prototype.$axios.defaults.headers.common = { ...headers };
      break;
    default:
      console.log("wrong axios choice");
      break;
  }
  console.log(
    "axios headers now",
    Vue.prototype.$axios.defaults.headers.common
  );
};
