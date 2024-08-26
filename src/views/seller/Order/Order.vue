<script setup>
import { onMounted, ref, watch } from 'vue';
import mainServices from '../../../domain/mainServices';
import { defaultProduct } from '../../../assets';

const activeKey = ref('1');
const slcl = ref(6);
const orders = ref([]);
const isLoading = ref(false);
const pageSize = ref(30);
const current = ref(1);
const total = ref(null);

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: '48%',
        ellipsis: true,
    },
    {
        title: 'Tổng đơn hàng',
        dataIndex: 'total',
        key: 'total',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'tt',
        key: 'tt',
        colSpan: '16%',
        align: 'center',
    },
];
const data = [
    {
        key: 1,
        imgUrl: defaultProduct,
        name: 'Phụ kiện công',
        quantity: 2,
        total: 123,
        status: 'Đã giao',
    },
    {
        key: 2,
        imgUrl: defaultProduct,
        name: 'Phụ kiện công',
        quantity: 2,
        total: 123,
        status: 'Đã giao',
    },
    {
        key: 3,
        imgUrl: defaultProduct,
        name: 'Phụ kiện công',
        quantity: 2,
        total: 123,
        status: 'Đã giao',
    },
];
const getOrderSeller = () => {};

const onChangePage = page => {
    current.value = page;
};

//console.log(user);
const onSearch = () => {};

onMounted(() => {
    watch([current], getOrderSeller, { immediate: true });
    getOrderSeller();
});
</script>

<template>
    <div class="mt-6 mx-6 flex-1 list">
        <h2 class="text-[2.5rem] my-12 font-medium">Đơn hàng</h2>

        <div
            class="bg-[#fff] p-[24px] rounded"
            style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
        >
            <a-tabs v-model:activeKey="activeKey" class="text-[1.6rem]">
                <a-tab-pane key="1" tab="Tất cả">
                    <a-table
                        v-if="data.length > 0"
                        class="mt-[48px] shadow-md"
                        :columns="columns"
                        :data-source="data"
                        :pagination="false"
                    >
                        <template #headerCell="{ column }">
                            <div class="text-[2rem]">{{ column.title }}</div>
                        </template>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'name'">
                                <p class="text-[1.6rem]">
                                    Người nhận:
                                    <span class="font-bold">Nguyễn văn a</span>
                                </p>
                                <div
                                    class="flex items-center justify-between mb-[36px]"
                                >
                                    <div class="flex items-center">
                                        <img
                                            class="w-[80px] object-cover cursor-pointer"
                                            src="https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg"
                                            alt=""
                                        />
                                        <p
                                            class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                                        >
                                            {{ record.name }}
                                            <span class="text-[#888]"
                                                >Mã đơn hàng:
                                                {{ record.key }}</span
                                            >
                                        </p>
                                    </div>
                                    <span>x{{ record.quantity }}</span>
                                </div>
                            </template>
                            <template v-if="column.dataIndex === 'total'">
                                <span class="text-[1.8rem]"
                                    >{{ record.total }}đ</span
                                >
                            </template>
                            <template v-if="column.dataIndex === 'status'">
                                <span class="text-[1.8rem]">{{
                                    record.status
                                }}</span>
                            </template>
                            <template v-if="column.dataIndex === 'tt'">
                                <router-link
                                    :to="{
                                        name: 'SellerOrderDetail',
                                        params: { id: 113 },
                                    }"
                                    >Xem chi tiết</router-link
                                >
                            </template>
                        </template>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane key="2" force-render>
                    <template v-slot:tab> Đang giao </template>
                    Content of Tab Pane 2
                </a-tab-pane>
                <a-tab-pane key="3" tab="Đã giao"
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
