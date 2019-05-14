<template>

  <v-layout
    justify-center
    align-center
    fill-height
    :style="`background: url(${require('../assets/fireworks.jpg')});
              background-position: center;
              background-size: cover`"
  >

    <v-card
      flat
      max-width="400"
      min-width="350"
      class="mx-4"
      style="background-color: rgba(0,0,0,.75)"
    >

      <v-card-title>
        <h2 class="d-block display-2 text-xs-center" style="width: 100%">Sign up</h2>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="form.valid" lazy-validation>
          <v-text-field v-model="form.email" :rules="form.rules.email" label="Email" required></v-text-field>
          <v-text-field v-model="form.password" :rules="form.rules.password" label="Password" type="password" required></v-text-field>
          <v-text-field v-model="form.passwordRepeat" :rules="passwordRepeatRules" label="Repeat password" type="password" required></v-text-field>
          <v-btn flat round block @click="signUp()" :loading="form.loading" class="primary mt-3">Register</v-btn>
          <v-btn flat small round block to="/login">i have an account</v-btn>
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
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        rules: {
          email: [
            v => !!v || 'Please enter your email.',
            v => /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(v) || 'Please enter valid email address.'
          ],
          password: [ v => !!v || 'Please enter your password.' ]
        }
      },
      snackbar: {
        show: false,
        info: ''
      }
    }
  },
  methods: {
    signUp () {
      if (this.$refs.form.validate()) {
        this.form.loading = true
        this.$firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(user => {
          this.$router.push('/')
        }).catch(err => {
          this.snackbar.info = err.message
          this.snackbar.show = true
          this.form.loading = false
        })
      }
    }
  },
  computed: {
    passwordRepeatRules () {
      return [
        v => (this.form.password === this.form.passwordRepeat) || 'Passwords must match.',
        v => !!v || 'Please repeat your password.'
      ]
    }
  }
}
</script>
