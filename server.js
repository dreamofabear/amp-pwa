var express = require('express');
var app = express();

const PORT = process.env.PORT || 3001;

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/amp.list', (req, res) => {
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
    }
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

app.listen(PORT, () => {
  console.log('Express server running on localhost: ' + PORT);
})