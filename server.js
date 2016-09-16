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
app.get('/documents', function(req, res) {
  var docs = [
    {
      "title": "AMP by Example",
      "subtitle": "AMP by Example gives a hands-on introduction to Accelerated Mobile Pages based on code and live samples.",
      "url": "/content/ampbyexample.amp.html"
    },
    {
      "title": "Hello World",
      "subtitle": "An AMP HTML tutorial - learn the different building blocks of an AMP HTML file.",
      "url": "/content/hello_world.amp.html"
    },
    {
      "title": "How to publish AMPs",
      "subtitle": "There are a few things you need to watch out for when publishing Accelerated Mobile Pages (AMP).",
      "url": "/content/how_to_publish_amps.amp.html"
    },
    {
      "title": "Housing",
      "subtitle": "This sample showcases how to build a housing page in AMP HTML.",
      "url": "/content/housing.amp.html"
    },
    {
      "title": "Live Blog",
      "subtitle": "This is a sample template for implementing live blogs in AMP.",
      "url": "/content/blog.amp.html"
    },
    {
      "title": "News Article",
      "subtitle": "This is a sample template for a news article in AMP.",
      "url": "/content/news_article.amp.html"
    },
    {
      "title": "Product Listing",
      "subtitle": "This sample showcases how to build a product listing page in AMP HTML.",
      "url": "/content/product_listing.amp.html"
    },
    {
      "title": "Product",
      "subtitle": "This sample showcases how to build a product page in AMP HTML.",
      "url": "/content/product.amp.html"
    },
    {
      "title": "Recipe",
      "subtitle": "This is a sample recipe AMP article demonstrating how to express machine-readable recipe data using JSON+LD.",
      "url": "/content/recipe.amp.html"
    }
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

// Returns the HTML content of a single AMP document.
app.get('/content/:document', function(req, res) {
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