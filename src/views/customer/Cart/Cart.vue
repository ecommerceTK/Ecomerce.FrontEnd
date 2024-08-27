<script setup>
import {
    ShoppingFilled,
    DeleteFilled,
    MinusOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons-vue';
import { h } from 'vue';
import { onMounted, reactive, ref, watch, computed, unref } from 'vue';
import { useRouter } from 'vue-router';
import mainServices from '../../../domain/mainServices';
import { defaultProduct } from '../../../assets';
import { message } from 'ant-design-vue';

const router = useRouter();
const cartItems = ref([]);
const data = ref([]);
const count = ref([]);
const listOrderProducts = ref([]);
const showLoading = ref(false);
const cartItemCount = ref(0);
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        width: '46%',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Thành tiền',
        dataIndex: 'money',
        colSpan: '16%',
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'tt',
        colSpan: '16%',
        align: 'center',
    },
];

const getItemCart = async () => {
    try {
        const res = await mainServices.getItemCart();
        console.log(res);
        cartItems.value = res.data?.result;
        updateData();
    } catch (err) {
        console.log(err);
    }
};

const handleDeleteCartItem = async id => {
    //console.log(id);
    try {
        const res = await mainServices.deleteCartItem({
            item_ids: [
                {
                    cart_item_id: id,
                },
            ],
        });
        getItemCart();
    } catch (err) {
        console.log(err);
        message.error('Đã có lỗi xảy ra');
    }
};

const handleUpdateCartItem = async () => {
    //console.log(id);
    const countWithoutPrice = count.value.map(({ price, ...rest }) => rest);
    try {
        const res = await mainServices.updateCartItem({
            updateItems: countWithoutPrice,
        });
    } catch (err) {
        console.log(err);
        message.error('Đã có lỗi xảy ra');
    }
};

const updateData = () => {
    data.value = cartItems.value.map(cartItem => ({
        key: cartItem.id,
        price: cartItem.price,
        quantity: cartItem.quantity,
        name: cartItem.name,
        imgUrl: cartItem.imgUrl,
        valueCombi: cartItem.value_combination_details,
    }));

    // console.log(cartItems);
    // console.log(data);

    count.value = cartItems.value.map(item => ({
        cartItem_id: item.id,
        quantity: item.quantity,
        price: item.price,
    }));
};
const total = computed(() => {
    return count.value
        .filter(item => listOrderProducts.value.includes(item.cartItem_id)) // Lọc các mục có id nằm trong listOrderProducts
        .reduce((sum, item) => sum + item.quantity * item.price, 0); // Tính tổng giá trị
});

const decline = index => {
    if (count.value[index].quantity >= 1) {
        count.value[index].quantity--;
        handleUpdateCartItem();
    }
};

const increase = index => {
    count.value[index].quantity++;
    handleUpdateCartItem();
};

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        listOrderProducts.value = selectedRowKeys;
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const checkOrder = async id => {
    try {
        showLoading.value = true;
        const intervalId = setInterval(async () => {
            const res = await mainServices.checkOrder(id);

            if(res.data.result) {
                if (res.data.result === 'Success') {
                    clearInterval(intervalId);
                router.push({
                    path: '/checkout', // Đường dẫn tới trang checkout
                    query: {
                        // Truyền tham số qua query
                        orderId: id,
                    },
                });
            } else if (res.data.result === 'Failed') {
                message.error(
                    'Một số mặt hàng không đáp ứng số lượng yêu cầu của bạn. Vui lòng kiểm tra lại'
                );
                clearInterval(intervalId);
                showLoading.value = false;
            }
            } else {
                message.error(
                    'Vui lòng thử lại'
                );
                clearInterval(intervalId);
                showLoading.value = false;
            }
        }, 500);
        

    } catch (err) {
        console.log(err);
        message.error('Đã có lỗi xảy ra');
    }
};

const checkout = async () => {
    if (total.value == 0) return message.error('Bạn chưa chọn mặt hàng nào');
    try {
        const res = await mainServices.addToOrder({
            cartItemIds: listOrderProducts.value,
        });
        await checkOrder(res.data.result.orderId);
    } catch (err) {
        console.log(err);
    }
};

onMounted(() => {
    getItemCart();
});
</script>

