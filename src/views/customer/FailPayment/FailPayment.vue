<script setup>
import { useRouter } from 'vue-router';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
const router = useRouter();
</script>
<template>
    <a-result
        class="h-[50vh]"
        status="error"
        title="Thanh toán thất bại"
        sub-title="Vui lòng kiểm tra lại thông tin thẻ và thử lại"
    >
        <template #extra>
            <a-button
                key="console"
                type="primary"
                @click="$router.push({ name: 'Home' })"
                >Go Home</a-button
            >
            <a-button key="buy" @click="$router.push({ name: 'Cart' })"
                >Buy Again</a-button
            >
        </template>
    </a-result>
</template>
<style scoped>
.desc p {
    margin-bottom: 1em;
}
</style>
