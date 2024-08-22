<script setup>
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import authServices from '../../../domain/authServices';
import { useAuthToken } from '../../../storage/useAuthToken';

const router = useRouter();
//const token = localStorage.getItem('token');
const { token } = useAuthToken();
const info = reactive({
    oldPassword: '',
    newPassword: '',
    setPassword: '',
});
const error = reactive({
    oldPassword: '',
    newPassword: '',
    setPassword: '',
});
const handleBlurOldPassword = () => {
    if (info.oldPassword.trim() === '') {
        return (error.oldPassword = 'Trường này không được để trống');
    }
};
const handleBlurNewPassword = () => {
    if (info.newPassword.trim() === '') {
        return (error.newPassword = 'Trường này không được để trống');
    }
};
const handleBlurResetPassword = () => {
    if (info.setPassword.trim() === '') {
        return (error.setPassword = 'Trường này không được để trống');
    }
};

const handleChangeOldPassword = () => {
    if (info.oldPassword.trim() === '') {
        error.oldPassword = 'Trường này không được để trống';
    } else if (info.oldPassword.trim().length < 8) {
        error.oldPassword = 'Mật khẩu phải có tối thiểu 8 kí tự';
    } else {
        error.oldPassword = '';
    }
};
const handleChangeNewPassword = () => {
    if (info.newPassword.trim() === '') {
        error.newPassword = 'Trường này không được để trống';
    } else if (info.newPassword.trim().length < 8) {
        error.newPassword = 'Mật khẩu phải có tối thiểu 8 kí tự';
    } else {
        error.newPassword = '';
    }
};
const handleChangeResetPassword = () => {
    if (info.setPassword.trim() === '') {
        error.setPassword = 'Trường này không được để trống';
    } else if (info.setPassword.trim().length < 8) {
        error.setPassword = 'Mật khẩu phải có tối thiểu 8 kí tự';
    } else {
        error.setPassword = '';
    }
};
const onSubmit = async () => {
    if (info.newPassword !== info.setPassword) {
        return message.error('Mật khẩu xác nhận không khớp với mật khẩu mới');
    }
    try {
        const res = await authServices.changePassword({
            oldPassword: info.oldPassword,
            newPassword: info.newPassword,
        });
        message.info('Đổi mật khẩu thành công. Vui lòng đăng nhập lại');
        router.push('/login');
    } catch (err) {
        console.log(err);
        message.error(err.response.data.message);
    }
};
</script>

<template>
    <a-form
        @submit.prevent="onSubmit"
        layout="vertical"
        class="flex flex-col w-[60%] gap-[15px] ml-[10%] my-[60px] text-[1.8rem] bg-white p-5 border-solid border"
    >
        <div>
            <a-form-item label="Mật khẩu cũ:" name="oldPassword" class="mb-0">
                <a-input-password
                    v-model:value="info.oldPassword"
                    @change="handleChangeOldPassword"
                    @blur="handleBlurOldPassword"
                    class="py-3"
                />
            </a-form-item>
            <span v-if="error.oldPassword" class="text-red-500 text-[1.3rem]">{{
                error.oldPassword
            }}</span>
        </div>

        <div>
            <a-form-item label="Mật khẩu mới:" name="newPassword" class="mb-0">
                <a-input-password
                    v-model:value="info.newPassword"
                    @change="handleChangeNewPassword"
                    @blur="handleBlurNewPassword"
                    class="py-3"
                />
            </a-form-item>
            <span v-if="error.newPassword" class="text-red-500 text-[1.3rem]">{{
                error.newPassword
            }}</span>
        </div>
        <!-- <div>
            <label for="mkc">Xác nhận mật khẩu mới</label>
            <input 
            type="text"
            v-model="info.setPassword"
            placeholder="Xác nhận mật khẩu mới"
            class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            >
        </div> -->

        <div>
            <a-form-item
                label="Xác nhận mật khẩu mới:"
                name="resetNewPassword"
                class="mb-0"
            >
                <a-input-password
                    v-model:value="info.setPassword"
                    @change="handleChangeResetPassword"
                    @blur="handleBlurResetPassword"
                    class="py-3"
                />
            </a-form-item>
            <span v-if="error.setPassword" class="text-red-500 text-[1.3rem]">{{
                error.setPassword
            }}</span>
        </div>
        <a-form-item>
            <button
                type="submit"
                class="float-right w-[30%] text-[1.6rem] text-center mt-3 p-3 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
            >
                Submit
            </button>
        </a-form-item>
    </a-form>
</template>
