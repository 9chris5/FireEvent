import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from '@/firebase'
import 'firebase/auth'
import filters from './filters'

Vue.config.productionTip = false

Vue.prototype.$firebase = firebase

filters.forEach(filter => {
  Vue.filter(filter.name, filter.execute)
})

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
