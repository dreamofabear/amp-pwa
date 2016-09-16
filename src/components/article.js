import { Link } from 'react-router';
import React from 'react';

export default class Article extends React.Component {
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
