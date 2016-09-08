import { Link } from 'react-router';
import React from 'react';

export default class Shell extends React.Component {
  render() {
    return (
      <div>
        <section id="stream" className="stream">
          <article className="card">
            <Link to="/content/article.amp.max.html">
              <h4>Sample title A</h4>
              <div className="detail">Sample content A</div>
            </Link>
          </article>
          <article className="card">
            <Link to="/content/youtube.amp.max.html">
              <h4>Sample title B</h4>
              <div className="detail">Sample content B</div>
            </Link>
          </article>
        </section>

        <div id="doc-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
