import { createApp, markRaw, ref } from 'vue'
import App from './App.vue'
import './index.css'
const app = createApp(App);

/* Routes */
import router from './routes'
app.use(router)

/* Pinia */
import { createPinia } from 'pinia';
import { createORM } from 'pinia-orm'

const pinia = createPinia().use(createORM());
app.use(pinia)

pinia.use(({ store }) => {
    store.router = markRaw(router)
});

/* Axios */
import axios from 'axios';

app.config.globalProperties.$http = axios;
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

const token = localStorage.getItem('token')
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}

/* PrimeVue */
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';

import 'primevue/resources/themes/lara-dark-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'

import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
let language = window.navigator.userLanguage || window.navigator.language;

const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.slice(0,2) || 'tr',
  messages
})

app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'filled',
});

app.use(ConfirmationService);
app.use(ToastService);
app.component('Button', Button);
app.component('Card', Card);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('Panel', Panel);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);

/* Moment */
import moment from 'moment'

app.config.globalProperties.$moment = function(date){
return moment(date)
};

app.use(i18n)
app.mount('#app');
