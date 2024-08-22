<script setup>
import { computed, ref, toRefs, watch, onMounted, watchEffect } from 'vue';
import mainServices from '../../../../domain/mainServices';
import ProductItem from '../../ProductItem';

const pageSize = ref(32);
const current = ref(1);
const total = ref(null);
const props = defineProps({
    categoryId: [String, Number],
});
const { categoryId } = toRefs(props);
const products = ref([]);
const isLoading = ref(false);

//const array = Array.from({ length: 100 }, (_, index) => index + 1);
//console.log(array);

const fetchProducts = async () => {
    try {
        isLoading.value = true;
        let res;
        if (categoryId.value === 'all') {
            res = await mainServices.getAllProduct(
                current.value - 1,
                pageSize.value
            );
        } else {
            res = await mainServices.getProductbyCategory(
                categoryId.value,
                current.value - 1,
                pageSize.value
            );
        }
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
        //console.log(products.value);
    } catch (err) {
        isLoading.value = false;
        console.log(err);
    }
};

// const paginatedProducts=computed(() => {

//     const start = (current.value - 1) * pageSize.value;
//     const end = start + pageSize.value;
//     return  products.value.slice(start, end);
// })
const onChangePage = page => {
    current.value = page;
};

const onShowSizeChange = (current, pageSize) => {
    //console.log(current, pageSize);
    // show-size-changer
    // @showSizeChange="onShowSizeChange"
};
watch(pageSize, () => {
    console.log('pageSize', pageSize.value);
});

onMounted(() => {
    watch([categoryId, current], fetchProducts, { immediate: true });
    fetchProducts();
});
</script>

<template>
    <div class="flex-1 overflow-hidden flex flex-col bg-[#fff]">
        <div class="list">
            <ProductItem
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
        <a-pagination
            class="text-center py-6 text-[1.6rem]"
            v-model:current="current"
            v-model:pageSize="pageSize"
            @change="onChangePage"
            :total="total"
            :show-size-changer="false"
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
