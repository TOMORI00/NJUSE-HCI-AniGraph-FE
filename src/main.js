import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;
Vue.directive("title", {
    inserted: function (el) {
        document.title = el.dataset.title;
    }
});

new Vue({
    render: h => h(App),
    router,
}).$mount("#app");
