<template>
  <v-card flat>
    <v-card-title class="subheading font-weight-medium">Profile info</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-layout wrap fill-height>
          <v-flex xs12>
            <v-text-field v-model="form.name" label="Name" box></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="form.age" label="Age" box></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="form.city" label="City" box></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn flat block :loading="form.loading" @click="updateProfileInfo()" class="primary">
              <v-icon left>save</v-icon>
              save
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-snackbar top="top" v-model="info.show" :timeout="6000" color="primary">
      {{ info.message }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "profileInfo",
  data: () => {
    return {
      form: {
        loading: false,
        name: '',
        age: '',
        city: ''
      },
      info: {
        show: false,
        message: ''
      }
    };
  },
  methods: {
    updateProfileInfo() {
      this.form.loading = true;
      this.$firebase
        .firestore()
        .collection('users')
        .doc(this.$firebase.auth().currentUser.uid).update({
          name: this.form.name,
          age: this.form.age,
          city: this.form.city
        })
        .then(() => {
          this.form.loading = false
          this.info.message = 'Your profile has been updated.'
          this.info.show = true
        })
        .catch(err => {
          this.info.message = err.message
          this.info.show = true
        });
    }
  },
  created () {
    this.$firebase.firestore().collection('users').doc(this.$firebase.auth().currentUser.uid).get().then(doc => {
      const data = doc.data()
      this.form.name = data.name
      this.form.age = data.age
      this.form.city = data.city
    }).catch(err => console.log(err))
  }
};
</script>
