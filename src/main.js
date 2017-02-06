// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';

import 'commom/stylus/index.styl';
var bus = new Vue()

Vue.config.debug = true;

Vue.use(VueRouter);

Vue.use(VueResource);

const router = new VueRouter({
mode: 'history',
base: __dirname,
routes: [
{
path: '/goods',
component: goods
},
{
path: '/seller',
component: seller
},
{
path: '/ratings',
component: ratings
}
]
});
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

