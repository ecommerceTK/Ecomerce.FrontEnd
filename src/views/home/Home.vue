<script setup>
import CategoryItem from '../../components/categoryItem/CategoryItem.vue';
import ProductItem from '../../components/productItem/ProductItem.vue';
import CategoryLayout from '../../components/categoryLayout/CategoryLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// const token = localStorage.getItem('token');


</script>
<template>
    <div class="home">
        <CategoryItem />
        <div class="listproduct">
            <h2>Top Product</h2>            
            <div class="list">
                <ProductItem v-for="n in 10" :key="n"/>                   
            </div>
            <button 
            @click="$router.push('/login');"
            class="border-solid border border-[#ccc] p-3 w-[200px] text-[1.6rem] hover:bg-[var(--primary-color)] hover:text-white relative left-1/2 transform -translate-x-1/2"
            >Đăng nhập để xem thêm</button>
        </div>
        <CategoryLayout/>
    </div>

</template>
<style scoped src='./home.scss'>
.carousel-container {
  display: flex;
  flex-wrap: wrap;
}

.carousel-slide {
  height: 50%; 
}
</style>