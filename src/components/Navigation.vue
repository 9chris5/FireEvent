<template>
  <nav>

    <v-toolbar
      style="z-index: 777"
      light
      app
      dense
      flat
      fixed
      scroll-off-screen
      :scroll-threshold="100">

      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer">
      </v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/">
          <div class="brand">
            <span>Firevent</span>
          </div>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="this.$firebase.auth().currentUser">
        <v-menu
          offset-y
          light
          bottom
          left>

          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
            >

              <v-avatar
                size="32px"
                color="primary"
              >

                <img v-if="userData.avatarUrl" class="img-fluid" :src="userData.avatarUrl" :alt="userData.name">
                <span v-else class="white--text">{{ userData.email[0] }}</span>

              </v-avatar>

              <v-icon>arrow_drop_down</v-icon>

            </v-btn>
          </template>

          <v-list>
            <v-list-tile
            v-for="link in links"
            :key="link.route"
            :to="link.route">

              <v-list-tile-action>
                <v-icon color="black">{{ link.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <span class="body-2 text-uppercase font-weight-medium">{{ link.text }}</span>
              </v-list-tile-content>

            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile
            @click="signOut">

              <v-list-tile-action>
                <v-icon color="black">exit_to_app</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <span class="body-2 text-uppercase font-weight-medium">Sign out</span>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn to="/login" flat color="primary">log in</v-btn>
        <v-btn to="/register" flat color="primary" class="hidden-xs-only">sign up</v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-navigation-drawer
      app
      disable-resize-watcher
      style="z-index: 888"
      v-model="drawer"
    >

      <v-img
        v-if="this.$store.state.user"
        :aspect-ratio="16/9"
        :src="require('../assets/thumb.jpg')"
        >
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{ this.$store.state.user.email }}</div>
          </v-flex>
        </v-layout>
        
      </v-img>
      <v-list>

        <v-list-tile v-for="link in links" :key="link.text">
          
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "navigation",
  data: () => {
    return {
      drawer: false,
      links: [
        { icon: "person_pin", text: "Profile", route: "/profile" },
        { icon: "whatshot", text: "My events", route: "/my-events" },
        { icon: "add", text: "Add event", route: "/add-event" }
      ]
    };
  },
  methods: {
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('CLEAR_STATE')
          this.$router.push('/')
        });
    }
  },
  computed: mapState({
    ...mapState(['userData'])
  })
};
</script>

<style lang="scss" scoped>
  .v-toolbar__title {
    overflow: visible;
  }
  .img-fluid {
    width: 100%;
    object-fit: cover;
  }
  .brand {
    padding: 9px 20px;
    transform: skew(-15deg);
    background-color: #D32F2F;

    span {
      transform: skew(15deg);
      color: white;
      letter-spacing: 1px;
      display: block;
      text-transform: uppercase;
      font-weight: 600;
    }
  }
</style>
