import React from 'react';
import Article from './article';

/**
 * The app's home page, modulo the navigation bar.
 * Displays a list of `Article`s.
 */
export default class Home extends React.Component {
  render() {
    return (
      <div className='articles'>
        {this.props.documents.map(doc =>
          <Article
              title={doc.title}
              subtitle={'By ' + doc.author + ', ' + doc.date}
              image={doc.image}
              src={doc.url}
              key={doc.title} />
        )}
      </div>
    );
  }
}
Home.propTypes = {
  documents: React.PropTypes.arrayOf(React.PropTypes.object),
}
