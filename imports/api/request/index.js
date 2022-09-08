import axios from "axios";
const BASE_URL = Meteor.settings.private.LOGIN_POST_BASE_URL;
axios.defaults.baseURL = BASE_URL;
export default axios
