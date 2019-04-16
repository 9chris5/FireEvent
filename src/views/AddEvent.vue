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
              <v-layout wrap>
                <v-flex xs12 md3>
                  <v-text-field label="Artist, band etc..." v-model="form.artist" :rules="form.rules.required" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 md4>
                  <v-text-field label="Event name..." v-model="form.name" :rules="form.rules.required" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 md3>
                  <v-text-field label="Where..." v-model="form.location" :rules="form.rules.required" required></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-menu full-width>
                    <v-text-field slot="activator" :value="form.date" label="Date..." :rules="form.rules.required" required></v-text-field>
                    <v-date-picker light v-model="form.date"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 md8>
                  <v-text-field label="Link" v-model="form.link" :rules="form.rules.link" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Description" v-model="form.description" :rules="form.rules.required" required></v-textarea>
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
    <v-snackbar top :timeout="6000" color="primary" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
    name: 'addEvent',
    data: () => {
        return {
          imageUrl: '',
          image: null,
          loading: false,
          form: {
            artist: '',
            name: '',
            location: '',
            date: '',
            description: '',
            link: '',
            rules: {
              required: [ v => !!v || 'This field is required.' ],
              link: [
                v => !!v || 'This field is required.',
                v => /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(v) || 'Enter valid link (with http://....).'
              ]
            }
          },
          snackbar: {
            show: false,
            message: ''
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
            .ref('images/' + this.image.name)
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
            artist: this.form.artist,
            name: this.form.name,
            location: this.form.location,
            date: this.form.date,
            link: this.form.link,
            description: this.form.description,
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
                this.snackbar.message = 'Event uploaded successfully'
                this.snackbar.show = true
                this.resetForm()
              }).catch(err => {
                this.loading = false
                this.snackbar.message = err.message
                this.snackbar.show = true
              })
          } else {
            this.saveDetails()
            .then(() => {
              this.loading = false
              this.snackbar.message = 'Event uploaded successfully'
              this.snackbar.show = true
              this.resetForm()
            }).catch(err => {
              console.log(err)
              this.loading = false
              this.snackbar.message = err.message
              this.snackbar.show = true
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

