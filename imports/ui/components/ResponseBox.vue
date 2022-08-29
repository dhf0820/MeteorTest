<template>
  <div>
    <div v-if="response">
      <h4>Response:</h4>
      <pre class="json-box">
        {{
          response === "Network Error" ? `${response} (CORS Error)` : response
        }}
    </pre
      >
    </div>
    <div v-else>
      <h4>Response will be visible here</h4>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    response() {
      return this.$store.state.response;
    },
  },
};
</script>

<style>
.json-box {
  background: #c4c4c4;
  width: 80%;
  margin: auto;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
