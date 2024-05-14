import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTokenStore } from './store/useTokenStore';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Procedure from './views/Procedure.vue';
import Department from './views/Department.vue';
import Employee from './views/Employee.vue';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            isGuest: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            isGuest: true
        }
    },
    {
        path: '/procedures',
        name: 'Procedure',
        component: Procedure,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/departments',
        name: 'Department',
        component: Department,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/employees',
        name: 'Employee',
        component: Employee,
        meta: {
            requiresAuth: true
        }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!useTokenStore().token) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    }else if (to.matched.some(record => record.meta.isGuest)){
        if (useTokenStore().token) {
            next({
                path: '/',
            })
        } else {
            next()
        }
    }
     else {
        next() // make sure to always call next()!
    }
})

export default router;