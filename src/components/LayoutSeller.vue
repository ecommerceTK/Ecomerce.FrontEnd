<script setup>
import Navbar from './seller/Navbar';
import LeftBar from './seller/Leftbar';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
    router.push({ name: 'SellerOrder' }); // Đường dẫn tới trang "order"
});
</script>

<template>
    <Navbar />
    <div class="flex">
        <LeftBar />
        <RouterView />
    </div>
</template>
