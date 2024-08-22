<script setup>
import { reactive, watch, h, ref, onMounted } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import mainServices from '../../../../domain/mainServices';

const isLoading = ref(false);
const state = reactive({
    selectedKeys: [],
    openKeys: [1, 2],
    preOpenKeys: [1],
});
const emit = defineEmits(['menuClick']);
const data = ref(null);
const map = {};
const items = ref([
    {
        key: 'all',
        label: 'All',
        title: 'All',
    },
]);

const fetchCategory = async () => {
    try {
        isLoading.value = true;
        const res = await mainServices.getCategory();
        //console.log(res);
        data.value = res.data.result;
        console.log(data.value);
    } catch (err) {
        isLoading.value = false;
        console.log(err);
    }
};

const handleMenuClick = ({ key }) => {
    emit('menuClick', key);
};

onMounted(async () => {
    await fetchCategory();
    data.value.forEach(item => {
        map[item.id] = {
            key: item.id,
            label: item.name,
            title: item.name,
        };
    });

    data.value.forEach(item => {
        if (item.parentID === 0) {
            // Mục không có parent, là mục chính.
            items.value.push(map[item.id]);
        } else {
            // Mục có parent, thêm vào children của mục cha.
            if (!map[item.parentID].children) {
                map[item.parentID].children = [];
            }
            map[item.parentID].children.push(map[item.id]);
        }
    });
    //console.log(items);
});

watch(
    () => state.openKeys,
    (_val, oldVal) => {
        state.preOpenKeys = oldVal;
    }
);
</script>

<template>
    <div style="width: 286px" class="mr-6 h-min shadow-md">
        <a-menu
            v-if="items.length > 0"
            class="text-[1.8rem]"
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            :inline-collapsed="state.collapsed"
            :items="items"
            @click="handleMenuClick"
        ></a-menu>
    </div>
</template>
