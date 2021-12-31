import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = true;

Vue.use(Antd)

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app');
