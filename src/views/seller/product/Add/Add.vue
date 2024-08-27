<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import First from '../../../../components/seller/add/First';
import Second from '../../../../components/seller/add/Second';
import Finish from '../../../../components/seller/add/Finish';
import { useRouter } from 'vue-router';

const router = useRouter();
const idProduct = ref(null);

const updateIdProduct = newId => {
    idProduct.value = newId;
    console.log(idProduct.value);
};
</script>

<template>
    <div class="w-full m-[24px]">
        <h2 class="text-[2.5rem] my-12 font-medium">Thêm sản phẩm</h2>

        <div class="w-full m-[24px] flex flex-col gap-[24px]">
            <div
                class="bg-[#fff] p-[24px] rounded overflow-hidden"
                style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
            >
                <First 
                @updateId="updateIdProduct" 
                :idProduct="idProduct" 
                />
            </div>
            <div
                class="bg-[#fff] p-[24px] rounded overflow-hidden"
                style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
            >
                <Second :idProduct="idProduct" />
            </div>
            <div
                class="bg-[#fff] p-[24px] rounded overflow-hidden"
                style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
            >
                <Finish :idProduct="idProduct" />
            </div>
        </div>
    </div>
</template>
