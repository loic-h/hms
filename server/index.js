const express = require('express');
const cors = require('cors');
const api = require('./api');
const path = require('path');
const socket = require('./socket');

const app = express();
const server = require('http').createServer(app);
socket(server);

app.use('/api', api);

app.use(express.static(__dirname + '/../dist'));
app.get([
  '/game/:id',
  '/404'
], (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.use((req, res) => {
  res.send(404);
});

server.listen(8080, function() { console.log('listening'); });
