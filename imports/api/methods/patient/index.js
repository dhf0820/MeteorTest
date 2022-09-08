import { Meteor } from "meteor/meteor";
import axios from "axios";

Meteor.methods({
  async patientTestQuery(url,headers) {
    try{
      console.log(url,headers)
    const response = await axios.get(url,{headers})
    const { data } = response;
    return data;
    }catch(e){
      console.log(e)
    }
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
