const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();
const server = require('http').createServer(app);

app.use('/api', api);

app.use('/', express.static(__dirname + '/../dist'))
  .use(cors);

server.listen(8080, function() { console.log('listening'); });
