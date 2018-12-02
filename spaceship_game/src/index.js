import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Intro from './Intro';
import {HashRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// import Sidebar from "./components/Sidebar";

import Layout from './components/Layout'

class Routes extends React.Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Intro}/>
                    <Route exact parh='/main' component={Layout}/>
                </Switch>
            </HashRouter>

        );
    }
}


ReactDOM.render(<Routes />, document.getElementById('root'));
// ReactDOM.render(<Layout />, document.getElementById('root'));
// ReactDOM.render(<Intro />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
