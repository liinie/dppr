import React from 'react';
import ReactDOM from 'react-dom';
import IntroPage from './IntroPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IntroPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
