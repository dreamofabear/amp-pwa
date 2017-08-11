import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AMPDocument from './amp-document';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AMPDocument src='http://foo.bar' /></Router>,
    div);
});
