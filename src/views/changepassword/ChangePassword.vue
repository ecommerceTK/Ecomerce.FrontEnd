<script setup>
import { reactive } from "vue"
import { message } from "ant-design-vue";
import authServices from "../../domain/auth-services"
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem('token');
const info = reactive({
    oldPassword: '',
    newPassword: '',
    setPassword: '',
})

const onSubmit = async() => {
    if(info.newPassword !== info.setPassword) {
        return message.error('Mật khẩu xác nhận không khớp với mật khẩu mới');
    }
    try {
        const res = await authServices.changePassword(token,{
            oldPassword: info.oldPassword,
            newPassword: info.newPassword,
        })
        message.info('Đổi mật khẩu thành công. Vui lòng đăng nhập lại');
        router.push('/login');
    } catch(err) {
        console.log(err);
        message.error(err.response.data.message);
    }
}
</script>

<template>
    <form 
    @submit.prevent="onSubmit"
    class="flex flex-col w-[70%] gap-[15px] ml-[10%] my-[60px] text-[1.8rem] bg-white p-5 border-solid border"
    >
        <div>
            <label for="mkc">Mật khẩu cũ</label>
            <input 
            type="text"
            v-model="info.oldPassword"
            placeholder="Nhập mật khẩu cũ"
            class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            >
        </div>
        <div>
            <label for="mkc">Mật khẩu mới</label>
            <input 
            type="text"
            v-model="info.newPassword"
            placeholder="Nhập mật khẩu mới"
            class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            >
        </div>
        <div>
            <label for="mkc">Xác nhận mật khẩu mới</label>
            <input 
            type="text"
            v-model="info.setPassword"
            placeholder="Xác nhận mật khẩu mới"
            class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            >
        </div>
        <button
        type="submit"
        class="w-[50%] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
        >
        Submit
        </button>
    </form>
</template>