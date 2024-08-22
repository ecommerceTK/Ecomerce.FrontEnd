<script setup>
import CategoryItem from '../../../components/customer/CategoryItem';
import CategoryLayout from '../../../components/customer/CategoryLayout';
import { useRouter } from 'vue-router';

const router = useRouter();
// const token = localStorage.getItem('token');
</script>
<template>
    <div class="home">
        <!-- <CategoryItem /> -->
        <CategoryLayout />
    </div>
</template>
<style scoped src="./home.scss">
.carousel-container {
    display: flex;
    flex-wrap: wrap;
}

.carousel-slide {
    height: 50%;
}
</style>
