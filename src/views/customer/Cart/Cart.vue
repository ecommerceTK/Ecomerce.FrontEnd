<script setup>
import { ShoppingFilled } from '@ant-design/icons-vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import CartItem from '../../../components/customer/CartItem';
import mainServices from '../../../domain/mainServices';

const router = useRouter();

const cartItems = ref([]);
const plainOptions = ref([]);
const state = reactive({
    indeterminate: true,
    checkAll: false,
    checkedList: [],
});

const getItemCart = async () => {
    try {
        const res = await mainServices.getItemCart();
        console.log(res);
        cartItems.value = res.data.result;
        plainOptions.value = cartItems.value.map(item => item.id);
    } catch (err) {
        console.log(err);
    }
};

const onCheckAllChange = e => {
    Object.assign(state, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
    });
};

watch(
    () => state.checkedList,
    val => {
        state.indeterminate = !!val.length && val.length < plainOptions.length;
        state.checkAll = val.length === plainOptions.length;
    }
);

const checkout = () => {
    router.push('/checkout');
};
onMounted(() => {
    getItemCart();
});
</script>

<template>
    <div class="cart">
        <div
            class="flex items-center justify-center gap-6 text-[3.5rem] mb-10 my-[60px] text-[var(--primary-color)] font-bold"
        >
            <ShoppingFilled class="text-[var(--primary-color)]" />
            Giỏ hàng
        </div>
        <div
            class="flex items-center bg-[#fff] text-[#888] text-[1.8rem] h-[55px] mb-[12px] px-[20px] shadow-sm"
        >
            <!-- <input 
            class="min-w-[60px] pr-[15px] pl-[25px]"
            type="checkbox"
            > -->
            <a-checkbox
                class="min-w-[60px]"
                v-model:checked="state.checkAll"
                :indeterminate="state.indeterminate"
                @change="onCheckAllChange"
            />
            <span class="text-[#000c] w-[46%]"> Sản phẩm </span>
            <span class="w-[16%] text-center">Đơn giá</span>
            <span class="w-[16%] text-center">Số lượng</span>
            <span class="w-[16%] text-center">Thành tiền</span>
            <span class="w-[12%] text-center">Thao tác</span>
        </div>
        <div>
            <a-checkbox-group
                v-model:value="state.checkedList"
                :options="plainOptions"
            />
            <CartItem
                v-for="cartItem in cartItems"
                :key="cartItem.id"
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
</template>
