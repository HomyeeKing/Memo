import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/main.styl'
import '@/css/reset.styl'
import axios from 'axios'
import { baseURL } from '@/utils/req.js'
// UI
import vuetify from './plugins/vuetify'

import 'element-ui/lib/theme-chalk/index.css'
import { Pagination } from 'element-ui'
console.log(process.env.BASE_URL)
Vue.use(Pagination)
// axios
const instance = axios.create({
	baseURL
})

Vue.config.productionTip = false
Vue.prototype.$http = instance

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount('#app')
