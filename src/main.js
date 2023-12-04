import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
// import 'element-plus/dist/index.css';
// import './assets/element.scss'
import './assets/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import './assets/element.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 康家麒加的
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
  let context = this;
  let args = arguments;
  clearTimeout(timer);
  timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
      callback = debounce(callback, 16);
      super(callback);
  }
}

// 
const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$echarts = echarts
