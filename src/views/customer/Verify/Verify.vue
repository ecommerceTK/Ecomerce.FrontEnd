<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import mainService from '../../../domain/mainServices';

const route = useRoute();
const router = useRouter();

const orderCode = route.query.vnp_TxnRef;
const getPaymentStatus = async() => {
    try {
        const res = await mainService.getPaymentStatus(orderCode);
        if(res.data.status==='SUCCESSFUL') {
            router.push({ name: 'Order' });
        } else if (res.data.status==='FAILED') {
            router.push({ name: 'FailPaymet' });
        }
    } catch(err) {
        console.log(err); 
    }
}

onMounted(() => {
    getPaymentStatus();
});
</script>
<template>
    <div class="example">
        <a-spin />
    </div>
</template>

<style scoped>
.example {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
}
</style>
