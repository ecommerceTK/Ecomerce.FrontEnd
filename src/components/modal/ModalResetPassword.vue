<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import authServices from '../../domain/authServices';

const isLoading = ref(false);
const email = ref('');
const emit = defineEmits(['setShowStatus']);

const closeModal = () => {
    emit('setShowStatus', false);
};

const onMissPassword = async () => {
    try {
        const res = await authServices.missPassword({
            usernameOrEmail: email.value,
        });
        isLoading.value = true;
        console.log(res);
        message.info('Vui lòng check email để reset mật khẩu');
    } catch (err) {
        console.log(err);
        isLoading.value = false;
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
        <div
            class="p-10 bg-white rounded flex flex-col w-[400px] text-[1.6rem]"
        >
            <label for="mk" class="font-bold">Nhập email</label>
            <input
                type="text"
                v-model="email"
                placeholder="Email"
                class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
            />
            <button
                @click="onMissPassword"
                class="mt-3 p-4 text-white bg-[var(--primary-color)] rounded hover:opacity-85"
            >
                Submit
            </button>
        </div>
    </div>
</template>
