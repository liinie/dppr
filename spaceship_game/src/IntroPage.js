import React, { Component } from 'react';
// import logo from './logo.svg';
import spaceShipLogo from './assets/spaceship.svg';
import './IntroPage.css';
import {Link} from 'react-router-dom';

class IntroPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={spaceShipLogo} className="App-logo" alt="logo" />
          <div className='empty_space'>{' '}</div>
            <Link to='/main' className='link'>Enter Spaceship game</Link>
        </header>
      </div>
    );
  }
}

export default IntroPage;
