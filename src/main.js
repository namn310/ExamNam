import './assets/main.css'
import { createApp } from 'vue'
// eslint-disable-next-line no-unused-vars
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
// import GoogleSignInPlugin from 'vue3-google-signin'
// import gAuthPlugin from 'vue3-google-oauth2'
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)
registerGlobalComponents(app)

app.use(vue3GoogleLogin, {
  clientId: '423759799337-qi08peeppaunb0dc4lcndr9qbdra49sh.apps.googleusercontent.com'
})
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(Ckeditor)
app.mount('#app')
