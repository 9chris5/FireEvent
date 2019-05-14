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
    this.$store.dispatch('SET_USER')
    this.$store.dispatch('SET_USER_DATA')
  }
}
</script>
