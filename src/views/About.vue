<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="makeSnack"></v-btn>
    <v-btn @click="anotherSnack"></v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'about',
  data: () => {
    return {
      type: '',
      message: ''
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    makeSnack () {
      this.showSnackbar({
        type: 'info',
        message: 'Weeeee!'
      })
    },
    anotherSnack () {
      this.$store.commit('showSnackbar', {
        type: 'error',
        message: 'Watch out boi! This is long as shit!!!'
      })
    }
  }
}
</script>
