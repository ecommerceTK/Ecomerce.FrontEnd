<script setup>
import { onMounted, ref, watch } from 'vue';
import AllProduct from '../../../../components/seller/list/AllProduct';
import TopProduct from '../../../../components/seller/list/TopProduct';
import EmptyProduct from '../../../../components/seller/list/EmptyProduct';

const activeKey = ref('1');
const slcl = ref(6);
const totalList = ref(0);

</script>

<template>
    <div class="mt-6 mx-6 flex-1 list">
        <h2 class="text-[2.5rem] my-12 font-medium">Sản phẩm</h2>
        <a-input-search
            class="searchInput max-w-[336px] mb-[24px] h-[38px]"
            placeholder="Tìm sản phẩm"
            enter-button
            @search="onSearch"
        />
        <div
            class="bg-[#fff] p-[24px] rounded"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <a-tabs v-model:activeKey="activeKey" class="text-[1.6rem]">
                <a-tab-pane key="1">
                    <template v-slot:tab> Tất cả({{ totalList }}) </template>
                    <AllProduct @setShowTotal="totalList = $event"/>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" force-render>
                    <template v-slot:tab> Đang hoạt động({{ slcl }}) </template>
                    <TopProduct />
                </a-tab-pane>
                <a-tab-pane key="3" tab="Hết hàng">
                    <EmptyProduct />
                </a-tab-pane> -->
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
