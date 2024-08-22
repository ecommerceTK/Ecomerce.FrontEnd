<script setup>
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';
import authServices from '../../../domain/authServices';
import _ from 'lodash';
import { useAuthToken } from '../../../storage/useAuthToken';
import { useAuthUser } from '../../../storage/useAuthUser';
import ModalInfoAddress from '../../../components/modal/ModalInfoAddress.vue';
import Navbar from '../../../components/seller/Navbar';
import { useRouter } from 'vue-router';

const { token } = useAuthToken();
const { userStore } = useAuthUser();
const user = JSON.parse(userStore.value);
const check = user.roles.find(role => role.name === 'SELLER');

const router = useRouter();
const options1 = ref(null);
const options2 = ref(null);
const options3 = ref(null);

const result = reactive({
    id: null,
    shopname: null,
    tinh: null,
    quan: null,
    xa: null,
    detail: null,
});

const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const getInfoSeller = async () => {
    try {
        const res = await authServices.getInfoSeller();
        //console.log(res);
        result.id = res.data.result.seller_id;
        result.shopname = res.data.result.name;
        result.tinh = res.data.result.city_id;
        result.quan = res.data.result.district_id;
        result.xa = res.data.result.ward_id;
        result.detail = res.data.result.address_detail;
    } catch (err) {
        isLoading.value = false;
        console.log(err);
    }
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

const onSubmit = async () => {
    try {
        const res = await authServices.becomeSeller({
            name: result.shopname,
            addressId: result.xa,
            addressDetail: result.detail,
        });
        message.info(res.data.message);
        router.push('/seller');
    } catch (err) {
        console.log(err);
    }
};

const onUpdate = async () => {
    try {
        const res = await authServices.updateInfoSeller(result.id, {
            name: result.shopname,
            addressId: result.xa,
            addressDetail: result.detail,
        });
        message.info('Update success');
        router.push('/seller');
    } catch (err) {
        console.log(err);
    }
};

onMounted(async () => {
    try {
        if (check) {
            await getInfoSeller();
        }
        const resultTinh = await fetchAddress(0);
        options1.value = _.map(resultTinh, item => ({
            value: item.id,
            label: item.name,
        }));
        if (result.tinh) {
            const resultQuan = await fetchAddress(result.tinh);
            options2.value = _.map(resultQuan, item => ({
                value: item.id,
                label: item.name,
            }));
        }
        if (result.quan) {
            const resultXa = await fetchAddress(result.quan);
            options3.value = _.map(resultXa, item => ({
                value: item.id,
                label: item.name,
            }));
        }
        //console.log(options1.value);
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <Navbar />
    <div
        class="w-full m-[58px] px-[194px] py-[27px] bg-white rounded"
        style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07)"
    >
        <h2 class="text-center text-[3rem] font-semibold mb-[36px]">
            Thông tin shop
        </h2>
        <a-form
            class="relative w-full left-[-33%]"
            :model="result"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="Tên shop"
                name="shopname"
                :rules="[
                    { required: true, message: 'Please input your shopname!' },
                ]"
            >
                <a-input v-model:value="result.shopname" />
            </a-form-item>

            <div class="flex mb-[24px] ml-[25%]">
                <p class="w-[70px] mr-[9px]">
                    <span class="mr-[3px] text-[#ee4d2d]">*</span>
                    Địa chỉ:
                </p>

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

            <a-form-item
                label="Địa chỉ chi tiết"
                name="shopname"
                :rules="[
                    { required: true, message: 'Địa chỉ chi tiết là bắt buộc' },
                ]"
            >
                <a-textarea
                    v-model:value="result.detail"
                    placeholder="Số nhà, tên đường, vv"
                    :rows="4"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button v-if="!check" type="primary" @click="onSubmit"
                    >Submit</a-button
                >
                <a-button v-else type="primary" @click="onUpdate"
                    >Update</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>
