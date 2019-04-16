<template>
  <v-footer height="auto">
    <v-card flat tile min-width="100%">
        <v-card-title class="py-0">
          All rights reserved.
          <v-spacer></v-spacer>
          <span class="hidden-xs-only">Follow all the events via social media</span>
          <v-btn v-for="icon in icons" :key="icon" icon>
            <v-icon color="primary" size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'app-footer',
  data: () => {
    return {
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-instagram'
      ]
    }
  }
}
</script>
