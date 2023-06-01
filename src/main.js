import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from "axios";

Vue.config.productionTip = false
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('authorization');
    return config;
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
