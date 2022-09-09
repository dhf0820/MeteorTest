<template>
  <div>
    <div>
      <!-- <div class="radio-box">
        <h4>Query with</h4>
        <div>
          <label for="use-url">Url</label
          ><input type="radio" id="use-url" :value="0" v-model="queryChoice" />
        </div>
        <div>
          <label for="use-header">Header</label
          ><input
            type="radio"
            id="use-header"
            :value="1"
            v-model="queryChoice"
          />
        </div>
      </div> -->
      <form @submit="patientWithId">
        <div class="input-div">
          <label for="search">Patient ID:</label>
          <input type="text" name="search" id="search" v-model="patientId" />
          <button type="submit" class="search-btn">Search</button>
        </div>
      </form>
      <form @submit="patientWithQuery">
        <div class="input-div">
          <label for="search">Query:</label>
          <input type="text" name="search" id="search" v-model="query" />
          <button type="submit" class="search-btn">Search</button>
        </div>
      </form>

      <small
        ><b
          >URL or Header will be set appropirately automatically be set based on
          Header Choice above</b
        ></small
      >

      <div v-if="status" class="status-box">
        <p>
          {{ status }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const BASE_END_POINT = "Patient";
export default {
  props: {
    selectedSystem: Object,
  },
  data: () => ({
    query: null,
    idQuery: null,
    rawQuery: null,
    queryChoice: 0,
    patientId: "",
    results: [],
    status: null,
  }),
  watch: {
    headerChoice(value) {
      this.generateQuery(value);
    },
    query() {
      this.generateQuery(this.headerChoice);
    },
    patientId() {
      this.generateQuery(this.headerChoice);
    },
  },
  computed: {
    headerChoice() {
      return this.$store.state.headerChoice;
    },
  },
  mounted() {
    this.generateQuery(this.headerChoice);
  },
  methods: {
    async patientWithId(e) {
      /* try {
        e.preventDefault();
        this.$store.dispatch("setResponse", {});
        // const url = `Patient?system=${this.selectedSystem.id}&Patient:${this.patientId}`;
        const res = await this.$axios.get(this.idQuery);
        this.$store.dispatch("setResponse", { ...res.data });
        console.log(res);
      } catch (e) {
        console.log("error in patient with id");
        const error = e.data ? { ...e.data.response } : { ...e };
        this.$store.dispatch("setResponse", { ...error });
        console.log(error);
      } */
      try {
        e.preventDefault();
        this.$store.dispatch("setResponse", {});
        console.log('debugging', this.$store.state)
        const getPatients = function(ucUrl,query,headers) {
          return new Promise(function(resolver,reject){
          Meteor.call('patientTestQuery', `${ucUrl}/${query}`, headers, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const res = await getPatients(this.$store.state.ucUrl,this.patientId,this.$store.state.headers);
        console.log(res)
        this.$store.dispatch("setResponse", {url:`${this.$store.state.ucUrl}/${this.patientId}`, res});
        console.log(res);
      } catch (e) {
        console.log("error in patient with query");
        const error = e.data ? { ...e.data.response } : { ...e };
        this.$store.dispatch("setResponse", { ...error });
        console.log(e);
      }
    },
    async patientWithQuery(e) {
      try {
        e.preventDefault();
        this.$store.dispatch("setResponse", {});
        console.log('debugging', this.$store.state)
        const getPatients = function(ucUrl,query,headers) {
          return new Promise(function(resolver,reject){
          Meteor.call('patientTestQuery', `${ucUrl}/${query}`, headers, (error, result) => {
            if(error)reject(error);
            resolver(result)
          });
        })
        }
        const res = await getPatients(this.$store.state.ucUrl,this.query,this.$store.state.headers);
        console.log(res)
        this.$store.dispatch("setResponse", {url:`${this.$store.state.ucUrl}/${this.query}`, res});
        console.log(res);
      } catch (e) {
        console.log("error in patient with query");
        const error = e.data ? { ...e.data.response } : { ...e };
        this.$store.dispatch("setResponse", { ...error });
        console.log(e);
      }
    },
    generateQuery(val) {
      console.log("generating", val);
      let value = val || this.headerChoice;
      let _IDquery = "";
      let _rawQuery = "";
      switch (value) {
        case 0:
        case 1:
          // with URL
          console.log("with URL");
          _IDquery = `${BASE_END_POINT}?system=${this.selectedSystem.id}&ID=${this.patientId}`;
          _rawQuery = `${BASE_END_POINT}?system=${this.selectedSystem.id}&${this.query}`;
          break;
        case 2:
        case 3:
          //with header
          console.log("with header");
          _IDquery = `${BASE_END_POINT}/${this.patientId}`;
          _rawQuery = `${BASE_END_POINT}?${this.query}`;
          break;
      }
      this.idQuery = _IDquery;
      this.rawQuery = _rawQuery;
      console.table({
        id: this.idQuery,
        raw: this.rawQuery,
      });
    },
  },
};
</script>

<style>
.search-btn {
  border: none;
  outline: none;
  border: 1px solid #4f7942;
  cursor: pointer;
  background: #7cfc00;
  border-radius: 5px;
  padding: 10px 50px;
  margin-bottom: 10px;
  width: 310px;
}
.search-btn:hover {
  background: #4f7942;
  color: #fff;
}
.input-div {
  display: flex;
  justify-content: center;
  text-align: start;
  align-items: center;
}

.input-div :first-child {
  flex: 0 0 75px;
}

.input-div > * {
  flex: 0 0 250px;
}

.input-div input {
  padding: 8px 5px;
}
</style>
