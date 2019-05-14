<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md3>
        <v-card flat>
          <v-card-title>Event photo</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-show="!imageUrl" class="placeholder">
              <i>event photo :)</i>
            </div>
            <v-img v-show="imageUrl" :src="imageUrl" height="200"></v-img>
            <v-btn class="secondary" flat block @click="onPickFile">load</v-btn>
            <input type="file" accept="image/*" ref="fileInput" @change="onFilePicked" style="display: none">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md8>
        <v-card flat>
          <v-card-title>Event details</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form">
              <v-layout wrap justify-space-between>
                <v-flex xs12 md6>
                  <v-text-field label="Artist, band, name, etc..." v-model="form.data.artist" :rules="form.rules.required" required></v-text-field>
                </v-flex>
                <v-flex xs12 md5>
                  <v-select label="Type" :items="form.categories" v-model="form.data.category" :rules="form.rules.required" required menu-props="offsetY"></v-select>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Where..." v-model="form.data.location" :rules="form.rules.required" required></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-menu full-width>
                    <v-text-field slot="activator" :value="form.data.date" label="Date..." :rules="form.rules.required" required></v-text-field>
                    <v-date-picker light v-model="form.data.date"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Link" v-model="form.data.link"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Description" v-model="form.data.description" :rules="form.rules.required" required></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat block class="primary" :loading="loading" @click="saveEvent">save</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import uuid from 'uuid/v4'

export default {
    name: 'addEvent',
    data: () => {
        return {
          imageUrl: '',
          image: null,
          loading: false,
          form: {
            data: {
              artist: '',
              category: '',
              location: '',
              date: '',
              description: '',
              link: '',
            },
            categories: ['Live concert', 'Sport event', 'Cultural event', 'Artistic performance', 'Entertainment'],
            rules: {
              required: [ v => !!v || 'This field is required.' ],
              link: [
                v => /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(v) || 'Enter valid link (with http://....).'
              ]
            }
          }
        }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click();
      },
      onFilePicked (e) {
        const files = e.target.files;
        let filename = files[0].name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Please enter a valid file");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      },
      saveImage () {
        if (this.image) {
          return this.$firebase
            .storage()
            .ref('images/' + uuid())
            .put(this.image)
            .then(fileData => {
              return fileData.ref.getDownloadURL()
            })
        }
      },
      saveDetails (url = '') {
        return this.$firebase
          .firestore()
          .collection('events')
          .add({
            artist: this.form.data.artist,
            category: this.form.data.category,
            location: this.form.data.location,
            date: this.form.data.date,
            link: this.form.data.link,
            description: this.form.data.description,
            imageUrl: url,
            authorId: this.$firebase.auth().currentUser.uid,
            timestamp: this.$firebase.firestore.Timestamp.fromDate(new Date()),
          })
      },
      resetForm () {
        this.$refs.form.reset()
        this.imageUrl = ''
        this.image = null
      },
      saveEvent () {
        if (this.$refs.form.validate()) {
          this.loading = true
          if (this.image) {
            this.saveImage()
              .then(url => {
                return this.saveDetails(url)
              })
              .then(() => {
                this.loading = false
                this.$store.dispatch('SET_SNACKBAR', {
                  type: 'success',
                  message: 'Event created successfully.'
                })
                this.resetForm()
              }).catch(err => {
                this.loading = false
                this.$store.dispatch('SET_SNACKBAR', {
                  type: 'error',
                  message: err.message
                })
              })
          } else {
            this.saveDetails()
            .then(() => {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'success',
                message: 'Event created successfully.'
              })
              this.resetForm()
            }).catch(err => {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'error',
                message: err.message
              })
            })
          }
        }
      }
    }
}
</script>

<style scoped>
.placeholder {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed grey;
  pointer-events: none;
}
</style>

