import { createPinia } from "pinia";
import { Dialog, Notify, Quasar } from "quasar";
import iconSet from "quasar/icon-set/svg-fontawesome-v6";
import { createApp } from "vue";
import App from "./App.vue";

// Import icon libraries
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/roboto-font/roboto-font.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "./assets/base.css";
import "./assets/main.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js

const myApp = createApp(App);

myApp
  .use(Quasar, {
    plugins: { Notify, Dialog }, // import Quasar plugins and add here
    iconSet: iconSet,
    config: {
      notify: {
        color: "primary",
        group: false,
        position: "top-right",
      },
      extras: ["material-icons", "fontawesome-v6"],
    },
  })
  .use(createPinia());

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
