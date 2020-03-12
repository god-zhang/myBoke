import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/comm.css'
import global_ from './components/globalConfig';
import layer from 'vue-layer';
import VueCookies from 'vue-cookies';
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);
Vue.use(VueCookies);

$cookies.config('7d');

Vue.prototype.global = global_

Vue.config.productionTip = false
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')