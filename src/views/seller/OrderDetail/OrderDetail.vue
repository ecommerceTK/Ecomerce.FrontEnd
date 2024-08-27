<script setup>
    import {UngroupOutlined, EnvironmentOutlined, InfoCircleOutlined} from '@ant-design/icons-vue';
    import { defaultAvatar, defaultProduct } from '../../../assets';

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            colSpan: '6%',
            align: 'center',
        },    
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '46%',
            ellipsis: true,
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            colSpan: '16%',
            align: 'center',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            colSpan: '16%',
            align: 'center',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            colSpan: '16%',
            align: 'center',
        },
        ,
        {
            title: 'Phí vận chuyển',
            dataIndex: 'feeShip',
            key: 'feeShip',
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
            price: 12,
            total: 123,
            feeShip: 113,
            status: 'Đã giao'
        },
        {
            key: 2,
            imgUrl: defaultProduct,
            name: 'Phụ kiện công',
            quantity: 2,
            price: 12,
            total: 123,
            feeShip: 113,
            status: 'Đã giao',
        },
        {
            key: 3,
            imgUrl: defaultProduct,
            name: 'Phụ kiện công',
            quantity: 2,
             price: 12,
            total: 123,
            feeShip: 113,
            status: 'Đã giao',
        },
    ];
</script>

<template>
    <div class="p-[24px] w-full">
        <span class="text-[2.5rem]">Chi tiết đơn hàng</span>
        <div class="p-[24px] my-[36px] rounded bg-[#fff]">
            <div class="mb-[24px]">
                <div class="flex gap-3 items-center mb-3">
                    <UngroupOutlined class="text-[2rem] text-[var(--primary-color)]"/>
                    <span class="text-[1.8rem] font-bold ml-3">Mã đơn hàng</span>
                </div>
                <span class="text-[1.8rem] ml-12">#2301372yez</span>
            </div>
            <div class="mb-[24px]">
                <div class="flex gap-3 items-center mb-3">
                    <EnvironmentOutlined class="text-[2rem] text-[var(--primary-color)]"/>
                    <span class="text-[1.8rem] font-bold">Địa chỉ đơn hàng </span>
                </div>
                <span class="text-[1.8rem] ml-12">Nhà số 5, Mễ Trì, Nam Từ Liêm, Hà Đông</span>
            </div>
            <div class="mb-[24px]">
                <div class="flex gap-3 items-center mb-3">
                    <InfoCircleOutlined class="text-[2rem] text-[var(--primary-color)]"/>
                    <span class="text-[1.8rem] font-bold">Thông tin vân chuyển</span>
                </div>
                <div class="mt-[12px] ml-12">
                    <div class="flex gap-3 items-center mb-3">
                        <img :src="defaultAvatar" alt="" class="max-w-[36px] rounded-full">
                        <span class="text-[1.8rem] font-semibold uppercase text-[#888]">Nguyễn Văn A</span>
                    </div>
                    <span class="text-[1.8rem] text-[#888]">Total: 3 products</span>
                    <div class="text-green-500 text-[1.8rem] mt-3">
                        Trạng thái: 
                        <span>Giao hàng thành công</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <a-table
                v-if="data.length > 0"
                class="mt-[48px] shadow-md"
                :columns="columns"
                :data-source="data"
                :pagination="false"
            >
                <template #headerCell="{ column }">
                    <div class="text-[2rem] text-[#888]">{{ column.title }}</div>
                </template>
                <template #bodyCell="{ column, record }">
                     <template v-if="column.dataIndex === 'stt'">
                        <span>{{record.key}}</span>
                     </template>
                    <template v-if="column.dataIndex === 'name'">
                        <div class="flex items-center">
                            <img
                                class="w-[80px] object-cover cursor-pointer"
                                :src="
                                    record.imgUrl
                                        ? record.imgUrl
                                        : defaultProduct
                                "
                                alt=""
                            />
                            <div class="flex flex-col gap-3">
                                <span>{{ record.name }}</span>
                                <!-- <div class="flex gap-3">
                                    <span>Phân loại:</span>
                                    <div>
                                        <span v-if="record.valueCombi.value1_name" class="mr-3">{{record.valueCombi.value1_name}},</span>
                                        <span v-if="record.valueCombi.value2_name">{{record.valueCombi.value2_name}}</span>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </template>
                    <template v-if="column.dataIndex === 'price'">
                        <span class="text-center text-[1.8rem]">{{
                            record.price
                        }}</span>
                    </template>
                    <template v-if="column.dataIndex === 'quantity'">
                        <span class="text-center text-[1.8rem]"
                            >x{{ record.quantity }}</span
                        >
                    </template>
                    <template v-if="column.dataIndex === 'total'">
                        <span class="text-center text-[1.8rem]"
                            >{{ record.total }}đ</span
                        >
                    </template>
                    <template v-if="column.dataIndex === 'feeShip'">
                        <span class="text-center text-[1.8rem]"
                            >{{ record.feeShip }}</span
                        >
                    </template>
                </template>
            </a-table>
        </div>
    </div>

</template>