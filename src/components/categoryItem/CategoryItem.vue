<script setup>
    import {thoitrangnam} from '../../assets';
    const cate = [
        {
            img: thoitrangnam,
            name: 'Thời trang nam'
        }
    ]
</script>

<template>
    <div class="category">
        <h2>Category</h2>
        <div class="container">
            <div class="item" v-for="n in 6" :key="n">
                <img :src="cate[0].img" alt="anhcategory">
                <span>{{cate[0].name}}</span>
            </div>
        </div>
    </div>

</template>

<style scoped src='./categoryItem.scss'>
</style>