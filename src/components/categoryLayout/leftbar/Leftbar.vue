<script setup>
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue';
const cate = [
    {
        id: 1,
        title: 'Category1',
        children: [
            'Category11',
            'Category12',
            'Category13',
        ]
    },
    {
        id: 2,
        title: 'Category1',
        children: [
            'Category11',
            'Category12',
            'Category13',
        ]
    },
    {
        id: 3,
        title: 'Category1',
        children: [
            'Category11',
            'Category12',
            'Category13',
        ]
    },
]
const showCate = ref(cate.map(() => false));
//console.log(showCate);
const setStatus = (id) => {
    showCate.value[id] = !showCate.value[id];
}
</script>

<template>
    <ul 
    class="w-[18%] border-solid border border-[#e6e0e0] rounded bg-white h-max">
        <li class="m-0 pl-[30px] py-[6px] text-[2rem] text-[#7c7777] hover:bg-[var(--primary-color)] cursor-pointer">All</li>
        <li
        v-for="ca in cate" 
        :key="ca.id" 
        class="border-solid border-t"
        >
            <div 
            @click="setStatus(ca.id)" 
            class="flex items-center gap-[30px] text-[2rem] text-[#7c7777] p-3 w-full hover:bg-[var(--primary-color)] cursor-pointer"
            :style=" showCate[ca.id] ? { backgroundColor: 'var(--primary-color)', color: 'white' } : {}"
            >
                <h2 class="m-0 pl-[10%]">{{ca.title}}</h2>
                <UpOutlined v-show="showCate[ca.id]" class="text-[16px]"/>
                <DownOutlined v-show="!showCate[ca.id]" class="w-[13px] text-[16px]"/>              
            </div>
            <ul class="text-[1.6rem]">
                <li 
                v-show="showCate[ca.id]"
                class="p-3 pl-[20%] border-solid border-b border-[#ccc] hover:bg-[#16a55f] cursor-pointer"
                v-for="ti in ca.children" 
                :key="ti">{{ti}}</li>
            </ul>
        </li>
    </ul>
    
    <!-- <div className='sidebar'>
      <div className="options">
        <NavLink to='/add' className="option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div> -->
</template>
<style scoped>
</style>