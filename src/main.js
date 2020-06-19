import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import Add from './Add.vue'
import Delete from './Delete.vue'
import wb from "./registerServiceWorker";


Vue.prototype.$workbox = wb;


Vue.use(firestorePlugin);
Vue.use(VueRouter);

Vue.config.productionTip = false
const routes=[
  {path:'/added',component:Add},
  {path:'/deleted',component:Delete}
];

const router = new VueRouter({
  routes
});
new Vue({
  render: h => h(App),
 router
}).$mount('#app')
