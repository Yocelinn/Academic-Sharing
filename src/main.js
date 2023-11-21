import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import './assets/element.scss'
import './assets/css/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }

app.config.globalProperties.$echarts = echarts
app.use(store).use(router).use(ElementPlus,).mount('#app')