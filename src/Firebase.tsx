
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAAJ11KSyoF72gWXLxsR1dD3V_Udoj8jxc",
    authDomain: "video-c34ea.firebaseapp.com",
    databaseURL: "https://video-c34ea.firebaseio.com",
    projectId: "video-c34ea",
    storageBucket: "video-c34ea.appspot.com",
    messagingSenderId: "216349406039",
    appId: "1:216349406039:web:ec24a29f93432dde3dc412",
    measurementId: "G-7BS6XD2MXQ"
  };

export default class FirebaseUtil{
    static getStorage() {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        return firebase.storage();
    }

    static getStorageRef() {
        return this.getStorage().ref();
    }
}