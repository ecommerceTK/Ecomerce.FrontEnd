<script setup>
import Navbar from "./navbar/Navbar.vue";
import Footer from "./footer/Footer.vue";
import { toRefs } from "vue";

</script>
<template>
    <div style="display: flex; flex-direction: column">
        <Navbar
        />
        <div style="width: 86vw;max-width: 1200px;margin: 0 auto;">
            <RouterView/>
        </div>
        <Footer />
    </div>
</template>