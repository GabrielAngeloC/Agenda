import { createRouter, createMemoryHistory } from 'vue-router'; 
import HomePage from '../Pages/HomePage.vue';

const router =createRouter({
    history: createMemoryHistory(),
    routes:
    [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/form-task',
        component: () => import('../components/FormTask.vue')
    }
    ],
});

export default router;