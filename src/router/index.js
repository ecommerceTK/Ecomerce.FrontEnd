import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../components/LayoutRoot.vue'),
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: () => import('../views/home/Home.vue'),
                },               
                {
                    path: '/products/detail',
                    name: 'ProductDetail',
                    component: () => import('../views/product/Product.vue'),
                },               
                {
                    path: '/cart',
                    name: 'Cart',
                    component: () => import('../views/cart/Cart.vue'),
                },               
                {
                    path: '/checkout',
                    name: 'CheckOut',
                    component: () => import('../views/checkout/CheckOut.vue'),
                },               
                {
                    path: '/order',
                    name: 'Order',
                    component: () => import('../views/order/Order.vue'),
                },               
                {
                    path: '/changepassword',
                    name: 'ChangePassword',
                    component: () => import('../views/changepassword/ChangePassword.vue'),
                },               
                {
                    path: '/new-password',
                    name: 'NewPassword',
                    component: () => import('../views/resetpassword/ResetPassword.vue'),
                }
                
            ] 
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/login/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/register/Register.vue')
        },
        {
            path:'/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/notfound/404.vue')
        }
    ]
})

export default router