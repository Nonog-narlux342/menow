import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBNKazF6yJDZrfOVXByiIrFy4B5tvgDY2M',
    authDomain: 'massage-f0c9f.firebaseapp.com',
    databaseURL: 'https://massage-f0c9f.firebaseio.com',
    projectId: 'massage-f0c9f',
    storageBucket: 'massage-f0c9f.appspot.com',
    messagingSenderId: '881159809422',
    appId: '1:881159809422:web:87cfd36df862039a25dcdf',
    measurementId: 'G-SPLE9VW5HC'
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
