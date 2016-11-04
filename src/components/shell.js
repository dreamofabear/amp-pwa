import { Grid, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Home from './home';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import TransitionWrapper from './transition-wrapper';
import './shell.css';

/**
 * The (App) Shell contains the web app's entire UI.
 *
 * The navigation bar is always displayed, with either a `Home` or `Article` component beneath it.
 */
export default class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {'documents': [], isTransitioning: false};
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
          <ReactTransitionGroup>
            {
              (this.props.children) ?
                  <TransitionWrapper
                      key='transition-wrapper'
                      contents={this.props.children}
                      isTransitioning={this.state.isTransitioning} /> :
                  <Home key='home'
                      documents={this.state.documents}
                      transitionStateDidChange={this.onTransitionStateChange_.bind(this)} />
            }
          </ReactTransitionGroup>
        </Grid>
      </div>
    );
  }

  /** @private */
  onTransitionStateChange_(isTransitioning) {
    this.setState({isTransitioning: isTransitioning});
  }
}
