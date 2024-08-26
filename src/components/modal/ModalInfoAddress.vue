<script setup>
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import authServices from '../../domain/authServices';
import _ from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import mainServices from '../../domain/mainServices';

const router = useRouter();
const route = useRoute();
const options1 = ref(null);
const options2 = ref(null);
const options3 = ref(null);
const status = ref(false);

const emit = defineEmits(['setShowStatus']);
const props = defineProps({
    show: Boolean,
    weight: Number,
    itemsPro: Array,
});
const { show, weight, itemsPro } = toRefs(props);

console.log(show, weight, itemsPro);

const result = reactive({
    name: null,
    phone: null,
    tinh: null,
    quan: null,
    xa: null,
    detail: null,
});

const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const fetchAddress = async id => {
    try {
        const res = await authServices.getAddress(id);
        //console.log(res.data.result);

        return res.data.result;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const handleFetchQuan = async (value, option) => {
    result.quan = null;
    result.xa = null;
    if (value) {
        const resultQuan = await fetchAddress(value); // Đợi API trả về kết quả
        options2.value = resultQuan.map(item => ({
            value: item.id,
            label: item.name,
        }));
    }
};

const handleFetchXa = async (value, option) => {
    result.xa = null;
    if (value) {
        const resultXa = await fetchAddress(result.quan); // Đợi API trả về kết quả
        options3.value = resultXa.map(item => ({
            value: item.id,
            label: item.name,
        }));
    }
};

const handleSelectQuan = async () => {
    if (!result.tinh) {
        return message.error('Vui lòng nhập tỉnh/thành phố');
    }
};

const handleSelectXa = async () => {
    if (!result.tinh) {
        return message.error('Vui lòng nhập tỉnh/thành phố');
    } else if (!result.quan) {
        return message.error('Vui lòng nhập quận/huyện');
    }
};

const getTotalCost = async () => {
    const selectedOption1 = options1.value.find(
        option => option.value === result.tinh
    );
    const selectedOption2 = options2.value.find(
        option => option.value === result.quan
    );
    const selectedOption3 = options3.value.find(
        option => option.value === result.xa
    );

    const label1 = selectedOption1 ? selectedOption1.label : 'Label not found';
    const label2 = selectedOption2 ? selectedOption2.label : 'Label not found';
    const label3 = selectedOption3 ? selectedOption3.label : 'Label not found';

    const addressInfo = `${result.detail}, ${label1}, ${label2}, ${label3}`;
    try {
        const res = await mainServices.getTotalCost(route.query.orderId, {
            to_district_id: result.quan,
        });
        status.value = true;
        console.log(res);
        emit('setInfoValue', {
            name: result.name,
            phone: result.phone,
            address: addressInfo,
        });
    } catch (error) {
        console.log(error);
    }
};

const handleCloseModal = () => {
    emit('setShowStatus', false);
};

onMounted(async () => {
    const resultTinh = await fetchAddress(0);
    options1.value = _.map(resultTinh, item => ({
        value: item.id,
        label: item.name,
    }));
});
</script>

<template>
    <div>
        <a-modal
            v-model:open="show"
            :centered="true"
            :confirm-loading="confirmLoading"
            :closable="false"
            :maskClosable="true"
            @cancel="handleCloseModal"
            :footer="null"
            width="660px"
        >
            <h2 class="text-center text-[2.5rem] font-semibold mb-[36px]">
                Thông tin giao hàng
            </h2>
            <a-form layout="vertical" class="">
                <a-form-item label="Họ tên" name="name">
                    <a-input v-model:value="result.name" />
                </a-form-item>

                <a-form-item
                    class="mt-[-6px]"
                    label="Số điện thoại"
                    name="phone"
                >
                    <a-input v-model:value="result.phone" />
                </a-form-item>

                <div class="flex flex-col gap-3 mb-6 mt-[-6px]">
                    <p class="w-[70px] mr-[9px]">
                        <span class="mr-[3px] text-[#ee4d2d]">*</span>
                        Địa chỉ:
                    </p>
                    <div>
                        <a-select
                            v-model:value="result.tinh"
                            show-search
                            placeholder="Tỉnh/Thành phố"
                            style="width: 180px"
                            :options="options1"
                            :filter-option="filterOption"
                            @change="handleFetchQuan"
                        ></a-select>
                        <a-select
                            v-model:value="result.quan"
                            show-search
                            placeholder="Quận/Huyện"
                            style="width: 180px; margin: 0 33px"
                            :options="options2"
                            :filter-option="filterOption"
                            @focus="handleSelectQuan"
                            @change="handleFetchXa"
                        ></a-select>
                        <a-select
                            v-model:value="result.xa"
                            show-search
                            placeholder="Phường/Xã"
                            style="width: 180px"
                            :options="options3"
                            :filter-option="filterOption"
                            @focus="handleSelectXa"
                        ></a-select>
                    </div>
                </div>

                <a-form-item label="Địa chỉ chi tiết" name="address">
                    <a-textarea
                        class="placeholder-custom"
                        v-model:value="result.detail"
                        placeholder="Số nhà, tên đường, vv"
                        :rows="4"
                    />
                </a-form-item>
                <a-form-item
                    :wrapper-col="{ offset: 8, span: 16 }"
                    class="text-right"
                >
                    <a-button type="primary" @click="getTotalCost"
                        >Submit</a-button
                    >
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<style scoped>
.placeholder-custom {
    color: black;
    font-weight: 600;
}
</style>
