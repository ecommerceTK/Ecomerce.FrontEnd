<script setup>
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import authServices from '../../../domain/authServices';

const route = useRoute();
const router = useRouter();
const info = reactive({
    password: '',
    newPassword: '',
});

const onSubmit = async () => {
    // console.log(route.query.token);

    if (info.password !== info.newPassword) {
        return message.error('Mật khẩu xác nhận không khớp với mật khẩu mới');
    }
    try {
        const res = await authServices.resetPassword({
            token: route.query.token,
            newPassword: info.password,
        });
        message.info('reset password success');
        router.push('/login');
    } catch (err) {
        console.log(err);
        message.error(err.response.data.message);
    }
};
</script>
<template>
    <form
        @submit.prevent="onSubmit"
        class="flex flex-col w-[70%] gap-[15px] ml-[10%] my-[60px] text-[1.8rem] bg-white p-5 border-solid border"
    >
        <div>
            <label for="mkc">Mật khẩu</label>
            <input
                type="text"
                v-model="info.password"
                placeholder="Nhập mật khẩu mới"
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            />
        </div>
        <div>
            <label for="mkc">Xác nhận mật khẩu</label>
            <input
                type="text"
                v-model="info.newPassword"
                placeholder="Xác nhận mật khẩu mới"
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            />
        </div>
        <button
            type="submit"
            class="w-[50%] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
        >
            Submit
        </button>
    </form>
</template>
