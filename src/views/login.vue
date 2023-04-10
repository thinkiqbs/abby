<template>
  <div class="login-container">
    <div class="row justify-content-center">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title mb-4">Login</h3>
          <form @submit.prevent="handleSubmit" class="login-form ">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import axios from "../axios";
//   import router from '../router';

export default {
  name: "LoginView",
  setup() {
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      try {
        const response = await axios.post("/api/accounts/login/", {
          email: email.value,
          password: password.value,
        });

        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        console.log(response.data);

        // Redirect to home page on successful login
        if (response.status === 200) {
          //   router.push('/');
          window.location.replace("/");
        }
      } catch (error) {
        console.error(error);
        // Alert the user if the response is 400
        if (error.response && error.response.status === 400) {
          alert(error.response.data.detail);
        }
      }
    };

    return { email, password, handleSubmit };
  },
};
</script>
  