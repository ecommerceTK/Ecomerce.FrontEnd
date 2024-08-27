import { createRouter, createWebHistory } from 'vue-router';

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
                    component: () => import('../views/customer/Home'),
                },
                {
                    path: '/search',
                    name: 'Search',
                    component: () => import('../views/customer/Search'),
                },
                {
                    path: '/products/:id',
                    name: 'ProductDetail',
                    component: () => import('../views/customer/Product'),
                },
                {
                    path: '/cart',
                    name: 'Cart',
                    component: () => import('../views/customer/Cart'),
                },
                {
                    path: '/checkout',
                    name: 'CheckOut',
                    component: () => import('../views/customer/Checkout'),
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: () => import('../views/customer/Order'),
                },
                {
                    path: '/orderList',
                    name: 'OrderList',
                    component: () => import('../views/customer/OrderList'),
                },
                {
                    path: '/order/verify',
                    name: 'Verify',
                    component: () => import('../views/customer/Verify'),
                },
                {
                    path: '/changepassword',
                    name: 'ChangePassword',
                    component: () => import('../views/customer/ChangePassword'),
                },
                {
                    path: '/new-password',
                    name: 'NewPassword',
                    component: () => import('../views/customer/ResetPassword'),
                },
            ],
        },
        {
            path: '/seller',
            component: () => import('../components/LayoutSeller.vue'),
            children: [
                {
                    path: '/seller',
                    name: 'SellerHome',
                    component: () => import('../views/seller/Home'),
                },
                {
                    path: '/seller/order',
                    name: 'SellerOrder',
                    component: () => import('../views/seller/Order'),
                },
                {
                    path: '/seller/order/:id',
                    name: 'SellerOrderDetail',
                    component: () => import('../views/seller/OrderDetail'),
                },
                {
                    path: '/seller/product/list',
                    name: 'AllSellerProduct',
                    component: () => import('../views/seller/product/List'),
                },
                {
                    path: '/seller/product/add',
                    name: 'AddSellerProduct',
                    component: () => import('../views/seller/product/Add'),
                },
                {
                    path: '/seller/product/update/:id',
                    name: 'UpdateSellerProduct',
                    component: () => import('../views/seller/product/Update'),
                },
            ],
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/Register'),
        },
        {
            path: '/seller/profile',
            name: 'SellerProfile',
            component: () => import('../views/seller/Profile'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFound'),
        },
        {
            path: '/failPayment',
            name: 'FailPayment',
            component: () => import('../views/customer/FailPayment'),
        },
    ],
});

export default router;
