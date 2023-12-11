import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { useAppStore } from '@/stores/app.store'
import { checkLocalValue } from '@/utils/index'
import { LOCAL_VALUE_KEY } from '@/consts/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, _from) => {
        if (checkLocalValue(LOCAL_VALUE_KEY.AUTH)) return { name: 'Home' }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, _from) => {
  const appStore = useAppStore()
  if (
    // make sure the user is authenticated
    !appStore.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router
