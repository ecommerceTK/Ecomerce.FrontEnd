<script setup>
import { FacebookOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import authServices from "../../domain/auth-services";
import Footer from "../../components/footer/Footer.vue";
import ModalOtp from "../../modal/ModalOtp.vue";
import ModalResetPassword from '../../modal/ModalResetPassword.vue';

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const routeName = ref(route.name);
const showModal = ref(false);
const showModalReset = ref(false);
let token = null;

const info = reactive({
  username: "",
  password: "",
});
const error = reactive({
  username: "",
  password: "",
});

const getUser = async () => {
    try {
        const res = await authServices.getUser(token);
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data.result))
    } catch(err) {
        console.log(err);
    }
}

const onSubmit = async () => {
  //console.log(info);
  try {
    isLoading.value = true;
    const res = await authServices.login(info);
    console.log(res);
    localStorage.setItem("token", res.data.result.token);
    message.info("Đăng nhập thành công");
    
    token = res.data.result.token;
    await getUser()
    router.push({ name: "Home" });
  } catch (err) {
    isLoading.value = false;
    //console.log(err.response.data.code);
    console.log(err);
    if (err.response.data.errors?.password) {
      error.password = err.response.data.errors.password;
    }
    if (err.response.data.errors?.username) {
      error.username = err.response.data.errors.username;
    }
    message.error(err.response.data.message);
    if (err.response.data.code === 1013) {
      showModal.value = true;
    }
  }
};

const onModal = () => {
  showModalReset.value = true;
}

// const onSubmit = () => {
//     showModal.value = true;
//     console.log(info);
// }
</script>

<template>
  <div v-if="isLoading" class="text-center text-[1.6rem]">Loading...</div>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col items-center bg-[#fff] text-[16px] p-12 w-[400px] mx-auto border-solid border border-[var(--primary-color)] rounded my-[5%]"
  >
    <h1
      class="uppercase text-[var(--primary-color)] font-semibold text-[3rem] mb-10 text-center"
    >
      Đăng nhập
    </h1>
    <div class="flex flex-col w-full gap-[15px]">
      <div>
        <label for="email" class="block">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          required
          class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
          v-model="info.username"
        />
        <span v-if="error.username" class="text-red-500 text-[1.3rem]">{{
          error.username
        }}</span>
      </div>
      <div>
        <label for="password" class="block">Mật khẩu</label>
        <input
          type="text"
          id="password"
          placeholder="Password"
          required
          class="border-solid border border-[#ccc] p-3 rounded w-full focus:border-none focus:ring-2 focus:outline-[var(--primary-color)]"
          v-model="info.password"
        />
        <span class="text-red-500 text-[1.3rem]" v-if="error.password">{{
          error.password
        }}</span>
      </div>
    </div>
    <button
      type="submit"
      class="w-[50%] text-center mt-3 p-4 text-white rounded bg-[var(--primary-color)] hover:bg-[#07af5d] uppercase"
    >
      Đăng nhập
    </button>
    <button 
    type="button"
    @click="onModal"
    class="text-[12px] mt-3 text-[var(--primary-color)] hover:underline"
    > Quên mật khẩu </button>
    <div class="w-full flex items-center my-3">
      <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
      <span class="text-gray-400 text-[1.3rem] px-4 uppercase">Hoặc</span>
      <div class="bg-[#dbdbdb] flex-1 h-px w-full"></div>
    </div>
    <div
      class="flex items-center gap-3 w-full border-solid border border-[#ccc] p-3 justify-center cursor-pointer hover:bg-[#b4e9cf]"
    >
      <FacebookOutlined class="text-[23px] text-blue-600" />
      <span class="">Facebook</span>
    </div>
    <p>
      Bạn mới biết đến chúng tôi?
      <router-link
        to="/register"
        class="text-[var(--primary-color)] cursor-pointer"
        >Đăng kí</router-link
      >
    </p>
  </form>
  <Footer />
  <ModalOtp
    v-if="showModal"
    :show="showModal"
    @setShowStatus="showModal = $event"
    :email="info.username"
  />
  <ModalResetPassword
    v-if="showModalReset"
    :show="showModalReset"
    @setShowStatus="showModalReset = $event"
  />
</template>
<style scoped></style>
