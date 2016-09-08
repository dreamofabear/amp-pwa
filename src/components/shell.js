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
