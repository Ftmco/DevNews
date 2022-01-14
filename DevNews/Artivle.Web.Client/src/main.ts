import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import router from './router/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = true;
Vue.use(mavonEditor)
new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
