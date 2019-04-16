<template>
  <v-layout justify-center align-center fill-height :style="`background: url(${require('../assets/celebration.jpg')}); background-position: center; background-size: cover`">
    <v-card flat width="400" class="mx-4" style="background-color: rgba(0,0,0,.7)">
      <v-card-title>
        <h2 class="display-2 text-xs-center" style="width: 100%">Log in</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="form.valid" lazy-validation>
          <v-text-field v-model="form.email" :rules="form.rules.email" label="Email" required></v-text-field>
          <v-text-field v-model="form.password" :rules="form.rules.password" label="Password" type="password" required></v-text-field>
          <v-btn flat round block @click="signIn()" :loading="form.loading" class="primary mt-3">Enter</v-btn>
          <v-btn flat small round block to="/register">create account</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      form: {
        valid: false,
        loading: false,
        email: '',
        password: '',
        rules: {
          email: [
            v => !!v || 'Please enter your email.',
            v => /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(v) || 'Please enter valid email address.'
          ],
          password: [ v => !!v || 'Please enter your password.']
        }
      }
    }
  },
  methods: {
    signIn () {
      this.form.loading = true
      if (this.form.valid) {
        this.$firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(() => {
          this.$router.push('/')
        }).catch(err => {
          console.log(err)  
        })
      }
    }
  }
}
</script>
