<script setup>
import { reactive, ref, toRefs } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { useAuthToken } from '../../../../storage/useAuthToken';
import mainServices from '../../../../domain/mainServices';
import ModalSelectCategory from '../../../modal/ModalSelectCategory.vue';
import { message } from 'ant-design-vue';

const { token } = useAuthToken();
const openModal = ref(false);
const cateValue = ref(null);
const formState = reactive({
    name: '',
    weight: '',
    categoryId: null,
    description: '',
});

const idPro = ref(null);
const emit = defineEmits(['updateId']);

const handleSetCategory = e => {
    cateValue.value = e;
    formState.categoryId = cateValue.value.id;
};

const onSubmit = async () => {
    try {
        const res = await mainServices.addInfoProduct({
            name: formState.name,
            description: formState.description,
            categoryId: formState.categoryId,
            weight: formState.weight,
        });
        //console.log(res);
        idPro.value = res.data.result.id;
        emit('updateId', idPro.value);
        message.success('Add info success');
    } catch (err) {
        console.log(err);
        message.error('Vui lòng nhập đầy đủ thông tin');
    }
};

// Thêm action="apiUrl" vào a-upload nhé

const handleOpenModal = () => {
    openModal.value = true;
};
</script>

<template>
    <h3 class="text-[2.5rem] font-semibold mb-[24px]">Thông tin cơ bản</h3>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        class="float-left w-[80%]"
    >
        <a-form-item label="Tên sản phẩm" name="name">
            <a-input v-model:value="formState.name" placeholder="Nhập vào" />
        </a-form-item>

        <a-form-item label="Cân nặng" name="weight">
            <a-input v-model:value="formState.weight" placeholder="Nhập vào" />
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

        <a-form-item label="Mô tả" name="desc">
            <a-textarea
                v-model:value="formState.description"
                placeholder="Nhập mô tả sản phẩm"
                :rows="4"
            />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button
                class="float-right uppercase"
                type="primary"
                @click="onSubmit"
                >Add</a-button
            >
        </a-form-item>
    </a-form>

    <ModalSelectCategory
        :open="openModal"
        @setShowStatus="openModal = $event"
        @setCateValue="handleSetCategory"
        v-model:value="cateValue"
    />
</template>
