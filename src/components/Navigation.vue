<template>
  <nav>
    <v-toolbar app dense flat fixed>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-light">
        <router-link to="/" style="text-decoration: none; color: initial">
          <v-icon color="primary">whatshot</v-icon>
          <span class="white--text">FIRE</span>
          <span class="font-weight-bold primary--text">EVENT</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="this.$store.state.user">
        <v-btn to="/add-event" flat class="hidden-xs-only">new event</v-btn>
        <v-btn to="/my-profile/info" flat class="hidden-xs-only">my profile</v-btn>
        <v-btn flat color="primary" @click="signOut()">sign out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn to="/login" flat color="primary">log in</v-btn>
        <v-btn to="/register" flat color="secondary" class="hidden-xs-only">sign up</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
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
export default {
  name: "navigation",
  data: () => {
    return {
      drawer: false,
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "whatshot", text: "My events", route: "/my-events" },
        { icon: "dashboard", text: "Profile", route: "/profile" }
      ]
    };
  },
  methods: {
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
