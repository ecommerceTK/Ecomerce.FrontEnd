<script setup>
import { reactive, watch, h, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = reactive({
    selectedKeys: ['order'],
    openKeys: ['product'],
    preOpenKeys: ['product'],
});
const items = reactive([
    {
        key: 'order',
        icon: () =>
            h('img', {
                src: 'https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0',
                style: { width: '16px', height: '16px' },
            }),
        label: 'Quản lý đơn hàng',
        title: 'Quản lý đơn hàng',
    },
    {
        key: 'product',
        icon: () =>
            h('img', {
                src: 'https://cf.shopee.vn/file/3fa3bdb20eb201ae3f157ee8d11a39d5',
                style: { width: '16px', height: '16px' },
            }),
        label: 'Quản lý sản phẩm',
        title: 'Quản lý sản phẩm',
        children: [
            {
                key: 'list',
                label: 'Tất cả',
                title: 'Tất cả',
            },
            {
                key: 'add',
                label: 'Thêm sản phẩm',
                title: 'Thêm sản phẩm',
            },
        ],
    },
]);
watch(
    () => state.openKeys,
    (_val, oldVal) => {
        state.preOpenKeys = oldVal;
    }
);
// const handleMenuSelect = ({ item, key, keyPath }) => {
//     console.log(item, key, keyPath);
// }
// @select="handleMenuSelect"

const handleMenuClick = ({ key, keyPath }) => {
    if (keyPath.length > 1) {
        router.push({ path: `/seller/${keyPath[0]}/${keyPath[1]}` });
    } else {
        router.push({ path: `/seller/${key}` });
    }
};
</script>

<template>
    <div style="width: 256px">
        <a-menu
            class="pt-10 text-[1.6rem]"
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            :items="items"
            @click="handleMenuClick"
        ></a-menu>
    </div>
</template>
