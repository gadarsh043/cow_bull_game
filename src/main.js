import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookieNext from 'vue-cookie-next'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCookieNext)
app.mount('#app')
