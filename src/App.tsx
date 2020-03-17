import React, { useState } from 'react';
import './App.css';
import FirebaseUtil from './Firebase'
import * as firebase from 'firebase';

const Filler = (props : any) => {
  return (<div className="filler" style={{width: `${props.percentage}%`}}/>);
}

const ProgressBar = (props : any) => {
  return(
    <div className="row progress-container" id={props.id}>
      <div className="col-sm-12 col-md-12 col-lg-5">{props.filename}</div>
      <div className="col-sm-12 col-md-7 col-lg-4 progress-bar"><Filler percentage={props.percentage}/></div>
      <div className="col-sm-6 col-md-2 col-lg-1 upload-percent">{props.percentage}%</div>
      {props.percentage === 100 ? <div className="col-sm-6 col-md-3 col-lg-1 upload-state">Success</div> : (props.percentage === 0 ? <div className="col-sm-6 col-md-3 col-lg-1 upload-state">Waiting</div> : <div className="col-sm-6 col-md-3 col-lg-1 upload-state">Uploading</div>)}
    </div>
  )
};

// route: /
export default class App extends React.Component{
  state : any = {
    files: []
  }
  // firebase API
  storage = FirebaseUtil.getStorage();
  storageRef = FirebaseUtil.getStorageRef();

  private queueIndex = 0;
  nextQueueIndex = () => {
    return this.queueIndex++;
  }

  fileSelectedHandler = (event : any) => {
    console.log(event.target.files[0]);
    
    for(let i = 0; i < event.target.files.length; i++) {
      const newFile : any = event.target.files[i];
      newFile["id"] = this.nextQueueIndex();
      newFile["progress"] = 0;
      //console.log(newFile);
      this.setState({...this.state, files: [...this.state.files, newFile]});
      //console.log(this.files)
    }
  }

  fileUploadHandler = (event : any) => {
    //event.preventDefault();   // prevent page refreshing

    const promises : any = [];
    this.state.files.forEach((file : any) => {
      if(file.progress === 0) {
        const uploadTask : any = this.storageRef.child(file.name).put(file);
        // console.log(uploadTask);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot:any) => {
            // calculate the progress
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Number(progress.toFixed(2));
           //console.log(progress);

            // get file id
            let fileId = snapshot.task.blob_.data_.id;
            //console.log(fileId);
            // update the progress
            if(snapshot.state === firebase.storage.TaskState.RUNNING) {
              this.setState((prevState : any) => {
                prevState.files.find((item : any) => item.id === fileId).progress = progress;
                return {...prevState};
              })
            }        
            // console.log(this.state.files);
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

  genProgressBars = () => {
    let bars : any = [];
    
    this.state.files.forEach((file : any) => {
      bars.push(
        <li key={file.id}>
          <ProgressBar id={file.id} percentage={file.progress} filename={file.name}/>
        </li>
      )
    });

    return bars;
  }

  render() {
    return (
      <div className="App">
        <h2>Please choose the video files to upload.</h2>
        <a href="/show">Videos Uploaded</a>
        <div className="input-box">
          <input type="file" onChange={this.fileSelectedHandler} multiple></input>
          <button onClick={this.fileUploadHandler}>Upload</button>
        </div>

        <div className="progress-bars">{this.genProgressBars()}</div>
      </div>
    );
  }
}

