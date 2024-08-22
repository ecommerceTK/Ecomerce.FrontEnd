<script setup>
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import authServices from '../../domain/authServices';

const props = defineProps({
    email: String,
});
const emit = defineEmits(['setShowStatus']);
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const otp = ref(null);
const { email } = toRefs(props);

const closeModal = () => {
    emit('setShowStatus', false);
};

const onSubmit = async () => {
    console.log({ email: email.value, otp: otp.value });

    try {
        isLoading.value = true;
        const res = await authServices.otp({
            email: email.value,
            otp: otp.value,
        });
        console.log(res);
        if (route.name === 'Register') {
            message.info('Đăng kí thành công');
            router.push('/login');
        } else {
            message.info('Đăng nhập thành công');
            router.push({ name: 'Home' });
        }
    } catch (err) {
        isLoading.value = false;
        console.log(err);
        message.error(err.response.data.message);
    }
};

const requestNewOtp = async () => {
    try {
        isLoading.value = true;
        const res = await authServices.newOtp(email.value);
        console.log(res);
        message.info('OTP mới đã được gửi đến email của bạn.');
    } catch (err) {
        isLoading.value = false;
        console.log(err);
        message.error(err.response.data.message);
    }
};
</script>

<template>
    <div v-if="isLoading" class="text-center text-[1.6rem]">Loading...</div>
    <div
        class="fixed inset-0 flex items-center justify-center"
        style="background-color: rgba(0, 0, 0, 0.3)"
        @click.self="closeModal"
    >
        <div class="p-10 bg-white rounded flex flex-col w-[400px]">
            <p class="text-[1.6rem] leading-relaxed">
                Vui lòng nhập otp để kích hoạt tài khoản. Otp có hiệu lực 2
                phút.
            </p>
            <input
                v-model="otp"
                type="text"
                placeholder="Otp"
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)] text-[1.8rem]"
            />
            <div class="w-full">
                <button
                    class="mt-[12px] w-[70%] p-3 text-white bg-[var(--primary-color)] text-[1.6rem] rounded hover:opacity-85"
                    @click="onSubmit"
                >
                    Sumit
                </button>
                <button
                    class="mt-[12px] float-right p-3 text-white bg-[var(--primary-color)] text-[1.6rem] rounded hover:opacity-85"
                    @click="requestNewOtp"
                >
                    Gửi lại
                </button>
            </div>
        </div>
    </div>
</template>
