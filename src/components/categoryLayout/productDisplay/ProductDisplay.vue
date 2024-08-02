<script setup>
import Pagination from '../../pagination/Pagination.vue';
import ProductItem from '../../productItem/ProductItem.vue';

const products = Array.from({ length: 30 }, (v, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  img: 'https://via.placeholder.com/150'
}));

// console.log(products);

</script>

<template>
    <div class="ml-[10px] flex-1 bg-white " style="box-shadow: 0 0 20px -15px rgba(0, 0, 0, 0.6);">
        <Pagination :products="products">
            <template #default="slotProps">
                <div class="list">
                    <ProductItem v-for="pro in slotProps.pros" :key="pro.id" :pro="pro"/>
                </div>
            </template>
        </Pagination>
    </div>
</template>

<style scoped>
    .list {
        padding: 12px ;
        margin-bottom: 24px;
        /* margin-top: 30px; */
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 30px;
        row-gap: 50px;
    }
</style>