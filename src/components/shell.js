import Article from './article';
import { Button, Grid, Jumbotron, Nav, Navbar, NavItem } from 'react-bootstrap';
import React from 'react';
import './shell.css';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {'data': []};
  }

  componentDidMount() {
    // TODO(willchou): Should this be XHR instead?
    fetch('/documents').then(response => {
      if (response.status !== 200) {
        console.log('AMP document list fetch failed with code: ' + response.status);
        return;
      }

      response.json().then(data => {
        this.setState({'data': data});
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">The Accelerated Mobile Post</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="http://github.com/choumx/amp-pwa">View on GitHub</NavItem>
              <NavItem eventKey={2} href="http://ampproject.org">AMP Project</NavItem>
              <NavItem eventKey={3} href="https://facebook.github.io/react/">React</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid className="contents">
          <Jumbotron>
            <h1>React + AMP + PWA</h1>
            <p>A simple React-based progressive web app that displays Accelerated Mobile Page (AMP) content.</p>
            <p>
              <Button href="http://github.com/choumx/amp-pwa" target="_blank" bsStyle="primary">
                VIEW ON GITHUB
              </Button>
            </p>
          </Jumbotron>

          <div className="stream">
            {this.state.data.map(doc => <Article title={doc.title} subtitle={doc.subtitle} src={doc.url} key={doc.url} />)}
          </div>

          <div id="doc-container">
            {this.props.children}
          </div>
        </Grid>
      </div>
    );
  }
}
