<script setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, toRefs } from 'vue';
import mainServices from '../../../domain/mainServices';

const status = ref(false);

const props = defineProps({
    product: Object,
});
const { product } = toRefs(props);
const emit = defineEmits(['refreshList']);

const showAssortment = () => {
    status.value = !status.value;
};

const deleteProduct = async () => {
    try {
        const res = await mainServices.deleteProduct(
            product.value.productResponse.id
        );
        console.log(res);
        message.info('Xoá thành công');
        emit('refreshList');
    } catch (err) {
        console.log(err);
    }
};
</script>

<template>
    <div
        class="min-h-[160px] last:pb-[20px] first:pt-[15px] px-[20px] shadow-sm"
    >
        <div class="flex items-center bg-[#fff]">
            <div class="flex w-[46%] items-center">
                <img
                    class="w-[80px] object-cover cursor-pointer"
                    src="https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg"
                    alt=""
                />
                <p
                    class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                >
                    {{ product.productResponse.name }}
                    <span class="text-[#888]"
                        >ID sản phẩm: {{ product.productResponse.id }}</span
                    >
                </p>
            </div>
            <span class="w-[16%] text-center text-[1.8rem]">239.000</span>
            <span class="w-[16%] text-center text-[1.8rem]">{{
                product.productResponse.price
            }}</span>
            <span class="w-[16%] text-center text-[1.8rem]">{{
                product.productResponse.quantity
            }}</span>
            <span
                class="w-[12%] flex flex-col text-center text-[var(--primary-color)] text-[1.8rem]"
            >
                <router-link
                    :to="{
                        name: 'UpdateSellerProduct',
                        params: { id: product.productResponse.id },
                    }"
                    >Cập nhật</router-link
                >
                <span @click="deleteProduct" class="cursor-pointer">Xoá</span>
            </span>
        </div>
        <div class="mb-[24px]">
            <div v-if="status === true">
                <div
                    v-for="n in 10"
                    :key="n"
                    class="ml-[24px] flex items-center gap-[60px] text-[1.6rem] text-[#888]"
                >
                    <span>Màu đỏ</span>
                    <span>Số lượng</span>
                    <span>Giá</span>
                </div>
            </div>
            <span
                @click="showAssortment"
                class="text-center w-full block text-blue-500 text-[1.6rem] cursor-pointer"
            >
                {{ status === false ? 'Xem thêm' : 'Ẩn bớt' }}
                <DownOutlined
                    v-if="status === false"
                    class="text-[1.3rem] relative top-[-3px]"
                />
                <UpOutlined
                    v-if="status === true"
                    class="text-[1.3rem] relative top-[-3px]"
                />
            </span>
        </div>
    </div>
</template>
