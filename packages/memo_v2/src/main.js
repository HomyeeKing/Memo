import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/css/main.styl';
import '@/css/reset.styl';
import axios from 'axios';

// UI
import vuetify from './plugins/vuetify';

import 'element-ui/lib/theme-chalk/index.css';
import { Pagination } from 'element-ui';

Vue.use(Pagination);

// axios
const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

Vue.config.productionTip = false;
Vue.prototype.$http = instance;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
