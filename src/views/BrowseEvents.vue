<template>
  <v-layout wrap>
    <v-flex xs12 sm6 lg3 v-for="event in events" :key="event['.key']">
      <Card :event="event"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Card from '@/components/Home/Card'

export default {
  name: 'browse-events',
  components: {
    Card
  },
  data: () => {
    return {
      events: []
    }
  },
  created () {
    this.$firebase
      .firestore()
      .collection('events')
      .get()
      .then(snap => {
        snap.docs.forEach(doc => {
          this.events.push({
            ...doc.data(),
            id: doc.id
          })
        })
      })
      .catch(err => console.error(err))
  }
}
</script>
