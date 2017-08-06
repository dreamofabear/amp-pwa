import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './components/shell';
import { BrowserRouter, Route } from 'react-router-dom';
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
  <BrowserRouter>
    <div>
      <Route path='content/:document' component={
        props => <AMPDocument src={'/content/' + props.params.document} />
      } />
      <Route path='/' component={Shell} onEnter={redirectSWFallbackURL} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));
