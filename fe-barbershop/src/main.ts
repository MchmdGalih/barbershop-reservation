import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./config/pinia";
import { Icon } from "@iconify/vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("Icon", Icon);
app.use(Vue3Toastify, {
  autoClose: 1500,
});

app.mount("#app");
