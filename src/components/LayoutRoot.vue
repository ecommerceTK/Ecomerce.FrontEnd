<script setup>
import Navbar from './customer/Navbar';
import Footer from './customer/Footer';
import { toRefs } from 'vue';
</script>
<template>
    <div style="display: flex; flex-direction: column">
        <Navbar />
        <div style="width: 90vw; margin: 0 auto">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>
