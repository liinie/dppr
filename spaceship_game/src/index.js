import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {HashRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import IntroPage from './IntroPage';
import GamePage from './GamePage'
import GameOverPage from './GameOverPage'

class Routes extends React.Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={IntroPage}/>
                    <Route exact path='/gameOver' component={GameOverPage}/>
                    <Route exact parh='/main' component={GamePage}/>
                </Switch>
            </HashRouter>

        );
    }
}


ReactDOM.render(<Routes />, document.getElementById('root'));
// ReactDOM.render(<GamePage />, document.getElementById('root'));
// ReactDOM.render(<IntroPage />, document.getElementById('root'));
// ReactDOM.render(<GameOverPage/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
