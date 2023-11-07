import { createApp } from "vue";
import App from "./App.vue";
import { store } from "Checkout/store";

const app = createApp(App);
app.use(store);
app.mount("#app");
