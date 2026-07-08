import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AddPostitView from '../views/AddPostitView.vue'
import DetailView from '../views/DetailView.vue'
import UpdateView from '../views/UpdateView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/ajouter',
            name: 'ajouter',
            component: AddPostitView
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
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ]
})

export default router
