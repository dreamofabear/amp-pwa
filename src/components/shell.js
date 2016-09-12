import { Link } from 'react-router';
import React from 'react';
import './shell.css';

export default class Shell extends React.Component {
  render() {
    return (
      <div>
        <section id="stream" className="stream">
          <article className="card">
            <Link to="/content/article.amp.max.html">
              <h4>Document with relative URL</h4>
              <div className="detail">Bookmarks to this link will NOT render the shell.</div>
            </Link>
          </article>
          <article className="card">
            <Link to="amp/http://localhost:8080/content/youtube.amp.max.html">
              <h4>Document with absolute URL</h4>
              <div className="detail">Bookmarks to this link will render the shell.</div>
            </Link>
          </article>
          <article className="card">
            <Link to="amp/https://www.washingtonpost.com/amphtml/opinions/donald-trumps-raging-egomania/2016/09/08/252a4990-75f6-11e6-be4f-3f42f2e5a49e_story.html?utm_term=.44788ba3a413">
              <h4>Document with absolute URL on different domain</h4>
              <div className="detail">Note: Will only work if Chrome is run with --disable-web-security (use for DEV ONLY!)</div>
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
