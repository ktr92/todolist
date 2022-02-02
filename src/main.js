import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueConfirmDialog from 'vue-confirm-dialog'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

require('@/assets/theme.css')

Vue.config.productionTip = false
Vue.use(VueConfirmDialog)
Vue.use(VueToast)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");