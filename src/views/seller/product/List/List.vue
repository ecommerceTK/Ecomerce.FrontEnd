<script setup>
import { onMounted, ref, watch } from 'vue';
import ProductItem from '../../../../components/seller/ProductItem';
import mainServices from '../../../../domain/mainServices';

const activeKey = ref('1');
const slcl = ref(6);
const products = ref([]);
const isLoading = ref(false);
const pageSize = ref(30);
const current = ref(1);
const total = ref(null);

const getProductSeller = async () => {
    try {
        const res = await mainServices.getProductOfSeller(
            current.value - 1,
            pageSize.value
        );
        //console.log(res);
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
    } catch (err) {
        console.log(err);
    }
};

const onChangePage = page => {
    current.value = page;
};

//console.log(user);
const onSearch = () => {};

onMounted(() => {
    watch([current], getProductSeller, { immediate: true });
    getProductSeller();
});
</script>

<template>
    <div class="mt-6 mx-6 flex-1 list">
        <h2 class="text-[2.5rem] my-12 font-medium">Sản phẩm</h2>
        <div
            class="bg-[#fff] p-[24px] rounded"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <a-tabs v-model:activeKey="activeKey" class="text-[1.6rem]">
                <a-tab-pane key="1" tab="Tất cả">
                    <div class="mb-[24px]">
                        <h3 class="text-[2.5rem] font-semibold m-0">
                            0 Sản phẩm
                        </h3>
                        <span class="text-[1.3rem] text-[#857575]"
                            >Hạn mức đăng bán: 3000</span
                        >
                    </div>
                    <a-input-search
                        class="searchInput max-w-[336px] mb-[24px] h-[38px]"
                        placeholder="Tìm sản phẩm"
                        enter-button
                        @search="onSearch"
                    />
                    <div style="border: 1px solid #e5e5e5">
                        <div
                            class="flex items-center bg-[#f6f6f6] text-[#888] text-[16px] h-[86px] mb-[12px] px-[20px] pb-[36px] shadow-sm"
                        >
                            <span class="text-[#000c] w-[46%]">
                                Tên sản phẩm
                            </span>
                            <span class="w-[16%] text-center">Doanh số</span>
                            <span class="w-[16%] text-center"
                                >Giá(Đơn vị: vnđ)</span
                            >
                            <span class="w-[16%] text-center">Kho hàng</span>
                            <span class="w-[12%] text-center">Thao tác</span>
                        </div>
                        <div v-if="isLoading">Loading...</div>
                        <ProductItem
                            v-for="product in products"
                            :key="product.productResponse.id"
                            :product="product"
                            @refreshList="getProductSeller"
                        />
                        <a-pagination
                            class="text-center py-6 text-[1.6rem]"
                            v-model:current="current"
                            v-model:pageSize="pageSize"
                            @change="onChangePage"
                            :total="total"
                            :show-size-changer="false"
                        />
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2" force-render>
                    <template v-slot:tab> Đang hoạt động({{ slcl }}) </template>
                    Content of Tab Pane 2
                </a-tab-pane>
                <a-tab-pane key="3" tab="Hết hàng"
                    >Content of Tab Pane 3</a-tab-pane
                >
            </a-tabs>
        </div>
    </div>
</template>
<style lang="scss">
.searchInput {
    input {
        padding: 8px 6px;
    }
    .ant-input-search-button {
        height: 40px;
        .anticon {
            position: relative;
            top: -2px;
        }
    }
}
</style>
