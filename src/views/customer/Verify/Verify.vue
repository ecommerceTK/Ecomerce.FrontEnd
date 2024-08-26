<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const handleVerify = () => {
    if(route.query.success==='true') {
        router.push({name:'Order',})
    }else {
        router.push({name: 'FailPaymet'});
    }
}
onMounted(() => {
    handleVerify();
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
