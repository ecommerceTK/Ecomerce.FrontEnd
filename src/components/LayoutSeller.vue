<script setup>
import Navbar from './seller/Navbar';
import LeftBar from './seller/Leftbar';
</script>

<template>
    <Navbar />
    <div class="flex">
        <LeftBar />
        <RouterView />
    </div>
</template>
