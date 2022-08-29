import { Meteor } from "meteor/meteor";
import axios from "../../request";

Meteor.methods({
  async patientTestQuery(url) {
    const res = await axios.get(url);
    const { data } = res;
    return data;
  },
  async onePatientTestQuery(url) {
    const res = await axios.get(url);
    const { data } = res;
    return data;
  },
  async onePatientWithHeader(fhirSystem,url){
    axios.defaults.headers.common["FhirSystem"] = fhirSystem;
    const res = await axios.get(url);
    const { data } = res;
    console.log(res);
    return data;
  }
});
