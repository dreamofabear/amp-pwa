/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AMPDocument from './amp-document';
import { Link } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.boundPopStateListener_ = this.handlePopState_.bind(this);
    this.boundClickListener_ = this.handleNavigate_.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.boundPopStateListener_);
    const docElement = window.document.documentElement;
    docElement.addEventListener('click', this.boundClickListener_);

    this.currentPage_ = window.location.pathname;
    if (this.currentPage_) {
      this.navigateTo(this.currentPage_);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.boundPopStateListener_);
    const docElement = window.document.documentElement;
    docElement.removeEventListener('click', this.boundClickListener_);
  }

  render() {
    return (
      <div>
        <section id="stream" className="stream">
          <article className="card">
            <a href="/content/article.amp.max.html">
              <h4>Document with relative URL</h4>
              <div className="detail">Lorem ipsum dolor amet...</div>
            </a>
          </article>
          <article className="card">
            <a href="/content/youtube.amp.max.html">
              <h4>Document with same-host absolute URL</h4>
              <div className="detail">Sample content B</div>
            </a>
          </article>
        </section>

        <div id="doc-container" ref={(ref) => this.container_ = ref}>
          {this.props.children}
        </div>
      </div>
    );
  }

  /** @private */
  handleNavigate_(e) {
    if (e.defaultPrevented) {
      return false;
    }
    if (event.button) {
      return false;
    }
    let a = event.target;
    while (a) {
      if (a.tagName == 'A' && a.href) {
        break;
      }
      a = a.parentElement;
    }
    if (a) {
      const url = new URL(a.href);
      if (url.origin == window.location.origin &&
              url.pathname.indexOf('amp.max.html') != -1) {
        e.preventDefault();
        const newPage = url.pathname;
        console.log('Internal link to: ', newPage);
        if (newPage != this.currentPage_) {
          this.navigateTo(newPage);
        }
      }
    }
  }

  /** @private */
  handlePopState_() {
    const newPage = window.location.pathname;
    console.log('Pop state: ', newPage, this.currentPage_);
    if (newPage != this.currentPage_) {
      this.navigateTo(newPage);
    }
  }

  /**
   * @param {string} path
   * @return {!Promise}
   */
  navigateTo(path) {
    console.log('Navigate to: ', path);
    const oldPage = this.currentPage_;
    this.currentPage_ = path;

    // Update URL.
    const push = !this.isShellUrl_(path) && this.isShellUrl_(oldPage);
    if (path != window.location.pathname) {
      if (push) {
        window.history.pushState(null, '', path);
      } else {
        window.history.replaceState(null, '', path);
      }
    }

    if (this.isShellUrl_(path)) {
      console.log('Back to shell');
      ReactDOM.unmountComponentAtNode(this.container_);
      return Promise.resolve();
    }

    // Fetch.
    const url = this.resolveUrl_(path);
    console.log('Fetch and render doc:', path, url);
    ReactDOM.render(<AMPDocument url={url} />, this.container_);
  }

  /**
   * @private
   * @param {string} url
   * @return {string}
   */
  resolveUrl_(url) {
    if (!this.a_) {
      this.a_ = window.document.createElement('a');
    }
    this.a_.href = url;
    return this.a_.href;
  }

  /**
   * @private
   * @param {string} url
   * @return {boolean}
   */
  isShellUrl_(url) {
   return (url == '/');
  }
}
