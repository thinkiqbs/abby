@<template>
  <div>
    <h4>mambo iko sawa</h4>
    <div>
      <p>Verification code: {{ code }}</p>
      <button @click="confirmEmail">Confirm Email</button>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
export default {
  name: "SignupVerify",
  props: {
    code: {
      type: String,
      required: true,
    },
  },

  methods: {
    async confirmEmail() {
      try {
        const response = await axios.get(
          `/api/accounts/signup/verify/?code=${this.code}`
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
</style>