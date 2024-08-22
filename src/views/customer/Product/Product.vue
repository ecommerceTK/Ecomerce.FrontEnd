<script setup>
import ProductDetail from '../../../components/customer/ProductDetail';
import CommentItem from '../../../components/customer/CommentItem';
import { StarFilled } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const productId = route.params.id;
console.log(productId);
</script>

<template>
    <ProductDetail />
    <div class="mt-[20px]">
        <h2 class="text-[24px] font-bold">Khách hàng đánh giá</h2>
        <div
            class="mb-[20px] ml-[5%] p-5 bg-white rounded w-max"
            :style="{ boxShadow: '0 0 10px 1px #ccc' }"
        >
            <h2 class="text-[20px] font-semibold text-[#534747]">Tổng quan</h2>
            <div class="text-[1.8rem] flex items-center mb-[6px]">
                <StarFilled
                    v-for="n in 5"
                    :key="n"
                    class="text-[#ffff00e7] mr-[6px] text-[2.5rem]"
                />
                <span class="ml-[6px] leading-relaxed">123 Đánh giá</span>
            </div>
            <div class="text-[1.8rem] flex items-center mb-[6px]">
                <StarFilled
                    v-for="n in 4"
                    :key="n"
                    class="text-[#ffff00e7] mr-[6px] text-[2.5rem]"
                />
                <StarFilled class="text-[#ccc] mr-[6px] text-[2.5rem]" />
                <span class="ml-[6px] leading-relaxed">123 Đánh giá</span>
            </div>
            <div class="text-[1.8rem] flex items-center mb-[6px]">
                <StarFilled
                    v-for="n in 3"
                    :key="n"
                    class="text-[#ffff00e7] mr-[6px] text-[2.5rem]"
                />
                <StarFilled
                    v-for="n in 2"
                    :key="n"
                    class="text-[#ccc] mr-[6px] text-[2.5rem]"
                />
                <span class="ml-[6px] leading-relaxed">123 Đánh giá</span>
            </div>
            <div class="text-[1.8rem] flex items-center mb-[6px]">
                <StarFilled
                    v-for="n in 2"
                    :key="n"
                    class="text-[#ffff00e7] mr-[6px] text-[2.5rem]"
                />
                <StarFilled
                    v-for="n in 3"
                    :key="n"
                    class="text-[#ccc] mr-[6px] text-[2.5rem]"
                />
                <span class="ml-[6px] leading-relaxed">123 Đánh giá</span>
            </div>
            <div class="text-[1.8rem] flex items-center mb-[6px]">
                <StarFilled
                    v-for="n in 1"
                    :key="n"
                    class="text-[#ffff00e7] mr-[6px] text-[2.5rem]"
                />
                <StarFilled
                    v-for="n in 4"
                    :key="n"
                    class="text-[#ccc] mr-[6px] text-[2.5rem]"
                />
                <span class="ml-[6px] leading-relaxed">123 Đánh giá</span>
            </div>
        </div>
        <CommentItem v-for="n in 2" :key="n" />
    </div>
</template>

//172.16.90.61:8080
