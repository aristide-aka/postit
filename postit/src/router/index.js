import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DetailView from '../views/DetailView.vue'
import UpdateView from '../views/UpdateView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/a-propos',
            name: 'about',
            component: AboutView
        },
         {
            path: '/detail/:id',
            name: 'detail',
            component: DetailView
         },
         {
            path: '/modifier/:id',
            name: 'modifier',
            component: UpdateView
         }
    ]
})

export default router