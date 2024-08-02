<script setup>
import Footer from '../../components/footer/Footer.vue';
import {FacebookOutlined} from '@ant-design/icons-vue';
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue'
import authService from '../../domain/auth-services';
import ModalOtp from '../../modal/ModalOtp.vue';

    const isLoading = ref(false);
    const route = useRoute();
    const routeName = ref(route.name);
    const info = reactive({
        email:'',
        password: ''
    })
    const error=reactive({
        email:'',
        password:'',
    });
    const showModal = ref(false);
    const onSubmit = async() => {
        try {
            isLoading.value = true;
            const res = await authService.register(info);
            console.log(res);
            message.info('Chúng tôi đã gửi mã otp đến email của bạn. Vui lòng kiểm tra email để lấy mã.');
            showModal.value = true;
        } catch(err) {
            isLoading.value = false;
            console.log(err);
            if(err.response.data.errors?.password) {
                error.password=err.response.data.errors.password;
            }
            if(err.response.data.errors?.email) {
                error.email=err.response.data.errors.email;
            } 
            message.error(err.response.data.message);
        }
    }  
    // const onSubmit = () => {
    //     showModal.value = true;
    // }
</script>

<template>
    <div v-if="isLoading" class="text-center text-[1.6rem]">Loading...</div>
    <form @submit.prevent="onSubmit" class="flex flex-col items-center bg-[#fff] text-[16px] p-12 w-[400px] mx-auto border-solid border border-[var(--primary-color)] rounded my-[5%]">
        <h1 class="uppercase text-[var(--primary-color)] font-semibold text-[3rem] mb-10 text-center">Đăng kí</h1>
        <div class="flex flex-col w-full gap-[15px]">
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
        </div>
        <button type="submit" class="w-[50%] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase">Đăng kí</button>
        <div class="w-full flex items-center my-3">
            <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
            <span class="text-gray-400 text-[1.3rem] px-4 uppercase">Hoặc</span>
            <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
        </div>
        <div class="flex items-center gap-3 w-full border-solid border border-[#ccc] p-3 justify-center cursor-pointer hover:bg-[#b4e9cf]">
            <FacebookOutlined class="text-[23px] text-blue-600"/>
            <span class="">Facebook</span>
        </div>
        <p class="text-[12px] mt-6 text-center">
            Bằng việc đăng kí, bạn đã đồng ý với chúng tôi về
            <a href="" class="text-[var(--primary-color)]">Điều khoản dịch vụ</a>
            &
            <a href="" class="text-[var(--primary-color)]">Chính sách bảo mật</a>
        </p>
        <p>
            Bạn đã có tài khoản?
            <router-link to='/login' class="text-[var(--primary-color)] cursor-pointer">Đăng nhập</router-link>
        </p>
    </form>
    <Footer />
    <ModalOtp 
    v-if="showModal" 
    :show="showModal" 
    @setShowStatus="showModal = $event"
    :email="info.email"
    />
</template>
<style scoped>
</style>