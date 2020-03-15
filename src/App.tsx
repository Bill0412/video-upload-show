import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
const os = require('os');
const fs = require('fs');
const path = require('path');

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

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

class App extends Component{

  state:any = {
    selectedFile: null
  }
  storageRef = storage.ref();

  fileSelectedHandler = (event: any) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    // const filepath = path.join(os.tmpdir(), filename);
    let videoRef = this.storageRef.child(this.state.selectedFile.name);
    videoRef.put(this.state.selectedFile)
      .then((snapshot:any) => {
        console.log('Uploaded a blob or file!');
      })
  }

  render() {
    return (
      <div className="App">
      <input type="file" onChange={this.fileSelectedHandler}></input>
      <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default App;
