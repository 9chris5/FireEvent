<template>
  <v-parallax
    height="500"
    :src="require('../../assets/header-image.jpg')">
    <v-layout
      fill-height
      justify-center
      align-center
      column>
      <span class="d-block">
        <v-icon size="72" class="primary--text">whatshot</v-icon>
      </span>
      <h1 class="display-3 font-weight-black text-xs-center">
        FIRE<span class="primary--text">EVENT</span>
      </h1>
      <h3 class="font-weight-light px-3 py-2">
        Join us and get access to the <span class="font-weight-bold">hottest</span> events around.
      </h3>
      <v-btn v-if="!this.$store.state.user" to="/register" outline flat color="primary">Get started now!</v-btn>
    </v-layout>
  </v-parallax>
</template>

<style lang="scss" scoped>
  .v-parallax__image {
    max-width: 100%;
    max-height: 1200px;
    object-fit: cover;
  }
</style>
