<template>
  <v-app dark>
    <Snackbar/>
    <Navigation/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <appFooter/>
  </v-app>
</template>

<script>
import Snackbar from './components/Snackbar'
import Navigation from './components/Navigation'
import appFooter from './components/Footer'

export default {
  name: 'App',
  components: {
    Snackbar,
    Navigation,
    appFooter
  },
  created () {
    this.$store.dispatch('setUser')
    if (this.$store.state.user) {
      this.$firebase
        .firestore()
        .collection('users')
        .doc(this.$store.state.user.uid)
        .get()
        .then(snapshot => {
          let data = snapshot.data()
          this.$store.commit('setUserData', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
