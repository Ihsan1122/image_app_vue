import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
store.dispatch('initializeAuth');

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
