import axios from "axios";
const BASE_URL = Meteor.settings.private.VUE_APP_BASE_URL;
axios.defaults.baseURL = BASE_URL;

export default axios
