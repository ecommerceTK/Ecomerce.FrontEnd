<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {message} from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { useEventBus } from '@vueuse/core';
import mainServices from '../../../domain/mainServices';
import ProductItem from '../../../components/customer/ProductItem';

const route = useRoute();
const products = ref([]);
const total = ref(null);
const pageSize = ref(30);
const current = ref(1);
const min = ref(0);
const max = ref(0);
const status = ref(false);
const order = ref(null);
const activeSearchType = ref(null);
const searchBus = useEventBus('perform-search');

const handleStatus = () => {
    status.value = true;
    activeSearchType.value = 'price';
};

const handleIncrePrice = () => {
    activeSearchType.value = 'order';
    order.value = 'desc';
};

const handleDecrePrice = () => {
    activeSearchType.value = 'order';
    order.value = 'asc';
};

const fetchSearchOrderProduct = async () => {
    status.value = false;
    try {
        const res = await mainServices.getSearchOrderProduct(
            route.query.q,
            order.value,
            current.value - 1,
            pageSize.value
        );
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
    } catch (err) {
        console.log(err);
    }
};

const fetchSearchPriceProduct = async () => {
    if(min.value >= max.value) return message.error('Vui lòng nhập đúng');
    try {
        const res = await mainServices.getSearchPriceProduct(
            route.query.q,
            min.value,
            max.value,
            current.value - 1,
            pageSize.value
        );
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
    } catch (err) {
        console.log(err);
    }
};

const fetchSearchProducts = async query => {
    try {
        const res = await mainServices.getSearchPageProduct(
            query,
            current.value - 1,
            pageSize.value
        );
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
    } catch (err) {
        console.log(err);
    }
};

const fetchProducts = async () => {
    if (activeSearchType.value === 'order') {
        await fetchSearchOrderProduct();
    }
};
/*
const paginatedProducts=computed(() => {
    const start = (current.value - 1) * 30;
    const end = start + 30;
    return  products.value.slice(start, end);
})
*/
const onChangePage = page => {
    current.value = page;
};

onMounted(() => {
    fetchSearchProducts(route.query.q); 
    watch([activeSearchType, order, current], fetchProducts, {
        immediate: true,
    });
    searchBus.on(query => {
        fetchSearchProducts(query);
    });
    watch(
        () => route.query.q, 
        (newQuery) => {
            fetchSearchProducts(newQuery); 
        }
    );
});
</script>

<template>
    <div class="mt-[48px] text-center">
        <div>
            <a-button
                @click="handleIncrePrice"
                class="mr-6"
                :type="
                    !status && activeSearchType === 'order' && order === 'desc'
                        ? 'primary'
                        : 'default'
                "
                >Sắp xếp giảm dần</a-button
            >
            <a-button
                @click="handleDecrePrice"
                class="mr-6"
                :type="
                    !status && activeSearchType === 'order' && order === 'asc'
                        ? 'primary'
                        : 'default'
                "
                >Sắp xếp tăng dần</a-button
            >
            <a-button
                :type="status ? 'primary' : 'default'"
                @click="handleStatus"
                >Tìm theo giá</a-button
            >
        </div>
        <div v-if="status === true" class="flex justify-center gap-3 mt-6">
            <a-form-item label="Min" name="min">
                <a-input
                    type="number"
                    v-model:value="min"
                    placeholder="Nhập vào"
                />
            </a-form-item>
            <a-form-item label="Max" name="max">
                <a-input
                    type="number"
                    v-model:value="max"
                    placeholder="Nhập vào"
                />
            </a-form-item>
            <a-button type="primary" @click="fetchSearchPriceProduct"
                >Submit</a-button
            >
        </div>
    </div>
    <div
        class="my-[48px] flex-1 overflow-hidden flex flex-col items-center bg-[#fff]"
    >
        <div class="list">
            <ProductItem
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
        <a-pagination
            v-if="products.length > 30"
            class="py-6 text-[1.6rem]"
            v-model:current="current"
            v-model:pageSize="pageSize"
            @change="onChangePage"
            :total="total"
        />
    </div>
</template>
<style lang="scss" scoped>
.list {
    padding: 12px;
    margin-bottom: 24px;
    /* margin-top: 30px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    row-gap: 50px;
}
</style>
