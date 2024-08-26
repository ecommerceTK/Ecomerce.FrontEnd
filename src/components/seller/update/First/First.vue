<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { useAuthToken } from '../../../../storage/useAuthToken';
import mainServices from '../../../../domain/mainServices';
import ModalSelectCategory from '../../../modal/ModalSelectCategory.vue';
import { message } from 'ant-design-vue';

const props = defineProps({
    product: Object,
});
const { product } = toRefs(props);
const openModal = ref(false);
const cateValue = ref(null);
const formState = reactive({
    name: product.value.name,
    weight: product.value.weight,
    categoryId: product.value.categoryId,
    description: product.value.description,
});

const handleSetCategory = e => {
    cateValue.value = e;
    formState.categoryId = cateValue.value.id;
};

const onSubmit = () => {};

onMounted(() => {
    console.log(product.value);
});
</script>

<template>
    <div>
        <h3 class="text-[2.5rem] font-semibold mb-[24px]">Thông tin cơ bản</h3>
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            class="float-left w-[80%]"
        >
            <a-form-item
                label="Tên sản phẩm"
                name="name"
                :rules="[
                    {
                        required: true,
                        message: 'Please input your productName!',
                    },
                ]"
            >
                <a-input
                    v-model:value="formState.name"
                    placeholder="Nhập vào"
                />
            </a-form-item>

            <a-form-item
                label="Cân nặng"
                name="weight"
                :rules="[
                    {
                        required: true,
                        message: 'Please input your productWeight!',
                    },
                ]"
            >
                <a-input
                    v-model:value="formState.weight"
                    placeholder="Nhập vào"
                />
            </a-form-item>

            <a-form-item
                label="Ngành hàng"
                name="category"
                :rules="[
                    {
                        required: true,
                        message: 'Please input your productCategory!',
                    },
                ]"
            >
                <div
                    @click="handleOpenModal"
                    class="p-2 border-solid border border-[#d9d9d9] rounded-lg cursor-pointer"
                >
                    <span
                        class="text-[#cac2c2]"
                        :style="{ color: cateValue ? 'black' : '' }"
                        >{{
                            cateValue
                                ? cateValue.value.join('>')
                                : 'Chọn ngành hàng'
                        }}</span
                    >
                    <EditOutlined
                        class="float-right p-2 text-[18px] text-[#b3acac]"
                    />
                </div>
            </a-form-item>

            <a-form-item
                label="Mô tả"
                name="desc"
                :rules="[
                    {
                        required: true,
                        message: 'Please input your productDescription!',
                    },
                ]"
            >
                <a-textarea
                    v-model:value="formState.description"
                    placeholder="Nhập mô tả sản phẩm"
                    :rows="4"
                />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button class="uppercase float-right" type="primary" @click="onSubmit"
                    >Cập nhật</a-button
                >
            </a-form-item>
        </a-form>

        <ModalSelectCategory
            :open="openModal"
            @setShowStatus="openModal = $event"
            @setCateValue="handleSetCategory"
            v-model:value="cateValue"
        />
    </div>
</template>
