<template>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="handleSubmit" class="form-login col-md-6">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="first_name" class="form-label">First Name:</label>
        <input
          id="first_name"
          type="text"
          class="form-control"
          v-model="firstName"
        />
      </div>
      <div class="mb-3">
        <label for="last_name" class="form-label">Last Name:</label>
        <input
          id="last_name"
          type="text"
          class="form-control"
          v-model="lastName"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>
  
  <script>
import { ref} from "vue";
import axios from "../axios";
import { useRouter } from "vue-router";

export default {
  name: "SignUp",
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const router = useRouter()

    function handleSubmit() {
      const formData = {
        email: email.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
      };

      axios
        .post("/api/accounts/signup/", formData)
        .then((response) => {
          console.log(response.data); // handle success here
          router.push('/')
        })
        .catch((error) => {
          console.error(error); // handle error here
        });
    }

    return {
      email,
      password,
      firstName,
      lastName,
      handleSubmit,
    };
  },
};
</script>
  