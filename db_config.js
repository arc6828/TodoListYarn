import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {    
    apiKey: "AIzaSyDwoluY3-YdJmcEZc-FE-DYuaCahMjaZJs",
    authDomain: "todolist-632ca.firebaseapp.com",
    databaseURL: "https://todolist-632ca.firebaseio.com",
    projectId: "todolist-632ca",
    storageBucket: "todolist-632ca.appspot.com",
    messagingSenderId: "519951978461",
    appId: "1:519951978461:web:c121a3f1c31b734856b034",
    measurementId: "G-LE9YX9C8XH"
};  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);
