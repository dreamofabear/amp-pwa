// TODO(willchou): Document this file!

var express = require('express');
var path = require('path');
var pjson = require('./package.json');

// This port number must match that of `proxy` in `package.json`, which is used
// to redirect requests from the development server to the APIs below.
// @see https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development
var port = pjson.proxy ? parseInt(pjson.proxy.split(':')[2]) : 4000;

var app = express();

// Returns a list of AMP document metadata to display on the app shell.
app.get('/amp-pwa/documents', function(req, res) {
  var docs = [
    {
      "title": "AMP by example",
      "subtitle": "The home page of AMP by example.",
      "url": "/amp-pwa/content/ampbyexample.amp.html"
    },
    {
      "title": "Hello world",
      "subtitle": "A simple AMP document.",
      "url": "/amp-pwa/content/hello_world.amp.html"
    },
    {
      "title": "How to publish AMPs",
      "subtitle": "A tutorial on how to publish AMP documents.",
      "url": "/amp-pwa/content/how_to_publish_amps.amp.html"
    }
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

// Returns the HTML content of a single AMP document.
app.get('/amp-pwa/content/:document', function(req, res) {
  // TODO(willchou): Add 404 page for bogus :document params.
  res.sendFile(path.join(__dirname, 'content', req.params.document));
});

// When testing the production build (via `npm run build`), simply serve
// the compiled html and js in the `build` dir.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.listen(port, function() {
  console.log();
  if (process.env.NODE_ENV === 'production') {
    console.log('The production build app is running at:');
  } else {
    console.log('The API server is running at:');
  }
  console.log('  ' + 'http://localhost:' + port + '/');
  console.log();
})