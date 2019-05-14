import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

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
    SET_USER: (state, payload) => {
      state.user = payload
    },
    SET_USER_DATA: (state, payload) => {
      state.userData = payload
    },
    SET_SNACKBAR: (state, payload) => {
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
    },
    CLEAR_STATE: state => {
      state.user = null
      state.userData = null
    }
  },
  actions: {
    SET_USER: context => {
      context.commit('SET_USER', firebase.auth().currentUser)
    },
    SET_USER_DATA: async context => {
      try {
        const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        context.commit('SET_USER_DATA', snapshot.data())
      } catch (err) {
        console.log(err)
      }
    },
    SET_SNACKBAR: (context, payload) => {
      context.commit('SET_SNACKBAR', payload)
    },
    CLEAR_STATE: context => {
      context.commit('CLEAR_STATE')
    }
  },
  getters: {
    USER: state => {
      return state.user
    },
    USER_DATA: state => {
      return state.userData
    }
  }
})
