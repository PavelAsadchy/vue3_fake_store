import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { useAuthStore } from '@/stores/auth.store'
import { checkLocalValue } from '@/utils/index'
import { LOCAL_VALUE_KEY, MOCKED_USER_DATA } from '@/consts/index'

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
      component: HomePage,
      beforeEnter: () => {}
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
  const authStore = useAuthStore()
  if (
    // make sure the user is authenticated
    !authStore.isAuthenticated &&
    // Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }

  if (!authStore.user && to.name !== 'Login') authStore.getUser(MOCKED_USER_DATA.id)
})

export default router
