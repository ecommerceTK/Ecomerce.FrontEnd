<script setup>
import {HeartFilled, StarFilled, CheckOutlined} from '@ant-design/icons-vue';
defineProps(['pro']);
</script>
<template>
     <router-link :to="{name: 'ProductDetail'}" class="item">
        <div class="img" style="background-image: url(https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg);"></div>
        <h4 class="name">Quần Shorts Black {{pro?.name}}</h4>
        <div class="price">
            <span class="priceOld">550.000đ</span>
            <span class="priceCurrent">450.000đ</span>
        </div>
        <div class="action">
            <div class="like liked">
                <HeartFilled class="notlike"/>
                <HeartFilled class="Llike"/>
            </div>
            <div class="rating">
                <StarFilled v-for='n in 5' class="start" :key="n"/>
            </div>
            <span class="sold">88 đã bán</span>
        </div>
        <div class="itemOrigin">
            <span class="itemBrand">Whoo</span>
            <span class="itemOrginName">Nhật Bản</span>
        </div>
        <div class="itemFavorite">
            <CheckOutlined class="ii"/>
            <span>Yêu Thích</span>   
        </div>
        <div class="saleOff">
            <span class="salePercent">43%</span>
            <span class="saleLabel">GIẢM</span>
        </div>
    </router-link>
</template>

<style scoped src='./productItem.scss'>
</style>