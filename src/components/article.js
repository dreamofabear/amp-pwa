import React from 'react';
import PropTypes from 'prop-types';
import './article.css'

/**
 * A snippet of an AMP document that links to the full content.
 */
export default class Article extends React.Component {
  render() {
    return (
      <div className='article' style={{backgroundImage: 'url(' + this.props.image + ')'}}>
        <div className='scrim-top'></div>
        <div className='scrim-bottom'></div>
        <h3>{this.props.title}</h3>
        <h4>{this.props.subtitle}</h4>
      </div>
    );
  }
}
Article.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
}
