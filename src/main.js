import { createApp } from 'vue'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import twzipcode from './assets/js/jquery.twzipcode.min.js'
import jquery from 'jquery'

import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

axios.defaults.withCredentials = true
window.$ = jquery

const app = createApp(App).use(router)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

app.config.productionTip = false
app.use(VueAxios, axios)

app.Vue.createApp({
  router,
  render: (h) => h(App)
}).$mount('#app')
