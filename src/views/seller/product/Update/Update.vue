<script setup>
import { useRouter, useRoute } from 'vue-router';
import First from '../../../../components/seller/update/First';
import Second from '../../../../components/seller/update/Second';
import Finish from '../../../../components/seller/update/Finish';
import mainServices from '../../../../domain/mainServices';
import { onMounted, ref } from 'vue';

const router = useRouter();
const route = useRoute();
const product = ref(null);

const getProductById = async () => {
    try {
        const res = await mainServices.getProductbyId(route.params.id);
        product.value = res.data.result;
    } catch (err) {
        console.log(err);
    }
};
onMounted(async () => {
    await getProductById();
    console.log(product.value);
});
</script>

<template>
    <div v-if="product" class="w-full m-[24px] flex flex-col gap-[24px]">
        <div
            class="bg-[#fff] p-[24px] rounded overflow-hidden"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <First :product="product[0].productResponse" />
        </div>
        <div
            class="bg-[#fff] p-[24px] rounded overflow-hidden"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <Second :product="product" />
        </div>
        <div
            class="bg-[#fff] p-[24px] rounded overflow-hidden"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <Finish :product="product" />
        </div>
    </div>
</template>
