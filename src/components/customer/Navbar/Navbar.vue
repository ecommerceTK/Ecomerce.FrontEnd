<script setup>
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, toRefs, watch } from 'vue';
import { message } from 'ant-design-vue';
import { defaultAvatar } from '../../../assets';
import authServices from '../../../domain/authServices';
import { useAuthToken } from '../../../storage/useAuthToken';
import { useAuthUser } from '../../../storage/useAuthUser';
import { useRoute, useRouter } from 'vue-router';
import mainServices from '../../../domain/mainServices';

const { token, clearToken } = useAuthToken();
const { userStore, clearUser } = useAuthUser();
const user = JSON.parse(userStore.value);
const route = useRoute();
const router = useRouter();
const searchValue = ref('');
const searchInput = ref(null);

const cartItemCount = ref(0);

const getItemCart = async () => {
    try {
        const res = await mainServices.getItemCart();
        console.log(res);  
        cartItemCount.value = res.data?.result.length;
    } catch (err) {
        console.log(err);
    }
};

const goToSellerPage = () => {
    if (token.value) {
        if (user.roles.find(role => role.name === 'SELLER')) {
            return router.push('/seller');
        }
        return router.push({ name: 'SellerProfile' });
    } else {
        message.error('Vui lòng đăng nhập');
    }
};

const goToCart = () => {
    if(token.value) {
        return router.push({ name: 'Cart' });
    }
    return message.error('Bạn chưa đăng nhập');
}

const logout = async () => {
    //console.log({token});
    try {
        const res = await authServices.logOut({ token:token.value });
        clearToken();
        clearUser();
        message.info('Đăng xuất thành công');
        //user.value = null;
    } catch (err) {
        console.log(err);
        // message.error(err.response.data.message);
    }
};

const handleSearch = () => {
    const trimmedValue = searchValue.value.trim();
    searchInput.value.blur();

    if (trimmedValue === '') {
        message.info('Vui lòng nhập thông tin tìm kiếm');
        searchValue.value = '';
    } else {
        if (route.name === 'Search' && route.query.q === trimmedValue) {
            searchBus.emit(trimmedValue);
        } else {
            router
                .push({
                    name: 'Search',
                    query: {
                        q: trimmedValue,
                    },
                })
                .then(() => {
                    searchBus.emit(trimmedValue);
                });
        }
    }
};
onMounted(() => {
    getItemCart();
})
</script>
<template>
    <header
        class="h-[var(--header-height)] px-[84px] bg-[linear-gradient(var(--primary-color),#03bd63ee)]"
    >
        <nav class="flex justify-between">
            <ul>
                <li class="text-[#e4d5d5]" @click="goToSellerPage">Trang bán hàng</li>
            </ul>
            <ul v-if="!userStore">
                <li class="separate text-[#e4d5d5]">
                    <router-link to="/login">Đăng nhập</router-link>
                </li>
                <li class="text-[#e4d5d5]" >
                    <router-link to="/register">Đăng kí</router-link>
                </li>
            </ul>
            <!-- <ul 
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
            </ul> -->
            <a-dropdown
                v-if="userStore"
                class="mt-[10px] text-[1.6rem]"
                :placement="'bottomRight'"
                :arrow="{ pointAtCenter: true }"
            >
                <a-button
                    class="flex items-center gap-3 border-none bg-transparent"
                >
                    <img
                        :src="defaultAvatar"
                        alt=""
                        class="w-[30px] rounded-full"
                    />
                    <span class="text-[1.8rem] text-white">{{
                        user?.username.split('@')[0]
                    }}</span>
                </a-button>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <router-link :to="{ name: 'Order' }">Order</router-link>
                        </a-menu-item>
                        <a-menu-item>
                            <router-link :to="{ name: 'ChangePassword' }"
                                >Change Password</router-link
                            >
                        </a-menu-item>
                        <a-menu-item @click="logout">
                            <a href="javascript:;">Log out</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </nav>
        <div
            class="flex items-center justify-between h-[var(--header-search-height)] pb-6"
        >
            <router-link to="/">
                <img class="w-[145px]" src="../../../assets/logo.png" alt="" />
            </router-link>
            <div
                class="flex items-center flex-1 bg-white p-2 rounded max-w-6xl"
            >
                <input
                    v-model="searchValue"
                    ref="searchInput"
                    type="text"
                    placeholder="Tìm sản phẩm ở đây"
                    class="px-5 w-80 h-full text-2xl flex-1"
                />
                <div
                    @click="handleSearch"
                    class="hover:bg-green-500 px-10 py-4 bg-[var(--primary-color)] rounded ml-auto cursor-pointer"
                >
                    <SearchOutlined class="text-white searchicon" />
                </div>
            </div>
            <div class="relative mr-[86px] z-0">
                <ShoppingCartOutlined class="carticon" @click="goToCart"/>
                <span
                    class="absolute top-[-8px] right-[-8px] text-white text-xl px-3 py-1 bg-[var(--primary-color)] rounded-full"
                    >{{cartItemCount}}</span
                >
            </div>
        </div>
    </header>
</template>
<style scoped src="./navbar.scss"></style>
