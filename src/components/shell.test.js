import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shell from './shell';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Shell/></Router>, div);
});
