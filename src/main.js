import './assets/main.css'

import { createApp } from 'vue'
import  router  from './router/router.js'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router).mount('#app')

