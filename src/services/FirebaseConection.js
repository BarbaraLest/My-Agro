import firebase from '@react-native-firebase/app'
import '@react-native-firebase/database'
import '@react-native-firebase/auth'


let firebaseConfig = {
    apiKey: "AIzaSyC1QX8ekRRwhNzTkAJ8EC6wqZHRRdC9sww",
    authDomain: "my-agro-295101.firebaseapp.com",
    databaseURL: "https://my-agro-295101.firebaseio.com",
    projectId: "my-agro-295101",
    storageBucket: "my-agro-295101.appspot.com",
    messagingSenderId: "957764830400",
    appId: "1:957764830400:web:34662681854157a9839925",
    measurementId: "G-6SEC1YPS5T"
}

if(!firebase.apps.length){
    //Abrir minha conexao
    firebase.initializeApp(firebaseConfig);
  }
  

export default firebase

