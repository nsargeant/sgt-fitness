var http = require('http'),
  express = require('express'),
  log = require('morgan'),
  body = require('body-parser'),
  cors = require('cors'),
  ip = require('ip'),
  route = require('./routes'),
  config = require('./config/config.json'),
  db = require('./lib/db'),
  app = express(),
  port = config.port,
  mongoUrl = "mongodb://" + process.env.DB_USER + ':' + process.env.DB_PWD + config.mongo.address,
  server;

//logging
app.use(log('combined'));
// parse application/x-www-form-urlencoded
app.use(body.urlencoded({
  extended: false
}));
// parse application/json
app.use(body.json());
// parse application/vnd.api+json as json
app.use(body.json({
  type: 'application/vnd.api+json'
}));
//cors
app.use(cors());

//set routes
route(app);

server = http.createServer(app);
server.listen(port);
console.log('  info -- app.js || Listening @', ip.address() + ':' + port);

db.connect(mongoUrl, function () {
  console.log('  info -- db.js || connected to db @:', config.mongo.address);
});
