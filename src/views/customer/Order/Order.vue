<script setup></script>

<template>
    <div class="my-[60px]">
        <h2
            class="text-center text-[3.5rem] mb-10 text-[var(--primary-color)] font-bold"
        >
            Đơn hàng
        </h2>
        <div class="rounded border-solid border border-[var(--primary-color)]">
            <div
                class="flex items-center bg-[#fff] text-[#888] text-[16px] h-[60px] px-[20px] py-[30px] shadow-sm"
            >
                <span class="min-w-[100px] pr-[15px] pl-[25px]">Mã đơn</span>
                <span class="w-[68%] ml-[36px]"> Sản phẩm </span>
                <span class="w-[16%] text-center">Tổng</span>
                <span class="w-[16%] text-center">Trạng thái</span>
            </div>
            <div
                v-for="n in 3"
                :key="n"
                class="last:pb-[20px] first:pt-[15px] flex items-center px-[20px] shadow-sm bg-[#fff] border-solid border-t border-[#ccc]"
            >
                <span
                    class="min-w-[100px] pr-[15px] pl-[25px] text-[#888] text-center text text-[1.6rem]"
                    >#333</span
                >
                <div class="flex w-[68%] items-center">
                    <img
                        class="w-[80px] object-cover cursor-pointer"
                        src="https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg"
                        alt=""
                    />
                    <p
                        class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                    >
                        Quần Thun x 1, Áo thun x 2
                        <span>Quận Tây Hồ, thành phố Hà Nội</span>
                    </p>
                </div>
                <span class="w-[16%] text-center text-[1.8rem]">33đ</span>
                <span class="w-[16%] text-center text-[1.8rem]"
                    >Đang được giao</span
                >
            </div>
        </div>
    </div>
</template>
