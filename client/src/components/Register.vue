<template>
  <div>
    <h1>Register</h1>

    <div class="box">
      <input
        type="email"
        name="email"
        v-model="email"
        placeholder="Your email"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"
      />
      <div v-html="error" class="error" />
      <br />
      <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  watch: {
    // email(value) {
    //   console.log("Email changed", value);
    // },
    // password(value) {
    //   console.log("Password changed", value);
    // }
  },
  mounted() {
    // setTimeout(() => {
    //   this.email = "hello world";
    // }, 2000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.error {
  color: rgb(223, 87, 87);
}
</style>
