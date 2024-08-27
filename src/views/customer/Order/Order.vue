<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defaultProduct } from '../../../assets';
import mainServices from '../../../domain/mainServices';

const route = useRoute();
const orderItem = ref([]);
const data = ref([]);

const columns = [
    {
        title: 'Mã',
        dataIndex: 'code',
        key: 'stt',
        width: '120px',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: '48%',
        ellipsis: true,
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Tổng',
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
];

const getOrderDetail = async() => {
    try {
        const res = await mainServices.getOrderDetail(route.query.order_code);
        orderItem.value=res.data.result;
        console.log(orderItem.value);
        data.value = orderItem.value.map((item, index) => ({
            key: item.ord_item_code,
            imgUrl: item.ord_item_image || defaultProduct,
            name: item.ord_item_name,
            value1: item.ord_item_product_value1,
            value2: item.ord_item_product_value2,
            quantity:item.ord_item_quantity, 
            total: item.ord_item_quantity*item.ord_item_price,
            status: item.ord_item_status,
        }));
    } catch(err) {
        console.log(err);
    }
}
onMounted(() => {
    getOrderDetail();
})
</script>

<template>
    <!-- <div class="my-[24px] p-[24px] bg-white rounded">
       <span class="text-[2.5rem]">Thông tin chi tiết đơn hàng</span> 
       <div class="mt-[24px] flex flex-col gap-6">
            <div class="flex gap-3 items-center mb-3 text-[1.8rem]">
                <span class="font-bold">Mã đơn hàng:</span>
                <span class="text-[#888] ml-3">#01234</span>
            </div>
            <div class="mt-[24px]">
                <span class="text-[1.8rem] font-bold mb-6">Sản phẩm</span>
                <div class="flex gap-3 items-center" v-for="n in 3" :key="n">
                    <img :src="defaultProduct" alt="" class="w-[120px]">

                    <div class="flex flex-col gap-3 text-[1.8rem] text-[#888]">
                        <span>Quần áo</span>
                        <div class="flex gap-3">
                            <span>Phân loại:</span>
                            <div>
                                <span class="mr-3">Xanh</span>
                                <span >Trắng</span>
                            </div>
                        </div>
                    </div>

                    <span class="ml-12 text-[1.8rem] text-[#888]">x2</span>
                    <span class="ml-6 text-[1.8rem] text-[#888]">123 000 đ</span>
                </div>
            </div>
            <div class="flex gap-3 items-center mb-3 text-[1.8rem]">
                <span class="font-bold">Phí vận chuyển:</span>
                <span class="text-[#888] ml-3">123đ</span>
            </div>
            <div class="flex gap-3 items-center mb-3 text-[1.8rem]">
                <span class="font-bold">Tổng tiền:</span>
                <span class="text-[#888] ml-3">123đ</span>
            </div>
            <div class="flex gap-3 items-center mb-3 text-[1.8rem]">
                <span class="font-bold">Trạng thái:</span>
                <span class="text-[var(--primary-color)] ml-3">Đang giao</span>
            </div>
       </div>
    </div> -->

    <a-table
        class="my-[48px] shadow-md"
        :columns="columns"
        :data-source="data"
        :pagination="false"
    >
        <template #headerCell="{ column }">
            <div class="text-[2rem]">{{ column.title }}</div>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'code'">
                <span
                    class="min-w-[100px] pr-[15px] pl-[25px] text-[#888] text-center text text-[1.6rem]"
                    >#{{ record.key }}</span
                >
            </template>
            <template v-if="column.dataIndex === 'name'">
                <div class="flex items-center">
                    <img
                        class="w-[80px] object-cover cursor-pointer"
                        :src="`http://${record.imgUrl}`"
                        alt=""
                    />
                    <div
                        class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                    >
                        <span>{{ record.name }}</span>
                        <div class="flex gap-3">
                            <span>Phân loại:</span>
                            <div>
                                <span v-if='record.value1' class="mr-3">{{record.value1}}</span>
                                <span v-if='record.value2'>{{record.value2}}</span>
                            </div>
                        </div>   
                    </div>
                </div>
            </template>
            <template v-if="column.dataIndex === 'quantity'">
                <span
                    class="min-w-[100px] pr-[15px] pl-[25px] text-[#888] text-center text text-[1.6rem]"
                    >x{{ record.quantity }}</span
                >
            </template>
            <template v-if="column.dataIndex === 'total'">
                <span
                    class="min-w-[100px] pr-[15px] pl-[25px] text-[#888] text-center text text-[1.6rem]"
                    >{{ record.total }}đ</span
                >
            </template>
            <template v-if="column.dataIndex === 'status'">
                <span
                    class="min-w-[100px] pr-[15px] pl-[25px] text-[#888] text-center text text-[1.6rem]"
                    >{{ record.status }}</span
                >
            </template>
        </template>
    </a-table>
</template>