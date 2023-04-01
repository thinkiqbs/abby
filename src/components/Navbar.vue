<template>
  <nav class="container navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{forumTitle}}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
          
          
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <form @submit.prevent="search">
              <input type="text" v-model="query" placeholder="Search..." />
              <button type="submit">Go</button>
            </form>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
  <script>
import { ref } from "vue";
export default {
  name: "NavBar",
  setup() {
    const query = ref("");
    const forumTitle =  "Abby's Math Corner";

    function search() {
      // Your search logic here, using the value of `query`
    }

    return { query, search , forumTitle };
  },
};
</script>
  
  <style scoped></style>