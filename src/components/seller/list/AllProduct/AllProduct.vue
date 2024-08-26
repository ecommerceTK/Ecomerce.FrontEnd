<script lang="ts" setup>
import { defaultProduct } from '../../../../assets';
import { DownOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, watch } from 'vue';
import mainServices from '../../../../domain/mainServices';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const products = ref([]);
const isLoading = ref(false);
const pageSize = ref(30);
const current = ref(1);
const total = ref(null);

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: '46%',
        ellipsis: true,
    },
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

const data = ref([]);
const updateData = () => {
    data.value = products.value.map(product => ({
        key: product.product_id,
        price: product.price,
        quantity: product.quantity,
        name: product.product_name,
        imgUrl: product.image_url,
        sold: null,
    }));
};

const innerColumns = ref([]);
const innerData = ref([]);

const onExpand = (expanded, record) => {
    //console.log(record)
    if (expanded) {
        const findInner = products.value.find(
            product => product.product_id === record.key
        );
        innerColumns.value[record.key] = [];
        console.log(findInner);

        findInner.assortments.forEach((ass, index) => {
            innerColumns.value[record.key].push({
                title: ass.name,
                key: `ass_${index}`,
                dataIndex: `${index + 1}`,
                align: 'center',
            });
        });

        innerColumns.value[record.key].push(
            { title: 'Giá', key: 'price', dataIndex: 'price', align: 'center' },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
                align: 'center',
            }
        );
        innerData.value[record.key] = findInner.options;
        console.log(innerColumns.value[record.key]);
        console.log(innerData.value[record.key]);
    }
};

const goToUpdateProduct = id => {
    router.push({
        name: 'UpdateSellerProduct',
        params: { id: id },
    });
};

const getProductSeller = async () => {
    try {
        const res = await mainServices.getProductOfSeller(
            current.value - 1,
            pageSize.value
        );
        //console.log(res);
        products.value = res.data.result.content;
        total.value = res.data.result.totalElements;
        updateData();
    } catch (err) {
        console.log(err);
    }
};

const onChangePage = page => {
    current.value = page;
};

const deleteProduct = async id => {
    try {
        const res = await mainServices.deleteProduct(id);
        console.log(res);
        message.info('Xoá thành công');
        getProductSeller();
    } catch (err) {
        console.log(err);
    }
};

//console.log(user);
const onSearch = () => {};

onMounted(() => {
    watch([current], getProductSeller, { immediate: true });
    getProductSeller();
});
</script>

<template>
    <a-table
        :columns="columns"
        :data-source="data"
        @expand="onExpand"
        :rowKey="record => record.key"
        class="components-table-demo-nested"
        :pagination="false"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <div class="flex items-center">
                    <img
                        class="w-[80px] object-cover cursor-pointer"
                        :src="
                            record.imgUrl
                                ? `http://${record.imgUrl}`
                                : defaultProduct
                        "
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
                <span class="text-[1.8rem]">{{
                    record.sold ? record.sold * record.price : 0
                }}</span>
            </template>
            <template v-if="column.key === 'price'">
                <span class="text-[1.8rem]">{{ record.price }}</span>
            </template>
            <template v-if="column.key === 'quantity'">
                <span class="text-[1.8rem]">{{ record.quantity }}</span>
            </template>
            <template v-if="column.key === 'tt'">
                <div class="flex flex-col items-center gap-3">
                    <a-button
                        @click="deleteProduct(record.key)"
                        type="primary"
                        danger
                        >Xoá</a-button
                    >
                </div>
            </template>
        </template>
        <template #expandedRowRender="{ record }">
            <a-table
                :columns="innerColumns[record.key]"
                :data-source="innerData[record.key]"
                :pagination="false"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === '1'">
                        <span>{{ record.value1 }}</span>
                    </template>
                    <template v-if="column.dataIndex === '2'">
                        <span>{{ record.value2 }}</span>
                    </template>
                    <template v-if="column.dataIndex === 'price'">
                        <span>{{ record.price }}</span>
                    </template>
                    <template v-if="column.dataIndex === 'quantity'">
                        <span>{{ record.quantity }}</span>
                    </template>
                </template>
            </a-table>
        </template>
    </a-table>
    <a-pagination
        class="text-center py-6 text-[1.6rem]"
        v-model:current="current"
        v-model:pageSize="pageSize"
        @change="onChangePage"
        :total="total"
        :show-size-changer="false"
    />
</template>
