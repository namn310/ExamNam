import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'
import { registerGlobalComponents } from './utils/import'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
// const app = createApp(App)
const app = createApp(App)
registerGlobalComponents(app)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(Ckeditor)
app.mount('#app')
