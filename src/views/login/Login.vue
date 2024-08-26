<script setup>
import { FacebookOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import authServices from '../../domain/authServices';
import { useAuthToken } from '../../storage/useAuthToken';
import { useAuthUser } from '../../storage/useAuthUser';
import Footer from '../../components/customer/Footer';
import ModalOtp from '../../components/modal/ModalOtp.vue';
import ModalResetPassword from '../../components/modal/ModalResetPassword.vue';

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const routeName = ref(route.name);
const showModal = ref(false);
const showModalReset = ref(false);
const { setToken } = useAuthToken();
const { setUser } = useAuthUser();

const info = reactive({
    username: '',
    password: '',
});
const error = reactive({
    username: '',
    password: '',
});

const getUser = async () => {
    try {
        const res = await authServices.getUser();
        //console.log(res);
        // localStorage.setItem('user', JSON.stringify(res.data.result))
        setUser(JSON.stringify(res.data.result));
    } catch (err) {
        console.log(err);
    }
};

const handleBlurUsername = () => {
    if (info.username.trim() === '') {
        return (error.username = 'Trường này không được để trống');
    }
};

const handleBlurPassword = () => {
    if (info.password.trim() === '') {
        return (error.password = 'Trường này không được để trống');
    }
};

const onSubmit = async () => {
    //console.log(info);
    handleBlurUsername();
    handleBlurPassword();

    try {
        isLoading.value = true;
        const res = await authServices.login(info);
        //console.log(res);
        // localStorage.setItem("token", res.data.result.token);
        setToken(res.data.result.token, res.data.result.refreshToken);
        message.info('Đăng nhập thành công');

        await getUser();
        router.push({ name: 'Home' });
    } catch (err) {
        isLoading.value = false;
        //console.log(err.response.data.code);
        console.log(err);
        if (err.response.data.errors?.password) {
            error.password = err.response.data.errors.password;
        }
        if (err.response.data.errors?.username) {
            error.username = err.response.data.errors.username;
        }
        message.error(err.response.data.message);
        if (err.response.data.code === 1013) {
            showModal.value = true;
        }
    }
};

const handleChangeUsername = () => {
    if (info.username.trim() === '') {
        error.username = 'Trường này không được để trống';
    } else {
        error.username = '';
    }
};

const handleChangePassword = () => {
    if (info.password.trim() === '') {
        error.password = 'Trường này không được để trống';
    } else if (info.password.trim().length < 8) {
        error.password = 'Mật khẩu phải có tối thiểu 8 kí tự';
    } else {
        error.password = '';
    }
};

const onModal = () => {
    showModalReset.value = true;
};

// const onSubmit = () => {
//     showModal.value = true;
//     console.log(info);
// }
</script>

<template>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        @back="$router.push('/')"
    >
        <template #title>
            <span class="text-[#3e8f67] uppercase">Trang chủ</span>
        </template>
    </a-page-header>
    <div v-if="isLoading" class="text-center text-[1.6rem]">Loading...</div>

    <div
        class="flex flex-col items-center bg-[#fff] text-[16px] p-12 w-[400px] mx-auto border-solid border border-[var(--primary-color)] rounded my-[5%]"
    >
        <h1
            class="uppercase text-[var(--primary-color)] font-semibold text-[3rem] mb-10 text-center"
        >
            Đăng nhập
        </h1>
        <a-form
            @submit="onSubmit"
            class="w-full flex flex-col gap-3"
            layout="vertical"
        >
            <div>
                <!-- <label for="email" class="block">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          required
          class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
          v-model="info.username"
        /> -->
                <a-form-item 
                name="username"
                class="mb-0"
                >
                    <template #label>
                        <div>
                            <span class="mr-[3px] text-[#ee4d2d]">*</span>
                            Username
                        </div>
                    </template>
                    <a-input
                        v-model:value="info.username"
                        @change="handleChangeUsername"
                        @blur="handleBlurUsername"
                        class="py-3"
                    />
                </a-form-item>
                <span
                    v-if="error.username"
                    class="text-red-500 text-[1.3rem]"
                    >{{ error.username }}</span
                >
            </div>
            <div>
                <!-- <label for="password" class="block">Mật khẩu</label>
        <input
          type="text"
          id="password"
          placeholder="Password"
          required
          class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
          v-model="info.password"
        /> -->
                <a-form-item 
                name="password" 
                class="mb-0"
                >
                    <template #label>
                        <div>
                            <span class="mr-[3px] text-[#ee4d2d]">*</span>
                            Password
                        </div>
                    </template>
                    <a-input-password
                        v-model:value="info.password"
                        @change="handleChangePassword"
                        @blur="handleBlurPassword"
                        class="py-3"
                    />
                </a-form-item>
                <span
                    class="text-red-500 text-[1.3rem]"
                    v-if="error.password"
                    >{{ error.password }}</span
                >
            </div>

            <button
                type="submit"
                class="relative left-[50%] translate-x-[-50%] w-[50%] text-[1.6rem] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
            >
                Đăng nhập
            </button>
        </a-form>
        <button
            type="button"
            @click="onModal"
            class="text-[12px] mt-3 text-[var(--primary-color)] hover:underline"
        >
            Quên mật khẩu
        </button>
        <div class="w-full flex items-center my-3">
            <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
            <span class="text-gray-400 text-[1.3rem] px-4 uppercase">Hoặc</span>
            <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
        </div>
        <div
            class="flex items-center gap-3 w-full border-solid border border-[#ccc] p-3 justify-center cursor-pointer hover:bg-[#b4e9cf]"
        >
            <FacebookOutlined class="text-[23px] text-blue-600" />
            <span class="">Facebook</span>
        </div>
        <p>
            Bạn mới biết đến chúng tôi?
            <router-link
                to="/register"
                class="text-[var(--primary-color)] cursor-pointer"
                >Đăng kí</router-link
            >
        </p>
    </div>
    <Footer />
    <ModalOtp
        v-if="showModal"
        :show="showModal"
        @setShowStatus="showModal = $event"
        :email="info.username"
    />
    <ModalResetPassword
        v-if="showModalReset"
        :show="showModalReset"
        @setShowStatus="showModalReset = $event"
    />
</template>
<style scoped></style>
