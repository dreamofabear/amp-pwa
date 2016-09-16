# Create React App with AMP

A simple React-based [progressive web app](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/) that displays [Accelerated Mobile Page (AMP)](https://ampproject.org) content. Built on [create-react-app](https://github.com/facebookincubator/create-react-app) for minimal build configuration.

To see it in action, go to http://choumx.github.io/amp-pwa.

## User Guide

### Quick Start

```sh
git clone https://github/chou-mx/amp-pwa
cd amp-pwa
npm install
npm start
```

In a **separate terminal**, start the development API server:
```sh
node server.js
```

#### `npm start|test|run build`

This project uses the same development workflow as [create-react-app](https://github.com/facebookincubator/create-react-app#npm-start):

- `npm start` runs the app in development mode.
- `npm test` runs the test watcher in an interactive mode.
- `npm run build` builds the app for production to the `build` folder.

Check out create-react-app's [documentation](https://github.com/facebookincubator/create-react-app#npm-start) for more detail.

#### `node server.js`

The web server initiated by `npm start` only serves static content. To serve the AMP content to be displayed by the web app, there's a separate Express server in `server.js`.

For more information on how this works, check out [Using create-react-app with a server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development).

### Changes to create-react-app

This project adds modern web features to `create-react-app`:

* **Accelerated mobile pages (AMP):** Displays fast-loading AMP documents within the app shell via Shadow DOM (or polyfill).
* **Progressive web:** A service worker enables progressive enhancement of AMP content with precaching, offline functionality and an app shell for supported browsers.

#### New dependencies

Compared to `create-react-app`, this project adds a small number of new dependencies:

```
devDependencies:
  express
  sw-precache
dependencies:
  bootstrap
  react-bootstrap
```

- `sw-precache` generates a production-ready service worker for precaching and other progressive enhancements.
- `express` is used to run the development API server, `server.js`.
- `bootstrap` and `react-bootstrap` can be easily removed for your choice of UI framework.

#### New files

```
amp-pwa/
  content/
  manifest.webmanifest
  server.js
  service-worker.tmpl
  sw-precache-config.json
```

- `content/` contains several example AMP documents; remove or replace this with your own content.
- `manifest.webmanifest` contains app metadata for native support in Chrome on Android.
- `service-worker.tmpl` is a customized service worker template for `sw-precache`.
- `sw-precache-config.json` instructs `sw-precache` which static assets to precache and which resources to cache at runtime.

### Limitations

- Service workers are [not yet supported by all browsers](http://caniuse.com/#feat=serviceworkers).

