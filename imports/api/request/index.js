import axios from "axios";
const BASE_URL = process.env.LOGIN_BASE_URL;
axios.defaults.baseURL = BASE_URL;
export default axios
