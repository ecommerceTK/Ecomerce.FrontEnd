<script setup>
import {DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons-vue';
import { computed, ref, toRefs } from "vue";

// const {products}=defineProps(['products']);
// const items = products;
// console.log(products,items);

const props = defineProps({
    products: Array,
});
const {products} = toRefs(props)
const items = products.value;
// console.log(items);

const itemPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(items.length / itemPerPage);
})

const visibleProduct = computed(() => {
    const startPage = (currentPage.value - 1) * itemPerPage;
    const endPage = startPage + itemPerPage;
    return items.slice(startPage, endPage);
})

const visiblePageNumbers = computed(() => {
    let pageNumber = [];
    if(totalPages.value <= 3 ) {
        for(let i=1; i<=totalPages.value;i++) {
            pageNumber.push(i);
        }
    } else {
        if(currentPage.value <=2 ) {
            pageNumber = [1,2,3,"...",totalPages.value];
        }else if(currentPage.value >= totalPages.value - 2) {
            pageNumber = [1,"...",totalPages.value - 2, totalPages.value-1, totalPages.value];
        }else {
            pageNumber = [1,"...",currentPage.value,"...",totalPages.value]
        }
    }
    return pageNumber;
})

const changePage = (page) => {
    if(page >= 1 && page <= totalPages.value){
        currentPage.value = page;
    }
}
</script>
<template>
    <div class="page">
        <slot :pros="visibleProduct"/>
    </div>
    
    <ul>
        <li>
            <button
            :disabled=" currentPage === 1 "
            >
            <DoubleLeftOutlined @click="changePage(currentPage - 1)"/>
            </button>
        </li>

        <!-- for midle number pagination and ... -->
        <li
            v-for="pageNumber in visiblePageNumbers"
            :key="pageNumber"
            :class="{'active' : currentPage == pageNumber}"
        >
            <button
            @click="changePage(pageNumber)"
            >{{pageNumber}}</button>
        </li>

        <li>
            <button            
            :disabled=" currentPage === 1 "
            >
            <DoubleRightOutlined @click="changePage(currentPage + 1)"/>
            </button>
        </li>
    </ul>
</template>
<style scoped lang='scss'>
    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 1.8rem;
        li {
            padding: 3px 6px;
            button {
                text-decoration: none;
                color: #6e6565e3;
            }
            &.active {
                background-color: #16a55f;
                color: red;
            }
        }
    }
</style>