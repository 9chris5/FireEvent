<template>
  <v-card
    flat
    dark
    height="250"
    class="ma-3">
    <v-layout fill-height>

      <v-tooltip v-if="this.$firebase.auth().currentUser" bottom color="secondary">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            absolute
            bottom
            right
            small
            light
            v-on="on"
            @click="handleSubscribtion($event, 'going', event.id)"
            :class="(eventState === 'going') ? 'primary' : ''"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </template>
        <span v-if="eventState === 'going'">I'm not going</span>
        <span v-else>I'm going!</span>
      </v-tooltip>

      <v-tooltip v-if="this.$firebase.auth().currentUser" bottom color="secondary">
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
            @click="handleSubscribtion($event, 'interested', event.id)"
            :class="(eventState === 'interested') ? 'accent' : ''"
          >
            <v-icon>star</v-icon>
          </v-btn>
        </template>
        <span v-if="eventState === 'interested'">I'm not interested</span>
        <span v-else>I'm interested</span>
      </v-tooltip>

      <v-flex xs4 style="position: relative">
        <v-img
          :src="event.imageUrl || require('../../assets/event-default-thumbnail.jpg')"
          height="100%"
          width="100%"
        ></v-img>
        <v-tooltip v-if="event.link" bottom color="secondary">
          <template v-slot:activator="{ on }">
            <a :href="event.link">
              <v-btn
                fab
                absolute
                top
                left
                small
                light
                flat
                v-on="on"
                class="secondary"
                color="white"
                style="top: 10px"
              >
                <v-icon>open_in_new</v-icon>
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
            <span class="d-block caption text-uppercase font-weight-light">{{ event.category }}</span>
            <p class="ma-0">{{ event.description | truncateWords(8) }}</p>
          </v-card-text>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "home-card",
  props: ["event"],
  data: () => {
    return {
      eventState: ''
    }
  },
  methods: {
    subscribeToInterested (e, eventId) {
      let el = e.currentTarget
      this.$firebase.firestore().collection('users').doc(this.$firebase.auth().currentUser.uid).update({
        interestedEvents: this.$firebase.firestore.FieldValue.arrayUnion(eventId)
      })
      .then(() => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'success',
          message: 'You are now interested in this event.'
        })
        el.classList.add('accent')
      })
      .catch(err => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'error',
          message: err.message
        })
      })
    },

    unsubscribeToInterested (e, eventId) {
      let el = e.currentTarget
      this.$firebase.firestore().collection('users').doc(this.$firebase.auth().currentUser.uid).update({
        interestedEvents: this.$firebase.firestore.FieldValue.arrayRemove(eventId)
      })
      .then(() => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'info',
          message: 'You are no longer interested in this event'
        })
        el.classList.remove('accent')
        this.eventState = ''
      })
      .catch(err => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'error',
          message: err.message
        })
      })
    },

    handleSubscribtion (e, to, id) {
      switch (to) {
        case 'interested':
          if (this.eventState === to) {
            this.unsubscribeToInterested(e, id)
            this.eventState = ''
          } else {
            this.subscribeToInterested(e ,id)
            this.eventState = 'interested'
          }
          break;
        case 'going':
          if (this.eventState === to) {
            this.unsubscribeToGoing(e, id)
            this.eventState = ''
          } else {
            this.subscribeToGoing(e, id)
            this.eventState = 'going'
          }
      }
      this.$store.dispatch('SET_USER_DATA')
    },

    subscribeToGoing (e, eventId) {
      let el = e.currentTarget
      this.$firebase.firestore().collection('users').doc(this.$firebase.auth().currentUser.uid).update({
        goingEvents: this.$firebase.firestore.FieldValue.arrayUnion(eventId)
      })
      .then(() => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'success',
          message: 'You are going to this event.'
        })
        el.classList.add('primary')
      })
      .catch(err => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'error',
          message: err.message
        })
      })
    },

    unsubscribeToGoing (e, eventId) {
      let el = e.currentTarget
      this.$firebase.firestore().collection('users').doc(this.$firebase.auth().currentUser.uid).update({
        goingEvents: this.$firebase.firestore.FieldValue.arrayRemove(eventId)
      })
      .then(() => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'info',
          message: 'You are no longer going to this event'
        })
        el.classList.remove('primary')
        this.eventState = ''
      })
      .catch(err => {
        this.$store.commit('SET_SNACKBAR', {
          type: 'error',
          message: err.message
        })
      })
    }
  },
  mounted () {
    if (this.userData.goingEvents.includes(this.event.id)) {
      this.eventState = 'going'
    } else if (this.userData.interestedEvents.includes(this.event.id)) {
      this.eventState = 'interested'
    }
  },
  computed: {
      ...mapState(['userData'])
  }
}
</script>
