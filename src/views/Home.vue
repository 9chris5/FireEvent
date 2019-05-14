<template>
  <div class="home">
    <Header v-if="!this.$firebase.auth().currentUser"/>
    <v-container>

      <section class="my-3">
        <h2>Check out hottest events</h2>
        <v-divider class="my-3"></v-divider>
        <v-layout wrap style="margin: -8px">
          <v-flex xs12 sm6 lg3 v-for="event in events" :key="event['.key']">
            <Card :event="event"/>
          </v-flex>
          <v-flex xs12 ma-2 mt-5>
            <v-btn to="/browse-events" outline block color="primary">show more events</v-btn>
          </v-flex>
        </v-layout>
      </section>

      <section class="my-3">
        <h2>About us</h2>
        <v-divider class="my-3"></v-divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum tempus elit sed tristique. Cras nec neque sit amet turpis maximus aliquam. Aenean turpis diam, auctor auctor dignissim at, imperdiet nec ipsum. Etiam vitae dolor eu ex gravida ultricies ac in lorem. Maecenas non arcu purus. Aliquam erat velit, tristique at neque at, porta mattis ex. Duis viverra erat nec dolor fringilla, a dapibus augue mollis. Morbi vulputate, tortor vel facilisis eleifend, ante ligula posuere leo, id eleifend dui diam et elit. Nunc vulputate purus in ipsum malesuada, non fermentum dolor bibendum. Donec aliquam, mi nec finibus semper, velit sem vehicula sapien, faucibus eleifend leo justo at purus. Etiam sed malesuada nibh, at posuere nulla. Curabitur eu est ligula. Aenean ut lectus mattis, rhoncus urna ut, vulputate est. Nunc ut elit vitae sem accumsan maximus. Praesent blandit fringilla ex.
        </p>
        <p class="hidden-sm-and-down">
          Curabitur dapibus ut velit vitae condimentum. Aenean et leo aliquet, aliquam dui in, mattis diam. Mauris tempor pulvinar nulla a commodo. Nulla dolor urna, porta at mi nec, bibendum egestas neque. Etiam dignissim massa et eros tempor, in placerat erat scelerisque. Duis scelerisque porta turpis viverra auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris nulla mi, accumsan ut pharetra quis, mollis vitae enim. Curabitur ut libero at velit maximus posuere. Suspendisse sed leo at libero dignissim pellentesque eu in ante. Fusce eu libero mattis, tincidunt neque eu, molestie metus. Integer feugiat euismod lectus, ac pulvinar nisi mollis sed. Sed risus nunc, sodales vitae sem nec, mollis condimentum nunc. Curabitur gravida sodales ligula, quis luctus augue ornare ut. Integer est ante, imperdiet quis dui maximus, pharetra gravida tellus. Nam nisi sapien, ornare in sagittis eu, commodo vel orci.
        </p>
      </section>

      <section class="my-3">
        <h2>Our policies</h2>
        <v-divider class="my-3"></v-divider>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="panel in panels" :key="panel.title">
            <template slot="header">
              <div>{{ panel.title }}</div>
            </template>
            <v-card flat>
              <v-card-text>
                {{ panel.content }}
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </section>
    </v-container>
  </div>
</template>

<script>
  import Header from '@/components/Home/Header'
  import Card from '@/components/Home/Card'

  export default {
    name: 'home',
    components: {
      Header,
      Card
    },
    data: () => {
      return {
        events: [],
        panels: [
          { title: 'Terms of use', content: 'Shit1' },
          { title: 'Authors manifest', content: 'Shit2' },
          { title: 'Privacy policy', content: 'Shit3' }
        ]
      }
    },
    created () {
      this.$firebase
        .firestore()
        .collection('events')
        .orderBy('timestamp')
        .limit(8)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.events.push({
              ...doc.data(),
              id: doc.id
            })
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
</script>
