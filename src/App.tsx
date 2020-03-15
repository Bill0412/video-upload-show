import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component{
  firebaseConfig = {
    apiKey: "AIzaSyAAJ11KSyoF72gWXLxsR1dD3V_Udoj8jxc",
    authDomain: "video-c34ea.firebaseapp.com",
    databaseURL: "https://video-c34ea.firebaseio.com",
    projectId: "video-c34ea",
    storageBucket: "video-c34ea.appspot.com",
    messagingSenderId: "216349406039",
    appId: "1:216349406039:web:ec24a29f93432dde3dc412",
    // measurementId: "G-measurement-id",
  };

  state: any = {
    selectedFile: null
  }

  fileSelectedHandler = (event: any) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('video', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('https://us-central1-video-c34ea.cloudfunctions.net/upload', fd)
      .then(res => {
        console.log(res);
      });
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
