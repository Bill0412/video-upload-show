import FirebaseUtil from './Firebase';
import React from 'react';


// route: /show
export default class Show extends React.Component {
    onVideoScroll = (event : any) => {
      console.log(event);
    }
    state : any = {
        error: null,
        isLoaded: false,
        snippets: []
    }
  
    storage = FirebaseUtil.getStorage();
    listRef = FirebaseUtil.getStorageRef().child('/');
  
    render() {
      // get all the download links of the videos from Firebase
      // and generate video snippets with the links
      this.listRef.listAll()
      .then((res : any) => {
        let promises : any = [];
        res.items.forEach((itemRef : any) => {
          // console.log(itemRef);
          const promise = itemRef.getDownloadURL();
          promises.push(promise);
        })
        return promises;
      })
      .then((promises : any) => {
        Promise.all(promises)
          .then((links : any) => {
            let snippets : any = [];
            links.forEach((link : any) => {
              snippets.push(
                <li key={link}>
                  <div className="video">
                    <video width="480" height="320" autoPlay controls>
                      <source type="video/mp4" src={link}/>
                    </video>
                  </div>
                </li>
              )
            })
            this.setState({
              isLoaded: true,
              snippets: snippets
            })
          })
      })
  
      if(this.state.error) {
        return (
        <div>Error: {this.state.error.message}</div>
        )
      } else if (!this.state.isLoaded) {
        return (<div>Loading...</div>);
      } else {
        return(
          <div className="App">
             <h2>Videos Uploaded</h2>
             <a href='/'>Upload More</a>
             <div className="row">{this.state.snippets}</div>
          </div>
        )
      }
    }
  }
  
  
  