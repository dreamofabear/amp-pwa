import { Button, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>React + AMP + PWA</h1>
          <p>A simple React-based progressive web app that displays Accelerated Mobile Page (AMP) content.</p>
          <p>
            <Button href="http://github.com/choumx/amp-pwa" target="_blank" bsStyle="primary">VIEW ON GITHUB</Button>
          </p>
        </Jumbotron>

        <h2>Articles</h2>

        <ListGroup>
          {this.props.documents.map(doc =>
            <LinkContainer to={doc.url} key={doc.url}>
              <ListGroupItem header={doc.title}>{doc.subtitle}</ListGroupItem>
            </LinkContainer>
          )}
        </ListGroup>
      </div>
    );
  }
}