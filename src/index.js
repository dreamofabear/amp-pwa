import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './components/shell';
import { Router, Route, browserHistory } from 'react-router';
import AMPDocument from './components/amp-document/amp-document';
import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap-theme.css'; // Replace with your own bootstrap theme!

/**
 * @see https://github.com/ampproject/amphtml/blob/master/extensions/amp-install-serviceworker/amp-install-serviceworker.md#shell-url-rewrite
 */
export function redirectSWFallbackURL(nextState, replace) {
  var hash = window.location.hash;
  if (hash && hash.indexOf('#href=') === 0) {
    var href = decodeURIComponent(hash.substr(6));
    replace({pathname: href});
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Shell} onEnter={redirectSWFallbackURL}>
      <Route path='content/:document' component={
        props => <AMPDocument src={'/content/' + props.params.document} />
      } />
    </Route>
  </Router>
), document.getElementById('root'));
