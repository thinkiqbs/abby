<template>
  <nav
    class="container navbar navbar-expand-lg navbar-light bg-light header-nav"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ forumTitle }}</a>
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
            <form @submit.prevent="search" class="search-bar">
              <input type="text" v-model="query" placeholder="Search..." />
              <button type="submit">Go</button>
            </form>
          </li>
          <!-- <li class="nav-item" v-if="state.token">
            <button class="btn btn-primary" @click="logout">Logout</button>
          </li> -->

          <li class="nav-item dropdown" v-if="state.token">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bi bi-person-bounding-box"></i>Profile
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">My Account</a>
              <a class="dropdown-item" href="/messages">Messages</a>
              <a class="dropdown-item" href="#">Articles</a>
              <a class="dropdown-item" href="#" @click="logout">Logout</a>
            </div>
          </li>
          <li class="nav-item" v-else>
            <div>
              <button
                class="btn btn-primary"
                role="button"
                @click="redirectToLogin"
              >
                Login
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="redirectToSignup"
              >
                Sign Up
              </button>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>

  <div
    class="modal fade panelbox panelbox-right"
    id="sidebarPanel"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <!-- profile box -->

          <div class="col linkedin-style">
            <ul class="list-group">
              <li
                class="list-group-item card"
                v-for="recipient in uniqueRecipients"
                :key="recipient"
                @click="alertUser(recipient)"
              >
                {{ recipient }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "../axios";
import router from "../router";

export default {
  name: "NavBar",
  setup() {
    const messages = ref([]);
    const currentUser = ref({});

    const redirectToLogin = () => {
      router.push("/login");
    };

    const redirectToSignup = () => {
      router.push("/SignUp");
    };

    const state = reactive({
      token: localStorage.getItem("token"),
    });

    const alertUser = async (recipient) => {
      // alert("message " + recipient);
      const response = await axios.get(
        "/private_messages/messagesChat/" + "?receiver_id=" + recipient
      );
      messages.value = response.data;
    };

      const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/accounts/users/me/");
        currentUser.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const uniqueRecipients = computed(() => {
      const recipientIds = messages.value.map((message) => message.receiver_id);
      console.log(recipientIds);
      return [...new Set(recipientIds)];
    });


    async function getMessages() {
      const response = await axios.get("/private_messages/messagesChat/");

      messages.value = response.data//.filter(
       // (message) => message.sender_id === currentUser.value.email
      //);
    }

     onMounted(async () => {
      await fetchCurrentUser();
      await getMessages();
    });

     getMessages();

    const logout = async () => {
      try {
        localStorage.removeItem("token");
        const response = await axios.get("/api/accounts/logout/", {
          headers: {
            Authorization: `Token ${state.token}`,
          },
        });

        localStorage.setItem("logoutResponse", JSON.stringify(response.data));
        window.location.replace("/login");

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const query = ref("");
    const forumTitle = "Abby's Math Corner";

    function search() {
      // Your search logic here, using the value of `query`
    }

    return {
      messages,
      uniqueRecipients,
      alertUser,
      query,
      search,
      forumTitle,
      state,
      logout,
      redirectToLogin,
      redirectToSignup,
      router,
    };
  },
};
</script>

<style scoped>
</style>
