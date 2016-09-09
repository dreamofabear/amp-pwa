var express = require('express');
var app = express();
var path = require('path');

const BUILD_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 8080;

app.use(express.static('dist'));
// app.use('/js', express.static(path.join(BUILD_DIR, 'js')));

var renderShell = (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'))
};

app.get('/', renderShell);
app.get('/amp/*', renderShell);

app.listen(PORT, () => {
  console.log('Express server running on localhost:' + PORT);
});
