import { Link } from 'react-router';
import React from 'react';
import './article.css'

/**
 * Displays the title of an AMP article with a brief description
 * while linking to the article itself.
 */
export default class Article extends React.Component {
  render() {
    return (
      <Link to={this.props.src}>
        <div className='article'>
            <h3>{this.props.title}</h3>
            <p>{this.props.subtitle}</p>
        </div>
      </Link>
    );
  }
}
Article.propTypes = {
  src: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string
}