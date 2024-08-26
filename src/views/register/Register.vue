<script setup>
import Footer from '../../components/customer/Footer';
import { FacebookOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import authService from '../../domain/authServices';
import ModalOtp from '../../components/modal/ModalOtp.vue';

const isLoading = ref(false);
const route = useRoute();
const routeName = ref(route.name);
const info = reactive({
    email: '',
    password: '',
});
const error = reactive({
    email: '',
    password: '',
});
const showModal = ref(false);

const handleBlurEmail = () => {
    if (info.email.trim() === '') {
        return (error.email = 'Trường này không được để trống');
    }
};

const handleBlurPassword = () => {
    if (info.password.trim() === '') {
        return (error.password = 'Trường này không được để trống');
    }
};

const onSubmit = async () => {
    //console.log(info);
    handleBlurEmail();
    handleBlurPassword();

    try {
        isLoading.value = true;
        const res = await authService.register(info);
        console.log(res);
        message.info(
            'Chúng tôi đã gửi mã otp đến email của bạn. Vui lòng kiểm tra email để lấy mã.'
        );
        showModal.value = true;
    } catch (err) {
        isLoading.value = false;
        console.log(err);
        if (err.response.data.errors?.password) {
            error.password = err.response.data.errors.password;
        }
        if (err.response.data.errors?.email) {
            error.email = err.response.data.errors.email;
        }
        message.error(err.response.data.message);
    }
};

const handleChangeEmail = () => {
    if (info.email.trim() === '') {
        error.email = 'Trường này không được để trống';
    } else {
        error.email = '';
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
// const onSubmit = () => {
//     showModal.value = true;
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
            Đăng kí
        </h1>
        <!-- <div class="flex flex-col w-full gap-[15px]">
            <div>
                <label for="email" class="block">Email</label>
                <input 
                type="text" 
                id="email" 
                placeholder="Email" 
                required
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
                v-model="info.email"
                >
                <span 
                v-if="error.email"
                class="text-red-500 text-[1.3rem]"
                >{{error.email}}</span>
            </div>
            <div>
                <label for="password" class="block">Mật khẩu</label>
                <input 
                type="text" 
                id="password" 
                placeholder="Password" 
                required
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
                v-model="info.password"
                >
                <span 
                class="text-red-500 text-[1.3rem]"
                v-if="error.password"
                >{{error.password}}</span>
            </div>
            <button type="submit" class="w-[50%] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase">Đăng kí</button>
        </div> -->

        <a-form
            @submit="onSubmit"
            class="w-full flex flex-col gap-3"
            layout="vertical"
        >
            <div>
                <a-form-item 
                name="email" 
                class="mb-0"
                >
                    <template #label>
                        <div>
                            <span class="mr-[3px] text-[#ee4d2d]">*</span>
                            Email
                        </div>
                    </template>
                    <a-input
                        v-model:value="info.email"
                        @change="handleChangeEmail"
                        @blur="handleBlurEmail"
                        class="py-3"
                    />
                </a-form-item>
                <span v-if="error.email" class="text-red-500 text-[1.3rem]">
                    {{ error.email }}
                </span>
            </div>
            <div>
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
                <span class="text-red-500 text-[1.3rem]" v-if="error.password">
                    {{ error.password }}
                </span>
            </div>

            <button
                type="submit"
                class="relative left-[50%] translate-x-[-50%] w-[50%] text-[1.6rem] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
            >
                Đăng kí
            </button>
        </a-form>

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
        <p class="text-[12px] mt-6 text-center">
            Bằng việc đăng kí, bạn đã đồng ý với chúng tôi về
            <a href="" class="text-[var(--primary-color)]"
                >Điều khoản dịch vụ</a
            >
            &
            <a href="" class="text-[var(--primary-color)]"
                >Chính sách bảo mật</a
            >
        </p>
        <p>
            Bạn đã có tài khoản?
            <router-link
                to="/login"
                class="text-[var(--primary-color)] cursor-pointer"
                >Đăng nhập</router-link
            >
        </p>
    </div>
    <Footer />
    <ModalOtp
        v-if="showModal"
        :show="showModal"
        @setShowStatus="showModal = $event"
        :email="info.email"
    />
</template>
<style scoped></style>
