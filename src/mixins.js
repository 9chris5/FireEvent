export const createArrayOfReferencesMixin = {
  methods: {
    createArrayOfReferences (col, docs) {
      let arr = []
      docs.forEach(doc => {
        arr.push(this.$firebase.firestore.collection(col).doc(doc))
      })
      return arr
    }
  }
}
