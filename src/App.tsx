import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

const Filler = (props:any) => {
  return <div className="filler" style={{width: `${props.percentage}%`}}/>
}

const ProgressBar = (props:any) => {
  return(
    <div className="flex-container">
      <div className="title">{props.filename}</div>
      <div className="progress-bar"><Filler percentage={props.percentage}/></div>
      <div>{props.percentage}%</div>
    </div>
  )
};

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
    selectedFile: null,
    percent: 0
  }
  storageRef = storage.ref();

  fileSelectedHandler = (event: any) => {
    console.log(event.target.files[0]);
    this.setState({
      
      selectedFile: event.target.files[0],
      percent: 0
      //uploadingFiles: prevState.uploadingFiles
    })
  }

  fileUploadHandler = () => {
    // const filepath = path.join(os.tmpdir(), filename);
    let videoRef = this.storageRef.child(this.state.selectedFile.name);
    videoRef.put(this.state.selectedFile)
      .on(
        'state_changed', 
        (data) => {
          let now = (data.bytesTransferred / data.totalBytes) * 100;
          now = Number(now.toFixed(2));
          this.setState((prevState) => ({
            percent: now
          }));
        },
        (err) => {
          console.log('error');
          console.log(err);
        },
        () => {
          console.log('Uploaded a blob!');
        }
      );
  }


  render() {
    return (
      <div className="App">
      <input type="file" onChange={this.fileSelectedHandler}></input>
      <button onClick={this.fileUploadHandler}>Upload</button>
      {this.state.selectedFile ? <ProgressBar percentage={this.state.percent} filename={this.state.selectedFile.name}/> : <div></div>}
      </div>
    );
  }
}

export default App;
