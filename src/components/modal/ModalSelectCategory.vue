<script setup>
import { ref, toRefs, onMounted } from 'vue';
import mainServices from '../../domain/mainServices';

const props = defineProps({
    open: Boolean,
});
const emit = defineEmits(['setShowStatus']);
const selectedValue = ref([]);
const { open } = toRefs(props);
const confirmLoading = ref(false);

const data = ref(null);
const map = {};
const options = ref([]);

const fetchCategory = async () => {
    try {
        const res = await mainServices.getCategory();
        //console.log(res);
        data.value = res.data.result;
        //console.log(data.value);
    } catch (err) {
        console.log(err);
    }
};

const filter = (inputValue, path) => {
    return path.some(
        option =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
};

const handleOk = () => {
    let finalKey = null;

    const findOption = (options, selectedValues) => {
        let currentOptions = options;

        for (let value of selectedValues) {
            let foundOption = currentOptions.find(
                option => option.value === value
            );
            if (foundOption) {
                finalKey = foundOption.key; // Cập nhật finalKey mỗi khi tìm thấy
                currentOptions = foundOption.children || []; // Đi sâu vào children nếu có
            } else {
                break; // Dừng nếu không tìm thấy giá trị phù hợp
            }
        }
    };

    findOption(options.value, selectedValue.value);

    console.log('ID:', finalKey);
    console.log('Value:', selectedValue.value);

    // Emit cả ID và value
    emit('setCateValue', { id: finalKey, value: selectedValue });
    emit('setShowStatus', false);
};

const handleCloseModal = () => {
    emit('setShowStatus', false);
};

onMounted(async () => {
    await fetchCategory();

    data.value.forEach(item => {
        map[item.id] = {
            key: item.id,
            value: item.name,
            label: item.name,
        };
    });

    data.value.forEach(item => {
        if (item.parentID === 0) {
            // Mục không có parent, là mục chính.
            options.value.push(map[item.id]);
        } else {
            // Mục có parent, thêm vào children của mục cha.
            if (!map[item.parentID].children) {
                map[item.parentID].children = [];
            }
            map[item.parentID].children.push(map[item.id]);
        }
    });
    console.log(data.value);
    console.log(options.value);
});
</script>

<template>
    <a-modal
        v-model:open="open"
        :confirm-loading="confirmLoading"
        width="960px"
        :centered="true"
        @cancel="handleCloseModal"
    >
        <template #default>
            <div class="h-[460px] flex flex-col overflow-hidden bg-[#f6f6f6]">
                <span class="text-[2.5rem]">Chỉnh sửa ngành hàng</span>
                <div class="mt-[24px]">
                    <a-cascader
                        v-if="options.length > 0"
                        class="p-[24px] w-[30%]"
                        popupClassName="content"
                        v-model:value="selectedValue"
                        :options="options"
                        :show-search="{ filter }"
                        :open="open"
                        placeholder="Tên nghành hàng"
                        placement="bottomLeft"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <div
                class="flex justify-between pt-[24px] z-[1111]"
                style="bordertop: 1px solid #ccc"
            >
                <p class="text-[1.6rem]">
                    Đã chọn:
                    <span class="font-bold">{{
                        selectedValue.length > 0
                            ? selectedValue.join(' > ')
                            : 'Chưa chọn ngành hàng'
                    }}</span>
                </p>
                <div>
                    <a-button @click="handleCloseModal">Huỷ</a-button>
                    <a-button
                        @click="handleOk"
                        type="primary"
                        :disabled="selectedValue.length === 0"
                        >Xác nhận</a-button
                    >
                </div>
            </div>
        </template>
    </a-modal>
</template>
<style lang="scss">
.ant-select-dropdown {
    box-shadow: none;
}
.content {
    top: 178px;
    margin-top: 12px;
    width: 861px;
    background-color: #fff;
    .ant-cascader-menus {
        overflow-y: auto;
        max-height: 336px;
        .ant-cascader-menu {
            height: 100%;
            max-width: 30%;
            padding: 10px 15px;
            font-size: 16px;
        }
    }
}
</style>
