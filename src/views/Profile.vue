<template>
    <v-container fill-height>

        <v-layout wrap fill-height>

          <v-flex xs12>

            <v-tabs
              centered
              show-arrows
              color="transparent"
            >
        
              <v-tabs-slider color="primary"></v-tabs-slider>

              <v-tab
                :ripple="false"
                v-for="(tab, i) in tabs"
                :key="i"
                :href="`#${tab.href}`"
              >
                {{ tab.title }}
              </v-tab>

              <v-tabs-items>

                <v-tab-item value="settings">

                  <v-card
                    class="mt-3 mx-auto"
                    max-width="800px"
                    flat
                    color="transparent"
                  >

                    <v-card-text>

                      <v-form ref="form">

                        <v-layout wrap>

                          <v-flex xs12 sm6>

                            <v-text-field
                              label="Name"
                              placeholder="Enter your name"
                              hint="At least 4 characters"
                              v-model="form.data.name"
                            ></v-text-field>

                          </v-flex>

                          <v-spacer></v-spacer>

                          <v-flex xs12 sm5>

                            <v-select
                              dense
                              menu-props="offsetY"
                              :hide-details="false"
                              label="Age"
                              placeholder="Select your age range"
                              :items="form.options.age"
                              v-model="form.data.age"
                            ></v-select>

                          </v-flex>

                          <v-flex xs12>

                            <v-autocomplete
                              dense
                              allow-overflow
                              label="State"
                              placeholder="Select your location"
                              :items="form.options.states"
                              v-model="form.data.state"
                            ></v-autocomplete>

                          </v-flex>

                          <v-flex xs12>

                            <v-textarea
                              label="About Me"
                              placeholder="Don't be so shy (^.^)"
                              v-model="form.data.description"
                            ></v-textarea>

                          </v-flex>

                          <v-flex xs12>

                            <v-btn
                              flat
                              dense
                              round
                              block
                              :loading="form.loading"
                              class="primary"
                              @click="updateProfile"
                            >
                              <v-icon left>save</v-icon>
                              save
                            </v-btn>

                          </v-flex>

                        </v-layout>

                      </v-form>
                      
                    </v-card-text>

                  </v-card>

                </v-tab-item>

                <v-tab-item value="avatar">

                  <v-card
                    class="mt-3 mx-auto"
                    flat
                    color="transparent"
                    width="200px"
                  >

                    <v-card-text class="pa-0 py-5">

                      <v-flex xs12>

                        <v-img
                          style="border: 2px solid white"
                          height="200px"
                          width="200px"
                          class="mb-3"
                          :src="imageUrl"
                        >
                          
                          <v-layout
                            justify-center
                            align-center
                            fill-height
                          >

                            <v-btn
                              flat
                              outline
                              large
                              @click="onPickFile"
                            >
                              load
                            </v-btn>

                            <input
                              type="file"
                              style="display: none"
                              ref="fileInput"
                              accept="image/*"
                              @change="onFilePicked"
                            >

                          </v-layout>

                        </v-img>

                        <v-btn
                          flat
                          dense
                          block
                          round
                          :loading="form.loading"
                          class="primary"
                          @click="updateAvatar"
                        >
                        
                          <v-icon left>save</v-icon>
                          save
                        
                        </v-btn>

                      </v-flex>

                    </v-card-text>

                  </v-card>

                </v-tab-item>

              </v-tabs-items>

            </v-tabs>

          </v-flex>

        </v-layout>

    </v-container>
</template>

<script>
import states from '@/assets/countries'
import uuid from 'uuid/v4'

export default {
    name: 'profile',
    data: () => {
      return {
        tabs: [
            { title: 'Settings', href: 'settings' },
            { title: 'Avatar', href: 'avatar' },
        ],
        form: {
          loading: false,
          data: {
            name: '',
            age: '',
            description: '',
            state: ''
          },
          options: {
            age: [
              'under 18',
              '19-25',
              '26-30',
              '31-40',
              '41-50',
              'over 50'
            ],
            states: []
          }
        },
        imageUrl: '',
        prevUrl: '',
        image: null
      }
    },
    computed: {
      userData () {
        return this.$store.getters.USER_DATA
      }
    },
    methods: {
      updateProfile () {
        if (this.$refs.form.validate()) {
          this.form.loading = true

          this.$firebase
            .firestore()
            .collection('users')
            .doc(this.$firebase.auth().currentUser.uid)
            .update({
              name: this.form.data.name,
              age: this.form.data.age,
              description: this.form.data.description,
              state: this.form.data.state
            })
            .then(() => {
              this.form.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'success',
                message: 'Updated profile successfully'
              })
              this.$store.dispatch('SET_USER_DATA')
            })
            .catch(err => {
              this.form.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'error',
                message: err.message
              })
            })
        }
      },
      onPickFile() {
        this.$refs.fileInput.click();
      },
      onFilePicked(e) {
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
      updateAvatar () {
        if (this.imageUrl !== this.prevUrl) {
          this.form.loading = true;
          this.$firebase
            .storage()
            .ref("images/" + uuid())
            .put(this.image)
            .then(fileData => {
              return fileData.ref.getDownloadURL();
            })
            .then(url => {
              return this.$firebase
                .firestore()
                .collection('users')
                .doc(this.$firebase.auth().currentUser.uid)
                .update({
                  avatarUrl: url
                });
            })
            .then(() => {
              this.form.loading = false;
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'success',
                message: 'Updated avatar successfully'
              })
              this.$store.dispatch('SET_USER_DATA')
            })
            .catch(err => {
              this.form.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                type: 'error',
                message: err.message
              })
            });
        } else {
          this.form.loading = false
          this.$store.dispatch('SET_SNACKBAR', {
            type: 'warning',
            message: 'Select new avatar to upload'
          })
        }
      }
    },
    created () {
      this.form.options.states = states
      this.imageUrl = this.userData.avatarUrl
      this.form.data.name = this.userData.name
      this.form.data.age = this.userData.age
      this.form.data.description = this.userData.description
      this.form.data.state = this.userData.state
      this.prevUrl = this.imageUrl
    }
}
</script>

<style lang="scss" scoped>
  .img-fluid {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
</style>
