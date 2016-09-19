import { Button, Jumbotron, PageHeader } from 'react-bootstrap';
import React from 'react';
import Article from './article';

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

        <PageHeader>Articles</PageHeader>

        {this.props.documents.map(doc => <Article title={doc.title} subtitle={doc.subtitle} src={doc.url} key={doc.url} />)}
      </div>
    );
  }
}