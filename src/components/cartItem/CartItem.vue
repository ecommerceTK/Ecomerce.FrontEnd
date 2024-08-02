<script setup>
import { DeleteFilled } from '@ant-design/icons-vue';
</script>

<template>
    <div class="cart">
        
        <div class="last:pb-[20px] first:pt-[15px] flex items-center px-[20px] shadow-sm bg-[#fff]">
            <input type="checkbox" class="min-w-[60px] pr-[15px] pl-[25px]">
            <div class="flex w-[46%] items-center">
                <img 
                    class="w-[80px] object-cover cursor-pointer"
                    src='https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg'
                    alt=""
                >
                <p class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                >Quần Thun unisex vintage logo New Era hàng Chính hãng-bgsneak</p>
            </div>
            <span class="w-[16%] text-center text-[1.8rem]">239.000đ</span>
            <div class="flex w-[16%] justify-center cursor-pointer text-[1.8rem]">
                <button class="p-5 py-3 border-solid border border-[#ccc] hover:bg-[var(--primary-color)]">-</button>
                <span class="p-5 py-3 border-solid border border-[#ccc] hover:bg-[var(--primary-color)]">1</span>
                <button class="p-5 py-3 border-solid border border-[#ccc] hover:bg-[var(--primary-color)]">+</button>
            </div>
            <span class="w-[16%] text-center text-[1.8rem]"
            >239.000đ</span>
            <span class="w-[12%] text-center text-[var(--primary-color)] text-[1.8rem]">
                <DeleteFilled />
            </span>
        </div>
        <hr class="h-[1px] bg-[#ccc]">
    </div>
</template>