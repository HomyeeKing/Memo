import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/scss/_common.scss';
import '@/assets/scss/reset.scss';
createApp(App)
    .use(router)
    .mount('#app');
