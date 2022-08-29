<template>
  <div class="">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "HomeView",
  mounted() {
    console.log("env", process.env.VUE_APP_BASE_URL);
  },
  components: {
    LoginForm,
  },
};
</script>
