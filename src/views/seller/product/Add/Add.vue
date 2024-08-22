<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import First from '../../../../components/seller/add/First';
import Second from '../../../../components/seller/add/Second';
import Finish from '../../../../components/seller/add/Finish';
import { useRouter } from 'vue-router';

const router = useRouter();
const idProduct = ref(null);
const current = ref(0);
const next = () => {
    current.value++;
};
const prev = () => {
    current.value--;
};

const steps = [
    {
        title: 'Thông tin cơ bản',
        content: First,
    },
    {
        title: 'Tải ảnh sp',
        content: Second,
    },
    {
        title: 'Phân loại',
        content: Finish,
    },
];
const items = steps.map(item => ({ key: item.title, title: item.title }));

const updateIdProduct = newId => {
    idProduct.value = newId;
    console.log(idProduct.value);
};
</script>

<template>
    <div class="w-full m-[24px]">
        <h2 class="text-[2.5rem] my-12 font-medium">Thêm sản phẩm</h2>

        <div class="flex">
            <div
                class="flex-1 bg-[#fff] p-[24px] rounded overflow-hidden"
                style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
            >
                <component
                    v-if="typeof steps[current].content === 'object'"
                    :is="steps[current].content"
                    :next="next"
                    @updateId="updateIdProduct"
                    :idProduct="idProduct"
                />
                <div v-else>{{ steps[current].content }}</div>
            </div>
            <!-- <a-steps 
      direction="vertical" 
      :current="current" 
      :items="items"
      class="w-[200px] h-[200px] ml-6"
      ></a-steps> -->
        </div>
        <div class="mt-6">
            <a-button
                v-if="current < steps.length - 1"
                type="primary"
                @click="next"
                >Next</a-button
            >
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="message.success('Processing complete!')"
            >
                Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"
                >Previous</a-button
            >
        </div>
    </div>
</template>
