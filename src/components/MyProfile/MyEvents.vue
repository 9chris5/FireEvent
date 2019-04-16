<template>
  <v-layout wrap style="margin: -8px">
    <v-flex xs12 sm6 lg5 v-for="event in events" :key="event['.key']">
      <Card :event="event"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Card from '@/components/Home/Card'

export default {
    name: 'my-events',
    components: {
      Card
    },
    data: () => {
      return {
        events: []
      }
    },
    created() {
      this.$firebase
        .firestore()
        .getAll(...references)
        .then(snapshot => {
          let data = snapshot.docs
          data.forEach(doc => {
            this.events.push(doc)
          })
      })
    }
}
</script>
