import React, { Component } from 'react';
// import logo from './logo.svg';
import spaceShipLogo from './assets/spaceship.svg';
import './Intro.css';
// import {Link} from 'react-router-dom';

class Intro extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={spaceShipLogo} className="App-logo" alt="logo" />
          <div className='empty_space'>{' '}</div>
            <p>Enter Spaceship game</p>
        </header>
      </div>
    );
  }
}

export default Intro;
