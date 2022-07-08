import { createApp } from 'vue'
import Antd from 'ant-design-vue';

import router from './router'
import store from './store'
import App from './App.vue'
// 自定义方法
import plugins from './plugins';

import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router).use(store).use(Antd).use(plugins).mount('#app');
