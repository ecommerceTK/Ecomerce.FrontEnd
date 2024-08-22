<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
    product: Object,
});
const { product } = toRefs(props);
//console.log(product);

//https://gcs.tripi.vn/public-tripi/tripi-feed/img/474088GjK/anh-cho-con-de-thuong_022907461.jpg
</script>

<template>
    <router-link
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
        class="container"
    >
        <div
            class="item flex flex-col bg-white cursor-pointer h-full w-full rounded overflow-hidden"
        >
            <div class="relative z-0 w-full pt-[100%]">
                <img
                    class="inset-y-0 w-full h-full pointer-events-none object-cover absolute"
                    :src="`http://${product.imageUrl}`"
                    alt=""
                />
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between text-[1.6rem]">
                <p
                    class="mb-1 whitespace-normal line-clamp-2 break-words min-h-[2.5rem]"
                >
                    {{ product.name }}
                </p>
                <div
                    class="flex justify-between items-center space-x-1 mt-[36px]"
                >
                    <div
                        class="flex items-baseline text-[var(--primary-color)] font-medium text-[1.8rem]"
                    >
                        <span class="text-[12px] mr-px">đ</span>
                        {{ product.price }}
                    </div>
                    <span
                        class="truncate text-black text-[1.3rem] min-h-4 flex-shrink-1 ml-auto"
                        >Còn lại {{ product.sold }}</span
                    >
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.container {
    margin-bottom: 24px;
    /* margin-top: 30px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
    gap: 20px;
    row-gap: 20px;
    .item {
        transition: transform linear 0.1s;
        will-change: transform;
        &:hover {
            transform: translateY(-1px);
            box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
