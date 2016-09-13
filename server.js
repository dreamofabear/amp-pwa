var express = require('express');
var path = require('path');

var PORT = 4000;
var app = express();

console.log(process.env.NODE_ENV);

app.get('/documents', function(req, res) {
  var docs = [
    {
      "title": "AMP by example",
      "subtitle": "The home page of AMP by example.",
      "url": "https://ampbyexample.com/"
    },
    {
      "title": "Hello world",
      "subtitle": "A simple AMP document.",
      "url": "https://ampbyexample.com/introduction/hello_world/"
    },
    {
      "title": "How to publish AMPs",
      "subtitle": "A tutorial on how to publish AMP documents.",
      "url": "https://ampbyexample.com/introduction/how_to_publish_amps/"
    },
    {
      "title": "Local content",
      "subtitle": "Sample AMP article.",
      "url": "/content/article.amp.max.html"
    }
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('build/static'));
  app.use('/content', express.static('build/content'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  app.get('/content/:document', function(req, res) {
    // TODO(willchou): Add 404 page for bogus :document params.
    res.sendFile(path.join(__dirname, 'content', req.params.document));
  });
}

app.listen(PORT, function() {
  console.log('Express API server running on localhost:4000...');
})