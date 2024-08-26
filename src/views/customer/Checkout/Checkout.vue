<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defaultProduct } from '../../../assets';
import mainServices from '../../../domain/mainServices';
import ModalInfoAddress from '../../../components/modal/ModalInfoAddress.vue';

const route = useRoute();
const showModal = ref(true);
const weight = ref(0);
const items = ref([]);
const address = ref('');
const sumProduct = ref(0);
const feeShip = ref(0);
const total = ref(0);
const info = ref(null);

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: '48%',
        ellipsis: true,
    },
    {
        title: 'Giá',
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
];

const data = ref([]);

const preOrderItems = ref([]);
const getPreOrders = async () => {
    try {
        const res = await mainServices.getPreOrder(route.query.orderId);
        preOrderItems.value = res.data.result;
        data.value = preOrderItems.value.map((item, index) => ({
            key: String(index + 1),
            imgUrl: item.image_url || defaultProduct,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
        }));
        items.value = preOrderItems.value.map((item, index) => ({
            name: item.name,
            quantity: item.quantity,
            weight: item.weight,
        }));
        weight.value = preOrderItems.value.reduce(
            (acc, item) => acc + item.weight,
            0
        );
        sumProduct.value = preOrderItems.value.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    } catch (err) {
        console.log(err);
    }
};

const handleInfoValue = e => {
    info.value = e;
    console.log(info.value);
};

const goToPay = async () => {
    try {
        const res = await mainServices.payment(route.query.orderId);
        window.location.href = res.data.result;
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

onMounted(() => {
    getPreOrders();
});
</script>
<template>
    <div class="checkout">
        <div class="my-[60px]">
            <h2
                class="text-center text-[3.5rem] mb-10 text-[var(--primary-color)] font-bold"
            >
                Thanh toán
            </h2>
            <!-- <div
                class="rounded border-solid border border-[var(--primary-color)]"
            >
                <div
                    class="flex items-center bg-[#fff] text-[#888] text-[16px] h-[60px] px-[20px] py-[30px] shadow-sm"
                >
                    <span class="text-[#000c] w-[68%] text-[2.3rem]">
                        Sản phẩm
                    </span>
                    <span class="w-[16%] text-center">Số lượng</span>
                    <span class="w-[16%] text-center">Thành tiền</span>
                </div>
                <div
                    v-for="n in 3"
                    :key="n"
                    class="last:pb-[20px] first:pt-[15px] flex items-center px-[20px] shadow-sm bg-[#fff] border-solid border-t border-[#ccc]"
                >
                    <div class="flex w-[68%] items-center">
                        <img
                            class="w-[80px] object-cover cursor-pointer"
                            src="https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg"
                            alt=""
                        />
                        <p
                            class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                        >
                            Quần Thun unisex vintage logo New Era hàng Chính
                            hãng-bgsneak
                        </p>
                    </div>
                    <span class="w-[16%] text-center text-[1.8rem]">2</span>
                    <span class="w-[16%] text-center text-[1.8rem]"
                        >239.000đ</span
                    >
                </div>
            </div> -->
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
                            <p
                                class="flex-1 flex flex-col text-[1.8rem] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                            >
                                {{ record.name }}
                            </p>
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
                </template>
            </a-table>
            <div class="flex my-[16px] mt-10">
                <div
                    class="flex flex-col gap-6 p-5 bg-white text-[1.6rem] w-[50%] shadow-xl"
                >
                    <h2
                        class="text-[2rem] text-[var(--primary-color)] font-bold"
                    >
                        Thông tin giao hàng
                    </h2>
                    <div>
                        <span>Họ tên</span>
                        <span>{{ info ? info.name : '' }} </span>
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <span>{{ info ? info.phone : '' }} </span>
                    </div>
                    <div>
                        <span>Địa chỉ</span>
                        <span>{{ info ? info.address : '' }} </span>
                    </div>
                </div>
                <div
                    class="ml-auto flex flex-col gap-6 p-5 bg-white text-[1.6rem] w-[40%] shadow-xl"
                >
                    <h2
                        class="text-[2rem] text-[var(--primary-color)] font-bold"
                    >
                        Chi phí
                    </h2>
                    <p>
                        Tổng giá:
                        <span class="float-right">{{ sumProduct }}đ</span>
                    </p>
                    <p>
                        Phí vận chuyển:
                        <span class="float-right">{{ feeShip }}đ</span>
                    </p>
                    <p class="text-[2rem] text-[var(--primary-color)]">
                        Tổng:
                        <span class="float-right">{{ total }}đ</span>
                    </p>
                </div>
            </div>
            <button
                class="float-right mt-[15px] mb-[60px] py-5 px-36 bg-[var(--primary-color)] rounded text-[2rem] text-white uppercase hover:opacity-85"
                @click="goToPay"
            >
                Thanh toán
            </button>
        </div>
    </div>
    <ModalInfoAddress
        :show="showModal"
        :weight="weight"
        :itemsPro="items"
        @setShowStatus="showModal = $event"
        @setInfoValue="handleInfoValue"
    />
</template>
