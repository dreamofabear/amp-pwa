import path from 'path';
import React from 'react';

export default class AMPDocument extends React.Component {
  constructor(props) {
    super(props);

    /** @private */
    this.container_ = null;

    /** @private */
    this.xhr_ = null;
  }

  componentDidMount() {
    this.installScript_('https://cdn.ampproject.org/shadow-v0.js');
    this.fetchAndAttachAMPDoc_(this.props);
  }

  componentWillUnmount() {
    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAndAttachAMPDoc_(nextProps);
  }

  render() {
    return (
      <div className="amp-doc-host" ref={(ref) => this.container_ = ref} />
    );
  }

  /**
   * @private
   * @param {Object} props
   */
  fetchAndAttachAMPDoc_(props) {
    const url = props.url || window.location.href;
    this.fetchDocument_(url).then(doc => {
      return new Promise((resolve, reject) => {
        (window.AMP = window.AMP || []).push(resolve);
      }).then(amp => {
        amp.attachShadowDoc(this.container_, doc, url);
      });
    });
  }

  /**
   * @private
   * @param {string} url
   * @return {Promise}
   */
  fetchDocument_(url) {
    return new Promise((resolve, reject) => {
      const xhr = (this.xhr_ = new XMLHttpRequest());
      xhr.open('GET', url, true);
      xhr.responseType = 'document';
      xhr.setRequestHeader('Accept', 'text/html');
      xhr.onreadystatechange = () => {
        if (xhr.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (xhr.status < 100 || xhr.status > 599) {
          xhr.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${xhr.status}`));
          return;
        }
        if (xhr.readyState == /* COMPLETE */ 4) {
          if (xhr.responseXML) {
            resolve(xhr.responseXML);
          } else {
            reject(new Error(`No xhr.responseXML`));
          }
        }
      };
      xhr.onerror = () => {
        reject(new Error('Network failure'));
      };
      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };
      xhr.send();
    });
  }

  /**
   * @private
   * @param {string} src
   */
  installScript_(src) {
    const doc = window.document;
    const script = doc.createElement('script');
    script.setAttribute('src', src);
    doc.head.appendChild(script);
  }
}
AMPDocument.propTypes = { url: React.PropTypes.string }
