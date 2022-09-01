<template>
  <div>
    <div class="login-form">
      <form @submit="(e) => e.preventDefault()">
        <div class="form-box">
          <div class="input-box">
            <label for="username">Username</label>
            <input
              type="text"
              placeholder="Please enter your username"
              id="email"
              v-model="formData.username"
            />
          </div>
          <div class="input-box">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Please enter your password"
              id="passowrd"
              v-model="formData.password"
            />
          </div>
          <!-- <div>
            <button
              class="header-button"
              type="button"
              :class="allowHeader ? 'on' : 'off'"
              @click="handleHeaderToggle"
            >
              {{ allowHeader ? "Headers are ON!" : "Headers are OFF!" }}
            </button>
            <br />
            <button
              class="header-button"
              type="button"
              :class="allowCookies ? 'on' : 'off'"
              @click="handleCookiesToogle"
            >
              {{ allowCookies ? "Cookies are ON!" : "Cookies are OFF!" }}
            </button>
            <br />
            <small>Press to toggle</small>
          </div> -->

          <div class="radio-box">
            <div>
              <label for="no-header">No Headers</label
              ><input
                type="radio"
                id="no-header"
                :value="0"
                v-model="headerChoice"
              />
            </div>

            <div>
              <label for="auth-header">Auth Header Only</label>
              <input
                type="radio"
                id="auth-header"
                :value="1"
                v-model="headerChoice"
              />
            </div>

            <div>
              <label for="other-headers">Other Headers Only</label>
              <input
                type="radio"
                id="other-headers"
                :value="2"
                v-model="headerChoice"
              />
            </div>

            <div>
              <label for="all-headers">All Headers</label>
              <input
                type="radio"
                id="all-headers"
                :value="3"
                v-model="headerChoice"
              />
            </div>
          </div>
          <div class="input-box">
            <button type="button" @click="handlePostLogin">
              Login with POST
            </button>
            <button type="button" @click="handleGetLogin">
              Login with GET
            </button>
          </div>
        </div>
      </form>
    </div>
    <div>
      {{ status }}
    </div>
    <div>
      <FacilitiesBox v-if="facilitues" :facilitues="facilitues" />
    </div>
    <!-- <div>
      <button @click="patientTestQuery">
        Patient With system (with family & given) in query
      </button>
    </div>
    <div>
      <button @click="onePatientTestQuery">
        Patient With system (Patient:12742661) in query
      </button>
    </div>
    <div>
      <button @click="onePatientWithHeader">
        Patient (Patient:12742661) With Fhir-System in header
      </button>
    </div> -->

    <div>
      <button type="button" @click="() => (showResponse = !showResponse)">
        Toggle Response
      </button>
      <button type="button" @click="handleClearResponse">Clear Response</button>
    </div>
    <div v-if="showResponse">
      <ResponseBox />
    </div>
  </div>
</template>

