import React, { useState } from 'react';
import './App.css';
import * as firebase from 'firebase';

const App = (props : any) => {
  const fileStates= useState([]);
  const files = fileStates[0];
  const setFiles : any = fileStates[1];
  
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
  
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const fileSelectedHandler = (event: any) => {
    console.log(event.target.files[0]);
    
    for(let i = 0; i < event.target.files.length; i++) {
      const newFile : any = event.target.files[i];
      newFile["id"] = Math.random();
      setFiles((prevFiles : any) => [...prevFiles, newFile]);
    }
  }

  const fileUploadHandler = (event:any) => {
    event.preventDefault();   // prevent page refreshing
    const promises = [];
    files.forEach((file:any) => {
      const uploadTask:any = storageRef.child(file.name).put(file);
      promises.push(uploadTask);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:any) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = Number(progress.toFixed(2));
          console.log(`progress: ${progress}%`);
          console.log(snapshot)
        },
        (error : any) => console.log(error.code),
      )
    })
  }

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



  return (
    <div className="App">
    <input type="file" onChange={fileSelectedHandler} multiple></input>
    <button onClick={fileUploadHandler}>Upload</button>
    {/*this.state.selectedFile ? <ProgressBar percentage={this.state.percent} filename={this.state.selectedFile.name}/> : <div></div>*/}
    {/* {this.state.percent === 100 ? <div>Uploading...</div> : <div>Uploaded</div>} */}
    </div>
  );



}

export default App;
