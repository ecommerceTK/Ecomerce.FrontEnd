<script setup>
import { SearchOutlined , ShoppingCartOutlined } from '@ant-design/icons-vue';
import { nextTick, onBeforeMount, ref, toRefs } from 'vue';
import { message } from "ant-design-vue";
import {defaultAvatar} from '../../assets';
import authServices from '../../domain/auth-services';

const user = ref(null);
let token = localStorage.getItem('token')
user.value = JSON.parse(localStorage.getItem('user'));
if (user.value && user.value.username) {
  user.value.username = user.value.username.split('@')[0];
}
const logout = async() => {
    //console.log({token});
    try {
        const res = await authServices.logOut({token});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.info('Đăng xuất thành công');
        user.value = null;
    } catch(err) {
        console.log(err);
        // message.error(err.response.data.message);
    }
}
</script>
<template>
    <header class="h-[var(--header-height)] px-[84px] bg-[linear-gradient(var(--primary-color),#03bd63ee)]">
        <nav class="flex justify-between">
            <ul>
                <li class="separate">Trang bán hàng</li>
                <li >Trang Admin</li>
            </ul>
            <ul v-if="!user">
                <li class="separate">
                    <router-link to="/login">Đăng nhập</router-link>                   
                </li>
                <li >
                    <router-link to="/register">Đăng kí</router-link>              
                </li>
            </ul>
            <ul 
            v-if="user" 
            class="relative toinfo"
            >
                <li class="flex items-center gap-3">
                    <img 
                    :src="defaultAvatar" alt=""
                    class="w-[28px] rounded-full"
                    >
                    <span class="text-white">{{user?.username}}</span>
                </li>
                <li class="absolute top-10 right-[80px] z-10 info hidden w-[166px]">
                    <ul class="flex-col bg-white rounded overflow-hidden">
                        <li class="hover:bg-[var(--primary-color)] p-1 px-6">Order</li>
                        <li class="hover:bg-[var(--primary-color)] p-1 px-6">Profile</li>
                        <li class="hover:bg-[var(--primary-color)] p-1 px-6">
                            <router-link :to="{name: 'ChangePassword'}">Change Password</router-link>      
                        </li>
                        <li 
                        class="hover:bg-[var(--primary-color)] p-1 px-6"
                        @click="logout"
                        >Log out</li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="flex items-center justify-between h-[var(--header-search-height)] pb-6">
            <router-link to="/">
                <img class="w-[145px]" src="../../assets/logo.png" alt="">
            </router-link>
            <div class="flex items-center flex-1 bg-white p-2 rounded max-w-6xl">
                <input type="text" placeholder="Tìm sản phẩm ở đây" class="pl-5 w-80 h-full text-2xl">
                <div class="hover:bg-green-500 px-10 py-4 bg-[var(--primary-color)] rounded ml-auto">
                    <SearchOutlined class="text-white searchicon"/>
                </div>
            </div>
            <div class="relative mr-[86px] z-0">
                <router-link to="/cart">
                    <ShoppingCartOutlined class="carticon"/>             
                </router-link>
                <span class="absolute top-[-8px] right-[-8px] text-white text-xl px-3 py-1 bg-[var(--primary-color)] rounded-full	">3</span>
            </div>
        </div>
    </header>
</template>
<style scoped src="./navbar.scss">
</style>