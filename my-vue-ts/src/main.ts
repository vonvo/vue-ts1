import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'
// // 1. 引入你需要的组件
// import { Button } from 'vant';
// // 2. 引入组件样式
// import 'vant/lib/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)


// app.use(Button)

app.mount('#app')

// console.log('Hello, Vue 3 with TypeScript!')    
