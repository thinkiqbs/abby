<template>
  <layout>
    <template #header>
      <Navbar v-if="!showNavbar" class="navbar-fixed-top"></Navbar>
      <!-- <a href="#" @click="toggleSidenav" class="btn btn-success" type="link">Toggle Sidenav</a> -->
    </template>



    <router-view></router-view>

    <template #footer>
      <footerComponent></footerComponent>
    </template>
  </layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import Navbar from "@/components/Navbar";
import footerComponent from "@/components/footer.vue";

export default {
  name: "App",
  components: {
    Layout,
    Navbar,
    footerComponent,
  },
  data() {
    return {
      showSidenav: true,
    };
  },
  computed: {
    showNavbar() {
      return this.$route.meta.hideNavbar;
    },
  },
  watch: {
    $route(to) {
      this.showSidenav = !to.meta.hideSideBar;
    },
  },
  methods: {
    toggleSidenav() {
      this.showSidenav = !this.showSidenav;
    },
  },
};
</script>
