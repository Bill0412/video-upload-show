import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PageNotFound from './404';
import Show from './Show';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

class Routing extends React.Component{
    render() {
        return(
        <Router>
            <Switch>
            <Route exact path="/show" component={Show} />
            <Route exact path="/" component={App}/>
            <Route component={PageNotFound}/>
            </Switch>
        </Router>
        )
    }
}
    

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
