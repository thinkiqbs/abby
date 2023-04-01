import { createApp } from 'vue'
import App from './App.vue'
import Layout from './components/Layout.vue';

createApp(App).use(router).mount('#app').use(Layout);
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'
