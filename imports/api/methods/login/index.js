import { Meteor } from "meteor/meteor";
import axios from "../../request";

Meteor.methods({
  async loginGet(username, password) {
    const res = await axios.get(
      `/login?userName=${username}&password=${password}`
    );
    const { data } = res;
    return data;
  },
  async loginPost(username, password) {
    const res = await axios.post("/auth/authorize", {
      username: username,
      password: password
    });
    const { data } = res;
    return data;
  },
});
