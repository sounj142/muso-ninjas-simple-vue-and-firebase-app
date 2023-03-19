import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/main.css';
import { monitorAuthStateChanged } from '@/firebase/auth';

monitorAuthStateChanged(store);

createApp(App).use(store).use(router).mount('#app');
