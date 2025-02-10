//Import tools
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user-store';
import HomeView from '@/views/HomeView.vue';

//Define the routes
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/acceder',
        name: 'Auth',
        component: () => import('@/views/AccessView.vue')
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/ResetPasswordView.vue')
    },
    {
        path: '/registro',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue')
    },
    {
        path: '/sobre-nosotros',
        name: 'About',
        component: () => import('@/views/AboutView.vue')
    },
    /* Promo routes *********************** */
    {
        path: '/promociones',
        name: 'Promo',
        component: () => import('@/views/PromoView.vue')
    },
    /* Legal routes *********************** */
    {
        path: '/terminos-condiciones',
        name: 'Terms',
        component: () => import('@/views/legal/TermAndConditionView.vue')
    },
    {
        path: '/privacidad',
        name: 'Privacy',
        component: () => import('@/views/legal/PrivacyView.vue')
    },
    /* Private routes ******************************* */
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { auth: true }
    },
    {
        path: '/registro/:plan',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue')
    },
    /* Error routes ******************************* */
    {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('@/views/ErrorView.vue')
    }
];

//Create the router
const router = createRouter({
    history: createWebHistory(),
    routes
});

//Navigation guard
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const requires_auth = to.meta.auth;

    if (userStore.token) {
        return next();
    }

    if (requires_auth) {
        await userStore.refresh_token();

        userStore.token ? next() : next({ name: 'Auth' });
        console.log(from.path);
    }

    return next();
});

//Navigation guard scroll to top
router.afterEach(() => {
    window.scrollTo(0, 0);
});

//Export the router
export default router;
