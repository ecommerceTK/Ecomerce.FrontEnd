<script setup>
import {ShoppingFilled} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import CartItem from '../../components/cartItem/CartItem.vue';

const router = useRouter();

const checkout = () => {
    router.push('/checkout');
}
</script>

<template>
    <div class="cart">
        <div class="flex items-center justify-center gap-6 text-[3.5rem] mb-10 my-[60px] text-[var(--primary-color)] font-bold">
            <ShoppingFilled class="text-[var(--primary-color)]"/>
            Giỏ hàng
        </div>
        <div class="flex items-center bg-[#fff] text-[#888] text-[16px] h-[55px] mb-[12px] px-[20px] shadow-sm">
            <input 
            class="min-w-[60px] pr-[15px] pl-[25px]"
            type="checkbox"
            >
            <span class="text-[#000c] w-[46%]">
            Sản phẩm
            </span>
            <span class="w-[16%] text-center"
            >Đơn giá</span>
            <span class="w-[16%] text-center"
            >Số lượng</span>
            <span class="w-[16%] text-center"
            >Thành tiền</span>
            <span class="w-[12%] text-center"
            >Thao tác</span>
        </div>
        <CartItem />
        <div class="text-[#000c] px-[20px] bg-[#fff] text-[1.8rem] py-3 w-full">
            <span class="ml-[16px] text-[var(--primary-color)]">Tổng</span>
            <span class="float-right mr-[12%] w-[12%] text-center text-[var(--primary-color)]">239.000đ</span>
        </div>
        <button 
        class="my-[36px] text-[1.8rem] text-white p-3 px-6 bg-[var(--primary-color)] rounded float-right hover:opacity-60"
        @click="checkout"
        >
        Mua hàng
        </button>
    </div>
</template>
