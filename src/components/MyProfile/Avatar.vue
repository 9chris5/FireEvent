<template>
  <v-card flat>
    <v-card-title class="subheading font-weight-medium">Profile photo</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-btn flat block class="secondary" @click="onPickFile">load image</v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      >
      <v-img :src="imageUrl" height="150" width="150" style="margin: 0 auto" class="my-5"></v-img>
      <v-btn flat block class="primary" :loading="loading" @click="saveAvatar">
        <v-icon left>save</v-icon>save
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "avatar",
  data: () => {
    return {
      imageUrl: "",
      prevUrl: "",
      image: null,
      loading: false
    };
  },
  methods: {
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
    saveAvatar() {
      if (this.imageUrl !== this.prevUrl) {
        this.loading = true;
        this.$firebase
          .storage()
          .ref("images/" + this.image.name)
          .put(this.image)
          .then(fileData => {
            return fileData.ref.getDownloadURL();
          })
          .then(url => {
            return this.$firebase
              .firestore()
              .collection("users")
              .doc(this.$firebase.auth().currentUser.uid)
              .update({
                avatarUrl: url
              });
          })
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("Dont upload the same image!!!");
      }
    }
  },
  created() {
    this.$firebase
      .firestore()
      .collection("users")
      .doc(this.$firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        const data = doc.data();
        this.prevUrl = data.avatarUrl;
        this.imageUrl = data.avatarUrl;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
