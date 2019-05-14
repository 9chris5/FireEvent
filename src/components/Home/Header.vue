<template>
  <v-img
    :src="require('../../assets/celebration.jpg')"
    height="400"
    gradient="to top right, rgba(236,20,36,.33), rgba(25,32,72,.7)"
  >

    <v-layout
      fill-height
      justify-center
      align-center
      column
    >

      <h1 class="display-2 font-weight-normal mb-4 text-xs-center">
        Explore
        <span class="font-weight-bold">hottest</span>
        events now!
      </h1>

      <v-btn
        v-if="!this.$store.getters.USER"
        outline
        round
        large
        to="/register"
      >
        Get started
      </v-btn>
      
    </v-layout>

  </v-img>
</template>

<script>
export default {
  name: 'home-header',
  data: () => {
    return {
      
    }
  }
}
</script>
