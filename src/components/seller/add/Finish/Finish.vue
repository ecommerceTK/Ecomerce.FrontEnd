<script setup>
import { computed, reactive, ref, toRefs, watch } from 'vue';
import {
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import mainServices from '../../../../domain/mainServices';
import { useRouter } from 'vue-router';

const router = useRouter();
const status = ref(true);
const formRef = ref(null);
const dynamicValidateForm = reactive({
    infos: [],
});
const props = defineProps({
    idProduct: Number,
});

const { idProduct } = toRefs(props);

const productLength = computed(() => {
    return dynamicValidateForm.infos.reduce((acc, curr) => {
        return acc * curr.valueRequestList.length;
    }, 1);
});
const valueCombi = ref(
    Array.from({ length: productLength.value }, () => ({
        quantity: null,
        price: null,
    }))
);

const removeInfo = item => {
    const index = dynamicValidateForm.infos.indexOf(item);
    if (index !== -1) {
        dynamicValidateForm.infos.splice(index, 1);
    }
};
const addInfo = () => {
    dynamicValidateForm.infos.push({
        name: '',
        productId: idProduct.value,
        valueRequestList: [],
    });
};

const addTypeInput = index => {
    dynamicValidateForm.infos[index].valueRequestList.push({ value: '' });
};
const removeTypeInput = (index, item) => {
    //console.log(dynamicValidateForm.infos[index].valueRequestList);
    //console.log(item);

    const i = dynamicValidateForm.infos[index].valueRequestList.indexOf(item);
    if (i !== -1) {
        dynamicValidateForm.infos[index].valueRequestList.splice(i, 1);
    }
};

const onFinish = () => {
    // console.log('Received values of form:', values);
    console.log(valueCombi.value);
    console.log('dynamicValidateForm.users:', dynamicValidateForm.infos);
};

const onSubmit = async () => {
    if (!idProduct.value)
        return message.error('Bạn cần nhập phần thông tin cơ bản trước');
    try {
        const res = await mainServices.addAssortmentProduct({
            productId: idProduct.value,
            assortmentList: dynamicValidateForm.infos,
            valueCombination: valueCombi.value,
        });
        console.log(res);
        message.success('Success');
        router.push({name: 'AllSellerProduct'});

    } catch (err) {
        console.log(err);
        message.error('Vui lòng nhập đúng thông tin');
    }
};

watch(
    productLength,
    newLength => {
        const currentLength = valueCombi.value.length;

        if (newLength > currentLength) {
            valueCombi.value.push(
                ...Array.from({ length: newLength - currentLength }, () => ({
                    quantity: null,
                    price: null,
                }))
            );
        } else if (newLength < currentLength) {
            valueCombi.value.length = newLength;
        }
    },
    { immediate: true }
);
</script>

<template>
    <h3 class="text-[2.5rem] font-semibold mb-[24px]">Thông tin bán hàng</h3>

    <a-form
        ref="formRef"
        name="dynamic_form_nest_item"
        :model="dynamicValidateForm"
        @submit="onFinish"
    >
        <a-space
            v-for="(info, index) in dynamicValidateForm.infos"
            :key="info.id"
            style="display: flex; margin-bottom: 8px"
            align="baseline"
            class="w-full containerantspace"
        >
            <div>
                <a-form-item :name="['infos', index, 'first']">
                    <span class="text-[1.8rem] block"
                        >Nhóm phân loại {{ index + 1 }}</span
                    >
                    <a-input
                        class="text-[1.6rem] w-[236px]"
                        v-model:value="info.name"
                        placeholder="VD: Màu sắc"
                    />
                </a-form-item>

                <a-form-item class="mt-[-12px]">
                    <span class="text-[1.8rem]">Phân loại hàng:</span>
                    <div class="flex gap-10 flex-wrap" style="margin-top: 8px">
                        <div
                            v-for="(type, i) in info.valueRequestList"
                            :key="i"
                        >
                            <a-input
                                class="text-[1.6rem] w-[200px] mr-3"
                                v-model:value="info.valueRequestList[i].value"
                                placeholder="Vd: 'Trắng', 'Đen', ..."
                            />
                            <MinusCircleOutlined
                                @click="removeTypeInput(index, type)"
                            />
                        </div>
                    </div>
                    <PlusCircleOutlined
                        @click="addTypeInput(index)"
                        title="Thêm phân loại"
                    />
                </a-form-item>
            </div>

            <DeleteOutlined
                @click="removeInfo(info)"
                class="text-red-600 text-[2.5rem]"
            />
        </a-space>

        <a-form-item>
            <a-button
                v-if="dynamicValidateForm.infos.length < 2"
                type="dashed"
                block
                @click="addInfo"
            >
                <PlusOutlined />
                Thêm nhóm phân loại
            </a-button>
        </a-form-item>

        <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item> -->
    </a-form>

    <div>
        <span class="text-[2rem] text-bold my-[24px]">Bảng phân loại</span>

        <div
            v-if="dynamicValidateForm.infos.length > 0"
            class="relative flex w-max overflow-hidden text-[#333] text-[1.6rem] left-[50%] translate-x-[-50%]"
        >
            <div class="relative">
                <div class="flex">
                    <div
                        v-for="n in dynamicValidateForm.infos"
                        :key="n"
                        class="min-h-[45px] w-[102px] text-center bg-[#f5f5f5] p-[12px] ml-[-1px] first:ml-0"
                        style="border: 1px solid #e5e5e5"
                    >
                        {{ n.name }}
                    </div>
                </div>
                <div>
                    <div
                        v-for="n in dynamicValidateForm.infos[0]
                            .valueRequestList"
                        :key="n"
                        class="flex"
                    >
                        <div
                            class="min-h-[75px] w-[102px] text-center py-[24px] px-[16px] mt-[-1px] ml-[1px] first:ml-0"
                            style="border: 1px solid #e5e5e5"
                        >
                            {{ n.value }}
                        </div>
                        <div
                            class="flex-1"
                            v-if="dynamicValidateForm.infos.length > 1"
                        >
                            <div
                                v-for="n2 in dynamicValidateForm.infos[1]
                                    .valueRequestList"
                                :key="n2"
                                class="min-h-[75px] w-[102px] text-center px-[24px] py-[16px] mt-[-1px] ml-[-1px]"
                                style="border: 1px solid #e5e5e5"
                            >
                                {{ n2.value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative w-full h-full ml-[-1px]">
                <div class="flex">
                    <div
                        class="min-h-[45px] w-[202px] p-[12px] text-center bg-[#f5f5f5] ml-[-1px] first:ml-0"
                        style="border: 1px solid #e5e5e5"
                    >
                        <span class="mr-[3px] text-[#ee4d2d]">*</span>
                        Giá(Đơn vị: vnđ)
                    </div>
                    <div
                        class="min-h-[45px] w-[202px] p-[12px] text-center bg-[#f5f5f5] ml-[-1px] first:ml-0"
                        style="border: 1px solid #e5e5e5"
                    >
                        <span class="mr-[3px] text-[#ee4d2d]">*</span>
                        Số lượng
                    </div>
                </div>
                <div>
                    <div
                        v-for="(n, index) in productLength"
                        :key="index"
                        class="flex"
                    >
                        <div
                            class="min-h-[75px] w-[202px] p-[16px] mt-[-1px] ml-[-1px] first:ml-0"
                            style="border: 1px solid #e5e5e5"
                        >
                            <input
                                v-model="valueCombi[index].price"
                                type="number"
                                placeholder="Nhập vào"
                                class="w-full h-[32px] px-[12px] rounded text-[1.6rem]"
                                style="border: 1px solid #e5e5e5"
                            />
                        </div>
                        <div
                            class="min-h-[75px] w-[202px] p-[16px] mt-[-1px] ml-[-1px] first:ml-0"
                            style="border: 1px solid #e5e5e5"
                        >
                            <input
                                v-model="valueCombi[index].quantity"
                                type="number"
                                placeholder="Nhập vào"
                                class="w-full h-[32px] px-[12px] rounded text-[1.6rem]"
                                style="border: 1px solid #e5e5e5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a-button
        type="primary"
        @click="onSubmit"
        class="uppercase mt-[24px] float-end mr-[192px]"
        >Add</a-button
    >
</template>

<style lang="scss" scoped>
.containerantspace {
    :deep .ant-space-item:nth-child(2) {
        margin-left: auto;
        font-size: 1.6rem;
    }
}
</style>
