<script lang="ts" setup>
import { defaultProduct } from '../../../../assets';
import { DownOutlined } from '@ant-design/icons-vue';
const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: '46%' },
    {
        title: 'Doanh số',
        dataIndex: 'total',
        key: 'total',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Giá(Đơn vị: vnd)',
        dataIndex: 'price',
        key: 'price',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Kho hàng',
        dataIndex: 'quantity',
        key: 'quantity',
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

const data = [];
for (let i = 0; i < 3; ++i) {
    data.push({
        key: i,
        total: 123,
        price: 1 + i,
        quantity: 12,
        name: 'Máy khoan',
        imgUrl: defaultProduct,
    });
}

const innerColumns = [
    { title: 'Màu sắc', dataIndex: 'color', key: 'color', align: 'center' },
    { title: 'Size', dataIndex: 'size', key: 'size', align: 'center' },
    { title: 'Giá', key: 'price', dataIndex: 'price', align: 'center' },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
    },
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
    innerData.push({
        key: i,
        color: 'T',
        size: 'm',
        price: '123',
        quantity: 1 + i,
    });
}
</script>

<template>
    <a-table
        :columns="columns"
        :data-source="data"
        class="components-table-demo-nested"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <div class="flex items-center">
                    <img
                        class="w-[80px] object-cover cursor-pointer"
                        :src="record.imgUrl"
                        alt=""
                    />
                    <p
                        class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                    >
                        {{ record.name }}
                        <span class="text-[#888]"
                            >ID sản phẩm: {{ record.key }}</span
                        >
                    </p>
                </div>
            </template>
            <template v-if="column.key === 'total'">
                <span class="text-[1.8rem]">{{ record.total }}</span>
            </template>
            <template v-if="column.key === 'price'">
                <span class="text-[1.8rem]">{{ record.price }}</span>
            </template>
            <template v-if="column.key === 'quantity'">
                <span class="text-[1.8rem]">{{ record.quantity }}</span>
            </template>
            <template v-if="column.key === 'tt'">
                <div class="flex flex-col items-center gap-3">
                    <a-button>Cập nhật</a-button>
                    <a-button>Xoá</a-button>
                </div>
            </template>
        </template>
        <template #expandedRowRender>
            <a-table
                :columns="innerColumns"
                :data-source="innerData"
                :pagination="false"
            />
        </template>
    </a-table>
</template>
