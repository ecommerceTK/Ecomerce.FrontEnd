<script setup>
defineProps(['show']);
const emit = defineEmits(['setShowStatus']);

const closeModal = () => {
    emit('setShowStatus', false);
};

const onSubmit = () => {};
</script>

<template>
    <div
        class="fixed inset-0 flex items-center justify-center"
        style="background-color: rgba(0, 0, 0, 0.3)"
        v-if="show"
        @click.self="closeModal"
    >
        <form
            @click.prevent="onSubmit"
            class="flex flex-col gap-6 p-10 bg-white text-[1.6rem] w-[50%] shadow-xl rounded"
        >
            <h2
                class="text-center text-[2rem] text-[var(--primary-color)] font-bold"
            >
                Vui lòng nhập thông tin
            </h2>
            <input
                class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                type="text"
                placeholder="Họ tên"
            />
            <input
                class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                type="text"
                placeholder="Số điện thoại"
            />
            <input
                class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                type="text"
                placeholder="Địa chỉ"
            />
        </form>
    </div>
</template>
