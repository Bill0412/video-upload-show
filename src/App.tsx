import React, { useState } from 'react';
import './App.css';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const Filler = (props:any) => {
  return <div className="filler" style={{width: `${props.percentage}%`}}/>
}

const ProgressBar = (props : any) => {
  return(
    <div className="flex-container" id={props.id}>
      <div className="title">{props.filename}</div>
      <div className="progress-bar"><Filler percentage={props.percentage}/></div>
      <div className="upload-percent">{props.percentage}%</div>
      {props.percentage === 100 ? <div className="upload-state">Success</div> : (props.percentage === 0 ? <div className="upload-state">Waiting</div> : <div className="upload-state">Uploading</div>)}
    </div>
  )
};

let queueIndex = 0;

const Index = (props : any) => {
  const fileStates= useState([]);
  const files = fileStates[0];
  const setFiles : any = fileStates[1];

  const nextQueueIndex = () => {
    return queueIndex++;
  }
  
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
  const waitUpload = true;

  const fileSelectedHandler = (event : any) => {
    console.log(event.target.files[0]);
    
    for(let i = 0; i < event.target.files.length; i++) {
      const newFile : any = event.target.files[i];
      newFile["id"] = nextQueueIndex();
      newFile["progress"] = 0;
      console.log(newFile);
      setFiles((prevFiles : any) => [...prevFiles, newFile]);
    }
  }

  const genProgressBars = () => {
    let bars : any = [];
    
    files.forEach((file : any) => {
      bars.push(
        <li key={file.id}>
          <ProgressBar id={file.id} percentage={file.progress} filename={file.name}/>
        </li>
      )
    });

    return bars;
  }

  const fileUploadHandler = (event : any) => {

    //event.preventDefault();   // prevent page refreshing

    const promises : any = [];
    files.forEach((file : any) => {
      if(file.progress < 100) {
        const uploadTask : any = storageRef.child(file.name).put(file);
        // console.log(uploadTask);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot:any) => {
            // calculate the progress
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Number(progress.toFixed(2));

            // get file id
            let fileId = snapshot.task.blob_.data_.id;

            // update the progress
            if(snapshot.state === firebase.storage.TaskState.RUNNING) {
              setFiles((prevFiles : any) => {
                prevFiles.find((item : any) => item.id === fileId).progress = progress;
                return [...prevFiles];
              })
            }        
            // console.log(files);
          },
          (error : any) => console.log(error.code),
        )
      }
    });
    console.log(promises);
    Promise.all(promises)
      .then(() => {
        console.log("All files uploaded")
      })
      .catch(err => console.log(err.code));

  }


  return (
      <div className="App">
        <h2>Please choose the video files to upload.</h2>
        <Link to={`show`}>videos uploaded</Link>
        <div className="input-box">
          <input type="file" onChange={fileSelectedHandler} multiple></input>
          <button onClick={fileUploadHandler}>Upload</button>
        </div>
        
        {/*files[0] ? <ProgressBar percentage={files[0]["progress"]} filename={files[0]["name"]}/> : <div></div>8*/}
        {/* {this.state.percent === 100 ? <div>Uploading...</div> : <div>Uploaded</div>} */}
        <div className="progress-bars">{genProgressBars()}</div>
      </div>
  );
}

const Show = () => {
  return(
    <div className="App">
       <h2>Videos Uploaded</h2>
    </div>
  )
}

const PageNotFound = () => {
  return(
    <h2>Page not Found!</h2>
  )
}

const App = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/show" component={Show} />
        <Route exact path="/" component={Index}/>
        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  )
}
export default App;
