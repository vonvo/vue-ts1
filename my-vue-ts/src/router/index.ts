import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/add',
      name: 'addNote',
      component: () => import('../views/AddNoteView.vue')
    },
    
  ],
})

export default router