<template>
    <!-- <div class="cart">
        <div
            class="flex items-center justify-center gap-6 text-[3.5rem] mb-10 my-[60px] text-[var(--primary-color)] font-bold"
        >
            <ShoppingFilled class="text-[var(--primary-color)]" />
            Giỏ hàng
        </div>
        <div
            class="flex items-center bg-[#fff] text-[#888] text-[1.8rem] h-[55px] mb-[12px] px-[20px] shadow-sm"
        >
            <span class="text-[#000c] w-[46%]"> Sản phẩm </span>
            <span class="w-[16%] text-center">Đơn giá</span>
            <span class="w-[16%] text-center">Số lượng</span>
            <span class="w-[16%] text-center">Thành tiền</span>
            <span class="w-[12%] text-center">Thao tác</span>
        </div>
        <div>
            <CartItem
                v-for="cartItem in cartItems"
                :key="record.id"
                :cartItem="cartItem"
            /> 
        </div>
        <div class="text-[#000c] px-[20px] bg-[#fff] text-[1.8rem] py-3 w-full">
            <span class="ml-[16px] text-[var(--primary-color)]">Tổng</span>
            <span
                class="float-right mr-[12%] w-[12%] text-center text-[var(--primary-color)]"
                >239.000đ</span
            >
        </div>
        <button
            class="my-[36px] text-[1.8rem] text-white p-3 px-6 bg-[var(--primary-color)] rounded float-right hover:opacity-60"
            @click="checkout"
        >
            Mua hàng
        </button>
    </div> 
    -->

    <div
        v-if="cartItems.length > 0"
        class="flex items-center justify-center gap-6 text-[3.5rem] my-[60px] text-[var(--primary-color)] font-bold"
    >
        <ShoppingFilled class="text-[var(--primary-color)]" />
        Giỏ hàng
    </div>

    <a-table
        class="mt-[60px]"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        :pagination="false"
    >
        <template #bodyCell="{ record, column, index }">
            <div class="flex items-center" v-if="column.dataIndex === 'name'">
                <img
                    class="w-[80px] object-cover cursor-pointer"
                    :src="record.imgUrl ? record.imgUrl : defaultProduct"
                    alt=""
                />
                <div
                    class="flex-1 flex flex-col text-[16px] pt-[5px] pr-[20px] pl-[10px] overflow-hidden"
                >
                    <span>{{ record.name }}</span>
                    <div class="flex gap-3">
                        <span>Phân loại:</span>
                        <div>
                            <span v-if="record.valueCombi.value1_name" class="mr-3">{{record.valueCombi.value1_name}}</span>
                            <span v-if="record.valueCombi.value2_name">{{record.valueCombi.value2_name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <span
                class="text-center text-[1.8rem]"
                v-if="column.dataIndex === 'price'"
                >{{ record.price }}đ</span
            >
            <div
                class="flex justify-center cursor-pointer text-[1.8rem] z-2"
                v-if="column.dataIndex === 'quantity'"
            >
                <a-button-group>
                    <a-button @click="decline(index)">
                        <minus-outlined />
                    </a-button>
                    <a-button class="cursor-default">{{
                        count[index].quantity
                    }}</a-button>
                    <a-button @click="increase(index)">
                        <plus-outlined />
                    </a-button>
                </a-button-group>
            </div>
            <span
                class="text-center text-[1.8rem]"
                v-if="column.dataIndex === 'money'"
                >{{ record.price * count[index].quantity }}đ</span
            >
            <span
                class="text-center text-red-600 text-[1.8rem]"
                v-if="column.dataIndex === 'tt'"
            >
                <DeleteFilled @click="handleDeleteCartItem(record.key)" />
            </span>
        </template>
    </a-table>
    <div class="text-[2rem] text-[var(--primary-color)] mt-3">
        <span class="mx-6">Tổng:</span>
        <span class="">{{ total }}</span>
    </div>
    <button
        class="my-[36px] text-[1.8rem] float-end text-white p-3 px-6 bg-[var(--primary-color)] rounded hover:opacity-60"
        @click="checkout"
    >
        Mua hàng
    </button>
    <a-spin
        v-if="showLoading"
        :indicator="indicator"
        class="z-[1000] fixed inset-0 flex items-center justify-center"
        style="background-color: rgba(0, 0, 0, 0.3)"
    />
</template>
