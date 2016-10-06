// This file contains an Express server that does two things:
//
// 1. During development, provide data APIs for the web app to consume
//
//     The development webpack-dev-server initiated via `npm start` can only serve
//     static files from the root project directory. This server provides two APIs
//     for dynamic data: listing AMP docs and retrieving contents of a single AMP doc.
//
//     For development, run `npm start`.
//     Then, in a **separate terminal shell**, run `node server.js`.
//
// 2. Testing the production build
//
//     `npm run build` builds the web app for production into the build/ folder.
//     This server also serves the content of that folder via express.static.
//
//     To test the prod build, run `npm run build && node server.js` and the navigate
//     to http://localhost:4000 on your web browser.

var express = require('express');
var path = require('path');
var pjson = require('./package.json');

// This port number must match that of `proxy` in `package.json`, which is used
// to redirect requests from the development server to the APIs in this file.
// See https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development
var port = pjson.proxy ? parseInt(pjson.proxy.split(':')[2]) : 4000;

var app = express();

// Returns a list of AMP document metadata to display on the app shell.
app.get('/documents', function(req, res) {
  var docs = [
    {
      "title": "Most Beautiful Hikes All Over the World",
      "image": "/content/unsplash/1.jpg",
      "author": "Jamie Smith",
      "date": "Posted today",
      "url": "/content/most_beautiful_hikes.amp.html",
    },
    {
      "title": "Top 10 Most Relaxing Outdoor Adventures",
      "image": "/content/unsplash/10.jpg",
      "author": "Paul Bunyan",
      "date": "Sept 22",
      "url": "/content/most_beautiful_hikes.amp.html",
    },
    {
      "title": "Ranching Roundup: America's Heartland",
      "image": "/content/unsplash/3.jpg",
      "author": "Mark Twain",
      "date": "Sept 20",
      "url": "/content/most_beautiful_hikes.amp.html",
    },
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

// Returns the HTML content of a single AMP document.
app.get('/content/:document', function(req, res) {
  res.sendFile(path.join(__dirname, 'content', req.params.document));
});

// When testing the production build (via `npm run build`), simply serve the compiled html and js in the `build` dir.
app.use(express.static('build'));

app.listen(port, function() {
  console.log();
  console.log('The API server is running at:');
  console.log('  ' + 'http://localhost:' + port + '/');
  console.log();
})