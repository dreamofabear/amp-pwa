import AMPDocument from '../components/amp-document';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Shell from '../components/shell';

ReactDOM.render((
  <Shell />
  // <Router history={browserHistory}>
  //   <Route path="/" component={Shell}>
  //     <Route path="*" component={AMPDocument} />
  //   </Route>
  // </Router>
), document.getElementById('root'));