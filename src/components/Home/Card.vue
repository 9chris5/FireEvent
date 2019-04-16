<template>
  <v-card flat height="250" class="ma-3">
    <v-layout fill-height>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            absolute
            bottom
            right
            small
            light
            v-on="on"
            @click="subscribeToGoing(event.id)"  
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </template>
        <span>I'm going!</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            absolute
            bottom
            right
            small
            light
            v-on="on"
            style="transform: translateX(-35px)"
            @click="subscribeToInterested(event.id)"
          >
            <v-icon>star</v-icon>
          </v-btn>
        </template>
        <span>I'm interested</span>
      </v-tooltip>

      <v-flex xs4 style="position: relative">
        <v-img
          :src="event.imageUrl || require('../../assets/event-default-thumbnail.jpg')"
          height="100%"
          width="100%"
        ></v-img>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a :href="event.link">
              <v-btn
                fab
                absolute
                top
                left
                small
                light
                outline
                flat
                v-on="on"
                color="white"
                style="top: 10px"
              >
                <v-icon>keyboard_backspace</v-icon>
              </v-btn>
            </a>
          </template>
          <span>Event webpage</span>
        </v-tooltip>
      </v-flex>

      <v-flex xs8>
        <div class="v-card__content">
          <v-card-title class="primary" style="flex-direction: column; align-items: flex-start">
            <h3 class="title font-weight-black mb-2">{{ event.artist }}</h3>
            <span class="d-block font-weight-bold">{{ event.location }}</span>
            <span class="d-block">{{ event.date.replace(/\-/g, '.') }}</span>
          </v-card-title>
          <v-card-text>
            <b>{{ event.name }}</b>
            <p class="ma-0">{{ event.description | truncateWords(10) }}</p>
          </v-card-text>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "home-card",
  props: ["event"],
  methods: {
    subscribeToInterested (eventId) {
      this.$firebase.firestore().collection('users').doc(this.$store.state.user.uid).update({
        interestedEvents: this.$firebase.firestore.FieldValue.arrayUnion(eventId)
      })
      .then(() => {
        this.$store.commit('showSnackbar', {
          type: 'success',
          message: 'You are now interested in this event.'
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    subscribeToGoing (eventId) {
      this.$firebase.firestore().collection('users').doc(this.$store.state.user.uid).update({
        goingEvents: this.$firebase.firestore.FieldValue.arrayUnion(eventId)
      })
      .then(() => {
        this.$store.commit('showSnackbar', {
          type: 'success',
          message: 'You are going to this event.'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
