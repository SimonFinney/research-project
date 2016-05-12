// Server

const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.static(`${__dirname}/dist`));

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 8080;

app.host = app.set('host', host);
app.port = app.set('port', port);

const serverPort = app.get('port');


app.listen(serverPort, function() {
  app.address = `${app.get('host')}:${serverPort}`;
  console.log(`Listening at ${app.address}`);
});

module.exports = app;
