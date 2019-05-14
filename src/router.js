import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import AddEvent from './views/AddEvent.vue'
import MyEvents from './views/MyEvents.vue'
import BrowseEvents from './views/BrowseEvents.vue'

import firebase from '@/firebase'
import 'firebase/auth'

let currentUser = null

firebase.auth().onAuthStateChanged(user => {
  currentUser = user
})

console.log(currentUser)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        (currentUser) ? next({ name: 'profile' }) : next()
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        (currentUser) ? next({ name: 'profile' }) : next()
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        (currentUser) ? next() : next({ name: 'login' })
      }
    },
    {
      path: '/add-event',
      name: 'addEvent',
      component: AddEvent
    },
    {
      path: '/my-events',
      name: 'my-events',
      component: MyEvents
    },
    {
      path: '/browse-events',
      name: 'browse-events',
      component: BrowseEvents
    }
  ]
})
