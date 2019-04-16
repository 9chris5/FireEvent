import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

import { firebaseConfig } from './config/config'

firebase.initializeApp(firebaseConfig)

export default firebase
