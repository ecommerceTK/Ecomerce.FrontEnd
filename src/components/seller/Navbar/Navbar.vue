<script setup>
import { useRouter } from 'vue-router';
import { defaultAvatar } from '../../../assets';
import { useAuthUser } from '../../../storage/useAuthUser';
import { useAuthToken } from '../../../storage/useAuthToken';

const { token, clearToken } = useAuthToken();
const { userStore, clearUser } = useAuthUser();
const user = JSON.parse(userStore.value);
const router = useRouter();

const logout = async () => {
    //console.log({token});
    try {
        const res = await authServices.logOut({ token: token.value });
        clearToken();
        clearUser();
        message.info('Đăng xuất thành công');
        router.push({ name: 'Login' });
    } catch (err) {
        console.log(err);
        // message.error(err.response.data.message);
    }
};
</script>

<template>
    <header
        class="flex px-[40px] py-[16px] justify-between bg-[#fff]"
        style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07)"
    >
        <div
            @click="$router.push({ name: 'SellerHome' })"
            class="flex gap-3 items-center text-[2rem] cursor-pointer"
        >
            <img class="w-[145px]" src="../../../assets/logo.png" alt="" />
            Trang người bán
        </div>
        <div>
            <a-space style="display: flex; flex-wrap: wrap">
                <a-dropdown
                    :placement="'bottomRight'"
                    :arrow="{ pointAtCenter: true }"
                >
                    <a-button
                        class="flex items-center gap-3 border-none bg-transparent"
                    >
                        <img
                            :src="defaultAvatar"
                            alt=""
                            class="w-[38px] rounded-full"
                        />
                        <span class="text-[1.8rem]">{{
                            user?.username.split('@')[0]
                        }}</span>
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <router-link :to="{ name: 'SellerProfile' }"
                                    >Profile</router-link
                                >
                            </a-menu-item>
                            <a-menu-item>
                                <router-link :to="{ name: 'Home' }"
                                    >Trang người dùng</router-link
                                >
                            </a-menu-item>
                            <a-menu-item>
                                <span @click="logout">Log out</span>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-space>
        </div>
    </header>
</template>
