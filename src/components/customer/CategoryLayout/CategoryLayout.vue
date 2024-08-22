<script setup>
import { ref } from 'vue';
import Leftbar from './Leftbar';
import ProductDisplay from './ProductDisplay';

const categoryId = ref('all');
const handleMenuClick = k => {
    categoryId.value = k;
    //console.log(typeof categoryId.value);
};
</script>

<template>
    <div class="flex my-[36px]">
        <Leftbar @menuClick="handleMenuClick" />
        <ProductDisplay :categoryId="categoryId" />
    </div>
</template>
