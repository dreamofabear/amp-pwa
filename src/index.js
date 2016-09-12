import AMPDocument from './components/amp-document';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Shell from './components/shell';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Shell}>
      <Route path="amp/**" component={
        props => <AMPDocument src={props.params.splat} />
      } />
      <Route path="*" component={
        () => <AMPDocument src={window.location.href} />
      } />
    </Route>
  </Router>
), document.getElementById('root'));