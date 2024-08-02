<script setup>
import {StarFilled } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

const productImg = [
    'https://product.hstatic.net/1000271846/product/pants-black-01_c01c2b917d1b445586fa7f8dd8a1295e_master.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyWluFp78BMjaxrSLsr-BskwBYJ8kebpTnew&s',
    'https://chuphinhquangcao.net/wp-content/uploads/2023/09/348420074_727539775814678_4785402829092188182_n.jpg',
]
const currentImg = ref(productImg[0]);
const isExpanded = ref(false);
const router=useRouter();

const setImg = (a) => {
    currentImg.value = a;
}
const toggleContent = () => {
    isExpanded.value = !isExpanded.value;
}
const goToCart = () => {
    router.push('/cart');
}
</script>

<template>
   <div class="my-[10vh] flex gap-10 ">
        <div class="w-[50%] border-solid border border-[var(--primary-color)] h-min">                         
            <img class="w-[100%]" :src="currentImg" alt="">     
            <Carousel :items-to-show="2.5" :wrap-around="true" >
                <Slide v-for="img in productImg" :key="img" @click="setImg(img)">
                    <img class="carousel__item" :src="img" alt="Image 1">
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
        <div class="bg-[#fff] p-6 rounded shadow max-w-[60%]">
            <div class="mb-20">
                <h1 class="text-[2.5rem] font-medium">ĐƯỜNG ĐẾN KHO BÁU - CON ĐƯỜNG DẪN ĐẾN KHO BÁU CỦA BẠN</h1>
                <div class="flex items-center gap-10 text-[14px]">
                    <div class="flex items-center relative separate">
                        <span class="mr-3">5.0</span>
                        <StarFilled  class="text-[yellow]"/>
                        <StarFilled class="text-[yellow]"/>
                        <StarFilled class="text-[yellow]"/>
                        <StarFilled class="text-[#ccc]"/>
                        <StarFilled class="text-[#ccc]"/>
                    </div>
                    <span class="text-[#a19595] mt-3">Đã bán 11</span>
                </div>
                <span class="text-[1.6rem] font-semibold">169.000 đ</span>
            </div>
            <div class="center mb-20">
                <h3 class="text-[16px] font-semibold mb-6">Ưu đãi khác</h3>
                <p class="text-[13px] flex">
                    1 mã giảm giá
                    <span class="ml-auto mr-24 text-[var(--primary-color)]">Giảm 15%</span>
                </p>
            </div>
            <div class="text-[16px]">
                <div class="left">
                    <label for="sl" class=" font-bold mr-3">Số lượng:</label>
                    <input id='sl' type="number" placeholder="Số lượng" class="p-3 text-[13px] border-solid border border-[#ccc]">
                </div>
                <div class="left mt-6">
                    <h3 class="font-bold inline">Tổng: </h3>
                    <span class="text-[24px]">169.000đ</span>
                </div>
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
    <div class="max-w-[70%] my-[12px]">
        <h3 class="text-[2rem]">Mô tả</h3>
        <p 
        class="desc text-[#796e6e] text-[16px] leading-snug"
        :class="{expanded: isExpanded}"
        >
            Đổi trả miễn phí trong 30 ngày khi bạn đổi ý hoặc sản phẩm không đúng cam kết.
            Mình khá ấn tượng với bìa sách, bìa thiết kế đẹp, như tấm bản đồ đi tìm kho báu với các nhân vật trong truyền thuyết rất đẹp. Sách bìa cứng nên cầm rất thích, kiểu như muốn mang theo bên mình để đọc. Bên trong thì tác giả đã viết về những lý do vì sao mọi người không đạt được thành công như mong muốn, từ đó chỉ ra bài học thực tế từ người thành công, giàu có họ đã làm gì. Không đơn giản là lý thuyết, mà nó cho mình biết được nên 
        </p>
        <button @click="toggleContent" class="text-[16px] text-[#8f8a8a]">{{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}</button>
    </div>
</template>
<style scoped>
    .separate::after {
        content: "";
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