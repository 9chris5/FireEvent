<template>
  <v-snackbar
    top
    right
    v-model="snackbar.show"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline">
      <span>{{ snackbar.message }}</span>
      <v-spacer></v-spacer>
      <v-btn
        flat
        fab
        color="white"
        @click.native="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    }
  }
}
</script>

<style lang="scss">
.v-snack__content {
  padding-right: 0;
}
</style>
