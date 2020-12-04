import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import computerEng from '../views/computerEng.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/kaoyan',
        name: 'kaoyan',
        component: () => import('@/views/kaoyan'),
    },
    {
        path: '/computerEng',
        name: 'computerEng',
        component: computerEng,
    },
    {
        path: '/createCards',
        name: 'createCards',
        component: () => import('@/views/createCards'),
    },
    {
        path: '/learn/:currentPage/:range/:which',
        name: 'learnWord',
        component: () => import('@/views/learn'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
