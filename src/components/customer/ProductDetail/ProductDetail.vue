<script setup>
import { StarFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import mainServices from '../../../domain/mainServices';
import { defaultProduct } from '../../../assets';
import { useAuthToken } from '../../../storage/useAuthToken';

const { token } = useAuthToken();
const productImg = ref(null);
const currentImg = ref(null);
const isExpanded = ref(false);
const route = useRoute();
const router = useRouter();
const product = ref(null);
const valueid = ref(null);
const status = ref(true);
const assortment = ref([]);

const getProductDetail = async () => {
    try {
        const res = await mainServices.getProductbyId(route.params.id);
        //console.log(res);
        product.value = res.data.result;
        console.log(product.value);

        productImg.value = product.value.assets;
        currentImg.value = productImg.value[0];
        assortment.value = product.value.assortments;
        console.log(productImg.value);
    } catch (err) {
        console.log(err);
    }
};

const setImg = a => {
    currentImg.value = a;
};
const toggleContent = () => {
    isExpanded.value = !isExpanded.value;
};

const goToCart = async () => {
    if(!token.value) return message.error('Bạn chưa đăng nhập');
    if (!valueid) return message.error('Bạn chưa chọn phân loại');
    const data = {
        product_id: product.value.product_id,
    };

    Object.keys(valueid.value).forEach((key, index) => {
        data[`value_id${index + 1}`] = valueid.value[key];
    });
    console.log(data);

    try {
        const res = await mainServices.addToCart(data);
        console.log(res);
        message.info('Success');
        router.push('/cart');
    } catch (err) {
        console.log(err);
    }
};

const handleValue = (name, value) => {
    console.log(name, value);

    if (valueid.value[name]) {
        delete valueid.value[name];
    } else {
        valueid.value = {
            ...valueid.value,
            [name]: value,
        };
    }
    console.log(valueid.value);
    
};

onMounted(() => {
    getProductDetail();
});
</script>

<template>
    <div class="my-[10vh] flex gap-10" v-if="product">
        <div
            class="w-[450px] border-solid border border-[var(--primary-color)] h-min"
        >
            <img class="w-[100%] " :src="`http://${currentImg}`" alt="" />
            <Carousel :items-to-show="2.5" :wrap-around="true">
                <Slide
                    v-for="img in productImg"
                    :key="img"
                    @click="setImg(img)"
                >
                    <img
                        class="carousel__item"
                        :src="`http://${img}`"
                        alt="Image 1"
                    />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
        <div
            class="bg-[#fff] p-6 rounded shadow flex-1 flex flex-col max-w-[60%] max-h-[70%]"
        >
            <div class="mb-20">
                <h1 class="text-[2.5rem] font-medium">
                    {{ product?.product_name }}
                </h1>
                <div class="flex items-center gap-10 text-[14px]">
                    <div class="flex items-center relative separate">
                        <span class="mr-3">5.0</span>
                        <StarFilled class="text-[yellow]" />
                        <StarFilled class="text-[yellow]" />
                        <StarFilled class="text-[yellow]" />
                        <StarFilled class="text-[#ccc]" />
                        <StarFilled class="text-[#ccc]" />
                    </div>
                    <span class="text-[#a19595] mt-3">Đã bán 11</span>
                </div>
                <span class="text-[3rem]">{{ product?.price }}đ</span>
            </div>
            <div>
                <h3 class="text-[2rem]">Mô tả</h3>
                <p
                    class="desc text-[#796e6e] text-[16px] leading-snug"
                    :class="{ expanded: isExpanded }"
                >
                    {{ product?.description }}
                </p>
            </div>
            <div class="text-[1.8rem] mt-[20px]">
                <span>Cân nặng:</span>
                <span class="ml-3 text-[#796e6e]">{{product.weight}}kg</span>
            </div>
            <div class="center mt-20" v-if="assortment.length > 0">
                <h3 class="text-[18px] font-semibold mb-6">Phân loại</h3>
                <div
                    v-for="ass in assortment"
                    :key="ass"
                    class="flex mt-[36px]"
                >
                    <span
                        class="text-[#888] text-[1.8rem] mr-[24px] w-[110px]"
                        >{{ ass.name }}</span
                    >
                    <div class="flex flex-wrap gap-6 items-center">
                        <button
                            v-for="(val, index) in ass.values"
                            :key="index"
                            @click="handleValue(ass.name, val.value_id)"
                            class="bg-[#f5f5fa] py-[12px] px-[36px] border-[3px] text-[1.8rem] text-[#888]"
                            :style="{
                                borderColor:
                                    valueid &&
                                    valueid[ass.name] !== undefined &&
                                    valueid[ass.name] === val.value_id
                                        ? 'var(--primary-color)'
                                        : '#ccc',
                            }"
                        >
                            {{ val?.name }}
                        </button>
                    </div>
                </div>
            </div>
            <!-- <div class="text-[18px]">
                <div class="left">
                    <label for="sl" class=" font-bold mr-3">Số lượng:</label>
                    <input id='sl' type="number" placeholder="Số lượng" class="p-3 text-[13px] border-solid border border-[#ccc]">
                </div>
                <div class="left mt-6">
                    <h3 class="font-bold inline">Tổng: </h3>
                    <span class="text-[24px]">169.000đ</span>
                </div>
                
            </div> -->
            <div class="mt-auto text-[1.8rem]">
                <button
                    class="p-5 bg-[var(--primary-color)] rounded mt-12 w-full text-white hover:opacity-85 uppercase"
                    @click="goToCart"
                >
                    Thêm vào giỏ
                </button>
                <button
                    class="p-5 bg-red-500 rounded mt-6 w-full text-white hover:opacity-85 uppercase"
                    @click="goToCart"
                >
                    Mua ngay
                </button>
            </div>
        </div>
    </div>
    <!-- <div class="max-w-[70%] my-[12px]">
        <h3 class="text-[2rem]">Mô tả</h3>
        <p
            class="desc text-[#796e6e] text-[16px] leading-snug"
            :class="{ expanded: isExpanded }"
        >
            {{ product?.description }}
        </p>
        <button @click="toggleContent" class="text-[16px] text-[#8f8a8a]">
            {{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}
        </button>
    </div> -->
</template>
<style scoped>
.separate::after {
    content: '';
    display: block;
    position: absolute;
    border-left: 1px solid #b3b1b1;
    height: 14px;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
}
.carousel {
    --vc-nav-background: #ccc; /* Thay đổi màu nền */
    --vc-nav-color: white; /* Thay đổi màu của mũi tên */
}

p.desc {
    overflow: hidden;
    /* white-space: nowrap; */
    /* text-overflow: ellipsis; */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    transition: all 0.3s ease;
}

p.expanded {
    /* white-space: normal; */
    -webkit-line-clamp: unset;
}
</style>
