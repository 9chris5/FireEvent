import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userData: null,
    snackbar: {
      type: '',
      message: '',
      multiline: false,
      timeout: 6000,
      show: false
    }
  },
  mutations: {
    setUser: state => {
      state.user = firebase.auth().currentUser
    },
    setUserData: (state, payload) => {
      state.userData = payload
    },
    showSnackbar: (state, payload) => {
      state.snackbar.type = payload.type
      state.snackbar.message = payload.message
      state.snackbar.multiline = (payload.message > 50) ? true : false

      if (payload.multiline) {
        state.snackbar.multiline = payload.multiline
      }

      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout
      }

      state.snackbar.show = true
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getUserData: state => {
      return state.userData
    }
  }
})
