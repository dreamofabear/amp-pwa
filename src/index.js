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
    <Route path="/amp-pwa" component={Shell}>

      <Route path="content/:document" component={
        props => <AMPDocument src={'/amp-pwa/content/' + props.params.document} />
      } />
    </Route>
  </Router>
), document.getElementById('root'));