import { Link } from 'react-router';
import React from 'react';
import './article.css'

export default class Article extends React.Component {
  render() {
    return (
      <div className='article'>
        <Link to={this.props.src}>
          <h3>{this.props.title}</h3>
          <p>{this.props.subtitle}</p>
        </Link>
      </div>
    );
  }
}
Article.propTypes = {
  src: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string
}