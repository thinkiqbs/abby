// import Vue and App component
import { createApp } from "vue";
import App from "./App.vue";

// import axios instance
import axios from "./axios";

// import router
import router from "./router";

// import bootstrap css and js
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./assets/style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";




// import Popper.js
import { createPopper } from "@popperjs/core";

// create app instance
const app = createApp(App);

// use router and axios instance in app instance
app.use(router);
app.config.globalProperties.$http = axios;

// mount app instance to the DOM
app.mount("#app");

// Example usage of Popper.js
const button = document.querySelector("#my-button");
const tooltip = document.querySelector("#my-tooltip");
createPopper(button, tooltip, {
  placement: "bottom",
});
