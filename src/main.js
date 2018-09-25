// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Scroller from 'vue-scroller';
Vue.use(Scroller);
Vue.use(VueAwesomeSwiper)


Vue.use(VueAMap);
Vue.use(VueAxios,axios);
Vue.use({lazyAMapApiLoaderInstance})

Vue.config.productionTip = false



VueAMap.initAMapApiLoader({
  key: 'fc9dbdadd462ab47893411b3de15bf1b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