<script>
import ResponseBox from "./ResponseBox.vue";
import FacilitiesBox from "./FacilitiesBox.vue";
export default {
  components: { ResponseBox, FacilitiesBox },
  computed: {
    response() {
      return this.$store.state.response;
    },
    allowHeader() {
      return this.$store.state.allowHeader;
    },
    allowCookies() {
      return this.$store.state.allowCookies;
    },
    savedHeaders() {
      return this.$store.state.headers;
    },
  },
  data: () => ({
    formData: {
      username: "dhfrench@vertisoft.com",
      password: "password",
    },
    user: null,
    status: null,
    showResponse: true,
    facilitues: null,
    headerChoice: 0,
  }),

  watch: {
    headerChoice(value) {
      console.log("header choice changed", value);
      this.$store.dispatch("setHeaderChoice", value);
    },
  },

  methods: {
    async handleHeaderToggle() {
      await this.$store.dispatch("toggleHeaders");
    },
    async handleCookiesToogle() {
      await this.$store.dispatch("toggleCookies");
    },
    async handleClearResponse() {
      await this.$store.dispatch("setResponse", {});
    },
    /*async patientTestQuery() {
      try {
        const url =
          "Patient?system=62f1c5dab3070d0b40e7aac1&family=smart&given=na";
        const patientQueryPromise = function(url) {
          return new Promise((resolver,reject)=>{
          Meteor.call('patientTestQuery', url, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const data = await patientQueryPromise(url)
        console.log(data);
        this.$store.dispatch("setResponse", { ...data });
      } catch (e) {
        this.$store.dispatch("setResponse", { ...e });
        console.log(e);
      }
    },
     async onePatientTestQuery() {
      try {
        const url = "Patient?system=62f1c5dab3070d0b40e7aac1&Patient:12742661";
        const onePatientQueryPromise = function(url) {
          return new Promise((resolver,reject)=>{
          Meteor.call('onePatientTestQuery', url, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const data = await onePatientQueryPromise(url)
        this.$store.dispatch("setResponse", { ...data });
        console.log(data);
      } catch (e) {
        console.log("error in one patient");
        this.$store.dispatch("setResponse", { ...e });
        console.log(this.$store.state.response);
        console.log(e);
      }
    },
    async onePatientWithHeader() {
      try {
        const url = "Patient?&Patient:12742661";
        const onePatientHeaderPromise = function(url) {
          return new Promise((resolver,reject)=>{
          Meteor.call('onePatientTestQuery', url, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const data = await onePatientHeaderPromise("62f1c5dab3070d0b40e7aac1",url)
        this.$store.dispatch("setResponse", { ...data });
        console.log(res);
      } catch (e) {
        console.log("error in one patient");
        this.$store.dispatch("setResponse", { ...e });
        console.log(this.$store.state.response);
        console.log(e);
      }
    }, */

    async handlePostLogin() {
      try {
        this.status = "Logging in wtih POST...";
        this.$store.dispatch("setResponse", {});
        const postLogin = function(username, password) {
          return new Promise((resolver,reject)=>{
          Meteor.call('loginPost', username, password, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const data = await postLogin(this.formData.username,this.formData.password)
        this.user = data;
        this.status = "Logged in successfully!";
        this.$store.dispatch("setResponse", data);
        this.facilitues = data?.facilitues;
        const token = data.token;
        this.$store.dispatch("setHeader", {
          head: "PatientId",
          value: token,
        });
        this.$store.dispatch("setHeader", {
          head: "Authorization",
          value: token,
        });
        this.$store.dispatch("setHeader", {
          head: "Authentication",
          value: token,
        });
      } catch (e) {
        this.status = "Error occured, check the response!";
        console.log("error while logging in");
        console.log(e);
        this.$store.dispatch("setResponse", { ...e });
      }
    },
    async handleGetLogin() {
      try {
        this.status = "Logging in with GET...";
        this.$store.dispatch("setResponse", {});
        const getLogin = function(username, password) {
          return new Promise((resolver,reject)=>{
          Meteor.call('loginGet', username, password, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const data = await getLogin(this.formData.username,this.formData.password)
        this.user = data;
        this.status = "Logged in successfully!";
        this.$store.dispatch("setResponse", data);
        this.facilitues = data?.facilitues;
        const token = data.token;
        this.$store.dispatch("setHeader", {
          head: "PatientId",
          value: token,
        });
        this.$store.dispatch("setHeader", {
          head: "Authentication",
          value: token,
        });
        // this.$cookies.set = ("uc_token", token);
      } catch (e) {
        this.status = "Error occured, check the response!";
        console.log("error while logging in");
        console.log(e);
        this.$store.dispatch("setResponse", { ...e });
      }
    },
  },
};
</script>

<style lang="css">
.login-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

label {
  margin-right: 50px;
}
.form-box {
  display: flex;
  flex-direction: column;
}
button {
  margin: 10px 5px;
  padding: 8px 5px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border-color: #ccc;
}

.on {
  border-color: green;
  background: greenyellow;
}
.off {
  border-color: red;
  background: tomato;
}

.radio-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: 10px auto;
  background: #ccc;
  padding: 10px 0;
  padding-left: 10px;
  padding-right: 100px;
}

.radio-box > div {
  display: flex;
  justify-content: start;
  /* background-color: red; */
}
.radio-box > div > * {
  text-align: start;
  flex: 0 0 150px;
}
</style>
