import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue')
    },
    {
      path: '/portfolioAdminView',
      name: 'portfolioAdminView',
      component: () => import('../views/PortfolioAdminView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/portfolioDetailView/:id',
      name: 'portfolioDetailView',
      component: () => import('../views/PortfolioDetailView.vue')
    }    
    
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth){
    onAuthStateChanged(auth, (user) => {
      if (user){
        next();
      } 
      else {
        next('/');
      }
    });

  }
  else {
    next();
  }
  }
)

export default router
