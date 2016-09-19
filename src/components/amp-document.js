import React from 'react';

export default class AMPDocument extends React.Component {
  constructor(props) {
    super(props);

    /** @private */
    this.ampReadyPromise_ = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });

    /** @private */
    this.container_ = null;

    /** @private */
    this.xhr_ = null;
  }

  componentDidMount() {
    this.installScript_('https://cdn.ampproject.org/shadow-v0.js');
    this.fetchAndAttachAMPDoc_(this.props.src);
  }

  componentWillUnmount() {
    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAndAttachAMPDoc_(nextProps.src);
  }

  render() {
    return (
      <div className='amp-container' ref={(ref) => this.container_ = ref} />
    );
  }

  /**
   * @private
   * @param {string} url
   */
  fetchAndAttachAMPDoc_(url) {
    this.fetchDocument_(url).then(doc => {
      return this.ampReadyPromise_.then(amp => {
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
      // This is set to text/* instead of text/html because `create-react-app`
      // only forwards requests to the proxy for requests whose 'Accept' header
      // is NOT text/html.
      xhr.setRequestHeader('Accept', 'text/*');
      xhr.onreadystatechange = () => {
        if (xhr.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (xhr.status < 100 || xhr.status > 599) {
          xhr.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${xhr.status}`));
          return;
        }
        if (xhr.readyState === /* COMPLETE */ 4) {
          if (xhr.responseXML) {
            resolve(xhr.responseXML);
          } else {
            reject(new Error(`No xhr.responseXML`));
          }
        }
      };
      xhr.onerror = () => { reject(new Error('Network failure')); };
      xhr.onabort = () => { reject(new Error('Request aborted')); };
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
AMPDocument.propTypes = { src: React.PropTypes.string.isRequired }
