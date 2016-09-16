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

In a separate terminal, start the development API server:
```sh
node server.js
```

### `npm start|test|run build`

This project uses the same development flow as [create-react-app](https://github.com/facebookincubator/create-react-app#npm-start):

- `npm start` runs the app in development mode.
- `npm test` runs the test watcher in an interactive mode.
- `npm run build` builds the app for production to the `build` folder.

Check out create-react-app's [documentation](https://github.com/facebookincubator/create-react-app#npm-start) for more detail.

### `node server.js`

The web server initiated by `npm start` only serves static content. To provide the dynamic AMP content to be displayed by the web app, there's a separate Express server in `server.js`.

Note that this is only for ease of development with the web server bundled with `create-react-app`. In production, this could happen on the same host and port as the web server. For more information on this approach, check out [Using create-react-app with a server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development).
