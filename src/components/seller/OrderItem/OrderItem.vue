<script setup></script>

<template>
    <div
        class="min-h-[160px] last:pb-[20px] first:pt-[15px] px-[20px] shadow-sm"
    >
        <p class="text-[1.6rem]">
            Người nhận:
            <span class="font-bold">Nguyễn văn a</span>
        </p>
        <div class="flex items-center bg-[#fff]">
            <div class="flex w-[46%] items-center justify-between">
                <div class="flex items-center">
                    <img
                        class="w-[80px] object-cover cursor-pointer"
                        src="https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg"
                        alt=""
                    />
                    <p
                        class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                    >
                        phụ kiện công
                        <span class="text-[#888]">Mã đơn hàng: #113</span>
                    </p>
                </div>
                <span>x2</span>
            </div>
            <span class="w-[16%] text-center text-[1.8rem]">239.000</span>
            <span class="w-[16%] text-center text-[1.8rem] font-bold"
                >Đã giao</span
            >
            <span
                class="w-[16%] flex flex-col text-center text-[var(--primary-color)] text-[1.8rem]"
            >
                <router-link
                    :to="{ name: 'SellerOrderDetail', params: { id: 113 } }"
                    >Xem chi tiết</router-link
                >
            </span>
        </div>
    </div>
</template>
