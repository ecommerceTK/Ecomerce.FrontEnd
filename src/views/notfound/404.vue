<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
    <a-result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
    >
        <template #extra>
            <a-button type="primary" @click="$router.push({ name: 'Home' })"
                >Back Home</a-button
            >
        </template>
    </a-result>
</template>
