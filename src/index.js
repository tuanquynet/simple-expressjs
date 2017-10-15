var express = require('express');
var config = require('./config');

// Constants
var PORT = 8080;
var port = config.SERVER_PORT || PORT;
// App
var app = express();

app.get('/', function (req, res){
  let content = 'Hello world from Docker! <br/>Run at ' + config.runAt;
  content = `${content}<br/>Server port:${config.SERVER_PORT}<p>`;

  res.send(content);
});

app.get('/config-info', function (req, res) {
  let content = JSON.stringify(config);

  res.send(content);
});

app.listen(port);
console.log('config.SERVER_PORT ', config.SERVER_PORT);
console.log('Running on http://localhost:' + port);
