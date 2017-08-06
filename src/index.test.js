import React from 'react';
import ReactDOM from 'react-dom';
import { redirectSWFallbackURL } from 'index';
import Shell from './components/shell';
import { Router, Route, browserHistory } from 'react-router';
import AMPDocument from './components/amp-document/amp-document';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Shell} onEnter={redirectSWFallbackURL}>
        <Route path='content/:document' component={
          props => <AMPDocument src={'/content/' + props.params.document} />
        } />
      </Route>
    </Router>
  ), div);
});
