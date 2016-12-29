// Server

// TODO: Comments
const compression = require('compression');
const express = require('express');
const minifyHtml = require('express-minify-html');
const nunjucks = require('nunjucks');

const router = require('./src/router');

const server = express();

const serverDirectory = ((server.get('env') === 'development') ? '.tmp' : 'dist');
const staticAssets = express.static(`${__dirname}/${serverDirectory}/`);

server.use('/', router.router);
server.use(staticAssets);

server.use(
  compression()
);

server.use(
  minifyHtml(
    {
      htmlMinifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }
  )
);

nunjucks.configure('templates', {
  autoescape: true,
  express: server,
});

server.host = server.set('host', (process.env.HOST || 'http://localhost'));
server.port = server.set('port', (process.env.PORT || 8080));

const port = server.get('port');

server.listen(port, () => {
  server.address = `${server.get('host')}:${port}`;
  console.log(`Listening at ${server.address}`);
});

module.exports = server;
