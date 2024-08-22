<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalInfoAddress from '../../../components/modal/ModalInfoAddress.vue';

const router = useRouter();
const showModal = ref(true);

const goToOrder = () => {
    router.push('/order');
};
</script>
<template>
    <div class="checkout">
        <div class="my-[60px]">
            <h2
                class="text-center text-[3.5rem] mb-10 text-[var(--primary-color)] font-bold"
            >
                Thanh toán
            </h2>
            <div
                class="rounded border-solid border border-[var(--primary-color)]"
            >
                <div
                    class="flex items-center bg-[#fff] text-[#888] text-[16px] h-[60px] px-[20px] py-[30px] shadow-sm"
                >
                    <span class="text-[#000c] w-[68%] text-[2.3rem]">
                        Sản phẩm
                    </span>
                    <span class="w-[16%] text-center">Số lượng</span>
                    <span class="w-[16%] text-center">Thành tiền</span>
                </div>
                <div
                    v-for="n in 3"
                    :key="n"
                    class="last:pb-[20px] first:pt-[15px] flex items-center px-[20px] shadow-sm bg-[#fff] border-solid border-t border-[#ccc]"
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
                            Quần Thun unisex vintage logo New Era hàng Chính
                            hãng-bgsneak
                        </p>
                    </div>
                    <span class="w-[16%] text-center text-[1.8rem]">2</span>
                    <span class="w-[16%] text-center text-[1.8rem]"
                        >239.000đ</span
                    >
                </div>
            </div>
            <div class="flex my-[16px] mt-10">
                <div
                    class="flex flex-col gap-6 p-5 bg-white text-[1.6rem] w-[50%] shadow-xl"
                >
                    <h2
                        class="text-[2rem] text-[var(--primary-color)] font-bold"
                    >
                        Thông tin giao hàng
                    </h2>
                    <input
                        class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                        type="text"
                        placeholder="Họ tên"
                    />
                    <input
                        class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                        type="text"
                        placeholder="Số điện thoại"
                    />
                    <input
                        class="border-solid border p-3 rounded focus:ring-2 focus:outline-[var(--primary-color)]"
                        type="text"
                        placeholder="Địa chỉ"
                    />
                </div>
                <div
                    class="ml-auto flex flex-col gap-6 p-5 bg-white text-[1.6rem] w-[40%] shadow-xl"
                >
                    <h2
                        class="text-[2rem] text-[var(--primary-color)] font-bold"
                    >
                        Chi phí
                    </h2>
                    <p>
                        Tổng giá:
                        <span class="float-right">12đ</span>
                    </p>
                    <p>
                        Phí vận chuyển:
                        <span class="float-right">12đ</span>
                    </p>
                    <p class="text-[2rem] text-[var(--primary-color)]">
                        Tổng:
                        <span class="float-right">12đ</span>
                    </p>
                </div>
            </div>
            <button
                class="float-right mt-[15px] mb-[60px] py-5 px-36 bg-[var(--primary-color)] rounded text-[2rem] text-white uppercase hover:opacity-85"
                @click="goToOrder"
            >
                Thanh toán
            </button>
        </div>
    </div>
    <ModalInfoAddress :show="showModal" @setShowStatus="showModal = $event" />
</template>
