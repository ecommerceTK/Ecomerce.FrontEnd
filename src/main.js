import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'vue3-carousel/dist/carousel.css';

const app = createApp(App);
app.use(router).use(Antd).mount('#app');
