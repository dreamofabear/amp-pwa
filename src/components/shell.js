import { Grid, Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Home from './home';
import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import TransitionWrapper from './transition-wrapper';
import './shell.css';

/**
 * @see https://github.com/ampproject/amphtml/blob/master/extensions/amp-install-serviceworker/amp-install-serviceworker.md#shell-url-rewrite
 */
function redirectSWFallbackURL(nextState, replace) {
  var hash = window.location.hash;
  if (hash && hash.indexOf('#href=') === 0) {
    var href = decodeURIComponent(hash.substr(6));
    replace({pathname: href});
  }
}

/**
 * The (App) Shell contains the web app's entire UI.
 *
 * The navigation bar is always displayed, with either a `Home` or `Article` component beneath it.
 */
class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {'documents': [], isTransitioning: false};
  }

  // Replacement for react-router onEnter
  componentWillMount(nextProps, nextState) {
    redirectSWFallbackURL(nextState, this.props.history.replace);
  }

  componentDidMount() {
    fetch('/documents').then(response => {
      if (response.status !== 200) {
        console.log('AMP document list fetch failed with code: ' + response.status);
        return;
      }
      response.json().then(data => {
        this.setState({'documents': data});
      });
    });
  }

  render() {
    console.log(this.props.childRoutes);
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>The Scenic</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>

        <Grid className='contents'>
          <TransitionGroup>
            {
              (this.props.childRoutes) ?
                  <TransitionWrapper
                      key='transition-wrapper'
                      contents={this.props.childRoutes}
                      isTransitioning={this.state.isTransitioning} /> :
                  <Home key='home'
                      documents={this.state.documents}
                      transitionStateDidChange={this.onTransitionStateChange_.bind(this)} />
            }
          </TransitionGroup>
        </Grid>
      </div>
    );
  }

  /** @private */
  onTransitionStateChange_(isTransitioning) {
    this.setState({isTransitioning: isTransitioning});
  }
}

export default withRouter(Shell)
