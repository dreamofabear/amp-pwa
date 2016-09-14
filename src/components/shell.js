import { Link } from 'react-router';
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './shell.css';

// TODO(willchou): Move to separate file.
class Article extends React.Component {
  render() {
    return (
      <div className='card'>
        <Link to={this.props.src}>
          <h4>{this.props.title}</h4>
          <div className='detail'>{this.props.subtitle}</div>
        </Link>
      </div>
    );
  }
}

export default class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {'data': []};
  }

  componentDidMount() {
    // TODO(willchou): Should this be XHR instead?
    fetch('/amp-pwa/documents').then(response => {
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
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">AMP in PWA</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Section A</NavItem>
              <NavItem eventKey={2} href="#">Section B</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="stream">
          {this.state.data.map(doc => <Article title={doc.title} subtitle={doc.subtitle} src={doc.url} key={doc.url} />)}
        </div>

        <div id="doc-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
